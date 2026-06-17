"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const RAW_ITEMS = ["Projects", "Internships", "Assessments", "Certifications", "Leadership & Activities", "And more"];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

export function Bridge() {
  return (
    <section className="relative">
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">

        <Image
          src="/images/sections/s3.png"
          alt="Bridge section background"
          fill
          quality={90}
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Bottom blend — fades into HowVisibilityWorks */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))" }} />

        {/* Glass card — absolute-fill on desktop, in-flow & stacked on mobile */}
        <div className="relative lg:absolute lg:inset-0 z-10 w-full p-4 sm:p-6 lg:p-12">
          <div
            className="w-full rounded-2xl flex flex-col lg:flex-row min-h-[70vh]"
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
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
                className="font-inter text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-5"
                variants={fadeUp}
                custom={0}
              >
                The Bridge
              </motion.p>
              <motion.h2
                className="font-playfair text-white mb-5 leading-[1.15]"
                style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)", letterSpacing: "-0.01em" }}
                variants={fadeUp}
                custom={0.1}
              >
                Standing out is not about saying more. It is about{" "}
                <span style={{ color: "#A3C940" }}>showing better</span>.
              </motion.h2>
              <motion.div
                className="w-10 h-px mb-5"
                style={{ background: "rgba(163, 201, 64,0.5)" }}
                variants={fadeUp}
                custom={0.18}
              />
              <motion.p
                className="font-inter font-light text-white/75 leading-relaxed"
                style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)" }}
                variants={fadeUp}
                custom={0.24}
              >
                Career Passport bridges the gap between what you've done and what the
                world can see.
              </motion.p>
            </motion.div>

            {/* ── 10% gap (desktop only) ── */}
            <div className="hidden lg:block lg:w-[10%] shrink-0" />

            {/* ── RIGHT 50% ── */}
            <div className="w-full lg:w-[50%] shrink-0 flex flex-col px-6 py-8 sm:px-8 lg:pl-0 lg:pr-8 lg:py-10 gap-6 lg:gap-0">

              {/* 1. RAW DATA */}
              <motion.div
                className="flex-1 flex flex-col justify-center pb-6 border-b border-white/10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 rounded-full bg-gold" />
                  <p className="font-inter text-[0.65rem] tracking-[0.22em] uppercase text-gold font-medium">
                    Raw Data
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RAW_ITEMS.map((item) => (
                    <span
                      key={item}
                      className="font-inter font-light text-white text-[0.78rem] px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* 2. CAREER PASSPORT ANALYSIS */}
              <motion.div
                className="flex-1 flex flex-col justify-center py-6 border-b border-white/10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 rounded-full bg-blue" />
                  <p
                    className="font-inter text-[0.65rem] tracking-[0.22em] uppercase font-medium"
                    style={{ color: "#A3C940" }}
                  >
                    Career Passport Analysis
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2">
                  {[
                    { title: "Evaluated Assessments", sub: "Aptitude, skills & domain tests" },
                    { title: "AI-Powered Analysis", sub: "Understands patterns & potential" },
                    { title: "Strengths Mapping", sub: "Identifies core strengths & traits" },
                    { title: "Evidence Verification", sub: "Validates authenticity & impact" },
                    { title: "Personal Insights", sub: "Meaningful, actionable feedback" },
                  ].map((item, i) => (
                    <div key={item.title} className="flex flex-col gap-1.5 relative">
                      {i < 4 && (
                        <div
                          className="hidden sm:block absolute top-2.5 left-[calc(50%+10px)] right-0 h-px"
                          style={{ background: "rgba(163, 201, 64,0.3)" }}
                        />
                      )}
                      <div
                        className="w-5 h-5 rounded-full mx-auto flex items-center justify-center z-10 relative text-[0.55rem] font-inter font-semibold text-white"
                        style={{ background: i === 4 ? "#A3C940" : "#A3C940" }}
                      >
                        {i + 1}
                      </div>
                      <p className="font-inter font-medium text-white text-center leading-tight" style={{ fontSize: "0.65rem" }}>
                        {item.title}
                      </p>
                      <p className="font-inter font-light text-white/55 text-center leading-tight" style={{ fontSize: "0.6rem" }}>
                        {item.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 3. TRUSTED OUTCOMES */}
              <motion.div
                className="flex-1 flex flex-col justify-center pt-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 rounded-full bg-pearl/60" />
                  <p className="font-inter text-[0.65rem] tracking-[0.22em] uppercase text-white/70 font-medium">
                    Trusted Outcomes
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: "rgba(163, 201, 64,0.1)", border: "1px solid rgba(163, 201, 64,0.25)" }}
                  >
                    <span className="font-inter text-[0.62rem] tracking-[0.16em] uppercase text-gold font-semibold">Built</span>
                    <span
                      className="font-inter text-[0.58rem] tracking-[0.1em] uppercase rounded-full px-2 py-0.5 w-fit font-medium"
                      style={{ background: "rgba(163, 201, 64,0.15)", color: "#A3C940", border: "1px solid rgba(163, 201, 64,0.3)" }}
                    >
                      Verified Built
                    </span>
                    <p className="font-inter font-light text-white/80 leading-snug text-[0.72rem]">
                      Projects, internships, leadership, and real-world experience validated.
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: "rgba(163, 201, 64,0.1)", border: "1px solid rgba(163, 201, 64,0.25)" }}
                  >
                    <span className="font-inter text-[0.62rem] tracking-[0.16em] uppercase font-semibold" style={{ color: "#A3C940" }}>Learned</span>
                    <span
                      className="font-inter text-[0.58rem] tracking-[0.1em] uppercase rounded-full px-2 py-0.5 w-fit font-medium"
                      style={{ background: "rgba(163, 201, 64,0.15)", color: "#A3C940", border: "1px solid rgba(163, 201, 64,0.3)" }}
                    >
                      Verified Learned
                    </span>
                    <p className="font-inter font-light text-white/80 leading-snug text-[0.72rem]">
                      Skills, courses, research and knowledge deeply evaluated.
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: "rgba(245,242,236,0.07)", border: "1px solid rgba(245,242,236,0.2)" }}
                  >
                    <span className="font-inter text-[0.62rem] tracking-[0.16em] uppercase text-white font-semibold">Verified</span>
                    <span
                      className="font-inter text-[0.58rem] tracking-[0.1em] uppercase rounded-full px-2 py-0.5 w-fit font-medium text-white/80"
                      style={{ background: "rgba(245,242,236,0.1)", border: "1px solid rgba(245,242,236,0.2)" }}
                    >
                      Verified Trusted
                    </span>
                    <p className="font-inter font-light text-white/80 leading-snug text-[0.72rem]">
                      Achievements, assessments and claims backed with credible proof.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
