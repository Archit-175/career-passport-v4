'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { domToCanvas } from 'modern-screenshot'

interface TileOverlayProps {
  className?: string
}

export default function TileOverlay({ className }: TileOverlayProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const container = mount.parentElement
    if (!container) return

    const W = mount.offsetWidth
    const H = mount.offsetHeight
    const COLS = Math.ceil(W / 90)
    const ROWS = Math.ceil(H / 70)
    const TW = W / COLS
    const TH = H / ROWS
    const MAX_LIFT = 110
    const RADIUS = 180

    // ── Renderer ────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(window.devicePixelRatio)
    Object.assign(renderer.domElement.style, {
      position: 'absolute', top: '0', left: '0',
      width: '100%', height: '100%', pointerEvents: 'none',
    })
    mount.appendChild(renderer.domElement)

    // Camera positioned so objects at z=0 render at their natural pixel size
    const fov = 50
    const camZ = H / (2 * Math.tan((fov * Math.PI) / 360))
    const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, camZ * 5)
    camera.position.z = camZ

    const scene = new THREE.Scene()

    // ── Tile grid ────────────────────────────────────────────────
    interface TileState {
      group: THREE.Group
      cx: number; cy: number
      lift: number; tx: number; ty: number
    }
    const tiles: TileState[] = []

    const depthMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const sx = c * TW
        const sy = r * TH
        const cx = sx + TW / 2
        const cy = sy + TH / 2

        const group = new THREE.Group()
        // Convert top-left pixel coords → Three.js center-origin coords
        group.position.set(cx - W / 2, -(cy - H / 2), 0)

        // Face plane — invisible until texture is applied
        const face = new THREE.Mesh(
          new THREE.PlaneGeometry(TW, TH),
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
        )
        group.add(face)

        // White depth slab sitting 24px behind the face
        const depth = new THREE.Mesh(
          new THREE.PlaneGeometry(TW, TH),
          depthMat,
        )
        depth.position.z = -24
        depth.visible = false
        group.add(depth)

        scene.add(group)
        tiles.push({ group, cx, cy, lift: 0, tx: 0, ty: 0 })
      }
    }

    // ── Content capture ──────────────────────────────────────────
    //
    // The section is below the fold on mount, so html2canvas can't see it.
    // Fix: clone it to document.body
    // (always in-viewport) before capturing, then remove the clone.
    const contentEl = container.querySelector<HTMLElement>('[data-tile-content]')
    let cancelled = false

    const capture = async () => {
      await document.fonts.ready
      if (cancelled) return

      // modern-screenshot uses SVG foreignObject (browser-native rendering),
      // so it handles Tailwind v4's color-mix(in oklab, ...) without issue.
      // We capture the live container directly — no clone needed.
      // Hide the tile mount temporarily so it doesn't appear in the snapshot.
      const tileMount = container.querySelector<HTMLElement>('[data-tile-mount]')
      if (tileMount) tileMount.style.display = 'none'

      let captured: HTMLCanvasElement | null = null
      try {
        captured = await domToCanvas(container, {
          width: W,
          height: H,
          backgroundColor: '#000000',
          scale: window.devicePixelRatio || 1,
        })
      } finally {
        if (tileMount) tileMount.style.display = ''
      }

      if (!captured || cancelled) return

      const texture = new THREE.CanvasTexture(captured)

      // Apply UV-mapped texture slices to each tile face
      tiles.forEach((t, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        const sx = col * TW
        const sy = row * TH

        // UV origin is bottom-left in Three.js, top-left in image space — flip Y
        const u0 = sx / W
        const u1 = (sx + TW) / W
        const vTop = 1 - sy / H
        const vBot = 1 - (sy + TH) / H

        const geo = new THREE.PlaneGeometry(TW, TH)
        const uv = geo.attributes.uv as THREE.BufferAttribute
        // PlaneGeometry vertex order: 0=top-left, 1=top-right, 2=bottom-left, 3=bottom-right
        uv.setXY(0, u0, vTop)
        uv.setXY(1, u1, vTop)
        uv.setXY(2, u0, vBot)
        uv.setXY(3, u1, vBot)
        uv.needsUpdate = true

        const face = t.group.children[0] as THREE.Mesh
        ;(face.material as THREE.MeshBasicMaterial).dispose()
        face.geometry.dispose()
        face.geometry = geo
        face.material = new THREE.MeshBasicMaterial({ map: texture })
      })

      // Hide original DOM content — layout preserved, visuals replaced by tiles
      if (contentEl) contentEl.style.visibility = 'hidden'
    }

    capture().catch((err) => {
      console.warn('[TileOverlay] capture failed:', err)
    })

    // ── Mouse tracking ───────────────────────────────────────────
    let mouse = { x: -9999, y: -9999 }
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse = { x: -9999, y: -9999 } }
    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // ── Render loop ──────────────────────────────────────────────
    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)

      for (const t of tiles) {
        const dx = mouse.x - t.cx
        const dy = mouse.y - t.cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        let prox = Math.max(0, 1 - dist / RADIUS)
        prox = prox * prox * prox

        const targetLift = prox * MAX_LIFT
        const norm = dist > 0.5 ? 1 / dist : 0
        const tiltAmt = prox * 30

        t.lift = lerp(t.lift, targetLift, 0.10)
        t.tx   = lerp(t.tx, dy * norm * tiltAmt, 0.10)
        t.ty   = lerp(t.ty, -dx * norm * tiltAmt, 0.10)

        t.group.position.z = t.lift
        t.group.rotation.x = THREE.MathUtils.degToRad(t.tx)
        t.group.rotation.y = THREE.MathUtils.degToRad(t.ty)

        const depth = t.group.children[1] as THREE.Mesh
        depth.visible = t.lift > 0.5
      }

      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      if (contentEl) contentEl.style.visibility = ''
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      data-tile-mount
      className={`pointer-events-none ${className ?? ''}`}
    />
  )
}
