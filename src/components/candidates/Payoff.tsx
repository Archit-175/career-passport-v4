import Image from "next/image";

export function Payoff() {
  return (
    <section className="relative">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background image */}
        <Image
          src="/images/section7.jpeg"
          alt="Payoff section background"
          fill
          quality={90}
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Glass card — inset from all edges, same as Bridge */}
        <div className="absolute inset-0 z-10 p-6 md:p-12">
          <div
            className="w-full h-full rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Placeholder — content coming soon */}
          </div>
        </div>

      </div>
    </section>
  );
}
