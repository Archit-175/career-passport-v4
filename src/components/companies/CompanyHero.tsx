"use client";

import { useRef } from "react";
import Image from "next/image";
import { Mic, Workflow, Filter, CalendarCheck, Sparkles } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useHeroLoad } from "@/components/loader/loaderContext";

gsap.registerPlugin(useGSAP, SplitText);

const STEPS = [
  { num: "01", icon: Mic,          label: "You speak,\nwe understand"      },
  { num: "02", icon: Workflow,     label: "We design the\nexperience"       },
  { num: "03", icon: Filter,       label: "We filter the\ncandidates for you" },
  { num: "04", icon: CalendarCheck,label: "Interviews on\nyour calendar"    },
];

export function CompanyHero() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const subtextRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLAnchorElement>(null);
  const stepsRef     = useRef<HTMLDivElement>(null);
  const { heroStart, onHeroReady } = useHeroLoad("/companies");

  useGSAP(
    () => {
      // Hold the entrance until the loader lifts, so it plays on a visible hero.
      if (!heroStart) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stepEls = stepsRef.current
          ? Array.from(stepsRef.current.querySelectorAll<HTMLElement>(".hero-step"))
          : [];

        // Clear any stale HMR GSAP inline styles (exclude ctaRef — it has React inline styles for border/bg)
        gsap.set(
          [eyebrowRef.current, subtextRef.current, headlineRef.current, ...stepEls],
          { clearProps: "all" }
        );

        const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });

        // Eyebrow pill
        tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 });

        // Headline: SplitText masked-line reveal
        const split = SplitText.create(headlineRef.current!, {
          type: "lines",
          mask: "lines",
        });

        tl.fromTo(
          split.lines,
          { y: "110%" },
          { y: "0%", duration: 0.85, stagger: 0.11, ease: "power4.out" },
          "-=0.22"
        );

        // Subtext
        tl.fromTo(subtextRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4");

        // CTA
        tl.fromTo(ctaRef.current, { autoAlpha: 0, y: 12, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.32");

        // Steps
        if (stepEls.length) {
          tl.fromTo(
            stepEls,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1 },
            "-=0.15"
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const stepEls = stepsRef.current
          ? Array.from(stepsRef.current.querySelectorAll<HTMLElement>(".hero-step"))
          : [];
        gsap.set(
          [eyebrowRef.current, headlineRef.current, subtextRef.current, ctaRef.current, ...stepEls],
          { clearProps: "all" }
        );
      });
    },
    { scope: containerRef, dependencies: [heroStart] }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >

      {/* Background image */}
      <Image
        src="/images/hero/companies.png"
        alt="Companies hero background"
        fill
        quality={90}
        priority
        className="object-cover object-center"
        sizes="100vw"
        onLoad={onHeroReady}
        ref={(el) => {
          if (el?.complete) onHeroReady();
        }}
      />

      {/* Layered overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.72) 0%, rgba(11,14,20,0.62) 25%, rgba(11,14,20,0.70) 55%, rgba(11,14,20,0.94) 82%, rgba(11,14,20,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(11,14,20,0.28)" }}
      />

      {/* Content — vertically centered as a single flowing column */}
      <div
        className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-5xl mx-auto px-6"
        style={{ paddingTop: "clamp(4rem, 10vh, 7rem)", paddingBottom: "clamp(2rem, 4vh, 3.5rem)" }}
      >

        {/* ── Upper block ── */}
        <div className="flex flex-col items-center text-center" style={{ gap: "clamp(1rem, 2vh, 1.5rem)" }}>

          {/* Eyebrow pill */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: "rgba(8, 10, 16, 0.65)",
              border: "1px solid rgba(163, 201, 64,0.35)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <Sparkles size={11} strokeWidth={1.5} style={{ color: "#A3C940" }} />
            <span
              className="font-inter font-light tracking-[0.14em] uppercase"
              style={{ fontSize: "0.72rem", color: "rgba(245,242,236,0.85)" }}
            >
              BUILT FOR MODERN HIRING TEAMS
            </span>
          </div>

          {/* Headline wrapper — SplitText target */}
          <div ref={headlineRef}>
            <h1
              className="font-playfair text-pearl leading-[1.05]"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 5.2rem)",
                letterSpacing: "-0.025em",
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}
            >
              From conversation
            </h1>
            <h1
              className="font-playfair leading-[1.05]"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 5.2rem)",
                letterSpacing: "-0.025em",
                color: "#F5F2EC",
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}
            >
              to{" "}
              <span className="italic" style={{ color: "#A3C940" }}>
                calendar.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="font-inter font-light text-pearl/70 leading-relaxed max-w-md"
            style={{ fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)", lineHeight: "1.65" }}
          >
            Tell us what you need. We handle everything
            <br />
            until your calendar is blocked.
          </p>

          {/* CTA */}
          <a
            ref={ctaRef}
            href="#waitlist"
            className="group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full font-inter font-medium transition-all duration-300"
            style={{
              fontSize: "0.9rem",
              background: "rgba(163, 201, 64,0.22)",
              border: "1.5px solid rgba(163, 201, 64,0.7)",
              color: "#F5F2EC",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 0 40px rgba(163, 201, 64,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(163, 201, 64,0.35)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(163, 201, 64,0.9)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(163, 201, 64,0.25), inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(163, 201, 64,0.22)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(163, 201, 64,0.7)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(163, 201, 64,0.15), inset 0 1px 0 rgba(255,255,255,0.12)";
            }}
          >
            Post your first role
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "#A3C940" }}
            >
              →
            </span>
          </a>
        </div>

        {/* ── Steps row ── */}
        <div className="w-full" style={{ marginTop: "clamp(2rem, 5vh, 3.5rem)" }}>
          <div
            className="w-full"
            style={{
              height: "1px",
              marginBottom: "clamp(1.2rem, 2.5vh, 2rem)",
              background:
                "linear-gradient(90deg, transparent, rgba(163, 201, 64,0.2), rgba(163, 201, 64,0.2), transparent)",
            }}
          />

          <div ref={stepsRef} className="grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:items-center md:justify-between w-full">
            {STEPS.map(({ num, icon: Icon, label }, i) => (
              <div key={num} className="flex items-center justify-center md:flex-1">

                {/* Step card */}
                <div className="hero-step flex flex-col items-center md:flex-1" style={{ gap: "clamp(0.6rem, 1.2vh, 1rem)" }}>
                  <p
                    className="font-playfair italic"
                    style={{ fontSize: "0.9rem", color: "#A3C940", letterSpacing: "0.05em" }}
                  >
                    {num}
                  </p>

                  <div
                    className="flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: "clamp(48px, 6vh, 64px)",
                      height: "clamp(48px, 6vh, 64px)",
                      background: "rgba(245,242,236,0.06)",
                      border: "1px solid rgba(245,242,236,0.2)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon size={20} strokeWidth={1.4} style={{ color: "rgba(245,242,236,0.85)" }} />
                  </div>

                  <p
                    className="font-inter font-light text-center leading-snug whitespace-pre-line"
                    style={{ fontSize: "0.8rem", color: "rgba(245,242,236,0.7)", lineHeight: "1.5" }}
                  >
                    {label}
                  </p>
                </div>

                {/* Connector — desktop row only */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex items-center gap-1 shrink-0 mb-5" style={{ width: "60px" }}>
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        backgroundImage:
                          "repeating-linear-gradient(90deg, rgba(163, 201, 64,0.45) 0px, rgba(163, 201, 64,0.45) 4px, transparent 4px, transparent 8px)",
                      }}
                    />
                    <span style={{ color: "rgba(163, 201, 64,0.55)", fontSize: "0.6rem", marginLeft: "2px" }}>›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
