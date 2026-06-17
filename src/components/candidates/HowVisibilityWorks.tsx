"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const STEPS = [
  {
    num: "01",
    title: "Connect your signals",
    body: "Import what already exists — LinkedIn, CV, project docs.",
  },
  {
    num: "02",
    title: "Take a Trip",
    body: "Curated sessions that capture your actual thinking in real time.",
  },
  {
    num: "03",
    title: "Proof is generated",
    body: "Every Trip produces structured artifacts which can't be faked.",
  },
  {
    num: "04",
    title: "Earn stamps. Build your passport.",
    body: "Each stamp adds depth. Your passport grows with every proof.",
  },
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

export function HowVisibilityWorks() {
  return (
    <section className="relative">
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">

        {/* Photo background */}
        <Image
          src="/images/sections/s4.png"
          alt="Career Passport trip session"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Top blend — fades in from Bridge */}
        <div className="absolute top-0 left-0 right-0 h-40 z-[1] pointer-events-none" style={{ background: "linear-gradient(to top, transparent, rgba(0,0,0,0.95))" }} />

        {/* Glass card — absolute-fill on desktop, in-flow & stacked on mobile */}
        <div className="relative lg:absolute lg:inset-0 z-10 w-full p-4 sm:p-6 lg:p-12">
          <div
            className="w-full h-auto lg:h-full rounded-2xl flex flex-col lg:flex-row overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >

            {/* ── LEFT 40% ── */}
            <motion.div
              className="w-full lg:w-[40%] shrink-0 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14 border-b lg:border-b-0 lg:border-r border-white/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                className="font-inter text-[0.65rem] tracking-[0.28em] uppercase mb-6"
                style={{ color: "rgba(163, 201, 64,0.85)" }}
                variants={fadeUp}
                custom={0}
              >
                How Visibility Works
              </motion.p>

              <motion.h2
                className="font-playfair text-white mb-6 leading-[1.12]"
                style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.6rem)", letterSpacing: "-0.02em" }}
                variants={fadeUp}
                custom={0.1}
              >
                We{" "}
                <em style={{ color: "#A3C940", fontStyle: "italic" }}>listen</em>
                {" "}to you,{" "}
                <em style={{ color: "#A3C940", fontStyle: "italic" }}>nudge</em>
                {" "}you and{" "}
                <em style={{ color: "#A3C940", fontStyle: "italic" }}>build</em>
                {" "}your identity.
              </motion.h2>

              <motion.div
                className="w-8 h-px mb-6"
                style={{ background: "rgba(163, 201, 64,0.45)" }}
                variants={fadeUp}
                custom={0.18}
              />

              <motion.p
                className="font-inter font-light leading-[1.7] mb-9"
                style={{ fontSize: "clamp(0.88rem, 1.05vw, 0.98rem)", color: "rgba(245,242,236,0.7)" }}
                variants={fadeUp}
                custom={0.24}
              >
                Speak honestly about who you are and where you want to go.
                We turn that into verified proof.
              </motion.p>

              <motion.div variants={fadeUp} custom={0.32}>
                <Link
                  href="/trips"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-inter text-[0.78rem] tracking-[0.04em] font-light w-fit transition-all duration-300 hover:bg-gold/10 hover:border-gold/60 group"
                  style={{ border: "1px solid rgba(163, 201, 64,0.35)", color: "#A3C940" }}
                >
                  More About Trip
                  <span className="text-[0.7rem] transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* ── 8% gap (desktop only) ── */}
            <div className="hidden lg:block lg:w-[8%] shrink-0" />

            {/* ── RIGHT 52% — clean step list ── */}
            <div className="w-full lg:w-[52%] shrink-0 flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-0 lg:pr-12 lg:py-10 gap-0">
              {STEPS.map(({ num, title, body }, i) => (
                <motion.div
                  key={num}
                  className="flex gap-6 py-7 border-b border-white/[0.12] last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: EASE }}
                >
                  {/* Number */}
                  <span
                    className="font-playfair shrink-0 leading-none select-none"
                    style={{
                      fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)",
                      color: "rgba(163, 201, 64,0.55)",
                      letterSpacing: "-0.02em",
                      marginTop: "0.05em",
                    }}
                  >
                    {num}
                  </span>

                  {/* Text */}
                  <div className="flex flex-col gap-2.5 justify-center">
                    <p
                      className="font-playfair leading-snug"
                      style={{
                        fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
                        color: "rgba(245,242,236,0.95)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      className="font-inter font-light leading-[1.65]"
                      style={{
                        fontSize: "clamp(0.83rem, 0.95vw, 0.9rem)",
                        color: "rgba(245,242,236,0.65)",
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
