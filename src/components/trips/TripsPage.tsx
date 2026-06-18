"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const PX = "clamp(1.5rem, 7vw, 7rem)";
const COMIC = '"ComicShanns", "Comic Sans MS", cursive';

const HL: React.CSSProperties = {
  background: "rgba(163,201,64,0.15)",
  color: "#A3C940",
  borderRadius: "3px",
  padding: "0 4px",
};

const UL: React.CSSProperties = {
  textDecoration: "underline",
  textDecorationColor: "rgba(163,201,64,0.45)",
  textUnderlineOffset: "5px",
  textDecorationThickness: "1.5px",
};

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function TripsPage() {
  return (
    <main className="relative bg-ink overflow-x-clip">

      <style>{`
        @font-face {
          font-family: "ComicShanns";
          src: url("/fonts/ComicShanns2.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

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

      {/* ── LETTER BODY ──────────────────────────────────────────── */}
      <div
        style={{
          paddingTop: "clamp(5rem, 10vh, 8rem)",
          paddingBottom: "clamp(4rem, 8vh, 7rem)",
          paddingLeft: PX,
          paddingRight: PX,
        }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: "660px" }}>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-playfair text-pearl leading-[1.08]"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              letterSpacing: "-0.02em",
              marginBottom: "clamp(2rem, 4vh, 3rem)",
            }}
          >
            What&apos;s a{" "}
            <em
              className="text-gold not-italic"
              style={{
                textDecoration: "underline",
                textDecorationColor: "rgba(163,201,64,0.4)",
                textUnderlineOffset: "6px",
              }}
            >
              Trip
            </em>
          </motion.h2>

          <Reveal>
            <div
              style={{
                fontFamily: COMIC,
                fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
                lineHeight: 2,
                color: "rgba(245,242,236,0.72)",
                display: "flex",
                flexDirection: "column",
                gap: "1.6rem",
                textAlign: "justify",
                textAlignLast: "left",
              }}
            >

              <p>
                Everyone loves a good trip. The packing, the going somewhere new,
                the coming back with photographs and stories and a version of yourself
                you didn&apos;t have before you left.
              </p>

              <p><span style={UL}>We built that into a career.</span></p>

              <p>
                A Trip is our favourite part of the journey. It&apos;s where you go to do{" "}
                <span style={HL}>real work</span> and{" "}
                <span style={HL}>find out what you&apos;re actually made of</span>. Because
                here&apos;s the thing we keep noticing —{" "}
                <span style={UL}>most people don&apos;t even know what they know</span>. There&apos;s
                a skill sitting inside you that&apos;s never been named.{" "}
                <span style={HL}>A Trip names it</span>.
              </p>

              <p>
                The way a real trip rewards you with memories, a career Trip rewards you
                with two things. First, <span style={HL}>recognition</span> — you come back
                knowing the truth about yourself, the parts of you the world hasn&apos;t seen
                yet. And second, a <span style={HL}>Stamp</span>:{" "}
                <span style={UL}>proof that you can hold up, carry anywhere, show to anyone</span>.
              </p>

              <p>
                A Trip isn&apos;t built to ask you to recite definitions. It drops you into
                real scenarios, the kind where you have to actually think — read the
                situation, weigh it, make the call. The questions come in every shape, so
                you can&apos;t coast through on a memorised answer. And by the time you&apos;re
                done, you&apos;ve learned something. About the topic. About yourself.
              </p>

              <p>
                We&apos;ve shaped this into four kinds of Trips, one for every part of the
                journey.
              </p>

              <p>
                <span style={HL}>Discovery</span> is for when you&apos;re still figuring it
                out. You walk through your own story and come back seeing yourself more
                clearly — what pulls you, what fits, where to point next.
              </p>

              <p>
                <span style={HL}>Skill</span> is for when you want to know how good you
                really are at something. We bring every kind of question to that one
                skill, and when your work meets the bar, you earn a Stamp for your
                Passport.
              </p>

              <p>
                <span style={HL}>Job Specific</span> is shaped around a real role. You
                receive a Trip built to surface exactly what that work asks for, and you
                prove you can do it by doing a version of it.
              </p>

              <p>
                <span style={HL}>Journalling</span> is for the days worth keeping. So
                much happens in a career that deserves to be remembered — you capture it
                as you go, and over time you can see how far you&apos;ve come.
              </p>

              <p>
                <span style={UL}>Four Trips. One journey.</span> This is what we believe a career actually needs.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <Link
                  href="/candidates#waitlist"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-2.5 font-inter text-sm font-medium text-ink transition-all duration-200 hover:bg-[#bcd96b]"
                >
                  Join the Waitlist
                </Link>
                <Link
                  href="/candidates"
                  className="group inline-flex items-center gap-2 font-inter text-sm text-pearl/50 transition-colors hover:text-pearl"
                >
                  <span className="text-gold transition-transform duration-200 group-hover:-translate-x-1">←</span>
                  Back to Candidates
                </Link>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </main>
  );
}
