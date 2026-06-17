import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trips — Career Passport",
  description:
    "Trips are guided sessions that capture how you actually think and work — turning real experience into verifiable proof.",
};

export default function TripsPage() {
  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-ink px-6 py-32 sm:py-40">
      {/* Ambient backdrop — dark-to-transparent only, no gradients of colour */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(28,34,49,0.6) 0%, rgba(11,14,20,0) 55%), radial-gradient(80% 60% at 50% 120%, rgba(26,77,92,0.25) 0%, rgba(11,14,20,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        <p className="font-inter uppercase text-gold/90" style={{ fontSize: "var(--text-label-sm)", letterSpacing: "0.28em" }}>
          The Journey
        </p>

        <h1
          className="mt-6 font-playfair text-pearl leading-[1.08]"
          style={{ fontSize: "var(--text-display-lg)", letterSpacing: "-0.01em" }}
        >
          Trips are <span className="italic text-gold">coming soon</span>.
        </h1>

        <p
          className="mx-auto mt-6 max-w-md font-inter font-light text-pearl/70 leading-[1.75]"
          style={{ fontSize: "var(--text-body-md)" }}
        >
          A Trip is a guided session that captures how you actually think and work —
          turning real experience into proof that can&apos;t be faked. We&apos;re building it now.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/candidates#waitlist"
            className="inline-flex items-center justify-center rounded-full bg-blue px-7 py-3 font-inter text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue/90 active:scale-[0.98]"
          >
            Join the Waitlist
          </Link>
          <Link
            href="/candidates"
            className="group inline-flex items-center gap-2 font-inter text-sm text-pearl/70 transition-colors hover:text-pearl"
          >
            <span className="text-gold transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Back to Candidates
          </Link>
        </div>
      </div>
    </main>
  );
}
