"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PX = "clamp(1.5rem, 7vw, 7rem)";
const PY = "clamp(1.75rem, 2.5vw, 2.5rem)";

const UL: React.CSSProperties = {
  textDecoration: "underline",
  textDecorationColor: "rgba(163,201,64,0.4)",
  textUnderlineOffset: "5px",
  textDecorationThickness: "1.5px",
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TRIPS = [
  {
    num: "01",
    name: "Discovery",
    desc: "For when you are still figuring it out. You walk through your own story and come back seeing yourself more clearly. What pulls you, what fits, where to point next.",
  },
  {
    num: "02",
    name: "Skill",
    desc: "For when you want to know how good you really are at something. We bring every kind of question to that one skill, and when your work meets the bar, you earn a Stamp for your Passport.",
  },
  {
    num: "03",
    name: "Job Specific",
    desc: "Shaped around a real role. You receive a Trip built to surface exactly what that work asks for, and you prove you can do it by doing a version of it.",
  },
  {
    num: "04",
    name: "Journalling",
    desc: "For the days worth keeping. So much happens in a career that deserves to be remembered. You capture it as you go, and over time you can see how far you have come.",
  },
] as const;

export function TripsPage() {
  return (
    <main className="relative bg-ink overflow-x-clip">

      {/* ── FIXED BACK LINK ──────────────────────────────────────── */}
      <Link
        href="/candidates"
        className="group fixed bottom-7 left-7 z-50 inline-flex items-center gap-2 rounded-full font-inter text-xs text-pearl/50 transition-all duration-200 hover:text-pearl"
        style={{
          background: "rgba(28,34,49,0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "0.5rem 1rem 0.5rem 0.75rem",
        }}
      >
        <span className="text-gold transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
        Candidates
      </Link>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(4.5rem, 9vh, 7rem)",
          paddingBottom: "clamp(4rem, 8vh, 6rem)",
          paddingLeft: PX,
          paddingRight: PX,
        }}
      >
        {/* Atmospheric glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "radial-gradient(75% 65% at 8% 25%, rgba(28,34,49,0.9) 0%, transparent 65%)",
              "radial-gradient(40% 50% at 92% 75%, rgba(26,77,92,0.18) 0%, transparent 60%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span
              className="font-mono text-gold/80 uppercase"
              style={{ fontSize: "0.65rem", letterSpacing: "0.28em" }}
            >
              The Journey
            </span>
          </motion.div>

          {/* Two-column grid: headline left, body text right */}
          <div className="grid gap-12 lg:grid-cols-[3fr,2fr] lg:gap-0 lg:items-center">

            {/* Left — headline */}
            <div className="lg:pr-16 lg:border-r lg:border-white/[0.07]">
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="font-playfair text-pearl leading-[1.04]"
                style={{ fontSize: "var(--text-display-xl)", letterSpacing: "-0.02em" }}
              >
                What&apos;s a{" "}
                <em className="text-gold not-italic" style={UL}>Trip</em>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
                className="mt-7 origin-left"
                style={{ height: "1px", width: "2.5rem", background: "rgba(163,201,64,0.6)" }}
              />
            </div>

            {/* Right — body text */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
              className="lg:pl-16 space-y-6"
            >
              <p
                className="font-inter font-light text-pearl/60 leading-[1.85]"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                Everyone loves a good trip. The packing, the going somewhere new,
                the coming back with photographs and stories and a version of yourself
                you didn&apos;t have before you left.
              </p>
              <p
                className="font-playfair italic text-pearl/90"
                style={{ fontSize: "var(--text-display-md)", lineHeight: 1.28 }}
              >
                We built that into a career.
              </p>
            </motion.div>

          </div>
        </div>

        {/* Decorative watermark */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.8, ease: EASE }}
          className="font-playfair absolute right-0 bottom-0 select-none hidden xl:block pointer-events-none"
          style={{
            fontSize: "clamp(8rem, 15vw, 20rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "rgba(245,242,236,0.025)",
          }}
        >
          Trip
        </motion.span>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(11,14,20,1))" }}
        />
      </section>

      {/* Section rule */}
      <div style={{ paddingLeft: PX, paddingRight: PX }}>
        <div className="mx-auto max-w-7xl" style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* ── WHAT A TRIP IS ───────────────────────────────────────── */}
      <section
        style={{ paddingTop: PY, paddingBottom: PY, paddingLeft: PX, paddingRight: PX }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-0">
            {/* Centre vertical divider */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden lg:block"
              style={{ width: "1px", background: "rgba(255,255,255,0.06)" }}
            />

            {/* Left column */}
            <div className="lg:pr-16">
              <Reveal>
                <p
                  className="font-mono text-gold uppercase"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.28em" }}
                >
                  Our favourite part
                </p>
                <h2
                  className="font-playfair text-pearl mt-4 leading-[1.1]"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  A Trip is where you go to do{" "}
                  <em className="text-gold" style={UL}>real work</em>{" "}and find out what
                  you&apos;re actually made of.
                </h2>
                <div
                  className="mt-5"
                  style={{ height: "1px", width: "2rem", background: "rgba(163,201,64,0.45)" }}
                />
                <p
                  className="mt-4 font-inter font-light text-pearl/55 leading-[1.85]"
                  style={{ fontSize: "var(--text-body-md)" }}
                >
                  Because here&apos;s the thing we keep noticing. Most people don&apos;t
                  even know what they know. There&apos;s a skill sitting inside you
                  that&apos;s never been named. A Trip names it.
                </p>
              </Reveal>
            </div>

            {/* Right column */}
            <div className="lg:pl-16">
              <Reveal delay={0.12}>
                <p
                  className="font-mono text-gold uppercase"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.28em" }}
                >
                  What you earn
                </p>
                <div className="mt-5 space-y-6">
                  <div>
                    <h3
                      className="font-playfair text-pearl leading-[1.1]"
                      style={{ fontSize: "var(--text-display-md)" }}
                    >
                      Recognition
                    </h3>
                    <p
                      className="mt-2 font-inter font-light text-pearl/50 leading-[1.8]"
                      style={{ fontSize: "var(--text-body-md)" }}
                    >
                      You come back knowing the truth about yourself. The parts of
                      you the world hasn&apos;t seen yet.
                    </p>
                  </div>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
                  <div>
                    <h3
                      className="font-playfair text-pearl leading-[1.1]"
                      style={{ fontSize: "var(--text-display-md)" }}
                    >
                      A <em className="text-gold" style={UL}>Stamp</em>
                    </h3>
                    <p
                      className="mt-2 font-inter font-light text-pearl/50 leading-[1.8]"
                      style={{ fontSize: "var(--text-body-md)" }}
                    >
                      Proof you can hold up, carry anywhere, show to anyone.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Section rule */}
      <div style={{ paddingLeft: PX, paddingRight: PX }}>
        <div className="mx-auto max-w-7xl" style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* ── HOW TRIPS WORK ───────────────────────────────────────── */}
      <section
        style={{ paddingTop: PY, paddingBottom: PY, paddingLeft: PX, paddingRight: PX }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-10 items-start lg:grid-cols-[5fr,7fr]">
            <Reveal>
              <p
                className="font-mono text-gold uppercase"
                style={{ fontSize: "0.65rem", letterSpacing: "0.28em" }}
              >
                Inside a Trip
              </p>
              <h2
                className="font-playfair text-pearl mt-4 leading-[1.1]"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                Real scenarios.
                <br />
                No <em className="text-gold" style={UL}>coasting</em> through.
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="font-inter font-light text-pearl/55 leading-[1.9]"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                A Trip isn&apos;t built to ask you to recite definitions. It drops you
                into real scenarios, the kind where you have to actually think. Read
                the situation, weigh it, make the call. The questions come in every
                shape, so you can&apos;t coast through on a memorised answer. And by the
                time you&apos;re done, you&apos;ve learned something. About the topic. About
                yourself.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section rule */}
      <div style={{ paddingLeft: PX, paddingRight: PX }}>
        <div className="mx-auto max-w-7xl" style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* ── FOUR TRIP TYPES ──────────────────────────────────────── */}
      <section
        style={{ paddingTop: PY, paddingBottom: PY, paddingLeft: PX, paddingRight: PX }}
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Section header */}
          <Reveal>
            <p
              className="font-mono text-gold uppercase"
              style={{ fontSize: "0.65rem", letterSpacing: "0.28em" }}
            >
              Four Trips · One Journey
            </p>
            <h2
              className="font-playfair text-pearl mt-4 leading-[1.07]"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              This is what we believe a career{" "}
              <em className="text-gold" style={UL}>actually needs</em>.
            </h2>
            <p
              className="mt-3 font-inter font-light text-pearl/45 leading-[1.8] max-w-[48ch]"
              style={{ fontSize: "var(--text-body-md)" }}
            >
              Four kinds of Trips. One for every part of the journey.
            </p>
          </Reveal>

          {/* Cards grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {TRIPS.map(({ num, name, desc }, i) => (
              <Reveal key={num} delay={i * 0.08}>
                <div
                  className="group relative h-full rounded-xl overflow-hidden transition-transform duration-500 hover:scale-[1.015]"
                  style={{
                    background:
                      "linear-gradient(160deg, #1e2638 0%, #1C2231 55%, #161d2b 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderTopColor: "rgba(163,201,64,0.22)",
                    borderTopWidth: "1.5px",
                    padding: "clamp(1.5rem, 2.5vw, 2.25rem)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        "radial-gradient(55% 50% at 50% 0%, rgba(163,201,64,0.06) 0%, transparent 100%)",
                    }}
                  />

                  {/* Number */}
                  <span
                    className="font-mono text-gold"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    {num}
                  </span>

                  {/* Name */}
                  <h3
                    className="font-playfair text-pearl mt-3 leading-[1.1]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {name}
                  </h3>

                  {/* Gold rule */}
                  <div
                    className="mt-3"
                    style={{
                      height: "1px",
                      width: "1.25rem",
                      background: "rgba(163,201,64,0.38)",
                    }}
                  />

                  {/* Description */}
                  <p
                    className="mt-3 font-inter font-light text-pearl/50 leading-[1.8]"
                    style={{ fontSize: "var(--text-body-md)" }}
                  >
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section rule */}
      <div style={{ paddingLeft: PX, paddingRight: PX }}>
        <div className="mx-auto max-w-7xl" style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="text-center"
        style={{
          paddingTop: PY,
          paddingBottom: "clamp(3rem, 6vh, 5rem)",
          paddingLeft: PX,
          paddingRight: PX,
        }}
      >
        <Reveal>
          <p
            className="font-mono text-gold uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.28em" }}
          >
            Ready to begin
          </p>
          <h2
            className="font-playfair text-pearl mt-4 leading-[1.1]"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            Every journey begins with a{" "}
            <em className="text-gold" style={UL}>single trip</em>.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/candidates#waitlist"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-inter text-sm font-medium text-ink transition-all duration-200 hover:scale-[1.02] hover:bg-[#bcd96b] active:scale-[0.98]"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/candidates"
              className="group inline-flex items-center gap-2 font-inter text-sm text-pearl/55 transition-colors hover:text-pearl"
            >
              <span className="text-gold transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Back to Candidates
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
