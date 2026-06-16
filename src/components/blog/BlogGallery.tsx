"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { POSTS, ARTICLE_BODY, PULL_QUOTE, type BlogPost } from "./blogData";

// ── Tunables ────────────────────────────────────────────────────────────────
// The gallery is a flat, infinitely-wrapping grid at rest; while you drag it
// curves into a sphere ("bulges" toward a globe) and relaxes back to flat.
const COLS = 9;                              // grid block columns (wraps toroidally)
const ROWS = 6;                              // grid block rows (wraps toroidally)
const CARD_W = 2.15;                          // card plane width (world units)
const CARD_ASPECT = 640 / 832;               // canvas w/h → portrait card
const CARD_H = CARD_W / CARD_ASPECT;          // ≈ 2.8
const GAP = 0.34;                             // gap between cards (kept tight)
const CELL_W = CARD_W + GAP;
const CELL_H = CARD_H + GAP;
const GRID_W = COLS * CELL_W;
const GRID_H = ROWS * CELL_H;
const CANVAS_W = 640;
const CANVAS_H = 832;
const FLAT_DEPTH = 8.6;                        // z of the flat grid plane (camera at origin, looks -Z)
const SPHERE_R = 10.5;                          // bulge radius when fully curved (larger = gentler)
const CURVE_ZOOM = 0.26;                         // extra recede while curved → "zoom out" feel
// Vertical FOV is derived per-aspect so the *horizontal* field (and card density)
// stays roughly constant from ultrawide desktops down to narrow phones.
const HFOV_TARGET = 78;                        // degrees of horizontal field to preserve
const computeFov = (aspect: number) => {
  const v = 2 * Math.atan(Math.tan((HFOV_TARGET * Math.PI) / 360) / aspect);
  return Math.max(48, Math.min(92, (v * 180) / Math.PI));
};
const DRAG_SENS = 0.013;                       // pointer px → world units of pan
const FOLLOW = 0.13;                           // pan ease toward target (Lenis-style)
const INERTIA_DECAY = 0.94;                    // velocity decay per frame after release
const CURVE_EASE = 0.06;                       // how fast the grid bulges / relaxes

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Wrap a coordinate into a centred [-S/2, S/2) cell so the grid tiles infinitely.
const wrap = (v: number, S: number) => ((v % S) + S) % S - S / 2;

// ── Canvas card renderer ──────────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number,
) {
  const ir = img.width / img.height;
  const r = w / h;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (ir > r) {
    sw = img.height * r;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / r;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxW: number,
  maxLines: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = test;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function drawCard(post: BlogPost, img: HTMLImageElement): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = CANVAS_W;
  cv.height = CANVAS_H;
  const ctx = cv.getContext("2d")!;
  const W = CANVAS_W, H = CANVAS_H;
  const R = 28;
  const P = 46;

  // Clip to rounded rect so corners are transparent.
  roundRect(ctx, 0, 0, W, H, R);
  ctx.save();
  ctx.clip();

  // Base + photo
  ctx.fillStyle = "#1C2231";
  ctx.fillRect(0, 0, W, H);
  drawImageCover(ctx, img, 0, 0, W, H);

  // Bottom-up ink gradient for legibility
  const grad = ctx.createLinearGradient(0, H * 0.32, 0, H);
  grad.addColorStop(0, "rgba(11,14,20,0)");
  grad.addColorStop(0.55, "rgba(11,14,20,0.55)");
  grad.addColorStop(1, "rgba(11,14,20,0.94)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Top scrim for header legibility
  const top = ctx.createLinearGradient(0, 0, 0, 170);
  top.addColorStop(0, "rgba(11,14,20,0.62)");
  top.addColorStop(1, "rgba(11,14,20,0)");
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, W, 170);

  ctx.textBaseline = "alphabetic";
  // letterSpacing isn't in every TS DOM lib version — set it through a cast.
  const setLS = (v: string) => {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = v;
  };

  // Header text sits over photos — a soft shadow gives it a contrast floor
  // independent of whatever image is behind it.
  ctx.save();
  ctx.shadowColor = "rgba(11,14,20,0.9)";
  ctx.shadowBlur = 7;
  ctx.shadowOffsetY = 1;

  // Category (gold, tracked, uppercase) — Inter 500 is the heaviest weight loaded
  ctx.fillStyle = "#C9A84C";
  ctx.font = '500 24px "Inter", system-ui, sans-serif';
  setLS("2.5px");
  ctx.fillText(post.category.toUpperCase(), P, P + 22);

  // Date (top-right)
  ctx.font = '400 22px "Inter", system-ui, sans-serif';
  setLS("1px");
  ctx.fillStyle = "rgba(245,242,236,0.72)";
  ctx.textAlign = "right";
  ctx.fillText(post.date, W - P, P + 21);
  ctx.textAlign = "left";
  ctx.restore();

  // Title (Playfair, pearl), wrapped from the bottom up
  setLS("0px");
  ctx.font = '600 46px "Playfair Display", Georgia, serif';
  ctx.fillStyle = "#F5F2EC";
  const lines = wrapText(ctx, post.title, W - P * 2, 3);
  const lineH = 56;
  const readY = H - P - 6;
  let ty = readY - 42 - (lines.length - 1) * lineH;
  for (const ln of lines) {
    ctx.fillText(ln, P, ty);
    ty += lineH;
  }

  // Read-time row with a gold dot
  ctx.fillStyle = "#C9A84C";
  ctx.beginPath();
  ctx.arc(P + 4, readY - 7, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(245,242,236,0.62)";
  ctx.font = '400 22px "Inter", system-ui, sans-serif';
  setLS("1px");
  ctx.fillText(post.readTime, P + 20, readY);

  ctx.restore();

  // Hairline border
  setLS("0px");
  roundRect(ctx, 1, 1, W - 2, H - 2, R - 1);
  ctx.strokeStyle = "rgba(245,242,236,0.14)";
  ctx.lineWidth = 2;
  ctx.stroke();

  return cv;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ── Per-card runtime state ──────────────────────────────────────────────────
interface Card {
  mesh: THREE.Mesh;
  cellX: number;              // resting grid coordinate (world units, centred, pre-wrap)
  cellY: number;
  hover: number;              // 0..1 eased hover amount
  index: number;
  frozen: boolean;            // true while GSAP owns the transform (open/close)
}

export default function BlogGallery() {
  const mountRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ open: (postIndex: number) => void; close: () => void } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);   // element to restore focus to on close

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogPost | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.clientWidth;
    let H = mount.clientHeight;
    let disposed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Renderer / scene / camera ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    Object.assign(renderer.domElement.style, {
      position: "absolute", inset: "0", width: "100%", height: "100%",
      cursor: "grab", touchAction: "none",
    });
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const FAR = (FLAT_DEPTH + SPHERE_R) * 4;
    const camera = new THREE.PerspectiveCamera(computeFov(W / H), W / H, 0.1, FAR);
    camera.position.set(0, 0, 0);

    // World group — holds the cards; only ever scaled (entrance / open animations).
    const world = new THREE.Group();
    scene.add(world);

    // Parallax starfield (sits far behind the cards for depth)
    const starGroup = new THREE.Group();
    scene.add(starGroup);
    {
      const N = 700;
      const positions = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const u = i / N;
        // deterministic spread on a large sphere
        const theta = u * Math.PI * 2 * 13.17;
        const phi = Math.acos(1 - 2 * ((i + 0.5) / N));
        const r = (FLAT_DEPTH + SPHERE_R) * 2.2;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.cos(phi);
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xf5f2ec, size: 0.05, transparent: true, opacity: 0.35,
        sizeAttenuation: true, depthWrite: false,
      });
      starGroup.add(new THREE.Points(geo, mat));
    }

    const cards: Card[] = [];
    let meshList: THREE.Mesh[] = [];      // hoisted once after build → reused by raycasts
    const raycaster = new THREE.Raycaster();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    // ── Build the sphere of cards ──────────────────────────────────────────
    const build = async () => {
      // Make sure the canvas fonts are ready before drawing card textures.
      await Promise.all([
        document.fonts.load('600 46px "Playfair Display"'),
        document.fonts.load('500 24px "Inter"'),
        document.fonts.load('400 22px "Inter"'),
      ]).catch(() => {});
      await document.fonts.ready;

      // Unique image sources, loaded once and reused.
      const uniqueSrcs = Array.from(new Set(POSTS.map((p) => p.image)));
      const imgMap = new Map<string, HTMLImageElement>();
      await Promise.all(
        uniqueSrcs.map(async (src) => {
          try {
            imgMap.set(src, await loadImage(src));
          } catch {
            /* skip a broken asset */
          }
        }),
      );
      if (disposed) return;

      const geometry = new THREE.PlaneGeometry(CARD_W, CARD_H);
      let idx = 0;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const post = POSTS[idx % POSTS.length];
          const img = imgMap.get(post.image);
          if (!img) { idx++; continue; }

          // Centred grid coordinate (row 0 at the top).
          const cellX = (col - (COLS - 1) / 2) * CELL_W;
          const cellY = ((ROWS - 1) / 2 - row) * CELL_H;

          const texture = new THREE.CanvasTexture(drawCard(post, img));
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = maxAniso;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.generateMipmaps = true;

          const mat = new THREE.MeshBasicMaterial({
            map: texture, transparent: true, side: THREE.FrontSide,
          });
          const mesh = new THREE.Mesh(geometry, mat);
          mesh.position.set(cellX, cellY, -FLAT_DEPTH);
          mesh.userData.index = idx;
          mesh.renderOrder = 1;
          world.add(mesh);

          cards.push({ mesh, cellX, cellY, hover: 0, index: idx, frozen: false });
          idx++;
        }
      }

      if (disposed) return;
      meshList = cards.map((c) => c.mesh);     // stable list — cards never change after build
      setLoading(false);

      // Entrance — opacity-only fade for reduced motion, otherwise rise + scale.
      cards.forEach((card) => ((card.mesh.material as THREE.MeshBasicMaterial).opacity = 0));
      if (reduceMotion) {
        world.scale.setScalar(1);
        gsap.to(meshList.map((m) => m.material), { opacity: 1, duration: 0.5, ease: "power2.out" });
      } else {
        world.scale.setScalar(0.82);
        gsap.to(world.scale, { x: 1, y: 1, z: 1, duration: 1.6, ease: "power3.out" });
        gsap.to(meshList.map((m) => m.material), {
          opacity: 1, duration: 1.2, stagger: { each: 0.012, from: "random" }, ease: "power2.out",
        });
      }
    };

    build().catch((err) => console.warn("[BlogGallery] build failed:", err));

    // ── Interaction: drag to pan the grid (Lenis-style eased pan) ───────────
    const target = { x: 0, y: 0 };     // pan target (world units)
    const pan = { x: 0, y: 0 };        // eased pan
    const vel = { x: 0, y: 0 };        // release inertia
    let curve = 0;                     // 0 = flat grid, 1 = fully curved sphere
    let dragging = false;
    let lastX = 0, lastY = 0;
    let downX = 0, downY = 0, downT = 0;
    let isOpen = false;            // article overlay open → suspend gallery input
    const pointer = new THREE.Vector2(-2, -2);
    let hoveredIndex = -1;

    const setPointerFromEvent = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onDown = (e: PointerEvent) => {
      if (isOpen) return;
      dragging = true;
      lastX = downX = e.clientX;
      lastY = downY = e.clientY;
      downT = performance.now();
      vel.x = 0; vel.y = 0;
      try { renderer.domElement.setPointerCapture(e.pointerId); } catch { /* noop */ }
      renderer.domElement.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      if (isOpen) return;
      setPointerFromEvent(e);
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      // Drag right → grid follows right; drag down → grid follows down.
      target.x += dx * DRAG_SENS;
      target.y -= dy * DRAG_SENS;
      vel.x = dx * DRAG_SENS;
      vel.y = -dy * DRAG_SENS;
    };

    const onUp = (e: PointerEvent) => {
      if (isOpen) return;
      const wasDrag = dragging;
      dragging = false;
      renderer.domElement.style.cursor = "grab";
      try { renderer.domElement.releasePointerCapture(e.pointerId); } catch { /* noop */ }

      const dt = performance.now() - downT;
      const dist = Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY);
      if (wasDrag && dist < 8 && dt < 450) {
        // Treat as a click → select the card under the pointer.
        setPointerFromEvent(e);
        world.updateMatrixWorld(true);     // match the transforms drawn last frame
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(meshList, false)[0];
        if (hit) {
          const index = (hit.object.userData.index as number) ?? -1;
          const card = cards.find((c) => c.index === index);
          if (card) openArticle(card);
        }
      }
    };

    const onLeave = () => {
      pointer.set(-2, -2);     // stop the idle hover raycast once the cursor leaves
      hoveredIndex = -1;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeArticle();
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onDown);
    dom.addEventListener("pointermove", onMove);
    dom.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKeyDown);

    // ── Open / close article ───────────────────────────────────────────────
    let lastOpened: Card | null = null;
    let openTween: gsap.core.Tween | null = null;
    let overlayTween: gsap.core.Tween | null = null;

    const openArticle = (card: Card) => {
      if (isOpen) return;
      isOpen = true;
      dragging = false;
      lastOpened = card;
      card.frozen = true;          // billboard loop stops touching it; GSAP owns it now
      renderer.domElement.style.cursor = "auto";
      const post = POSTS[card.index % POSTS.length];

      if (reduceMotion) {
        // No camera-zoom rush for reduced motion — just crossfade everything out.
        cards.forEach((c) =>
          gsap.to(c.mesh.material, { opacity: 0, duration: 0.3, ease: "power2.out" }),
        );
      } else {
        // Zoom the chosen card toward the camera (along its current radial) while
        // everything else fades away.
        const proxy = { t: 0 };
        const from = card.mesh.position.clone();   // current (rotated) position
        const to = from.clone().multiplyScalar(0.26);
        openTween?.kill();
        openTween = gsap.to(proxy, {
          t: 1, duration: 0.7, ease: "power3.in",
          onUpdate: () => {
            card.mesh.position.lerpVectors(from, to, proxy.t);
            card.mesh.scale.setScalar(1 + proxy.t * 1.5);
            (card.mesh.material as THREE.MeshBasicMaterial).opacity = 1 - proxy.t * proxy.t;
          },
        });
        cards.forEach((c) => {
          if (c === card) return;
          gsap.to(c.mesh.material, { opacity: 0, duration: 0.4, ease: "power2.out" });
        });
        gsap.to(world.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.7, ease: "power2.out" });
      }

      setSelected(post);
    };

    const closeArticle = () => {
      if (!isOpen) return;
      const ov = overlayRef.current;
      openTween?.kill();           // close owns the chosen card from here
      openTween = null;

      // Restore the sphere behind the overlay so it crossfades back in.
      if (lastOpened) {
        lastOpened.mesh.scale.setScalar(1);
        lastOpened.frozen = false;       // hand the transform back to the billboard loop
        lastOpened = null;
      }
      gsap.to(world.scale, { x: 1, y: 1, z: 1, duration: reduceMotion ? 0.3 : 0.9, ease: "power3.out" });
      cards.forEach((c) =>
        gsap.to(c.mesh.material, { opacity: 1, duration: reduceMotion ? 0.3 : 0.8, ease: "power2.out" }),
      );

      const finish = () => {
        if (disposed) return;
        setSelected(null);
        isOpen = false;
        renderer.domElement.style.cursor = "grab";
        const t = triggerRef.current;
        triggerRef.current = null;
        if (t && typeof t.focus === "function") requestAnimationFrame(() => t.focus());
      };
      if (ov) {
        overlayTween = gsap.to(ov, {
          opacity: 0, y: 24, duration: reduceMotion ? 0.2 : 0.45, ease: "power2.in", onComplete: finish,
        });
      } else {
        finish();
      }
    };

    // Keyboard / sr-only list entry point: open the first card showing this post.
    const openByPostIndex = (postIndex: number) => {
      const card = cards.find((c) => c.index % POSTS.length === postIndex);
      if (card) openArticle(card);
    };
    apiRef.current = { open: openByPostIndex, close: closeArticle };

    // ── Render loop ─────────────────────────────────────────────────────────
    const flatPos = new THREE.Vector3();
    const spherePos = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    const lookMat = new THREE.Matrix4();
    const worldUp = new THREE.Vector3(0, 1, 0);
    const qFlat = new THREE.Quaternion();          // identity → flat grid faces the camera
    const qSphere = new THREE.Quaternion();
    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);

      // Release inertia (no clamps — the grid wraps infinitely).
      if (!dragging && !isOpen && (Math.abs(vel.x) > 1e-5 || Math.abs(vel.y) > 1e-5)) {
        target.x += vel.x;
        target.y += vel.y;
        vel.x *= INERTIA_DECAY;
        vel.y *= INERTIA_DECAY;
      }

      // Eased follow → buttery Lenis-like pan.
      pan.x = lerp(pan.x, target.x, FOLLOW);
      pan.y = lerp(pan.y, target.y, FOLLOW);

      // Curve toward a sphere while there's drag motion; relax to flat at rest.
      const moving =
        dragging ||
        Math.abs(target.x - pan.x) + Math.abs(target.y - pan.y) > 0.012 ||
        Math.abs(vel.x) + Math.abs(vel.y) > 0.012;
      const targetCurve = moving && !reduceMotion && !isOpen ? 1 : 0;
      curve = lerp(curve, targetCurve, CURVE_EASE);

      starGroup.rotation.set(pan.y * 0.006, -pan.x * 0.006, 0);   // faint parallax

      for (const card of cards) {
        const want = card.index === hoveredIndex ? 1 : 0;
        card.hover = lerp(card.hover, want, 0.12);
        if (card.frozen) continue;       // GSAP owns this one (opening/closing)

        // Flat, infinitely-wrapping grid position.
        const fx = wrap(card.cellX + pan.x, GRID_W);
        const fy = wrap(card.cellY + pan.y, GRID_H);
        flatPos.set(fx, fy, -FLAT_DEPTH);

        if (curve > 0.001) {
          // Bend the flat plane onto a sphere whose front pole sits at the grid
          // centre — edges recede and bunch inward, giving the globe bulge.
          const dist = Math.hypot(fx, fy);
          const phi = dist / SPHERE_R;
          const nx = dist > 1e-4 ? fx / dist : 0;
          const ny = dist > 1e-4 ? fy / dist : 0;
          const sinp = Math.sin(phi);
          const cosp = Math.cos(phi);
          spherePos.set(
            SPHERE_R * sinp * nx,
            SPHERE_R * sinp * ny,
            -FLAT_DEPTH - SPHERE_R + SPHERE_R * cosp,
          );
          normal.set(sinp * nx, sinp * ny, cosp);   // unit sphere normal (front pole = +Z)
          card.mesh.position.lerpVectors(flatPos, spherePos, curve);

          // Slerp orientation from flat (face camera) to facing along the normal.
          lookTarget.copy(card.mesh.position).sub(normal);
          lookMat.lookAt(card.mesh.position, lookTarget, worldUp);
          qSphere.setFromRotationMatrix(lookMat);
          card.mesh.quaternion.slerpQuaternions(qFlat, qSphere, curve);
        } else {
          card.mesh.position.copy(flatPos);
          card.mesh.quaternion.copy(qFlat);
        }

        // Push everything back as it curves → the gallery "zooms out" into the
        // sphere; a hovered card lifts slightly toward the viewer (camera at origin).
        const hs = (1 - card.hover * 0.05) * (1 + curve * CURVE_ZOOM);
        card.mesh.position.multiplyScalar(hs);
        card.mesh.scale.setScalar(1 + card.hover * 0.07);
      }

      // Hover highlight (desktop, when not dragging/open and the cursor is on-canvas).
      let newHover = -1;
      if (!dragging && !isOpen &&
          pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1) {
        world.updateMatrixWorld(true);     // flush this frame's billboard transforms first
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(meshList, false)[0];
        if (hit) newHover = (hit.object.userData.index as number) ?? -1;
      }
      if (newHover !== hoveredIndex) {
        hoveredIndex = newHover;
        renderer.domElement.style.cursor =
          isOpen ? "auto" : dragging ? "grabbing" : hoveredIndex >= 0 ? "pointer" : "grab";
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(render);

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      W = mount.clientWidth;
      H = mount.clientHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.fov = computeFov(W / H);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      gsap.killTweensOf(world.scale);
      cards.forEach((c) => gsap.killTweensOf(c.mesh.material));
      openTween?.kill();
      overlayTween?.kill();
      dom.removeEventListener("pointerdown", onDown);
      dom.removeEventListener("pointermove", onMove);
      dom.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      cards.forEach((c) => {
        const mat = c.mesh.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      cards[0]?.mesh.geometry.dispose();
      starGroup.traverse((o) => {
        if (o instanceof THREE.Points) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();     // actually release the GL context (dispose() doesn't)
      if (dom.parentElement === mount) mount.removeChild(dom);
      apiRef.current = null;
    };
  }, []);

  // Animate the article overlay in (and run it as an accessible dialog) when a post is selected.
  useEffect(() => {
    if (!selected || !overlayRef.current) return;
    const ov = overlayRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ov.scrollTop = 0;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(ov, { opacity: 1, y: 0 });
        gsap.set(ov.querySelectorAll("[data-reveal]"), { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(ov, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
        gsap.fromTo(
          ov.querySelectorAll("[data-reveal]"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, delay: 0.12, ease: "power3.out" },
        );
      }
    }, ov);

    // Move focus into the dialog and trap Tab within it.
    const focusables = () =>
      Array.from(
        ov.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    ov.addEventListener("keydown", onKey);

    return () => {
      ctx.revert();
      ov.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden bg-ink"
      aria-label="The Career Passport journal — a gallery of stories"
    >
      {/* Gallery chrome — made inert while the article dialog is open */}
      <div className="absolute inset-0" inert={selected ? true : undefined}>
        {/* Ambient backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 38%, rgba(28,34,49,0.65) 0%, rgba(11,14,20,0) 55%), radial-gradient(80% 60% at 50% 120%, rgba(26,77,92,0.28) 0%, rgba(11,14,20,0) 60%)",
          }}
        />

        {/* WebGL mount (decorative — the sr-only list below is the accessible content) */}
        <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{ boxShadow: "inset 0 0 220px 60px rgba(11,14,20,0.85)" }}
        />

        {/* Heading scrim — keeps the H1 legible over whichever card sits behind it */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[8] h-[260px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,14,20,0.72) 0%, rgba(11,14,20,0.35) 45%, rgba(11,14,20,0) 100%)",
          }}
        />

        {/* Heading overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-24 sm:px-10">
          <p className="font-inter text-label-sm uppercase tracking-[0.32em] text-gold/90">
            The Journal
          </p>
          <h1 className="mt-3 max-w-xl font-playfair text-display-md leading-[1.05] text-pearl">
            Notes on a verified
            <span className="italic text-gold"> career</span>
          </h1>
        </div>

        {/* Hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <p className="font-inter text-[0.78rem] uppercase tracking-[0.28em] text-pearl/45">
            Drag to explore · Click a story to read
          </p>
        </div>

        {/* Accessible + crawlable index of every story, and the keyboard entry point.
            Visually hidden, but focusable so the gallery is fully operable without a pointer. */}
        <ul className="sr-only">
          {POSTS.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  apiRef.current?.open(i);
                }}
              >
                {p.title} — {p.category}, {p.readTime}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-pearl/15 border-t-gold" />
          <p className="mt-5 font-inter text-[0.8rem] uppercase tracking-[0.3em] text-pearl/50">
            Composing the journal
          </p>
        </div>
      )}

      {/* Article overlay (intentionally a basic template) */}
      {selected && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-article-title"
          tabIndex={-1}
          className="absolute inset-0 z-40 overflow-y-auto bg-ink outline-none"
        >
          <article className="mx-auto max-w-3xl px-6 pb-28 pt-28 sm:px-8">
            <button
              data-reveal
              onClick={() => apiRef.current?.close()}
              className="group mb-12 inline-flex items-center gap-2 font-inter text-[0.85rem] text-pearl/70 transition-colors hover:text-pearl"
            >
              <span className="text-gold transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to the Journal
            </button>

            <p
              data-reveal
              className="font-inter text-label-sm uppercase tracking-[0.28em] text-gold"
            >
              {selected.category}
            </p>
            <h1
              id="blog-article-title"
              data-reveal
              className="mt-4 font-playfair text-display-lg leading-[1.06] text-pearl"
            >
              {selected.title}
            </h1>
            <div
              data-reveal
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-inter text-[0.9rem] text-pearl/55"
            >
              <span className="text-pearl/80">Career Passport</span>
              <span className="text-pearl/30">·</span>
              <span>{selected.date}</span>
              <span className="text-pearl/30">·</span>
              <span>{selected.readTime}</span>
            </div>

            <div
              data-reveal
              className="mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-12 space-y-7">
              {ARTICLE_BODY.map((para, i) => (
                <p
                  key={i}
                  data-reveal
                  className="font-inter text-body-lg font-light leading-[1.85] text-pearl/80"
                >
                  {para}
                </p>
              ))}
            </div>

            <blockquote
              data-reveal
              className="my-14 border-l-2 border-gold/70 pl-6 font-playfair text-display-md italic leading-[1.25] text-pearl"
            >
              {PULL_QUOTE}
            </blockquote>

            <div data-reveal className="mt-16 border-t border-white/10 pt-10">
              <p className="font-playfair text-display-md text-pearl">
                Own your professional story.
              </p>
              <a
                href="/candidates#waitlist"
                className="mt-6 inline-flex rounded-full bg-blue px-6 py-3 font-inter text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue/90 active:scale-[0.98]"
              >
                Join the Waitlist
              </a>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
