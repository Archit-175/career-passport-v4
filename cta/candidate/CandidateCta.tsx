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

// ── CANDIDATE CTA SECTION ──
// Dependencies: framer-motion
// CSS: import "./CandidateCta.css"
// Video: place `CTABGV.mp4` at /public/common/CTABGV.mp4 (or update videoSrc prop)
//
// Theme tokens (override in your CSS before importing):
//   --cta-bg       section background         (default #f8ead9)
//   --cta-accent   gold color for highlights  (default #B87A3A)
//
// Form submit: replace the console.log inside handleSubmit with your API call.
// The toast system is self-contained — success/error messages update automatically.
//
// No snap-scroll dependency. Section scrolls normally.

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface CandidateCtaProps {
  videoSrc?: string;
}

export const CandidateCta: React.FC<CandidateCtaProps> = ({
  videoSrc = "/common/CTABGV.mp4",
}) => {
  const sectionRef = useReveal<HTMLElement>();
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<Toast | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setToast({ id: Date.now(), message: "Please enter a valid email address.", type: "error" });
      return;
    }

    // ↓ Replace this with your API call
    console.log("Waitlist signup:", email);

    setToast({
      id: Date.now(),
      message: "✨ Thanks for joining the waitlist!\nWe'll keep you updated on Career Passport.",
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
      className="cta-shell reveal-up"
      aria-label="Join the waitlist"
      id="waitlist"
    >
      {/* Background video */}
      <div className="cta-bg-layer">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="cta-bg-image"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="cta-bg-overlay-fade" />
      </div>

      {/* Content */}
      <div className="cta-content-container">
        <p className="cta-eyebrow">YOU'RE ALMOST THERE</p>

        <h2 className="cta-heading">
          Ready to document,<br />
          prove, and own <span className="cta-heading-highlight">your journey?</span>
        </h2>

        <p className="cta-description">
          Join the waitlist to be among the first to experience Career Passport.
          Early access drops soon.
        </p>

        <form onSubmit={handleSubmit} className="cta-form-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="cta-input-field"
            aria-label="Email address"
            required
          />
          <button type="submit" className="cta-submit-btn" aria-label="Join waitlist">
            Join the waitlist
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cta-btn-arrow">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div className="cta-trust-row">
          <div className="cta-trust-item">
            <div className="cta-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <span className="cta-trust-text">No resume required</span>
          </div>

          <span className="cta-trust-divider" aria-hidden="true">|</span>

          <div className="cta-trust-item">
            <div className="cta-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="cta-trust-text">No spam. Ever.</span>
          </div>

          <span className="cta-trust-divider" aria-hidden="true">|</span>

          <div className="cta-trust-item">
            <div className="cta-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <span className="cta-trust-text">Be the first to know</span>
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
              className={`cta-toast-new cta-toast-new--${toast.type}`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="cta-bottom-tagline">BUILT FOR AMBITIOUS ONES</div>
      </div>
    </section>
  );
};
