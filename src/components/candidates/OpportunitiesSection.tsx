"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

// ── LoopingWord — GSAP rise-and-fade swap ──
interface LoopingWordProps {
  words: string[];
  hold?: number;
}

const LoopingWord: React.FC<LoopingWordProps> = ({ words, hold = 2.2 }) => {
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
        y: "-110%",
        duration: 0.34,
        ease: "power2.in",
        onComplete: () => { if (alive) setIdx((i) => (i + 1) % words.length); },
      });
    }, hold * 1000);
    return () => { alive = false; clearInterval(id); };
  }, [words, hold]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: "110%" }, { opacity: 1, y: "0%", duration: 0.55, ease: "power3.out" });
  }, [idx]);

  return (
    /* Extra vertical padding gives GSAP room to animate before the clip boundary */
    <span style={{
      position: "relative",
      display: "inline-block",
      overflow: "hidden",
      verticalAlign: "bottom",
      paddingTop: "0.25em",
      paddingBottom: "0.25em",
      marginTop: "-0.25em",
      marginBottom: "-0.25em",
    }}>
      {/* Reserve width of longest word */}
      <span style={{ visibility: "hidden", pointerEvents: "none", display: "block" }}>{longestWord}</span>
      <span style={{ position: "absolute", top: "0.25em", left: 0, right: 0, bottom: "0.25em", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <span ref={ref} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {words[idx]}
        </span>
      </span>
    </span>
  );
};

// ── Recruiter cards data ──
const cards = [
  {
    id: "opp-1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="M3 9h18" /><path d="M3 15h18" />
      </svg>
    ),
    iconBg: "rgba(201,168,76,0.12)",
    iconBorder: "rgba(201,168,76,0.28)",
    iconColor: "#C9A84C",
    text: "We loved your dashboard project. What was your role in it?",
    attribution: "Product Lead",
    position: { top: "8%", left: "3%" },
    floatDuration: 6,
    floatDelay: 0,
  },
  {
    id: "opp-2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <circle cx="12" cy="12" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="12" y1="12" x2="6" y2="6" /><line x1="12" y1="12" x2="18" y2="6" /><line x1="12" y1="12" x2="18" y2="18" /><line x1="12" y1="12" x2="6" y2="18" />
      </svg>
    ),
    iconBg: "rgba(75,123,236,0.12)",
    iconBorder: "rgba(75,123,236,0.28)",
    iconColor: "#4B7BEC",
    text: "Your workflow case study stood out. Could we talk about how you approached it?",
    attribution: "Design Director",
    position: { top: "52%", left: "5%" },
    floatDuration: 7,
    floatDelay: 1.2,
  },
  {
    id: "opp-3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iconBg: "rgba(26,77,92,0.30)",
    iconBorder: "rgba(26,77,92,0.55)",
    iconColor: "#5AABB8",
    text: "We came across your project and loved the clarity. Open to a conversation?",
    attribution: "Head of Operations",
    position: { top: "10%", right: "3%" },
    floatDuration: 6.5,
    floatDelay: 0.6,
  },
  {
    id: "opp-4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    iconBg: "rgba(201,168,76,0.10)",
    iconBorder: "rgba(201,168,76,0.22)",
    iconColor: "#C9A84C",
    text: "This is exactly the kind of work we care about. Would love to connect.",
    attribution: "Founder",
    position: { top: "55%", right: "4%" },
    floatDuration: 7.5,
    floatDelay: 1.8,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
};

export const OpportunitiesSection: React.FC = () => {
  return (
    <section className="relative">
      <style>{`
        @keyframes oppFloat {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
      `}</style>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background */}
        <Image
          src="/images/section6.jpeg"
          alt=""
          fill
          quality={90}
          className="object-cover object-center"
          aria-hidden="true"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Glass card — same inset pattern as Bridge */}
        <div className="absolute inset-0 z-10 p-6 md:p-10">
          <div
            className="w-full h-full rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >

            {/* ── TOP — heading ── */}
            <div className="px-10 pt-9 pb-7 border-b border-white/10 shrink-0">
              <p className="font-inter text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-4">
                The Payoff
              </p>
              <h2
                className="font-playfair text-pearl leading-[1.1]"
                style={{ fontSize: "clamp(1.55rem, 2.4vw, 2.4rem)", letterSpacing: "-0.02em" }}
              >
                When quality work is visible, the right{" "}
                <span className="italic" style={{ color: "#C9A84C" }}>
                  <LoopingWord words={["doors", "people", "offers", "teams"]} />
                </span>{" "}
                find you.
              </h2>
              <div className="w-10 h-px mt-5" style={{ background: "rgba(201,168,76,0.45)" }} />
            </div>

            {/* ── BOTTOM — illustration with floating cards ── */}
            <div className="flex-1 relative overflow-hidden min-h-0">

              {/* Full illustration */}
              <Image
                src="/opportunities-new.png"
                alt="Career opportunities illustration"
                fill
                quality={90}
                className="object-cover object-top"
              />

              {/* Floating cards */}
              <motion.div
                className="absolute inset-0"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={cardVariants}
                    className="absolute flex items-flex-start gap-3 rounded-xl p-4"
                    style={{
                      width: "clamp(200px, 22%, 280px)",
                      ...card.position,
                      background: "rgba(28,34,49,0.82)",
                      border: "1px solid rgba(201,168,76,0.18)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                      animation: `oppFloat ${card.floatDuration}s ease-in-out ${card.floatDelay}s infinite alternate`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: card.iconBg,
                        border: `1px solid ${card.iconBorder}`,
                        color: card.iconColor,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <p className="font-inter font-light text-white/85 leading-snug" style={{ fontSize: "clamp(0.72rem, 0.82vw, 0.86rem)" }}>
                        "{card.text}"
                      </p>
                      <span
                        className="font-inter text-[0.6rem] tracking-[0.08em] uppercase font-semibold"
                        style={{ color: card.iconColor }}
                      >
                        — {card.attribution}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom footer */}
              <div
                className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-5"
                style={{ background: "linear-gradient(to top, rgba(11,14,20,0.55) 0%, transparent 100%)", height: "30%" }}
              >
                <p className="font-inter font-light text-white/75 text-center" style={{ fontSize: "clamp(0.72rem, 0.85vw, 0.86rem)", letterSpacing: "0.04em" }}>
                  You do not chase attention. The right people start reaching out.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
