"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slotText } from "slot-text";
import type { SlotTextController } from "slot-text";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./CompanyCta.css";

gsap.registerPlugin(useGSAP, SplitText);

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface CompanyCtaProps {
  videoSrc?: string;
}

export const CompanyCta: React.FC<CompanyCtaProps> = ({
  videoSrc = "/video/cta-background.mp4",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<Toast | null>(null);

  const btnLabelRef = useRef<HTMLSpanElement>(null);
  const btnLabelCtrl = useRef<SlotTextController | null>(null);

  useEffect(() => {
    if (!btnLabelRef.current) return;
    btnLabelCtrl.current = slotText(btnLabelRef.current, "Connect with us");
    return () => btnLabelCtrl.current?.destroy();
  }, []);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(
        [eyebrowRef.current, headingRef.current, descRef.current, formRef.current, trustRef.current],
        { clearProps: "all" }
      );

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 });

      const split = SplitText.create(headingRef.current!, { type: "lines", mask: "lines" });
      split.lines.forEach((line) => {
        const mask = (line as HTMLElement).parentElement;
        if (mask) {
          mask.style.paddingBottom = "0.35em";
          mask.style.marginBottom = "-0.35em";
          mask.style.paddingRight = "0.15em";
          mask.style.marginRight = "-0.15em";
        }
      });
      tl.fromTo(
        split.lines,
        { y: "110%" },
        { y: "0%", duration: 0.9, stagger: 0.12, ease: "power4.out" },
        "-=0.25"
      );

      tl.fromTo(descRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.5");
      tl.fromTo(formRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.42");
      tl.fromTo(trustRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35");

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { tl.play(); obs.unobserve(el); } },
        { threshold: 0.05 }
      );
      obs.observe(el);

      return () => obs.disconnect();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [eyebrowRef.current, headingRef.current, descRef.current, formRef.current, trustRef.current],
        { clearProps: "all" }
      );
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setToast({ id: Date.now(), message: "Please enter a valid work email address.", type: "error" });
      btnLabelCtrl.current?.flash("Check email", { enter: { direction: "down" }, exit: { direction: "up" } });
      return;
    }

    console.log("Company CTA waitlist signup:", email);

    btnLabelCtrl.current?.set("We'll be in touch!", { direction: "up" });
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
      ref={containerRef}
      className="company-cta-shell"
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
        <p ref={eyebrowRef} className="company-cta-eyebrow">YOU'RE ALMOST THERE</p>

        <h2 ref={headingRef} className="company-cta-heading">
          Ready to<br />
          <span className="company-cta-heading-highlight">hire differently?</span>
        </h2>

        <p ref={descRef} className="company-cta-description">
          Tell us what you're hiring for and we'll shape the journey.<br />
          Your first trip can go live within 24 hours.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="company-cta-form-row">
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
            <span ref={btnLabelRef} />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="company-cta-btn-arrow">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div ref={trustRef} className="company-cta-trust-row">
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
