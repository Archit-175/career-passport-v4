import Image from "next/image";
import Link from "next/link";
import { Link2, Compass, ShieldCheck, Stamp } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Link2,
    title: "Connect Your Signals",
    body: "Import what already exists — LinkedIn, CV, project docs.",
  },
  {
    num: "02",
    icon: Compass,
    title: "Take a Trip",
    body: "Curated sessions that capture your actual thinking in real time.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Proof is Generated",
    body: "Every Trip produces structured artifacts which can't be faked.",
  },
  {
    num: "04",
    icon: Stamp,
    title: "Earn Stamps. Build Your Passport.",
    body: "Each stamp adds depth. Your passport grows with every proof.",
  },
];

export function HowVisibilityWorks() {
  return (
    <section className="bg-black min-h-screen flex flex-col justify-center overflow-hidden py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-16 flex flex-col md:flex-row items-stretch">

        {/* ── Left text — 38% ── */}
        <div className="md:w-[38%] shrink-0 flex flex-col justify-center gap-7">
          <p className="font-inter text-[0.68rem] tracking-[0.22em] uppercase text-gold">
            How Visibility Works
          </p>

          <h2
            className="font-playfair text-white leading-[1.08]"
            style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.6rem)", letterSpacing: "-0.02em" }}
          >
            We{" "}
            <span className="italic" style={{ color: "#C9A84C" }}>listen</span>
            {" "}to you,{" "}
            <br />
            <span className="italic" style={{ color: "#C9A84C" }}>nudge</span>
            {" "}you and{" "}
            <span className="italic" style={{ color: "#C9A84C" }}>build</span>
            <br />
            your identity.
          </h2>

          <p
            className="font-inter font-light text-white/55 leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
          >
            Honestly talk about who you are<br />
            and what your aspirations are.
          </p>

          <Link
            href="/trips"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full font-inter text-[0.82rem] font-light w-fit transition-all duration-200 hover:bg-gold/10 group"
            style={{ border: "1px solid rgba(201,168,76,0.45)", color: "#C9A84C" }}
          >
            More About Trip
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* ── 14% gap ── */}
        <div className="md:w-[14%] shrink-0" />

        {/* ── Right image + cards — 48% ── */}
        <div
          className="md:w-[48%] shrink-0 relative"
          style={{ height: "clamp(460px, 74vh, 700px)" }}
        >
          {/* Image fills the container */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Image
              src="/images/trip.jpeg"
              alt="Take a Trip"
              fill
              quality={90}
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.88) 100%)",
              }}
            />
          </div>

          {/* Cards — right half of the image, vertically centred */}
          <div className="absolute inset-y-8 right-5 w-[55%] flex flex-col justify-center gap-3">
            {STEPS.map(({ num, icon: Icon, title, body }) => (
              <div
                key={num}
                className="group flex items-start gap-3 rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(8, 10, 16, 0.92)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                }}
              >
                {/* Icon circle */}
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background: "rgba(75,123,236,0.15)",
                    border: "1px solid rgba(75,123,236,0.35)",
                  }}
                >
                  <Icon size={12} style={{ color: "#4B7BEC" }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-inter text-[0.6rem] tracking-[0.18em] uppercase mb-1"
                    style={{ color: "#C9A84C" }}
                  >
                    {num}
                  </p>
                  <p
                    className="font-inter font-semibold text-[0.78rem] uppercase tracking-wide leading-tight mb-1"
                    style={{ color: "#C9A84C" }}
                  >
                    {title}
                  </p>
                  <p className="font-inter font-light text-white/75 text-[0.73rem] leading-snug">
                    {body}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center self-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="text-[0.6rem]" style={{ color: "#C9A84C" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
