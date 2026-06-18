"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

/* ── Public types ──────────────────────────────────────────────── */
export interface GlobeMarker {
  /** Latitude in degrees (−90…90). */
  lat: number;
  /** Longitude in degrees (−180…180). */
  lon: number;
  /** ISO-A3 country id present in /public/data/countries.geo.json (e.g. "USA"). */
  countryId: string;
}

/** Per-frame screen projection of a marker, in canvas-local CSS pixels. */
export interface MarkerScreen {
  x: number;
  y: number;
  /** 0 = on the far hemisphere (hidden), 1 = clearly front-facing. */
  front: number;
}

interface WireframeGlobeProps {
  markers: GlobeMarker[];
  /** Index of the hovered item, or null. Drives the focus tween + highlight. */
  activeIndex: number | null;
  /** Called every frame with the 4 marker screen positions (canvas-local px). */
  onProject?: (positions: MarkerScreen[]) => void;
  className?: string;
}

/* ── Tunables ──────────────────────────────────────────────────── */
const GLOBE_R = 1;
const R_BORDER = 1.002; // lift borders just off the sphere to avoid z-fighting
const R_MARKER = 1.012;
const R_OCCLUDER = 0.985; // opaque black sphere → hides far-hemisphere lines
const GRAT_STEP = 15; // graticule every 15° lat & lon
const GRAT_SEG = 90; // samples per graticule ring
const CAM_FOV = 34;
const CAM_Z = 3.35;
const AUTO_ROT = 0.0016; // rad / frame idle spin
const DRAG_SENS = 0.0065; // pointer px → rad
const INERTIA_DECAY = 0.94;

const GREEN = 0xa3c940;
const GREEN_HI = 0xc7e36b;

const FRONT = new THREE.Vector3(0, 0.06, 1).normalize();

/* ── lat/lon → point on a sphere ───────────────────────────────── */
function latLonToVec3(latDeg: number, lonDeg: number, r = GLOBE_R): THREE.Vector3 {
  const phi = ((90 - latDeg) * Math.PI) / 180; // polar angle from +Y
  const theta = ((lonDeg + 180) * Math.PI) / 180; // azimuth
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/* ── Radial-gradient glow sprite texture (shared) ─────────────── */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(220,240,170,0.85)");
  g.addColorStop(0.5, "rgba(163,201,64,0.35)");
  g.addColorStop(1, "rgba(163,201,64,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function WireframeGlobe({ markers, activeIndex, onProject, className }: WireframeGlobeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  // Keep latest callback / props without re-running the build effect.
  const onProjectRef = useRef(onProject);
  onProjectRef.current = onProject;
  const apiRef = useRef<{ setActive: (i: number | null) => void } | null>(null);

  /* ── Build the scene once ───────────────────────────────────── */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    // Defer real WebGL init by one frame. React StrictMode (dev) mounts →
    // immediately unmounts → remounts; without this the throwaway mount creates
    // a context that cleanup force-loses right before the real mount, and the
    // browser then blocks the new context ("caused context loss and was
    // blocked"). Deferring lets the throwaway pass cancel before any GL work.
    const start = (): (() => void) => {
      let disposed = false;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = mount.clientWidth || 1;
    let H = mount.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      cursor: "grab",
      touchAction: "none",
    });
    mount.appendChild(renderer.domElement);
    const dom = renderer.domElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAM_FOV, W / H, 0.1, 100);
    camera.position.set(0, 0, CAM_Z);
    camera.lookAt(0, 0, 0);

    // Everything that rotates lives on this group.
    const globe = new THREE.Group();
    scene.add(globe);

    // Initial orientation → Africa / Europe facing front (matches the reference).
    globe.quaternion.setFromUnitVectors(latLonToVec3(12, 6).normalize(), FRONT);

    /* — Opaque occluder so the far-side wireframe is hidden — */
    const occluder = new THREE.Mesh(
      new THREE.SphereGeometry(R_OCCLUDER, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    );
    globe.add(occluder);

    /* — Graticule (lat rings + lon meridians) — */
    const gratPos: number[] = [];
    for (let lat = -75; lat <= 75; lat += GRAT_STEP) {
      for (let s = 0; s < GRAT_SEG; s++) {
        const a = latLonToVec3(lat, (s / GRAT_SEG) * 360 - 180);
        const b = latLonToVec3(lat, ((s + 1) / GRAT_SEG) * 360 - 180);
        gratPos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    for (let lon = -180; lon < 180; lon += GRAT_STEP) {
      for (let s = 0; s < GRAT_SEG; s++) {
        const a = latLonToVec3((s / GRAT_SEG) * 180 - 90, lon);
        const b = latLonToVec3(((s + 1) / GRAT_SEG) * 180 - 90, lon);
        gratPos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const gratGeo = new THREE.BufferGeometry();
    gratGeo.setAttribute("position", new THREE.Float32BufferAttribute(gratPos, 3));
    const gratMat = new THREE.LineBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.13,
      depthWrite: false,
    });
    globe.add(new THREE.LineSegments(gratGeo, gratMat));

    /* — Markers — */
    const glowTex = makeGlowTexture();
    interface MarkerObj {
      localDir: THREE.Vector3;
      group: THREE.Group;
      core: THREE.Mesh;
      coreMat: THREE.MeshBasicMaterial;
      glow: THREE.Sprite;
      glowMat: THREE.SpriteMaterial;
      baseGlow: number;
      hover: number;
    }
    const markerObjs: MarkerObj[] = markers.map((m) => {
      const pos = latLonToVec3(m.lat, m.lon, R_MARKER);
      const group = new THREE.Group();
      group.position.copy(pos);

      const coreMat = new THREE.MeshBasicMaterial({ color: GREEN, transparent: true });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 16), coreMat);
      group.add(core);

      const glowMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: GREEN,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Sprite(glowMat);
      const baseGlow = 0.17;
      glow.scale.setScalar(baseGlow);
      group.add(glow);

      globe.add(group);
      return {
        localDir: pos.clone().normalize(),
        group,
        core,
        coreMat,
        glow,
        glowMat,
        baseGlow,
        hover: 0,
      };
    });

    /* — Country borders: batch the world + isolate the 4 hero countries — */
    const HI_IDS = new Set(markers.map((m) => m.countryId));
    const hiMatByIndex: (THREE.LineBasicMaterial | null)[] = markers.map(() => null);

    const build = async () => {
      let fc: { features: GeoFeature[] };
      try {
        const res = await fetch("/data/countries.geo.json");
        fc = await res.json();
      } catch {
        return; // border layer is decorative — fail silently if asset missing
      }
      if (disposed) return;

      const batchPos: number[] = [];
      const hiPos: Record<string, number[]> = {};

      const pushRing = (ring: number[][], target: number[]) => {
        for (let k = 1; k < ring.length; k++) {
          const a = ring[k - 1];
          const b = ring[k];
          if (Math.abs(a[0] - b[0]) > 180) continue; // antimeridian seam guard
          const va = latLonToVec3(a[1], a[0], R_BORDER);
          const vb = latLonToVec3(b[1], b[0], R_BORDER);
          target.push(va.x, va.y, va.z, vb.x, vb.y, vb.z);
        }
      };

      for (const f of fc.features) {
        const id = f.id;
        const isHi = typeof id === "string" && HI_IDS.has(id);
        const target = isHi ? (hiPos[id as string] ||= []) : batchPos;
        const geom = f.geometry;
        if (geom.type === "Polygon") {
          for (const ring of geom.coordinates as number[][][]) pushRing(ring, target);
        } else if (geom.type === "MultiPolygon") {
          for (const poly of geom.coordinates as number[][][][])
            for (const ring of poly) pushRing(ring, target);
        }
      }

      if (disposed) return;

      const batchGeo = new THREE.BufferGeometry();
      batchGeo.setAttribute("position", new THREE.Float32BufferAttribute(batchPos, 3));
      const batchMat = new THREE.LineBasicMaterial({
        color: GREEN,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
      });
      globe.add(new THREE.LineSegments(batchGeo, batchMat));
      buildCleanup.push(() => {
        batchGeo.dispose();
        batchMat.dispose();
      });

      markers.forEach((m, i) => {
        const pos = hiPos[m.countryId];
        if (!pos) return;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        const mat = new THREE.LineBasicMaterial({
          color: GREEN,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        });
        globe.add(new THREE.LineSegments(geo, mat));
        hiMatByIndex[i] = mat;
        buildCleanup.push(() => {
          geo.dispose();
          mat.dispose();
        });
      });

      // Apply whatever highlight state arrived before borders finished loading.
      applyHighlight(currentActive, true);
    };
    const buildCleanup: Array<() => void> = [];

    /* ── Orientation state (quaternion-driven) ──────────────────── */
    let velX = 0; // angular velocity around world X (drag inertia)
    let velY = 0; // around world Y
    let dragging = false;
    let focused = false;
    let currentActive: number | null = activeIndex;

    const _axisX = new THREE.Vector3(1, 0, 0);
    const _axisY = new THREE.Vector3(0, 1, 0);
    const _q = new THREE.Quaternion();
    const rotateWorld = (axis: THREE.Vector3, angle: number) => {
      if (!angle) return;
      _q.setFromAxisAngle(axis, angle);
      globe.quaternion.premultiply(_q).normalize();
    };

    /* ── Focus tween + country highlight ───────────────────────── */
    const focusProxy = { t: 0 };
    let focusTween: gsap.core.Tween | null = null;
    const baseColor = new THREE.Color(GREEN);
    const hiColor = new THREE.Color(GREEN_HI);

    const applyHighlight = (i: number | null, instant = false) => {
      hiMatByIndex.forEach((mat, idx) => {
        if (!mat) return;
        const on = idx === i;
        const targetOpacity = on ? 0.95 : 0.5;
        const tc = on ? hiColor : baseColor;
        if (instant || reduceMotion) {
          mat.opacity = targetOpacity;
          mat.color.copy(tc);
        } else {
          gsap.to(mat, { opacity: targetOpacity, duration: 0.4, ease: "power2.out" });
          gsap.to(mat.color, { r: tc.r, g: tc.g, b: tc.b, duration: 0.4, ease: "power2.out" });
        }
      });
    };

    const setActive = (i: number | null) => {
      currentActive = i;
      applyHighlight(i);
      focusTween?.kill();
      if (i === null) {
        focused = false;
        return;
      }
      if (reduceMotion) {
        focused = false; // static view; highlight only
        return;
      }
      focused = true;
      velX = velY = 0;
      const target = new THREE.Quaternion().setFromUnitVectors(markerObjs[i].localDir, FRONT);
      const startQ = globe.quaternion.clone();
      focusProxy.t = 0;
      focusTween = gsap.to(focusProxy, {
        t: 1,
        duration: 1.0,
        ease: "power3.out",
        onUpdate: () => {
          globe.quaternion.copy(startQ).slerp(target, focusProxy.t);
        },
      });
    };
    apiRef.current = { setActive };

    /* ── Pointer drag (rotate) ──────────────────────────────────── */
    let lastX = 0;
    let lastY = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      focused = false;
      focusTween?.kill();
      lastX = e.clientX;
      lastY = e.clientY;
      velX = velY = 0;
      try {
        dom.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      dom.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = dx * DRAG_SENS;
      velX = dy * DRAG_SENS;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      dom.style.cursor = "grab";
      try {
        dom.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };

    dom.addEventListener("pointerdown", onDown);
    dom.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    /* ── Resize ─────────────────────────────────────────────────── */
    const onResize = () => {
      W = mount.clientWidth || 1;
      H = mount.clientHeight || 1;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    /* ── Entrance ───────────────────────────────────────────────── */
    if (!reduceMotion) {
      globe.scale.setScalar(0.86);
      gsap.to(globe.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: "power3.out" });
    }

    /* ── Render loop ────────────────────────────────────────────── */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const _world = new THREE.Vector3();
    const _proj = new THREE.Vector3();
    const _normal = new THREE.Vector3();
    const _camDir = new THREE.Vector3();
    const screenOut: MarkerScreen[] = markers.map(() => ({ x: 0, y: 0, front: 0 }));
    let raf = 0;
    let t = 0;

    const render = () => {
      raf = requestAnimationFrame(render);
      t += 1;

      if (!focused) {
        if (dragging) {
          rotateWorld(_axisY, velY);
          rotateWorld(_axisX, velX);
        } else {
          velX *= INERTIA_DECAY;
          velY *= INERTIA_DECAY;
          rotateWorld(_axisY, velY + (reduceMotion ? 0 : AUTO_ROT));
          rotateWorld(_axisX, velX);
        }
      }

      globe.updateMatrixWorld(true);

      const anyActive = currentActive !== null;
      for (let i = 0; i < markerObjs.length; i++) {
        const m = markerObjs[i];
        const want = currentActive === i ? 1 : 0;
        m.hover = lerp(m.hover, want, 0.14);
        const dim = anyActive && currentActive !== i ? 0.28 : 1;
        let scale = m.baseGlow * (1 + m.hover * 0.95);
        // Gentle continuous breathing so the points always feel alive.
        if (!reduceMotion) scale += m.baseGlow * 0.16 * Math.sin(t * 0.045 + i * 2.1);
        m.glow.scale.setScalar(scale);
        m.glowMat.opacity = (0.62 + m.hover * 0.38) * dim;
        m.coreMat.opacity = 0.9 * dim + m.hover * 0.1;

        // Project to canvas-local pixels + front/back visibility.
        _world.copy(m.localDir).multiplyScalar(R_MARKER).applyMatrix4(globe.matrixWorld);
        _normal.copy(_world).normalize();
        _camDir.copy(_world).sub(camera.position).normalize();
        const facing = _normal.dot(_camDir); // <0 → front
        const front = THREE.MathUtils.clamp((0.12 - facing) / 0.24, 0, 1);
        _proj.copy(_world).project(camera);
        screenOut[i].x = (_proj.x * 0.5 + 0.5) * W;
        screenOut[i].y = (-_proj.y * 0.5 + 0.5) * H;
        screenOut[i].front = front * (front * (3 - 2 * front)); // smoothstep
      }
      onProjectRef.current?.(screenOut);

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(render);
    void build();

    /* ── Cleanup (mirrors BlogGallery) ──────────────────────────── */
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      focusTween?.kill();
      gsap.killTweensOf(globe.scale);
      gsap.killTweensOf(focusProxy);
      hiMatByIndex.forEach((mat) => {
        if (mat) {
          gsap.killTweensOf(mat);
          gsap.killTweensOf(mat.color);
        }
      });
      ro.disconnect();
      dom.removeEventListener("pointerdown", onDown);
      dom.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);

      gratGeo.dispose();
      gratMat.dispose();
      occluder.geometry.dispose();
      (occluder.material as THREE.Material).dispose();
      markerObjs.forEach((m) => {
        m.core.geometry.dispose();
        m.coreMat.dispose();
        m.glowMat.dispose();
      });
      glowTex.dispose();
      buildCleanup.forEach((fn) => fn());

      renderer.dispose();
      renderer.forceContextLoss();
      if (dom.parentElement === mount) mount.removeChild(dom);
      apiRef.current = null;
    };
    }; // end start()

    const startRaf = requestAnimationFrame(() => {
      if (cancelled) return;
      teardown = start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(startRaf);
      teardown?.();
    };
    // Build once; activeIndex is pushed in imperatively below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  /* ── Push hover state into the engine without rebuilding ──────── */
  useEffect(() => {
    apiRef.current?.setActive(activeIndex);
  }, [activeIndex]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}

/* ── Minimal GeoJSON typing for the borders file ──────────────── */
interface GeoFeature {
  id?: string | number;
  geometry: { type: string; coordinates: unknown };
}
