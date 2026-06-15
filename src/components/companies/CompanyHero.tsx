"use client";

import Image from "next/image";
import { Mic, Workflow, Filter, CalendarCheck, Sparkles } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Mic,
    label: "You speak,\nwe understand",
  },
  {
    num: "02",
    icon: Workflow,
    label: "We design the\nexperience",
  },
  {
    num: "03",
    icon: Filter,
    label: "We filter the\ncandidates for you",
  },
  {
    num: "04",
    icon: CalendarCheck,
    label: "Interviews on\nyour calendar",
  },
];

export function CompanyHero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background image */}
      <Image
        src="/images/companies hero.png"
        alt="Companies hero background"
        fill
        quality={95}
        priority
        className="object-cover object-center"
      />

      {/* Layered overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(11,14,20,0.4) 0%, rgba(11,14,20,0.25) 30%, rgba(11,14,20,0.5) 65%, rgba(11,14,20,0.88) 100%)",
        }}
      />

      {/* Content — fills height, evenly spaced */}
      <div className="relative z-10 flex flex-col items-center justify-between flex-1 w-full max-w-5xl mx-auto px-6 pt-36 pb-14">

        {/* ── Upper: eyebrow + headline + sub + CTA ── */}
        <div className="flex flex-col items-center text-center gap-7">

          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: "rgba(8, 10, 16, 0.65)",
              border: "1px solid rgba(201,168,76,0.35)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <Sparkles size={11} strokeWidth={1.5} style={{ color: "#C9A84C" }} />
            <span
              className="font-inter font-light tracking-[0.14em] uppercase"
              style={{ fontSize: "0.72rem", color: "rgba(245,242,236,0.85)" }}
            >
              For hiring teams
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1
              className="font-playfair text-pearl leading-[1.05]"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
                letterSpacing: "-0.025em",
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}
            >
              From conversation
            </h1>
            <h1
              className="font-playfair leading-[1.05]"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
                letterSpacing: "-0.025em",
                color: "#F5F2EC",
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}
            >
              to{" "}
              <span
                className="italic"
                style={{ color: "#C9A84C" }}
              >
                calendar.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="font-inter font-light text-pearl/70 leading-relaxed max-w-md"
            style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", lineHeight: "1.7" }}
          >
            Tell us what you need. We handle everything<br />
            until your calendar is blocked.
          </p>

          {/* CTA */}
          <a
            href="#waitlist"
            className="group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full font-inter font-medium transition-all duration-300"
            style={{
              fontSize: "0.9rem",
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#F5F2EC",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 0 32px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.2)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.7)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)";
            }}
          >
            Post your first role
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "#C9A84C" }}
            >
              →
            </span>
          </a>
        </div>

        {/* ── Lower: 4-step flow ── */}
        <div className="w-full flex items-center justify-center mt-16">

          {/* Thin gold rule above steps */}
          <div className="w-full">
            <div
              className="w-full mb-10"
              style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(201,168,76,0.2), transparent)" }}
            />

            <div className="flex items-center justify-between w-full">
              {STEPS.map(({ num, icon: Icon, label }, i) => (
                <div key={num} className="flex items-center flex-1">

                  {/* Step card */}
                  <div className="flex flex-col items-center gap-4 flex-1">
                    {/* Number */}
                    <p
                      className="font-playfair italic"
                      style={{ fontSize: "1rem", color: "#C9A84C", letterSpacing: "0.05em" }}
                    >
                      {num}
                    </p>

                    {/* Icon circle */}
                    <div
                      className="flex items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: "rgba(245,242,236,0.06)",
                        border: "1px solid rgba(245,242,236,0.2)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.4}
                        style={{ color: "rgba(245,242,236,0.85)" }}
                      />
                    </div>

                    {/* Label */}
                    <p
                      className="font-inter font-light text-center leading-snug whitespace-pre-line"
                      style={{ fontSize: "0.82rem", color: "rgba(245,242,236,0.7)", lineHeight: "1.55" }}
                    >
                      {label}
                    </p>
                  </div>

                  {/* Connector */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex items-center gap-1 shrink-0 mb-6"
                      style={{ width: "60px" }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "1px",
                          backgroundImage: "repeating-linear-gradient(90deg, rgba(201,168,76,0.45) 0px, rgba(201,168,76,0.45) 4px, transparent 4px, transparent 8px)",
                        }}
                      />
                      <span style={{ color: "rgba(201,168,76,0.55)", fontSize: "0.6rem", marginLeft: "2px" }}>›</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
