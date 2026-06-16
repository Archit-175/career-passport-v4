"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import "./CompanyHowItWorks.css";

// ── INLINE SVG AVATARS (reused in the Calendar demo) ──
const MiraRaoAvatar: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="hiw-avatar" aria-hidden="true">
    <defs>
      <linearGradient id="hiw-mira-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fbe7cb" /><stop offset="1" stopColor="#efd5a6" />
      </linearGradient>
      <clipPath id="hiw-mira-clip"><circle cx="50" cy="50" r="50" /></clipPath>
    </defs>
    <g clipPath="url(#hiw-mira-clip)">
      <rect width="100" height="100" fill="url(#hiw-mira-bg)" />
      <path d="M20 100 Q25 78 50 75 Q75 78 80 100 Z" fill="#aa6b3c" />
      <path d="M38 75 Q50 82 62 75 L62 100 L38 100 Z" fill="#e8b98a" />
      <path d="M23 52 Q21 24 50 22 Q79 24 77 52 Q79 74 69 84 L65 60 Q67 45 58 39 L42 39 Q33 45 35 60 L31 84 Q21 74 23 52 Z" fill="#2c211a" />
      <rect x="43.5" y="57" width="13" height="16" rx="6" fill="#e6b787" />
      <circle cx="34" cy="47" r="3" fill="#eec196" /><circle cx="66" cy="47" r="3" fill="#eec196" />
      <ellipse cx="50" cy="45" rx="16.5" ry="19.5" fill="#f1c89c" />
      <path d="M32.5 44 Q32 24 50 23 Q68 24 67.5 44 Q63 32 51.5 32.5 Q46 32.5 43 36 Q38 38 32.5 44 Z" fill="#2c211a" />
      <ellipse cx="43.5" cy="45.5" rx="2" ry="2.5" fill="#111" /><ellipse cx="56.5" cy="45.5" rx="2" ry="2.5" fill="#111" />
      <path d="M45 55 Q50 59 55 55" stroke="#b3603a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

const ArnavNairAvatar: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="hiw-avatar" aria-hidden="true">
    <defs>
      <linearGradient id="hiw-arnav-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d1e7dd" /><stop offset="1" stopColor="#a3cfbb" />
      </linearGradient>
      <clipPath id="hiw-arnav-clip"><circle cx="50" cy="50" r="50" /></clipPath>
    </defs>
    <g clipPath="url(#hiw-arnav-clip)">
      <rect width="100" height="100" fill="url(#hiw-arnav-bg)" />
      <path d="M22 100 Q24 74 50 72 Q76 74 78 100 Z" fill="#2e4e7e" />
      <path d="M40 74 Q50 80 60 74 L60 100 L40 100 Z" fill="#e2b48c" />
      <path d="M28 35 Q28 18 50 18 Q72 18 72 35 L74 45 L26 45 Z" fill="#1a120b" />
      <rect x="43.5" y="55" width="13" height="16" rx="4" fill="#e2b48c" />
      <ellipse cx="50" cy="44" rx="16" ry="18" fill="#e2b48c" />
      <path d="M34 44 Q34 60 50 63 Q66 60 66 44 L60 48 Q50 52 40 48 Z" fill="#1a120b" />
      <ellipse cx="43.5" cy="42" rx="2" ry="2.2" fill="#111" /><ellipse cx="56.5" cy="42" rx="2" ry="2.2" fill="#111" />
      <path d="M46 53 Q50 56 54 53" stroke="#a3603d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

// ── MOTION VARIANTS ──
const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ── DARK-GLASS DEMO SHELL ──
const DemoCard: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="hiw-demo">
    <div className="hiw-demo-head">
      <span className="hiw-demo-dots" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className="hiw-demo-label">{label}</span>
    </div>
    <div className="hiw-demo-body">{children}</div>
  </div>
);

// ── DEMO 1 · BRIEF THE ROLE ──
const BriefDemo: React.FC = () => (
  <DemoCard label="VOICE BRIEF">
    <div className="hiw-mic-row">
      <span className="hiw-mic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
          <line x1="12" y1="19" x2="12" y2="21" />
        </svg>
      </span>
      <div className="hiw-mic-text">
        <span className="hiw-mic-title">Tap to speak</span>
        <span className="hiw-mic-sub">Just describe who you&rsquo;re looking for.</span>
      </div>
      <span className="hiw-wave" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
    </div>

    <p className="hiw-transcript">
      &ldquo;Senior backend engineer, 5&ndash;8 yrs, owned production payments
      systems, strong at system design&hellip;&rdquo;
    </p>

    <div className="hiw-cover">
      <div className="hiw-cover-head">
        <span>SIGNALS CAPTURED</span>
        <span className="hiw-cover-ratio">7 / 12</span>
      </div>
      <div className="hiw-cover-tags">
        {[
          ["Designation", true],
          ["Experience", true],
          ["Location", true],
          ["Salary", true],
          ["Must-haves", true],
          ["Disqualifiers", false],
          ["Red flags", false],
        ].map(([label, on]) => (
          <span key={label as string} className={`hiw-chip${on ? " on" : ""}`}>
            {on ? "✓ " : ""}{label}
          </span>
        ))}
      </div>
    </div>
  </DemoCard>
);

// ── DEMO 2 · DESIGN THE JOURNEY ──
const JourneyDemo: React.FC = () => {
  const stages = [
    { label: "Application form", state: "done" },
    { label: "Strategic Leadership Quiz", state: "active" },
    { label: "Leadership Demo", state: "" },
    { label: "Project Assignment", state: "" },
    { label: "Offer", state: "done" },
  ];
  return (
    <DemoCard label="CANDIDATE JOURNEY">
      <ul className="hiw-flow">
        {stages.map((s, i) => (
          <li key={s.label} className={`hiw-flow-step ${s.state}`}>
            <span className="hiw-flow-node" aria-hidden="true">
              {s.state === "active" && <i className="hiw-flow-pulse" />}
            </span>
            <div className="hiw-flow-body">
              <span className="hiw-flow-label">{s.label}</span>
              {s.state === "active" && (
                <span className="hiw-flow-config">10 min · every candidate · AI-scored</span>
              )}
            </div>
            {i < stages.length - 1 && <span className="hiw-flow-line" aria-hidden="true" />}
          </li>
        ))}
      </ul>
    </DemoCard>
  );
};

// ── DEMO 3 · REVIEW MOMENTS ──
const MomentsDemo: React.FC = () => {
  const cards = [
    {
      title: "Senior Backend Engineer",
      sub: "RAVISHRI · KNIGHT LEGION · 2Y",
      body: "Led a cloud migration that cut infra cost by 40%.",
      tags: [["gold", "READY TO MOVE"], ["teal", "SYSTEM DESIGN"]],
      stage: "Screened",
    },
    {
      title: "ML Engineer · NLP",
      sub: "ATULASEN · DISTRIBUTED · 1Y",
      body: "Specialises in LLM fine-tuning and predictive modeling.",
      tags: [["gold", "HIGH INTENT"], ["teal", "GO"]],
      stage: "Evaluated",
    },
  ];
  return (
    <DemoCard label="MOMENTS">
      <div className="hiw-moments-head">
        <span className="hiw-moments-dot" aria-hidden="true" />
        <span className="hiw-moments-count">12 candidate moments waiting</span>
      </div>
      {cards.map((c) => (
        <div key={c.title} className="hiw-moment">
          <div className="hiw-moment-top">
            <h5 className="hiw-moment-title">{c.title}</h5>
            <span className="hiw-moment-stage">{c.stage}</span>
          </div>
          <span className="hiw-moment-sub">{c.sub}</span>
          <p className="hiw-moment-body">{c.body}</p>
          <div className="hiw-moment-tags">
            {c.tags.map(([cls, lbl]) => (
              <span key={lbl} className={`hiw-tag ${cls}`}>{lbl}</span>
            ))}
          </div>
        </div>
      ))}
    </DemoCard>
  );
};

// ── DEMO 4 · CALENDAR FILLS ITSELF ──
const CalendarDemo: React.FC = () => {
  const rows = [
    { day: "MON", time: "10:00", Avatar: MiraRaoAvatar, name: "Mira Rao", school: "NID Bengaluru · Y4", fit: "92%", status: "Confirmed", cls: "ok" },
    { day: "TUE", time: "14:00", Avatar: ArnavNairAvatar, name: "Arnav Nair", school: "MIT WPU · Y3", fit: "86%", status: "Pending", cls: "wait" },
  ];
  return (
    <DemoCard label="UPCOMING INTERVIEWS">
      <div className="hiw-cal-list">
        {rows.map((r) => (
          <div key={r.day} className="hiw-cal-row">
            <div className="hiw-cal-when">
              <span className="hiw-cal-day">{r.day}</span>
              <span className="hiw-cal-time">{r.time}</span>
            </div>
            <div className="hiw-cal-person">
              <r.Avatar />
              <div className="hiw-cal-id">
                <span className="hiw-cal-name">{r.name}</span>
                <span className="hiw-cal-school">{r.school}</span>
              </div>
            </div>
            <div className="hiw-cal-meta">
              <span className="hiw-cal-fit">Fit {r.fit}</span>
              <span className={`hiw-cal-status ${r.cls}`}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="hiw-cal-metrics">
        <div className="hiw-metric">
          <span className="hiw-metric-num">3</span>
          <span className="hiw-metric-label">candidates completed your journey</span>
        </div>
        <div className="hiw-metric">
          <span className="hiw-metric-num">14<i>d</i></span>
          <span className="hiw-metric-label">average time to hire</span>
        </div>
      </div>
    </DemoCard>
  );
};

// ── STEP DATA ──
const steps = [
  {
    num: "01",
    kicker: "BRIEF THE ROLE",
    headline: "You describe the role.",
    body: "Not in a form. Just speak naturally — we capture the context, structure the brief, and surface the signals worth evaluating.",
    Demo: BriefDemo,
  },
  {
    num: "02",
    kicker: "DESIGN THE JOURNEY",
    headline: "You decide how candidates prove themselves.",
    body: "Choose the moments that matter — a strategic exercise, a quiz, a project. We turn your hiring philosophy into a repeatable journey.",
    Demo: JourneyDemo,
  },
  {
    num: "03",
    kicker: "REVIEW THE MOMENTS",
    headline: "You review the moments worth your attention.",
    body: "We surface the strongest signals, notable decisions, and standout responses. Instead of reviewing applications, you review evidence.",
    Demo: MomentsDemo,
  },
  {
    num: "04",
    kicker: "YOUR CALENDAR FILLS ITSELF",
    headline: "You spend time with the right candidates.",
    body: "Qualified candidates move forward automatically and interviews get scheduled. Your calendar fills with conversations, not screening.",
    Demo: CalendarDemo,
  },
];

// ── MAIN EXPORT ──
export const CompanyHowItWorks: React.FC = () => {
  const reduce = useReducedMotion();
  const viewport = { once: true, margin: "-80px" };

  return (
    <section className="hiw-section" aria-labelledby="hiw-title">
      <div className="hiw-inner">
        <header className="hiw-header">
          <span className="hiw-eyebrow">THE PROCESS</span>
          <h2 id="hiw-title" className="hiw-title">
            How it <span className="hiw-title-em">works</span>
          </h2>
          <p className="hiw-subtitle">
            You speak naturally about the role. We shape the process. You act on the moments that matter.
          </p>
        </header>

        <div className="hiw-rows">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className={`hiw-row${i % 2 === 1 ? " reverse" : ""}`}
              variants={reduce ? undefined : rowVariants}
              initial={reduce ? undefined : "hidden"}
              whileInView={reduce ? undefined : "visible"}
              viewport={viewport}
            >
              <motion.div className="hiw-row-text" variants={reduce ? undefined : itemVariants}>
                <span className="hiw-step-num">
                  {step.num}<span className="hiw-step-kicker">— {step.kicker}</span>
                </span>
                <h3 className="hiw-step-headline">{step.headline}</h3>
                <p className="hiw-step-body">{step.body}</p>
              </motion.div>

              <motion.div className="hiw-row-demo" variants={reduce ? undefined : itemVariants}>
                <step.Demo />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
