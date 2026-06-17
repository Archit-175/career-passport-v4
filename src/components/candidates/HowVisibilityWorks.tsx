"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const STEPS = [
  {
    num: "1",
    title: "Connect your signals",
    body: "Import what already exists — LinkedIn, CV, project docs.",
  },
  {
    num: "2",
    title: "Take a Trip",
    body: "Curated sessions that capture your actual thinking in real time.",
  },
  {
    num: "3",
    title: "Proof is generated",
    body: "Every Trip produces structured artifacts which can't be faked.",
  },
  {
    num: "4",
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
          src="/images/sections/how-visibility.jpeg"
          alt="Career Passport trip session"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Glass card — absolute-fill on desktop, in-flow & stacked on mobile */}
        <div className="relative lg:absolute lg:inset-0 z-10 w-full p-4 sm:p-6 lg:p-12">
          <div
            className="w-full h-auto lg:h-full rounded-2xl flex flex-col lg:flex-row overflow-hidden"
            style={{
              background: "rgba(11,14,20,0.6)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
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
                className="font-inter text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-5"
                variants={fadeUp}
                custom={0}
              >
                How Visibility Works
              </motion.p>

              <motion.h2
                className="font-playfair text-white mb-5 leading-[1.1]"
                style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)", letterSpacing: "-0.01em" }}
                variants={fadeUp}
                custom={0.1}
              >
                We{" "}
                <em style={{ color: "#C9A84C", fontStyle: "italic" }}>listen</em>
                {" "}to you,{" "}
                <em style={{ color: "#C9A84C", fontStyle: "italic" }}>nudge</em>
                {" "}you and{" "}
                <em style={{ color: "#C9A84C", fontStyle: "italic" }}>build</em>
                {" "}your identity.
              </motion.h2>

              <motion.div
                className="w-10 h-px mb-5"
                style={{ background: "rgba(201,168,76,0.5)" }}
                variants={fadeUp}
                custom={0.18}
              />

              <motion.p
                className="font-inter font-light leading-relaxed mb-8"
                style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", color: "rgba(245,242,236,0.75)" }}
                variants={fadeUp}
                custom={0.24}
              >
                Honestly talk about who you are and what your aspirations are.
              </motion.p>

              <motion.div variants={fadeUp} custom={0.32}>
                <Link
                  href="/trips"
                  className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-inter text-[0.8rem] font-light w-fit transition-all duration-200 hover:bg-gold/10 group"
                  style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C" }}
                >
                  More About Trip
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* ── 8% gap (desktop only) ── */}
            <div className="hidden lg:block lg:w-[8%] shrink-0" />

            {/* ── RIGHT 52% — clean step list ── */}
            <div className="w-full lg:w-[52%] shrink-0 flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-0 lg:pr-10 lg:py-10 gap-0">
              {STEPS.map(({ num, title, body }, i) => (
                <motion.div
                  key={num}
                  className="flex gap-6 py-6 border-b border-white/10 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: EASE }}
                >
                  {/* Number */}
                  <span
                    className="font-playfair shrink-0 leading-none"
                    style={{ fontSize: "clamp(1.6rem, 2.2vw, 2rem)", color: "rgba(201,168,76,0.5)" }}
                  >
                    {num}
                  </span>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5 justify-center">
                    <p
                      className="font-inter font-medium leading-snug"
                      style={{ fontSize: "clamp(0.82rem, 1.05vw, 0.95rem)", color: "#F5F2EC" }}
                    >
                      {title}
                    </p>
                    <p
                      className="font-inter font-light leading-relaxed"
                      style={{ fontSize: "clamp(0.78rem, 0.95vw, 0.87rem)", color: "rgba(245,242,236,0.65)" }}
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
