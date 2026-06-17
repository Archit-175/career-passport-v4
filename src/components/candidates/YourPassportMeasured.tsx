"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./YourPassportMeasured.css";

const DIMENSIONS = [
  {
    id: 0,
    label: "Work\nSamples",
    shortLabel: "Work Samples",
    score: 92,
    description:
      "Quality and depth of your delivered output across verified trips",
  },
  {
    id: 1,
    label: "Peer\nSignal",
    shortLabel: "Peer Signal",
    score: 85,
    description:
      "What teammates and collaborators actually say about working with you",
  },
  {
    id: 2,
    label: "Impact\nScore",
    shortLabel: "Impact Score",
    score: 78,
    description:
      "Measurable outcomes and results you've delivered for organisations",
  },
  {
    id: 3,
    label: "Consistency",
    shortLabel: "Consistency",
    score: 88,
    description:
      "Track record of reliable delivery and sustained performance over time",
  },
  {
    id: 4,
    label: "Skill\nBreadth",
    shortLabel: "Skill Breadth",
    score: 72,
    description:
      "Range of verified capabilities demonstrated across different projects",
  },
  {
    id: 5,
    label: "Communication",
    shortLabel: "Communication",
    score: 80,
    description:
      "Clarity, precision, and effectiveness in written and verbal exchange",
  },
  {
    id: 6,
    label: "Initiative",
    shortLabel: "Initiative",
    score: 68,
    description:
      "Proactive contributions and leadership beyond assigned responsibilities",
  },
  {
    id: 7,
    label: "Domain\nDepth",
    shortLabel: "Domain Depth",
    score: 76,
    description:
      "Depth of expertise and specialisation in your core discipline",
  },
];

const SORTED = [...DIMENSIONS].sort((a, b) => b.score - a.score);
const RANKS: Record<number, number> = Object.fromEntries(
  SORTED.map((d, i) => [d.id, i + 1])
);

// SVG radar geometry
const CX = 220;
const CY = 220;
const R = 155;
const N = DIMENSIONS.length;
const AVG_RATIO = 0.27;

function getPoint(idx: number, ratio: number) {
  const angle = (idx / N) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CX + ratio * R * Math.cos(angle),
    y: CY + ratio * R * Math.sin(angle),
  };
}

function toPolygonPoints(ratios: number[]) {
  return ratios
    .map((r, i) => {
      const p = getPoint(i, r);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");
}

// ── RadarChart ───────────────────────────────────────────────

function RadarChart({
  data,
  activeIdx,
  onNodeHover,
  onNodeLeave,
  svgRef,
}: {
  data: typeof DIMENSIONS;
  activeIdx: number | null;
  onNodeHover: (idx: number) => void;
  onNodeLeave: () => void;
  svgRef: React.RefObject<SVGSVGElement | null>;
}) {
  const scoreRatios = data.map((d) => d.score / 100);
  const avgRatios = data.map(() => AVG_RATIO);
  const rings = [0.25, 0.5, 0.75, 1.0];
  const ringLabels = [25, 50, 75, 100];

  // Map the cursor anywhere over the chart to the nearest dimension (Voronoi
  // by angle). This makes the whole chart a continuous hover surface so the
  // detail card glides between dimensions instead of collapsing to the default
  // panel whenever the cursor is between the small node dots.
  const handlePointerMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const vx = ((e.clientX - rect.left) / rect.width) * 440;
    const vy = ((e.clientY - rect.top) / rect.height) * 440;
    const dx = vx - CX;
    const dy = vy - CY;
    // Near dead-centre there is no meaningful "nearest" — keep the last one.
    if (Math.hypot(dx, dy) < 14) return;
    const ang = Math.atan2(dy, dx) + Math.PI / 2; // rotate so "up" = 0
    const idx = ((Math.round((ang / (2 * Math.PI)) * N) % N) + N) % N;
    onNodeHover(idx);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 440 440"
      className="radar-svg"
      aria-label="Career Passport skill radar chart"
      onMouseMove={handlePointerMove}
      onMouseLeave={onNodeLeave}
    >
      {/* Concentric grid rings */}
      {rings.map((ratio, ri) => (
        <polygon
          key={ri}
          points={toPolygonPoints(data.map(() => ratio))}
          fill="none"
          stroke={
            ri === rings.length - 1
              ? "rgba(245,242,236,0.1)"
              : "rgba(245,242,236,0.04)"
          }
          strokeWidth={ri === rings.length - 1 ? 1 : 0.5}
        />
      ))}

      {/* Ring value labels */}
      {ringLabels.map((val, ri) => (
        <text
          key={ri}
          x={CX + 4}
          y={(CY - rings[ri] * R - 4).toFixed(2)}
          fill="rgba(245,242,236,0.2)"
          fontSize="7"
          fontFamily="var(--font-inter)"
          fontWeight="300"
        >
          {val}
        </text>
      ))}

      {/* Axis spokes */}
      {data.map((_, i) => {
        const outer = getPoint(i, 1.0);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={outer.x.toFixed(2)}
            y2={outer.y.toFixed(2)}
            stroke={
              activeIdx === i
                ? "rgba(201,168,76,0.2)"
                : "rgba(245,242,236,0.06)"
            }
            strokeWidth={activeIdx === i ? 1 : 0.5}
            style={{ transition: "stroke 0.25s ease" }}
          />
        );
      })}

      {/* Industry average — dashed baseline */}
      <polygon
        points={toPolygonPoints(avgRatios)}
        fill="rgba(245,242,236,0.02)"
        stroke="rgba(245,242,236,0.18)"
        strokeWidth={1}
        strokeDasharray="3 5"
      />

      {/* Passport score polygon — animated grow-in */}
      <motion.polygon
        points={toPolygonPoints(scoreRatios)}
        fill="rgba(201,168,76,0.07)"
        stroke="#C9A84C"
        strokeWidth={1.5}
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Interactive score dots */}
      {data.map((d, i) => {
        const pt = getPoint(i, d.score / 100);
        const isActive = activeIdx === i;
        return (
          <g key={i}>
            {/* Outer pulse ring on active */}
            <AnimatePresence>
              {isActive && (
                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  r={16}
                  fill="rgba(201,168,76,0.08)"
                  stroke="rgba(201,168,76,0.22)"
                  strokeWidth={1}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {/* Hit area (invisible, larger touch target) */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r={18}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onNodeHover(i)}
              onMouseLeave={onNodeLeave}
            />

            <motion.circle
              cx={pt.x}
              cy={pt.y}
              r={isActive ? 6 : 4.5}
              fill={isActive ? "#C9A84C" : "rgba(201,168,76,0.8)"}
              stroke={isActive ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.3)"}
              strokeWidth={isActive ? 2 : 1.5}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5 + i * 0.06,
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{ pointerEvents: "none" }}
            />
          </g>
        );
      })}

      {/* Axis labels */}
      {data.map((d, i) => {
        const labelPt = getPoint(i, 1.28);
        let anchor: "start" | "middle" | "end" = "middle";
        if (Math.abs(labelPt.x - CX) > 10) {
          anchor = labelPt.x > CX ? "start" : "end";
        }
        const lines = d.label.split("\n");
        const isActive = activeIdx === i;
        return (
          <text
            key={i}
            x={labelPt.x.toFixed(2)}
            y={labelPt.y.toFixed(2)}
            textAnchor={anchor}
            dominantBaseline="middle"
            fill={isActive ? "rgba(201,168,76,0.9)" : "rgba(245,242,236,0.38)"}
            fontSize="9"
            fontFamily="var(--font-inter)"
            fontWeight={isActive ? "400" : "300"}
            letterSpacing="0.02em"
            style={{ transition: "fill 0.25s ease", cursor: "pointer" }}
            onMouseEnter={() => onNodeHover(i)}
            onMouseLeave={onNodeLeave}
          >
            {lines.map((line, li) => (
              <tspan
                key={li}
                x={labelPt.x.toFixed(2)}
                dy={
                  li === 0
                    ? lines.length > 1
                      ? "-0.55em"
                      : "0"
                    : "1.25em"
                }
              >
                {line}
              </tspan>
            ))}
          </text>
        );
      })}

      {/* Centre dot */}
      <circle cx={CX} cy={CY} r={3} fill="rgba(201,168,76,0.2)" />
    </svg>
  );
}

// ── DimensionDetailCard — shown on right when node is hovered ─

function DimensionDetailCard({ item }: { item: (typeof DIMENSIONS)[number] }) {
  const rank = RANKS[item.id];
  const scorePercent = item.score;
  const avgPercent = Math.round(AVG_RATIO * 100);

  return (
    <motion.div
      className="ypm-detail-card"
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Rank badge */}
      <span className="ypm-detail-card__rank font-inter">
        #{String(rank).padStart(2, "0")}
      </span>

      {/* Name */}
      <h3 className="ypm-detail-card__name font-playfair">
        {item.shortLabel}
      </h3>

      {/* Big score */}
      <div className="ypm-detail-card__score-row">
        <span className="ypm-detail-card__score font-inter">
          {scorePercent}
        </span>
        <span className="ypm-detail-card__score-unit font-inter">/100</span>
      </div>

      {/* Progress bar */}
      <div className="ypm-detail-card__bar-wrap">
        {/* Industry avg marker */}
        <div
          className="ypm-detail-card__avg-marker"
          style={{ left: `${avgPercent}%` }}
        >
          <span className="ypm-detail-card__avg-label font-inter">
            Avg {avgPercent}
          </span>
        </div>
        {/* Track */}
        <div className="ypm-detail-card__bar-track">
          <motion.div
            className="ypm-detail-card__bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${scorePercent}%` }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="ypm-detail-card__desc font-inter">{item.description}</p>

      {/* Divider */}
      <span className="ypm-detail-card__divider" />

      {/* Comparison */}
      <p className="ypm-detail-card__compare font-inter">
        <span className="ypm-detail-card__compare-delta">
          +{scorePercent - avgPercent}
        </span>{" "}
        above industry average
      </p>
    </motion.div>
  );
}

// ── Default right panel — shown when nothing is hovered ───────

function DefaultPanel() {
  return (
    <motion.div
      key="default"
      className="ypm-default-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="ypm-default-panel__dims">
        {DIMENSIONS.map((d) => (
          <span key={d.id} className="ypm-default-panel__dim font-inter">
            {d.shortLabel}
          </span>
        ))}
      </div>
      <p className="ypm-default-panel__hint font-inter">
        Hover a node to explore each dimension
      </p>
    </motion.div>
  );
}

// ── YourPassportMeasured ─────────────────────────────────────

export function YourPassportMeasured() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleNodeHover = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  const handleNodeLeave = useCallback(() => {
    setActiveIdx(null);
  }, []);

  const activeItem = activeIdx !== null ? DIMENSIONS[activeIdx] : null;

  return (
    <section className="ypm-section" id="passport-measured">
      {/* Grid layout (named areas): desktop = chart left + [header/content] right;
          mobile/tablet stacks as text intro → radar → hover/detail block. */}
      <div className="ypm-layout">
        {/* ── Header (text intro — first on mobile) ── */}
        <div className="ypm-header">
          <motion.span
            className="ypm-eyebrow"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Your Passport, Measured
          </motion.span>
          <motion.h2
            className="ypm-headline font-playfair"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            How recruiters{" "}
            <em className="ypm-headline__em">read</em> your passport
          </motion.h2>
          <motion.p
            className="ypm-subhead font-inter"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            Eight dimensions. Every score built from verified work.
          </motion.p>
        </div>

        {/* ── Radar chart (the web structure) ── */}
        <motion.div
          className="ypm-chart-col"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <RadarChart
            data={DIMENSIONS}
            activeIdx={activeIdx}
            onNodeHover={handleNodeHover}
            onNodeLeave={handleNodeLeave}
            svgRef={svgRef}
          />

          {/* Legend */}
          <div className="ypm-legend">
            <span className="ypm-legend__item">
              <span className="ypm-legend__line ypm-legend__line--avg" />
              <span className="font-inter">Industry avg</span>
            </span>
            <span className="ypm-legend__item">
              <span className="ypm-legend__line ypm-legend__line--you" />
              <span className="font-inter">Your passport</span>
            </span>
          </div>
        </motion.div>

        {/* ── Hover/detail block (dimension card + trip CTA) ── */}
        <motion.div
          className="ypm-content-col"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Dynamic card area */}
          <div className="ypm-card-area">
            <AnimatePresence mode="wait">
              {activeItem ? (
                <DimensionDetailCard key="detail" item={activeItem} />
              ) : (
                <DefaultPanel key="default" />
              )}
            </AnimatePresence>
          </div>

          {/* Trip CTA */}
          <motion.div
            className="ypm-trip-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="ypm-trip-cta__divider" />
            <p className="ypm-trip-cta__text font-inter">
              Scores are built from verified{" "}
              <strong className="ypm-trip-cta__strong">Trips</strong>.{" "}
              <Link href="/trips" className="ypm-trip-cta__link">
                What&apos;s a Trip? →
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
