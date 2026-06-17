"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useHeroLoad } from "@/components/loader/loaderContext";

gsap.registerPlugin(useGSAP, SplitText);

export function CandidateHero() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { heroStart, onHeroReady } = useHeroLoad("/candidates");

  useGSAP(
    () => {
      // Hold the entrance until the loader lifts, so it plays on a visible hero.
      if (!heroStart) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Clear stale HMR inline styles so fromTo() targets are authoritative
        gsap.set(
          [eyebrowRef.current, subtextRef.current, ctaRef.current, headlineRef.current],
          { clearProps: "all" }
        );

        const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });

        // Eyebrow
        tl.fromTo(
          eyebrowRef.current,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55 }
        );

        // Headline: SplitText masked-line reveal
        const split = SplitText.create(headlineRef.current!, {
          type: "lines",
          mask: "lines",
        });

        split.lines.forEach((line) => {
          const mask = (line as HTMLElement).parentElement;
          if (mask) {
            mask.style.paddingBottom = "0.35em";
            mask.style.marginBottom = "-0.35em";
          }
        });

        tl.fromTo(
          split.lines,
          { y: "110%" },
          { y: "0%", duration: 0.9, stagger: 0.13, ease: "power4.out" },
          "-=0.28"
        );

        // Subtext
        tl.fromTo(
          subtextRef.current,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.45"
        );

        // CTA button
        tl.fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 14, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 },
          "-=0.38"
        );
      });

      // Reduced-motion: clear any stale state, show everything instantly
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [eyebrowRef.current, headlineRef.current, subtextRef.current, ctaRef.current],
          { clearProps: "all" }
        );
      });
    },
    { scope: containerRef, dependencies: [heroStart] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/hero/candidate.png"
        alt="Career Passport hero"
        fill
        priority
        quality={90}
        className="object-cover object-center"
        onLoad={onHeroReady}
        ref={(el) => {
          // Cached/complete images may not fire onLoad after hydration.
          if (el?.complete) onHeroReady();
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="font-inter uppercase text-gold mb-4"
          style={{ fontSize: "clamp(0.6rem, 2.4vw, 0.72rem)", letterSpacing: "0.18em" }}
        >
          A Trusted Identity in the Age of AI
        </p>

        {/* Headline — wrapper carries font-size so SplitText can't clear it.
            No whitespace-nowrap: lines wrap gracefully instead of clipping on phones. */}
        <div style={{ fontSize: "clamp(2rem, 7.5vw, 6rem)" }}>
          <h1
            ref={headlineRef}
            className="font-playfair leading-[1.12] tracking-[-0.01em] mb-8"
          >
            <span className="text-white block">Your life is a journey</span>
            <span style={{ color: "#C9A84C" }} className="block">
              worth designing.
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subtextRef}
          className="font-inter font-light leading-[1.75] text-white/90 max-w-lg mx-auto mb-10 sm:mb-12"
          style={{ fontSize: "clamp(0.95rem, 3.4vw, 1.05rem)" }}
        >
          Career Passport turns your work, your personality,
          <br className="hidden sm:block" />
          and your experiences into a trustworthy, proof-backed identity.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <Link
            href="#waitlist"
            className="inline-block px-12 py-4 rounded-full font-inter font-medium text-[1rem] text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{ backgroundColor: "#C9A84C" }}
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </section>
  );
}
