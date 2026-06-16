"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Link2, Compass, ShieldCheck, Stamp } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Link2,
    title: "Connect Your Signals",
    body: "Import what already exists — LinkedIn, CV, project docs.",
  },
  {
    num: "02",
    icon: Compass,
    title: "Take a Trip",
    body: "Curated sessions that capture your actual thinking in real time.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Proof is Generated",
    body: "Every Trip produces structured artifacts which can't be faked.",
  },
  {
    num: "04",
    icon: Stamp,
    title: "Earn Stamps. Build Your Passport.",
    body: "Each stamp adds depth. Your passport grows with every proof.",
  },
];

export function HowVisibilityWorks() {
  return (
    <section className="bg-black flex flex-col justify-center overflow-hidden py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-16 flex flex-col md:flex-row items-stretch">

        {/* ── Left text — 38% ── */}
        <motion.div
          className="md:w-[38%] shrink-0 flex flex-col justify-center gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          <motion.p
            className="font-inter text-[0.68rem] tracking-[0.22em] uppercase text-gold"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          >
            How Visibility Works
          </motion.p>

          <motion.h2
            className="font-playfair text-white leading-[1.08]"
            style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.6rem)", letterSpacing: "-0.02em" }}
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }}
          >
            We{" "}
            <span className="italic" style={{ color: "#C9A84C" }}>listen</span>
            {" "}to you,{" "}
            <br />
            <span className="italic" style={{ color: "#C9A84C" }}>nudge</span>
            {" "}you and{" "}
            <span className="italic" style={{ color: "#C9A84C" }}>build</span>
            <br />
            your identity.
          </motion.h2>

          <motion.p
            className="font-inter font-light text-white/55 leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          >
            Honestly talk about who you are<br />
            and what your aspirations are.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
          >
            <Link
              href="/trips"
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full font-inter text-[0.82rem] font-light w-fit transition-all duration-200 hover:bg-gold/10 group"
              style={{ border: "1px solid rgba(201,168,76,0.45)", color: "#C9A84C" }}
            >
              More About Trip
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── 14% gap ── */}
        <div className="md:w-[14%] shrink-0" />

        {/* ── Right image + step cards — 48% ── */}
        {/* Outer glass frame */}
        <div
          className="md:w-[48%] shrink-0 relative rounded-2xl"
          style={{
            height: "clamp(460px, 74vh, 700px)",
            border: "1px solid rgba(255,255,255,0.13)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {/* Image — full bleed, no gap */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            {/* Photo */}
            <Image
              src="/images/trip.jpeg"
              alt="Take a Trip"
              fill
              quality={90}
              className="object-cover object-center"
            />
            {/* Dark gradient — preserves readability of cards */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            {/* Glass tint over the whole image */}
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(180,200,255,0.04)",
                backdropFilter: "blur(2px) saturate(140%) brightness(0.96)",
                WebkitBackdropFilter: "blur(2px) saturate(140%) brightness(0.96)",
              }}
            />
          </div>

          {/* Inner glow on image */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          />

          {/* Step cards — staggered entrance, centred */}
          <motion.div
            className="absolute inset-y-8 right-5 w-[55%] flex flex-col justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
            }}
          >
            {STEPS.map(({ num, icon: Icon, title, body }) => (
              <motion.div
                key={num}
                className="group flex items-start gap-3 rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(8, 10, 16, 0.92)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                }}
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {/* Icon circle */}
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(75,123,236,0.15)", border: "1px solid rgba(75,123,236,0.35)" }}
                >
                  <Icon size={12} style={{ color: "#4B7BEC" }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-inter text-[0.6rem] tracking-[0.18em] uppercase mb-1" style={{ color: "#C9A84C" }}>
                    {num}
                  </p>
                  <p className="font-inter font-semibold text-[0.78rem] uppercase tracking-wide leading-tight mb-1" style={{ color: "#C9A84C" }}>
                    {title}
                  </p>
                  <p className="font-inter font-light text-white/75 text-[0.73rem] leading-snug">{body}</p>
                </div>

                {/* Arrow */}
                <div
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center self-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span className="text-[0.6rem]" style={{ color: "#C9A84C" }}>→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
