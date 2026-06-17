"use client";

import { useEffect, useState } from "react";
import type { LoaderPhase } from "./loaderContext";

/** Branded full-screen splash. Driven entirely by the parent's `phase`. */
export function Loader({ phase }: { phase: LoaderPhase }) {
  const [mounted, setMounted] = useState(true);

  // Keep mounted through the fade-out, then unmount so it stops capturing taps.
  useEffect(() => {
    if (phase === "idle") {
      const t = setTimeout(() => setMounted(false), 600);
      return () => clearTimeout(t);
    }
    setMounted(true);
  }, [phase]);

  if (!mounted) return null;

  const hidden = phase === "idle";

  return (
    <div
      className="loader-overlay"
      data-hidden={hidden}
      aria-hidden={hidden}
      role="status"
      aria-live="polite"
    >
      <span className="loader-wordmark">
        <span style={{ color: "var(--pearl)" }}>Career </span>
        <span className="text-gold-shimmer">Passport</span>
      </span>
      <span className="loader-progress" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
