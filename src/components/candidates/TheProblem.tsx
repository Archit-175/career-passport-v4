// import TileOverlay from "@/components/TileOverlay"; // temporarily disabled
import Link from "next/link";

const ITEMS = [
  {
    n: "01",
    line: <>You hit apply.</>,
    accent: "It went nowhere.",
  },
  {
    n: "02",
    line: (
      <>
        A person <span className="line-through opacity-35">reads</span> every résumé.
      </>
    ),
    accent: "Software does.",
  },
  {
    n: "03",
    line: <>What gets you noticed now?</>,
    accent: "Proof.",
    cta: true,
  },
];

export function TheProblem() {
  return (
    <section className="relative bg-black px-6 py-20 sm:py-28 lg:py-32">
      <div
        data-tile-content
        className="mx-auto max-w-6xl flex flex-col lg:flex-row lg:gap-20"
      >
        {/* ── LEFT — editorial block ───────────────────────────── */}
        <div className="lg:w-2/5 lg:shrink-0 pb-12 lg:pb-0 border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/[0.08] lg:pr-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span className="font-inter text-[0.68rem] tracking-[0.22em] uppercase text-white/45">
              The reality
            </span>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10 mb-7" />

          {/* Headline */}
          <h2
            className="font-playfair text-white/90 leading-[1.12] tracking-[-0.01em]"
            style={{ fontSize: "clamp(1.65rem, 3.8vw, 3.1rem)" }}
          >
            The best candidate doesn&apos;t always{" "}
            <span className="text-gold">get noticed.</span>
          </h2>

          {/* Body */}
          <p
            className="font-inter font-light leading-[1.75] text-white/45 mt-6"
            style={{ fontSize: "clamp(0.88rem, 1.3vw, 0.97rem)" }}
          >
            Talent rarely survives the first scan.
          </p>
        </div>

        {/* ── RIGHT — numbered column ──────────────────────────── */}
        <div className="lg:flex-1 pt-10 lg:pt-0 flex flex-col justify-center divide-y divide-white/[0.07]">
          {ITEMS.map((item) => (
            <div
              key={item.n}
              className="flex gap-6 sm:gap-8 py-8 sm:py-9 first:pt-0 lg:first:pt-0 last:pb-0"
            >
              {/* Number */}
              <span
                className="font-mono text-white/20 shrink-0 leading-none mt-[0.2em]"
                style={{ fontSize: "clamp(0.65rem, 1vw, 0.72rem)", letterSpacing: "0.18em" }}
              >
                {item.n}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <p
                  className="font-playfair text-white/90 leading-[1.25]"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.85rem)" }}
                >
                  {item.line}
                </p>

                {item.accent && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-px bg-gold/55 shrink-0" />
                    <p
                      className="font-playfair italic text-gold/75"
                      style={{ fontSize: "clamp(0.95rem, 1.45vw, 1.2rem)" }}
                    >
                      {item.accent}
                    </p>
                  </div>
                )}

                {item.cta && (
                  <Link
                    href="#globe"
                    className="flex items-center gap-2 group w-fit mt-2"
                  >
                    <span
                      className="font-inter uppercase text-gold tracking-[0.12em] transition-opacity duration-200 group-hover:opacity-70"
                      style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.72rem)" }}
                    >
                      See how it works
                    </span>
                    <span className="text-gold text-xs transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <TileOverlay className="absolute inset-0 z-10" /> */}
    </section>
  );
}
