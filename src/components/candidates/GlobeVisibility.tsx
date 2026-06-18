"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { WireframeGlobe, type GlobeMarker } from "./WireframeGlobe";
import "./GlobeVisibility.css";

/* ── Content ────────────────────────────────────────────────────── */
interface Loc {
  num: string;
  coord: [string, string];
  title: string;
  desc: string;
}

const LOCATIONS: Loc[] = [
  {
    num: "01",
    coord: ["40.7128°N", "74.0060°W"],
    title: "Connect your signals",
    desc: "Import what already exists: LinkedIn, CV, project docs.",
  },
  {
    num: "02",
    coord: ["51.5074°N", "0.1278°W"],
    title: "Take a Trip",
    desc: "Curated sessions that capture your actual thinking in real time.",
  },
  {
    num: "03",
    coord: ["35.6895°N", "139.6917°E"],
    title: "Proof is generated",
    desc: "Every Trip produces structured artifacts which can't be faked.",
  },
  {
    num: "04",
    coord: ["33.8688°S", "151.2093°E"],
    title: "Earn stamps. Build your passport.",
    desc: "Each stamp adds depth. Your passport grows with every proof.",
  },
];

const GLOBE_MARKERS: GlobeMarker[] = [
  { lat: 40.7128, lon: -74.006, countryId: "USA" },
  { lat: 35.6895, lon: 139.6917, countryId: "JPN" },
];

const CYCLE_MS = 2200;
const CYCLE_START_MS = 900;

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
  const manualRef = useRef(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

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

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (!manualRef.current && inViewRef.current) {
        setActiveIndex(i);
        i = (i + 1) % LOCATIONS.length;
      }
      timer = setTimeout(step, CYCLE_MS);
    };
    timer = setTimeout(step, CYCLE_START_MS);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <section ref={sectionRef} id="globe" className="gv-section">
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
              We <em>listen</em> to you, <em>nudge</em> you and{" "}
              <em>build</em> your identity.
            </motion.h2>
            <motion.p className="gv-subhead" variants={fadeUp} custom={0.16}>
              Speak honestly about who you are and where you want to go. We
              turn that into verified proof.
            </motion.p>
          </motion.div>

          {/* ── Globe ── */}
          <div className="gv-globe-wrap">
            <WireframeGlobe
              className="gv-globe-canvas"
              markers={GLOBE_MARKERS}
              activeIndex={null}
            />
          </div>

          {/* ── Button — sits below the globe ── */}
          <motion.div
            className="gv-btn-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.a
              href="/trips"
              className="gv-trip-btn"
              variants={fadeUp}
              custom={0.1}
            >
              What&rsquo;s a Trip?
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7h9M8 3.5 11.5 7 8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Numbered steps — glow one by one ── */}
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
                className={`gv-item${activeIndex === i ? " gv-item--active" : ""}`}
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
                  <span className="gv-item__title">{loc.title}</span>
                  <span className="gv-item__desc" style={{ display: "block" }}>
                    {loc.desc}
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
