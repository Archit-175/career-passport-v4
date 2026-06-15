"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── INLINED: useReveal ──
// Adds `.in` class when the element enters the viewport.
function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.01) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// ── COMPANY CTA SECTION ──
// Dependencies: framer-motion
// CSS: import "./CompanyCta.css"
// Video: place `CTABGV.mp4` at /public/common/CTABGV.mp4 (or update videoSrc prop)
//
// Theme tokens (override in your CSS before importing):
//   --company-cta-bg      section background      (default #fcebd1)
//   --company-cta-accent  gold highlights / icons (default #B7792A)
//
// Form submit: replace the console.log inside handleSubmit with your API call.
// Toast system is self-contained — success/error messages update automatically.
//
// No snap-scroll dependency. Section scrolls normally.

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface CompanyCtaProps {
  videoSrc?: string;
}

export const CompanyCta: React.FC<CompanyCtaProps> = ({
  videoSrc = "/common/CTABGV.mp4",
}) => {
  const sectionRef = useReveal<HTMLElement>();
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<Toast | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setToast({ id: Date.now(), message: "Please enter a valid work email address.", type: "error" });
      return;
    }

    // ↓ Replace this with your API call
    console.log("Company CTA waitlist signup:", email);

    setToast({
      id: Date.now(),
      message: "✨ Thank you! We'll reach out to design your journey within 24 hours.",
      type: "success",
    });
    setEmail("");
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <section
      ref={sectionRef}
      className="company-cta-shell reveal-up"
      aria-label="Ready to hire differently"
      id="company-waitlist"
    >
      {/* Background video */}
      <div className="company-cta-bg-layer">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="company-cta-bg-image"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="company-cta-bg-overlay-fade" />
      </div>

      {/* Content */}
      <div className="company-cta-content-container">
        <p className="company-cta-eyebrow">YOU'RE ALMOST THERE</p>

        <h2 className="company-cta-heading">
          Ready to<br />
          <span className="company-cta-heading-highlight">hire differently?</span>
        </h2>

        <p className="company-cta-description">
          Tell us what you're hiring for and we'll shape the journey.<br />
          Your first trip can go live within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="company-cta-form-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            className="company-cta-input-field"
            aria-label="Work email address"
            required
          />
          <button type="submit" className="company-cta-submit-btn" aria-label="Connect with us">
            Connect with us
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="company-cta-btn-arrow">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div className="company-cta-trust-row">
          <div className="company-cta-trust-item">
            <div className="company-cta-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12l4 6-10 13L2 9z" />
                <path d="M11 3 8 9l4 13 4-13-3-6" />
                <path d="M2 9h20" />
              </svg>
            </div>
            <span className="company-cta-trust-text">Free to start</span>
          </div>

          <span className="company-cta-trust-divider" aria-hidden="true">|</span>

          <div className="company-cta-trust-item">
            <div className="company-cta-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="company-cta-trust-text">Pay only when you hire</span>
          </div>

          <span className="company-cta-trust-divider" aria-hidden="true">|</span>

          <div className="company-cta-trust-item">
            <div className="company-cta-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
            </div>
            <span className="company-cta-trust-text">Cancel anytime</span>
          </div>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`company-cta-toast-new company-cta-toast-new--${toast.type}`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="company-cta-bottom-tagline">BUILT FOR MODERN HIRING TEAMS</div>
      </div>
    </section>
  );
};
