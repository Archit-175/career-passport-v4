"use client";

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
  { lat: 20.5937, lon: 78.9629, countryId: "IND" },
  { lat: 40.7128, lon: -74.006, countryId: "USA" },
];

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
  return (
    <section id="globe" className="gv-section">
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

          {/* ── Numbered steps ── */}
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
