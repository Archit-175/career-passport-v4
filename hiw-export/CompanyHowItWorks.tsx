"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── SUBCOMPONENTS: INDIVIDUAL PRODUCT SHOWCASE PANELS ──

const BriefTheRolePanel: React.FC = () => {
  return (
    <div className="hiw-visual-container hiw-brief-visual">
      <div className="hiw-brief-grid">
        {/* Left Column: Voice Briefing & Text Area */}
        <div className="hiw-brief-left-col">
          <div className="hiw-voice-panel">
            <div className="hiw-voice-mic-wrapper">
              <div className="hiw-voice-mic-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2f8e64" strokeWidth="1.5">
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                  <line x1="12" y1="19" x2="12" y2="21" />
                </svg>
              </div>
            </div>
            <div className="hiw-voice-text-box">
              <span className="hiw-voice-title">Tap to speak</span>
              <span className="hiw-voice-subtitle">A good note will touch on every required signal below.</span>
            </div>
          </div>

          <div className="hiw-brief-text-area">
            <textarea
              className="hiw-brief-textarea"
              readOnly
              value="I'm looking for a senior backend engineer with 5–8 years of experience, preferably in Bangalore or open to hybrid work. They should have owned production services, worked on payments or high-scale systems, and be comfortable with Go or Java, PostgreSQL, Redis, queues, APIs, monitoring, and on-call ownership. Budget is around ₹45–60L. Must be strong at system design, debugging, and taking responsibility for services end-to-end. Avoid people who have only built CRUD apps, need too much hand-holding, or haven't handled production incidents."
            />
          </div>
        </div>

        {/* Right Column: Context Tags */}
        <div className="hiw-brief-right-col">
          <span className="hiw-box-title">CONTEXT TAGS</span>
          <div className="hiw-tag-checklist">
            {["Confidential", "No upper salary cap", "New position", "Replacement hiring", "1st principle thinker", "AI tool power user", "Any experience works"].map((label) => (
              <label key={label} className="hiw-checklist-item">
                <span className="hiw-check-custom"></span>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Coverage Checklist */}
      <div className="hiw-coverage">
        <div className="hiw-coverage-header">
          <span className="hiw-box-title">COVERAGE CHECKLIST</span>
          <span className="hiw-coverage-ratio">7/12 COVERED</span>
        </div>
        <div className="hiw-coverage-tags">
          {[
            { label: "Designation", active: true },
            { label: "Experience (in yrs)", active: true },
            { label: "Location", active: true },
            { label: "WFO/WFH", active: true },
            { label: "Salary", active: true },
            { label: "Industry type", active: true },
            { label: "Company type", active: false },
            { label: "Experience type", active: false },
            { label: "Must haves", active: true },
            { label: "Disqualifier", active: false },
            { label: "Red flags", active: false },
            { label: "Thoughts on search strategy", active: false },
          ].map(({ label, active }) => (
            <span key={label} className={`hiw-cov-tag${active ? " active" : ""}`}>
              {active ? `✓ ${label}` : label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const DesignTheJourneyPanel: React.FC = () => {
  return (
    <div className="hiw-visual-container hiw-design-visual">
      {/* Pipeline Stages Cards Row */}
      <div className="hiw-pipeline-stages-container">
        {[
          { label: "Application form", locked: true },
          null,
          { label: "Strategic Leadership Quiz", active: true },
          null,
          { label: "Leadership Demo" },
          null,
          { label: "Project Planning Assignment" },
          null,
          { label: "Offer", locked: true },
        ].map((item, i) => {
          if (item === null) {
            return (
              <div key={i} className="hiw-pipeline-connector">
                <div className="hiw-plus-circle">+</div>
              </div>
            );
          }
          return (
            <div key={i} className={`hiw-pipeline-card${item.active ? " active" : ""}`}>
              <div className="hiw-pcard-header">
                {item.locked && (
                  <svg className="hiw-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
              </div>
              <span className="hiw-pcard-val">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Stage Configuration & Content Columns */}
      <div className="hiw-stage-columns">
        <div className="hiw-configure-panel">
          <span className="hiw-config-stage-num">02 · CONFIGURE STAGE</span>
          <h4 className="hiw-stage-title">Strategic Leadership Quiz</h4>

          <div className="hiw-intent-box">
            <span className="hiw-intent-title">INTENT THIS STAGE CHECKS</span>
            <p className="hiw-intent-text">
              A quiz allows for assessing strategic thinking and decision-making skills in a structured manner.
            </p>
          </div>

          <div className="hiw-config-grid">
            {["DOMAIN", "BAND", "SKILL", "RUNG", "SUB-SKILL"].map((label) => (
              <div key={label} className="hiw-config-field">
                <span className="hiw-config-label">{label}</span>
                <div className="hiw-config-value-wrapper">
                  <span className="hiw-config-value"></span>
                  <span className="dropdown-arrow">▾</span>
                </div>
              </div>
            ))}
            <div className="hiw-config-field">
              <span className="hiw-config-label">DURATION</span>
              <div className="hiw-stepper-wrapper">
                <button className="hiw-stepper-btn">-</button>
                <span className="hiw-stepper-val">10 min</span>
                <button className="hiw-stepper-btn">+</button>
              </div>
            </div>
          </div>

          <div className="hiw-who-takes-section">
            <span className="hiw-config-label">WHO TAKES THIS</span>
            <div className="hiw-radio-group">
              <label className="hiw-radio-item">
                <span className="hiw-radio-custom checked"></span>
                <span>Every candidate</span>
              </label>
              <label className="hiw-radio-item">
                <span className="hiw-radio-custom"></span>
                <span>Gated · top performers</span>
              </label>
            </div>
          </div>
        </div>

        <div className="hiw-quiz-content-panel">
          <div className="hiw-quiz-header">
            <div className="hiw-quiz-header-left">
              <span className="hiw-config-stage-num">02 · QUIZ CONTENT</span>
              <span className="hiw-badge-ai">✨ AI GENERATED</span>
            </div>
            <span className="hiw-regenerate-btn">⟳ Regenerate</span>
          </div>

          <div className="hiw-quiz-items-list">
            <div className="hiw-quiz-item-card">
              <div className="hiw-quiz-item-header">
                <span className="hiw-quiz-item-lbl">ITEM 01</span>
                <svg className="hiw-trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <input className="hiw-quiz-item-title-input" readOnly value="Quiz Introduction" />
              <textarea className="hiw-quiz-item-textarea" readOnly value="Welcome to the Strategic Leadership Quiz. You will be presented with scenarios requiring strategic decision-making and prioritization." />
            </div>

            <div className="hiw-quiz-item-card">
              <div className="hiw-quiz-item-header">
                <span className="hiw-quiz-item-lbl">ITEM 02</span>
                <svg className="hiw-trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <input className="hiw-quiz-item-title-input" readOnly value="Scenario 1" />
              <textarea className="hiw-quiz-item-textarea" readOnly value="A key project is behind schedule. How do you prioritize your team's efforts?" />
              <div className="hiw-quiz-choices-grid">
                {[
                  "Focus on the most critical tasks to meet the deadline.",
                  "Reassign resources from less urgent projects.",
                  "Request an extension from stakeholders.",
                  "Increase working hours for the team.",
                ].map((choice) => (
                  <span key={choice} className="hiw-quiz-choice-pill">{choice}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── INLINE SVG AVATARS ──
const MiraRaoAvatar: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="hiw-cand-img-avatar">
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
      <circle cx="44.2" cy="44.8" r="0.7" fill="#fff" opacity="0.85" /><circle cx="57.2" cy="44.8" r="0.7" fill="#fff" opacity="0.85" />
      <path d="M50 47 L48.4 52 Q50 53 51.6 52" stroke="#d99f6d" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M45 55 Q50 59 55 55" stroke="#b3603a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

const ArnavNairAvatar: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="hiw-cand-img-avatar">
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
      <path d="M42 49 Q50 51 58 49 Q50 47 42 49 Z" fill="#1a120b" />
      <ellipse cx="43.5" cy="42" rx="2" ry="2.2" fill="#111" /><ellipse cx="56.5" cy="42" rx="2" ry="2.2" fill="#111" />
      <path d="M46 53 Q50 56 54 53" stroke="#a3603d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

const MeeraIyerAvatar: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="hiw-cand-img-avatar">
    <defs>
      <linearGradient id="hiw-meera-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f8d7da" /><stop offset="1" stopColor="#f5c2c7" />
      </linearGradient>
      <clipPath id="hiw-meera-clip"><circle cx="50" cy="50" r="50" /></clipPath>
    </defs>
    <g clipPath="url(#hiw-meera-clip)">
      <rect width="100" height="100" fill="url(#hiw-meera-bg)" />
      <path d="M22 100 Q24 78 50 74 Q76 78 78 100 Z" fill="#7d3c98" />
      <path d="M40 76 Q50 82 60 76 L60 100 L40 100 Z" fill="#e8a87c" />
      <path d="M25 45 Q20 22 50 20 Q80 22 75 45 Q82 65 72 85 L65 55 Q68 40 50 40 Q32 40 35 55 L28 85 Q18 65 25 45 Z" fill="#4a2711" />
      <rect x="43.5" y="57" width="13" height="16" rx="6" fill="#e8a87c" />
      <ellipse cx="50" cy="45" rx="16.5" ry="19.5" fill="#f3ba95" />
      <ellipse cx="43.5" cy="45.5" rx="2" ry="2.5" fill="#111" /><ellipse cx="56.5" cy="45.5" rx="2" ry="2.5" fill="#111" />
      <path d="M45 55 Q50 59 55 55" stroke="#b3603a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

const ReviewMomentsPanel: React.FC = () => (
  <div className="hiw-visual-container hiw-review-visual">
    <div className="hiw-moments-counter-clean">
      <span className="hiw-moments-action-tag-clean">ACTION ON YOU</span>
      <h4 className="hiw-moments-count-clean">12 candidate <span className="moments-italic">moments</span> waiting</h4>
      <span className="hiw-moments-sub-clean">Tasks requiring your immediate intervention.</span>
    </div>

    <div className="hiw-section-group">
      <div className="hiw-section-header">
        <span className="hiw-section-dot dot-orange"></span>
        <span className="hiw-section-title">DUE FOR FOLLOW-UP (AI INTERVENTION COMPLETED)</span>
        <span className="hiw-section-badge">4</span>
      </div>
      <div className="hiw-cards-row-3">
        {[
          { title: "Senior Backend Engineer ...", sub: "RAVISHRI • KNIGHT LEGION • Y2", body: "Led cloud migration that cut infra cost by 40 percent.", tags: [["tag-ivory","READY TO MOVE"],["tag-teal","TEAMWORK"],["tag-orange","PDSC"]], stage: "Screened", init: "A", time: "2H AGO" },
          { title: "Product Designer", sub: "CODE • INFRASTRUCTURE • Y5", body: "Champions accessible design and creative product practices.", tags: [["tag-ivory","HIGH INTENT"],["tag-orange","POSTGRESQL"]], stage: "Screened", init: "N", time: "5H AGO" },
          { title: "Senior Backend Engineer", sub: "ATULASEN • MS • 1YR", body: "Specialises in LLM fine-tuning and predictive modeling.", tags: [["tag-ivory","HIGH INTENT"],["tag-orange","LEADERSHIP"]], stage: "Screened", init: "B", time: "8H AGO" },
        ].map((card, i) => (
          <div key={i} className="hiw-moment-card">
            <h5 className="hiw-card-title">{card.title}</h5>
            <span className="hiw-card-subtitle">{card.sub}</span>
            <p className="hiw-card-body">{card.body}</p>
            <div className="hiw-card-tags">
              {card.tags.map(([cls, lbl]) => <span key={lbl} className={`hiw-tag ${cls}`}>{lbl}</span>)}
            </div>
            <div className="hiw-card-divider"></div>
            <div className="hiw-card-footer">
              <div className="hiw-footer-pills">
                <div className="hiw-pill pill-green">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22C2 22 8 22 12 18C16 14 19 8 21 2C15 4 9 7 5 11C1 15 2 22 2 22Z"/><path d="M2 22L12 12"/></svg>
                  <span>{card.stage}</span>
                  <svg width="6" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
                </div>
                <div className="hiw-pill pill-gray">
                  <span>{card.init}</span>
                  <svg width="6" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
                  <span>{card.time}</span>
                </div>
              </div>
              <svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor" className="bookmark-icon"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="hiw-section-group">
      <div className="hiw-section-header">
        <span className="hiw-section-dot dot-green"></span>
        <span className="hiw-section-title">REVIEW INK FEEDBACK</span>
        <span className="hiw-section-badge">2</span>
      </div>
      <div className="hiw-cards-row-2">
        {[
          { title: "Senior Backend Engineer ...", sub: "RAGHAV02 • DISTRIBUTED SYSTEMS • Y7", body: "Expert in scaling AWS environments for high-traffic platforms.", tags: [["tag-ivory","READY TO MOVE"],["tag-teal","GO"],["tag-orange","SYSTEM DESIGN"]], stage: "Evaluated", init: "A", time: "3H AGO" },
          { title: "ML Engineer • NLP", sub: "SAIYAN AI • DESIGN • 4Y", body: "Lead cloud migration that cut infra cost by 40 percent.", tags: [["tag-ivory","READY TO MOVE"],["tag-teal","AWS"],["tag-orange","REACT"]], stage: "Evaluated", init: "R", time: "7H AGO" },
        ].map((card, i) => (
          <div key={i} className="hiw-moment-card">
            <h5 className="hiw-card-title">{card.title}</h5>
            <span className="hiw-card-subtitle">{card.sub}</span>
            <p className="hiw-card-body">{card.body}</p>
            <div className="hiw-card-tags">
              {card.tags.map(([cls, lbl]) => <span key={lbl} className={`hiw-tag ${cls}`}>{lbl}</span>)}
            </div>
            <div className="hiw-card-divider"></div>
            <div className="hiw-card-footer">
              <div className="hiw-footer-pills">
                <div className="hiw-pill pill-green">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22C2 22 8 22 12 18C16 14 19 8 21 2C15 4 9 7 5 11C1 15 2 22 2 22Z"/><path d="M2 22L12 12"/></svg>
                  <span>{card.stage}</span>
                  <svg width="6" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
                </div>
                <div className="hiw-pill pill-gray">
                  <span>{card.init}</span>
                  <svg width="6" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
                  <span>{card.time}</span>
                </div>
              </div>
              <svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor" className="bookmark-icon"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CalendarFillsPanel: React.FC = () => (
  <div className="hiw-visual-container hiw-calendar-visual">
    <div className="hiw-cal-header-clean">
      <span className="hiw-cal-section-title">Upcoming interviews</span>
      <div className="hiw-cal-dropdown-clean">
        <span>This week</span>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </div>

    <div className="hiw-cal-list-clean">
      {[
        { day: "MON", time: "10:00 AM", Avatar: MiraRaoAvatar, name: "Mira Rao", school: "NID Bengaluru • Y4", fit: "92%", status: "Confirmed", statusCls: "btn-confirmed", quote: '"Design systems thinking is exceptional. She anticipates edge cases most junior... — Design Lead"' },
        { day: "TUE", time: "2:00 PM", Avatar: ArnavNairAvatar, name: "Arnav Nair", school: "MIT WPU • Y3", fit: "86%", status: "Pending", statusCls: "btn-pending", quote: '"Strong with language and edge cases. Needs stronger test instrumentation. — Creative Director"' },
        { day: "WED", time: "11:00 AM", Avatar: MeeraIyerAvatar, name: "Meera Iyer", school: "IIT Hyderabad • Y2", fit: "80%", status: "Invite", statusCls: "btn-invite", quote: '"Clean code. Great product judgment. Ships with clarity. — Engineering Manager"' },
      ].map((row) => (
        <div key={row.day} className="hiw-cal-row-clean">
          <div className="hiw-cal-time-clean">
            <span className="hiw-cal-day-clean">{row.day}</span>
            <span className="hiw-cal-time-val-clean">{row.time}</span>
          </div>
          <div className="hiw-cal-right-clean">
            <div className="hiw-candidate-row">
              <div className="hiw-cand-avatar-info">
                <row.Avatar />
                <div className="hiw-cand-text">
                  <span className="hiw-cand-name">{row.name}</span>
                  <span className="hiw-cand-school">{row.school}</span>
                </div>
              </div>
              <div className="hiw-cand-badges">
                <span className="hiw-fit-badge-clean">Fit {row.fit}</span>
                <span className={`hiw-status-btn-clean ${row.statusCls}`}>{row.status}</span>
              </div>
            </div>
            <div className="hiw-quote-box">
              <div className="hiw-quote-logo">
                <div className="hiw-logo-ring"><span className="hiw-logo-text">CP</span></div>
              </div>
              <p className="hiw-quote-text">{row.quote}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="hiw-cal-metrics-clean">
      {[
        { icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>, num: "3", label: "candidates completed your trip" },
        { icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, num: "2", label: "interviews booked" },
        { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, num: "14", label: "avg time to hire", days: true },
      ].map((m, i) => (
        <div key={i} className="hiw-metric-col">
          <div className="hiw-metric-top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c3624" strokeWidth="1.8" className="hiw-metric-icon-clean" strokeLinecap="round" strokeLinejoin="round">{m.icon}</svg>
            {m.days ? (
              <div className="hiw-metric-num-stack">
                <span className="hiw-metric-num">{m.num}</span>
                <span className="hiw-metric-days">days</span>
              </div>
            ) : (
              <span className="hiw-metric-num">{m.num}</span>
            )}
          </div>
          <span className="hiw-metric-label">{m.label}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── MAIN EXPORT ──
// Dependencies: framer-motion
// CSS: import "./CompanyHowItWorks.css"
//
// Theme tokens (override in your CSS before importing):
//   --hiw-bg      section background   (default #ffffff)
//   --hiw-text    primary text color   (default #111111)
//   --hiw-accent  accent/brand color   (default #B7792A)
//   --hiw-border  border color         (default rgba(0,0,0,0.10))
//
// The section scrolls normally — no snap-scroll dependency.
// Adjust padding-top on .company-hiw-header to match your navbar height.

export const CompanyHowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const triggerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 960;
      const centerY = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      const refsToTrack = isMobile ? stepRefs : triggerRefs;

      refsToTrack.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - centerY);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveStep((prev) => (prev !== closestIndex ? closestIndex : prev));
    };

    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const showcaseTitles = [
    "01 — BRIEF THE ROLE",
    "02 — DESIGN THE JOURNEY",
    "03 — REVIEW CANDIDATE MOMENTS",
    "04 — YOUR CALENDAR FILLS ITSELF",
  ];

  const steps = [
    {
      num: "01 — BRIEF THE ROLE",
      headline: "You describe the role.",
      paras: [
        "Not in a form. Not in a spreadsheet. Just speak naturally about who you're looking for, what success looks like, and what matters.",
        "We capture the context, structure the brief, and identify the signals that should be evaluated throughout the hiring process.",
      ],
      Panel: BriefTheRolePanel,
    },
    {
      num: "02 — DESIGN THE JOURNEY",
      headline: "You decide how candidates should prove themselves.",
      paras: [
        "Choose the moments that matter for this role: a strategic exercise, a rapid-fire assessment, a project, a discussion, or something custom.",
        "We turn your hiring philosophy into a repeatable candidate journey.",
      ],
      Panel: DesignTheJourneyPanel,
    },
    {
      num: "03 — REVIEW CANDIDATE MOMENTS",
      headline: "You review the moments worth your attention.",
      paras: [
        "As candidates move through the journey, we surface their strongest signals, notable decisions, blind spots, and standout responses.",
        "Instead of reviewing applications, you're reviewing evidence.",
      ],
      Panel: ReviewMomentsPanel,
    },
    {
      num: "04 — YOUR CALENDAR FILLS ITSELF",
      headline: "You spend time with the right candidates.",
      paras: [
        "Qualified candidates move forward automatically. Interviews are scheduled. Decisions happen faster.",
        "Your calendar fills with conversations, not screening work.",
      ],
      Panel: CalendarFillsPanel,
    },
  ];

  return (
    <section className="company-hiw-shell">
      <header className="company-hiw-header">
        <div className="company-hiw-header-inner">
          <h2 className="company-hiw-title">
            HOW IT <span className="company-hiw-italic">WORKS</span>
          </h2>
          <p className="company-hiw-subtitle">
            You speak naturally about the role. We shape the process. You act on the moments that matter.
          </p>
        </div>
      </header>

      <div className="company-hiw-container">
        <div className="company-hiw-layout">

          {/* LEFT: Narrative Steps */}
          <div className="company-hiw-narrative">
            <div className="hiw-narrative-sticky-wrapper">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={stepRefs[i]}
                  data-step-index={i}
                  className={`hiw-narrative-step ${activeStep === i ? "active" : ""}`}
                >
                  <span className="hiw-step-num">{step.num}</span>
                  <h3 className="hiw-step-headline">{step.headline}</h3>
                  {step.paras.map((p, j) => <p key={j} className="hiw-step-desc-p">{p}</p>)}

                  {/* Mobile: inline panel */}
                  <div className="mobile-only-showcase">
                    <div className="premium-showcase-window">
                      <div className="showcase-header">
                        <span className="showcase-header-title">{showcaseTitles[i]}</span>
                        {i < 3 && <span className="showcase-header-arrow">→</span>}
                      </div>
                      <div className="showcase-content-wrapper">
                        <step.Panel />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop scroll triggers */}
            <div className="hiw-scroll-triggers">
              {triggerRefs.map((ref, i) => (
                <div key={i} ref={ref} className="hiw-scroll-trigger-step" />
              ))}
            </div>

            <div className="hiw-narrative-spacer" />
          </div>

          {/* RIGHT: Sticky Showcase */}
          <div className="company-hiw-showcase">
            <div className="premium-showcase-window">
              <div className="showcase-header">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="showcase-header-title"
                  >
                    {showcaseTitles[activeStep]}
                  </motion.span>
                </AnimatePresence>
                {activeStep < 3 && <span className="showcase-header-arrow">→</span>}
              </div>

              <div className="showcase-content-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="showcase-slide"
                  >
                    {React.createElement(steps[activeStep].Panel)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="company-hiw-footer">
        <div className="company-hiw-footer-inner">
          <div className="company-hiw-footer-content">
            <div className="company-hiw-footer-divider">
              <div className="divider-line"></div>
              <div className="divider-star">✦</div>
              <div className="divider-line"></div>
            </div>
            <div className="company-hiw-tagline">
              {["You define the role", "You design the journey", "You review the moments", "You meet the candidates"].map((label, i) => (
                <span key={i} className={activeStep === i ? "active" : ""}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
