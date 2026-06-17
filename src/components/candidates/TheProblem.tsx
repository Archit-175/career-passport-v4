// import TileOverlay from "@/components/TileOverlay"; // temporarily disabled

export function TheProblem() {
  return (
    <section className="relative bg-black flex flex-col justify-center px-6 py-24">
      <div data-tile-content className="mx-auto max-w-6xl">

        {/* Label */}
        <p className="font-inter text-[0.7rem] tracking-[0.22em] uppercase text-gold text-center mb-8">
          The Reality
        </p>

        {/* Main Header */}
        <h2
          className="font-playfair text-white text-center mb-12 sm:mb-24"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: "1.1", letterSpacing: "-0.01em" }}
        >
          The best candidate doesn't always get noticed.
        </h2>

        {/* Three Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* Left Panel */}
          <div className="px-6 py-10 sm:px-10 sm:py-12 border-t border-white/10 md:border-r md:border-b-0 border-b flex flex-col gap-10">
            <span className="font-inter text-[0.68rem] tracking-[0.2em] uppercase text-white/30">01</span>
            <div className="flex flex-col gap-4">
              <p
                className="font-playfair text-white"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", lineHeight: "1.2" }}
              >
                You've worked hard.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-gold/60 shrink-0" />
                <p
                  className="font-playfair italic text-gold/80"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: "1.3" }}
                >
                  Nobody can tell.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Panel */}
          <div className="px-6 py-10 sm:px-10 sm:py-12 border-t border-white/10 md:border-r md:border-b-0 border-b flex flex-col gap-10">
            <span className="font-inter text-[0.68rem] tracking-[0.2em] uppercase text-white/30">02</span>
            <div className="flex flex-col gap-4">
              <p
                className="font-playfair text-white"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", lineHeight: "1.2" }}
              >
                Your résumé<br />
                <span className="line-through text-white/35">stands out</span>.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-gold/60 shrink-0" />
                <p
                  className="font-playfair italic text-gold/80"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: "1.3" }}
                >
                  It doesn't.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="px-6 py-10 sm:px-10 sm:py-12 border-t border-white/10 flex flex-col gap-10">
            <span className="font-inter text-[0.68rem] tracking-[0.2em] uppercase text-white/30">03</span>
            <div className="flex flex-col gap-5">
              <p
                className="font-playfair text-white"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", lineHeight: "1.25" }}
              >
                Take a trip with us<br />to stand out
              </p>
              <div className="flex items-center gap-2 group cursor-pointer w-fit">
                <span className="font-inter text-[0.8rem] tracking-[0.1em] uppercase text-gold">
                  See how it works
                </span>
                <span className="text-gold text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tile hover effect overlay */}
      {/* <TileOverlay className="absolute inset-0 z-10" /> */}
    </section>
  );
}
