"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { WireframeGlobe, type GlobeMarker, type MarkerScreen } from "./WireframeGlobe";
import "./GlobeVisibility.css";

/* ── Content (matches the reference) ───────────────────────────── */
interface Loc {
  num: string;
  coord: [string, string];
  title: string;
  desc: string;
  lat: number;
  lon: number;
  countryId: string;
}

const LOCATIONS: Loc[] = [
  {
    num: "01",
    coord: ["40.7128°N", "74.0060°W"],
    title: "Connect your signals",
    desc: "Import what already exists: LinkedIn, CV, project docs.",
    lat: 40.7128,
    lon: -74.006,
    countryId: "USA",
  },
  {
    num: "02",
    coord: ["51.5074°N", "0.1278°W"],
    title: "Take a Trip",
    desc: "Curated sessions that capture your actual thinking in real time.",
    lat: 51.5074,
    lon: -0.1278,
    countryId: "GBR",
  },
  {
    num: "03",
    coord: ["35.6895°N", "139.6917°E"],
    title: "Proof is generated",
    desc: "Every Trip produces structured artifacts which can't be faked.",
    lat: 35.6895,
    lon: 139.6917,
    countryId: "JPN",
  },
  {
    num: "04",
    coord: ["33.8688°S", "151.2093°E"],
    title: "Earn stamps. Build your passport.",
    desc: "Each stamp adds depth. Your passport grows with every proof.",
    lat: -33.8688,
    lon: 151.2093,
    countryId: "AUS",
  },
];

// Stable reference so the WebGL build effect runs only once.
const MARKERS: GlobeMarker[] = LOCATIONS.map((l) => ({
  lat: l.lat,
  lon: l.lon,
  countryId: l.countryId,
}));

const CYCLE_MS = 2800; // dwell on each item before advancing
const CYCLE_START_MS = 1100; // let the entrance settle first

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

export function GlobeVisibility() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const globeWrapRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  // Section-relative geometry, refreshed on layout changes (not per frame).
  const anchorsRef = useRef<{ x: number; y: number }[]>([]);
  const canvasOffsetRef = useRef<{ x: number; y: number } | null>(null);
  // Per-frame state read by the (stable) projection callback.
  const activeRef = useRef<number | null>(null);
  activeRef.current = activeIndex;
  const emphRef = useRef<number[]>(LOCATIONS.map(() => 0));
  // Auto-cycle coordination.
  const manualRef = useRef(false); // user is hovering → pause auto-cycle
  const inViewRef = useRef(false); // only cycle while the section is visible

  /* ── prefers-reduced-motion ─────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  /* ── Only auto-cycle while in view ──────────────────────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ── Auto-cycle 1 → 2 → 3 → 4 → … (paused while hovering) ────── */
  useEffect(() => {
    if (reduced) return; // honour reduced motion: no auto-advance
    let auto = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (!manualRef.current && inViewRef.current) {
        setActiveIndex(auto);
        auto = (auto + 1) % LOCATIONS.length;
      }
      timer = setTimeout(step, CYCLE_MS);
    };
    timer = setTimeout(step, CYCLE_START_MS);
    return () => clearTimeout(timer);
  }, [reduced]);

  /* ── Measure DOM anchors + canvas offset (layout-time) ──────── */
  const measure = useCallback(() => {
    const section = sectionRef.current;
    const wrap = globeWrapRef.current;
    if (!section || !wrap) return;
    const sr = section.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    canvasOffsetRef.current = { x: wr.left - sr.left, y: wr.top - sr.top };
    anchorsRef.current = titleRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.right - sr.left + 14, y: r.top - sr.top + r.height / 2 };
    });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => ro.disconnect();
  }, [measure]);

  /* ── Per-frame: one connector line follows the active marker ── */
  const handleProject = useCallback((positions: MarkerScreen[]) => {
    const off = canvasOffsetRef.current;
    const anchors = anchorsRef.current;
    if (!off) return;
    const active = activeRef.current;
    const emph = emphRef.current;
    for (let i = 0; i < positions.length; i++) {
      const line = lineRefs.current[i];
      const dot = dotRefs.current[i];
      const a = anchors[i];
      const p = positions[i];
      if (!line || !a) continue;
      // Ease each line's emphasis so the active connector cross-fades in
      // and the previous one fades out — no abrupt swaps.
      emph[i] += ((active === i ? 1 : 0) - emph[i]) * 0.12;
      const x2 = off.x + p.x;
      const y2 = off.y + p.y;
      line.setAttribute("x1", String(a.x));
      line.setAttribute("y1", String(a.y));
      line.setAttribute("x2", String(x2));
      line.setAttribute("y2", String(y2));
      const op = p.front * emph[i];
      line.style.opacity = String(op);
      line.style.strokeWidth = (1 + emph[i] * 0.6).toFixed(2);
      if (dot) {
        dot.setAttribute("cx", String(x2));
        dot.setAttribute("cy", String(y2));
        dot.setAttribute("r", (2.4 + emph[i] * 1.4).toFixed(2));
        dot.style.opacity = String(op);
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="gv-section">
      <div className="gv-inner">
        <div className="gv-layout">
          {/* ── Intro ── */}
          <motion.div
            className="gv-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p className="gv-eyebrow" variants={fadeUp} custom={0}>
              How Visibility Works
            </motion.p>
            <motion.h2 className="gv-headline" variants={fadeUp} custom={0.08}>
              We listen to you, nudge you and build your identity.
            </motion.h2>
            <motion.p className="gv-subhead" variants={fadeUp} custom={0.16}>
              Honestly talk about who you are and what your aspirations are.
            </motion.p>
          </motion.div>

          {/* ── Globe ── */}
          <div ref={globeWrapRef} className="gv-globe-wrap">
            <WireframeGlobe
              className="gv-globe-canvas"
              markers={MARKERS}
              activeIndex={activeIndex}
              onProject={handleProject}
            />
          </div>

          {/* ── Numbered items ── */}
          <motion.div
            className="gv-items"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {LOCATIONS.map((loc, i) => (
              <motion.button
                key={loc.num}
                type="button"
                className="gv-item"
                variants={fadeUp}
                custom={0.1 + i * 0.08}
                onMouseEnter={() => {
                  manualRef.current = true;
                  setActiveIndex(i);
                }}
                onMouseLeave={() => {
                  manualRef.current = false;
                }}
                onFocus={() => {
                  manualRef.current = true;
                  setActiveIndex(i);
                }}
                onBlur={() => {
                  manualRef.current = false;
                }}
                aria-label={`${loc.title}. ${loc.desc}`}
              >
                <span className="gv-item__num">{loc.num}</span>
                <span className="gv-item__rule" aria-hidden="true" />
                <span className="gv-item__coord">
                  {loc.coord[0]}
                  <br />
                  {loc.coord[1]}
                </span>
                <span className="gv-item__body">
                  <span
                    className="gv-item__title"
                    ref={(el) => {
                      titleRefs.current[i] = el;
                    }}
                  >
                    {loc.title}
                  </span>
                  <span className="gv-item__desc" style={{ display: "block" }}>
                    {loc.desc}
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* ── Connector overlay (desktop only; CSS hides ≤900px) ── */}
        <svg className="gv-connectors" aria-hidden="true">
          {LOCATIONS.map((loc, i) => (
            <g key={loc.num}>
              <line
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
              />
              <circle
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
