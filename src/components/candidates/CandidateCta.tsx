"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slotText } from "slot-text";
import type { SlotTextController } from "slot-text";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./CandidateCta.css";

gsap.registerPlugin(useGSAP, SplitText);

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface CandidateCtaProps {
  videoSrc?: string;
}

export const CandidateCta: React.FC<CandidateCtaProps> = ({
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
    btnLabelCtrl.current = slotText(btnLabelRef.current, "Join the waitlist");
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
      setToast({ id: Date.now(), message: "Please enter a valid email address.", type: "error" });
      btnLabelCtrl.current?.flash("Check email", { enter: { direction: "down" }, exit: { direction: "up" } });
      return;
    }

    console.log("Waitlist signup:", email);

    btnLabelCtrl.current?.set("You're in!", { direction: "up" });
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
      ref={containerRef}
      className="cta-shell"
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
        <p ref={eyebrowRef} className="cta-eyebrow">YOU'RE ALMOST THERE</p>

        <h2 ref={headingRef} className="cta-heading">
          Ready to document,<br />
          prove, and own <span className="cta-heading-highlight">your journey?</span>
        </h2>

        <p ref={descRef} className="cta-description">
          Join the waitlist to be among the first to experience Career Passport.
          Early access drops soon.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="cta-form-row">
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
            <span ref={btnLabelRef} />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cta-btn-arrow">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div ref={trustRef} className="cta-trust-row">
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
