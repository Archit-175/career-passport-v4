import Image from "next/image";
import Link from "next/link";

export function CandidateHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero candidate.png"
        alt="Career Passport hero"
        fill
        priority
        quality={90}
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <p className="font-inter text-[0.72rem] tracking-[0.22em] uppercase text-gold whitespace-nowrap mb-4 animate-fade-up">
          A Trusted Identity in the Age of AI
        </p>

        {/* Headline */}
        <h1 className="font-playfair leading-[1.06] tracking-[-0.01em] mb-8 animate-fade-up delay-100"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
        >
          <span className="text-white whitespace-nowrap block">Your life is a journey</span>
          <span style={{ color: "#C9A84C" }} className="whitespace-nowrap block">worth designing.</span>
        </h1>

        {/* Subheadline */}
        <p className="font-inter font-light text-[1.05rem] leading-[1.75] text-white/90 max-w-lg mx-auto mb-12 animate-fade-up delay-200">
          Career Passport turns your work, your personality,
          <br className="hidden sm:block" />
          and your experiences into a trustworthy, proof-backed identity.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-300">
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
