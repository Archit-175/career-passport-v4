"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// ── INLINED: LoopingWord ──
// Cycles through `words` with a rise-and-fade swap using GSAP.
// Reserves width of the longest word so the layout never shifts.

interface LoopingWordProps {
  words: string[];
  hold?: number; // seconds each word holds (default 2)
  className?: string;
}

const LoopingWord: React.FC<LoopingWordProps> = ({ words, hold = 2, className }) => {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (words.length <= 1) return;
    let alive = true;
    const id = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        opacity: 0,
        yPercent: -45,
        duration: 0.34,
        ease: "power2.in",
        onComplete: () => {
          if (alive) setIdx((i) => (i + 1) % words.length);
        },
      });
    }, hold * 1000);
    return () => { alive = false; clearInterval(id); };
  }, [words, hold]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, yPercent: 55 }, { opacity: 1, yPercent: 0, duration: 0.55, ease: "power3.out" });
  }, [idx]);

  return (
    <span className={`loop-word ${className ?? ""}`} style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden", pointerEvents: "none", display: "inline-block" }}>
        {longestWord}
      </span>
      <span style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
        <span ref={ref} className="loop-word__item" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {words[idx]}
        </span>
      </span>
    </span>
  );
};

// ── INLINED: useReveal ──
// Adds `.in` class when the element enters the viewport.
// Used to trigger CSS entrance animations.

function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.08) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// ── OPPORTUNITIES SECTION ──
// Dependencies: framer-motion, gsap
// CSS: import "./OpportunitiesSection.css"
// Image: place `opportunities-new.png` in your public folder and update `imageSrc` below.
//
// Theme tokens (override in your CSS before importing):
//   --opp-bg        section / wrap background   (default #efe3cf)
//   --opp-text      headline color              (default #2a2218)
//   --opp-subtext   body / footer text          (default #5a4636)
//   --opp-accent    looping word color          (default #B7792A)
//
// No snap-scroll dependency. Section scrolls normally in your page.
// Navbar clearance: headline uses top: clamp(80px, 13vh, 180px) — adjust to match yours.

const cards = [
  {
    id: "opp-card-01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="opp-card-svg">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" /><path d="M3 9h18" /><path d="M3 15h18" />
      </svg>
    ),
    text: "We loved your dashboard project. What was your role in it?",
    attribution: "— Product Lead",
    className: "opp-card--top-left",
  },
  {
    id: "opp-card-02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opp-card-svg">
        <circle cx="12" cy="12" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="12" y1="12" x2="6" y2="6" /><line x1="12" y1="12" x2="18" y2="6" /><line x1="12" y1="12" x2="18" y2="18" /><line x1="12" y1="12" x2="6" y2="18" />
      </svg>
    ),
    text: "Your workflow case study stood out. Could we talk about how you approached it?",
    attribution: "— Design Director",
    className: "opp-card--bottom-left",
  },
  {
    id: "opp-card-03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opp-card-svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: "We came across your project and loved the clarity. Open to a conversation?",
    attribution: "— Head of Operations",
    className: "opp-card--top-right",
  },
  {
    id: "opp-card-04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="opp-card-svg">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    text: "This is exactly the kind of work we care about. Would love to connect.",
    attribution: "— Founder",
    className: "opp-card--bottom-right",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

interface OpportunitiesSectionProps {
  // Path to the background illustration. Copy `opportunities-new.png`
  // from hiw-export/public/ into your project's public folder.
  imageSrc?: string;
}

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({
  imageSrc = "/opportunities-new.png",
}) => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="opps-shell reveal-up"
      aria-label="Opportunities"
    >
      <div className="opps-wrap">
        {/* Background illustration — update imageSrc to match your public path */}
        <img
          className="opps-artboard"
          src={imageSrc}
          alt="Opportunities illustration"
          aria-hidden="true"
        />

        {/* Gradient wash to cover any baked-in headline in the image */}
        <div className="opps-headline-cover" aria-hidden="true" />

        {/* HTML headline with looping animated word */}
        <div className="opps-headline">
          <h2 className="opps-h">
            When quality work is visible,
            <br />
            the right{" "}
            <LoopingWord className="opps-loop" words={["doors", "people", "offers", "teams"]} />{" "}
            find you.
          </h2>
        </div>

        {/* Floating opportunity cards */}
        <motion.div
          className="opps-cards-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className={`opp-card ${card.className}`}
            >
              <div className="opp-card-icon-container">
                {card.icon}
              </div>
              <div className="opp-card-content">
                <p className="opp-card-text">{card.text}</p>
                <span className="opp-card-attribution">{card.attribution}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer statement */}
        <div className="opps-footer-statement">
          You do not chase attention. The right people start reaching out.
        </div>
      </div>
    </section>
  );
};
