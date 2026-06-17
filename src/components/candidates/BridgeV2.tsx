"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

const RAW = ["Projects", "Internships", "Assessments", "Certifications", "Leadership"];

const ANALYSIS = [
  "Evaluated against real benchmarks",
  "Strengths & patterns mapped",
  "Authenticity verified",
];

const PROOF = [
  { label: "Built", desc: "Projects, internships & real-world experience — validated." },
  { label: "Learned", desc: "Skills, courses & research — deeply evaluated." },
  { label: "Verified", desc: "Achievements & claims — backed by credible proof." },
];

const STAGES = ["Raw material", "Career Passport analysis", "Verified proof"];

export function BridgeV2() {
  return (
    <section className="relative">
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">

        <Image
          src="/images/sections/bridge.jpeg"
          alt="Bridge section background"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Bottom blend — fades into HowVisibilityWorks */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))" }}
        />

        {/* Glass card — absolute-fill on desktop, in-flow & stacked on mobile */}
        <div className="relative lg:absolute lg:inset-0 z-10 w-full p-4 sm:p-6 lg:p-12">
          <div
            className="w-full h-full rounded-2xl flex flex-col lg:flex-row min-h-[70vh]"
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >

            {/* ── LEFT: editorial ── */}
            <motion.div
              className="w-full lg:w-[40%] shrink-0 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14 border-b lg:border-b-0 lg:border-r border-white/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                className="font-inter text-[0.68rem] tracking-[0.24em] uppercase text-gold mb-5"
                variants={fadeUp}
                custom={0}
              >
                The Bridge
              </motion.p>
              <motion.h2
                className="font-playfair text-pearl leading-[1.16]"
                style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.3rem)", letterSpacing: "-0.01em" }}
                variants={fadeUp}
                custom={0.08}
              >
                Standing out is not about saying more. It is about{" "}
                <em className="italic text-gold">showing better</em>.
              </motion.h2>
              <motion.div className="w-10 h-px my-6 bg-gold/50" variants={fadeUp} custom={0.16} />
              <motion.p
                className="font-inter font-light text-white/70 leading-[1.8] max-w-sm"
                style={{ fontSize: "clamp(0.86rem, 1.1vw, 0.95rem)" }}
                variants={fadeUp}
                custom={0.22}
              >
                Career Passport bridges the gap between what you&apos;ve done and what the
                world can see — turning raw experience into proof.
              </motion.p>
            </motion.div>

            {/* ── RIGHT: transformation rail ── */}
            <div className="w-full lg:w-[60%] shrink-0 flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
              {STAGES.map((stage, i) => (
                <motion.div
                  key={stage}
                  className="relative grid grid-cols-[2rem_1fr] gap-5 sm:gap-6 pb-9 last:pb-0"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.12, ease: EASE }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  {/* connector spine */}
                  {i < STAGES.length - 1 && (
                    <span className="absolute left-[15px] top-9 bottom-1 w-px bg-gold/25" />
                  )}

                  {/* node */}
                  <div className="relative z-10 flex justify-center">
                    <span className="w-8 h-8 rounded-full bg-white/[0.06] border border-gold/45 text-gold flex items-center justify-center font-playfair text-[0.82rem]">
                      {i + 1}
                    </span>
                  </div>

                  {/* content */}
                  <div className="pt-1">
                    <p className="font-inter text-[0.64rem] tracking-[0.22em] uppercase text-gold mb-4">
                      {stage}
                    </p>

                    {/* Stage 1 — raw chips */}
                    {i === 0 && (
                      <div className="flex flex-wrap gap-2">
                        {RAW.map((item) => (
                          <span
                            key={item}
                            className="font-inter font-light text-white/90 text-[0.78rem] px-3 py-1 rounded-full bg-white/[0.08] border border-white/15"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stage 2 — analysis list */}
                    {i === 1 && (
                      <ul className="flex flex-col gap-2.5">
                        {ANALYSIS.map((line) => (
                          <li key={line} className="flex items-center gap-3">
                            <span className="w-4 h-px bg-gold/60 shrink-0" />
                            <span className="font-inter font-light text-white/80 text-[0.85rem]">
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Stage 3 — verified proof stamps */}
                    {i === 2 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {PROOF.map((p) => (
                          <div
                            key={p.label}
                            className="rounded-xl p-4 bg-white/[0.05] border border-white/12 flex flex-col gap-3"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-full border border-gold/50 text-gold flex items-center justify-center shrink-0">
                                <Check size={13} strokeWidth={2.5} />
                              </span>
                              <span className="font-playfair text-pearl text-[1.05rem]">
                                {p.label}
                              </span>
                            </div>
                            <p className="font-inter font-light text-white/60 leading-relaxed text-[0.74rem]">
                              {p.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
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
