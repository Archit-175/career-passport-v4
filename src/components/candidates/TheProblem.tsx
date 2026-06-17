// import TileOverlay from "@/components/TileOverlay"; // temporarily disabled

const ITEMS = [
  {
    n: "01",
    line: (
      <>
        You&apos;ve worked hard.
      </>
    ),
    accent: "Nobody can tell.",
  },
  {
    n: "02",
    line: (
      <>
        Your résumé <span className="line-through text-white/35">stands out</span>.
      </>
    ),
    accent: "It doesn't.",
  },
  {
    n: "03",
    line: (
      <>
        Take a trip with us
        <br />
        to stand out
      </>
    ),
    accent: null,
    cta: true,
  },
];

export function TheProblem() {
  return (
    <section className="relative bg-black px-6 py-24 sm:py-32">
      <div data-tile-content className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 lg:gap-20">

        {/* ── LEFT 40% — heading block ───────────────────────── */}
        <div className="lg:w-2/5 lg:shrink-0">
          {/* Eyebrow with dot */}
          <div className="flex items-center gap-2.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span className="font-inter text-[0.7rem] tracking-[0.22em] uppercase text-white/50">
              A Trusted Identity in the Age of AI
            </span>
          </div>

          {/* Faint divider */}
          <div className="h-px w-full bg-white/10 mb-8" />

          {/* Headline */}
          <h2
            className="font-playfair text-white/90 leading-[1.1] tracking-[-0.01em]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            The best candidate doesn&apos;t always{" "}
            <span className="text-gold">get noticed.</span>
          </h2>

          {/* Body */}
          <p
            className="font-inter font-light leading-[1.7] text-white/55 mt-7 max-w-md"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
          >
            Career Passport turns your work, your personality, and your
            experiences into a{" "}
            <span className="text-gold/90">trustworthy, proof-backed identity.</span>
          </p>
        </div>

        {/* ── RIGHT 60% — minimalist numbered column ─────────── */}
        <div className="lg:flex-1 pl-50 flex flex-col justify-center gap-10 sm:gap-12">
          {ITEMS.map((item) => (
            <div key={item.n} className="flex flex-col gap-4">
              <span className="font-inter text-[0.68rem] tracking-[0.24em] uppercase text-white/25">
                {item.n}
              </span>
              <p
                className="font-playfair text-white leading-[1.25]"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
              >
                {item.line}
              </p>

              {item.accent && (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-px bg-gold/60 shrink-0" />
                  <p
                    className="font-playfair italic text-gold/80"
                    style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)" }}
                  >
                    {item.accent}
                  </p>
                </div>
              )}

              {item.cta && (
                <div className="flex items-center gap-2 group cursor-pointer w-fit mt-1">
                  <span className="font-inter text-[0.78rem] tracking-[0.1em] uppercase text-gold">
                    See how it works
                  </span>
                  <span className="text-gold text-sm transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Tile hover effect overlay */}
      {/* <TileOverlay className="absolute inset-0 z-10" /> */}
    </section>
  );
}
