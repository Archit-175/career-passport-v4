"use client";

import React from "react";
import "./CompanyWhatHappensInBackend.css";

// ── WHAT HAPPENS IN THE BACKEND SECTION ──
// CSS: import "./CompanyWhatHappensInBackend.css"
//
// Theme tokens (override in your CSS before importing):
//   --backend-bg      section background      (default #ffffff)
//   --backend-text    primary text            (default #111111)
//   --backend-accent  accent / brand color    (default #B7792A)
//   --backend-border  border color            (default rgba(0,0,0,0.12))
//
// No external JS dependencies beyond React.
// No snap-scroll dependency — section scrolls normally.

export const CompanyWhatHappensInBackend: React.FC = () => {
  return (
    <section className="company-backend-shell">
      <div className="company-backend-container">

        {/* Section Header */}
        <header className="company-backend-header">
          <h2 className="company-backend-title">
            What happens in the <span className="company-backend-moss">backend</span>
          </h2>
          <p className="company-backend-subtitle">
            Everything runs in the backend so you can focus on hiring.
          </p>
        </header>

        {/* 4-Step Cards Layout */}
        <div className="company-backend-layout">

          {/* Card 01 */}
          <div className="backend-card-wrapper">
            <div className="backend-step-number">01</div>
            <div className="company-backend-card">
              <div className="backend-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--backend-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="backend-icon">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4 className="backend-card-title">Bulk Intervention</h4>
              <span className="backend-card-subtitle">Mass outreach, done in seconds.</span>
              <p className="backend-card-desc">
                System selects multiple candidates and sends action (Mail / WhatsApp / Reminder / Trip) in bulk.
              </p>

              <div className="backend-mockup mockup-bulk">
                <div className="mockup-bulk-header">
                  <span className="mockup-bulk-title">Candidates Selected</span>
                  <span className="mockup-bulk-count">125 selected</span>
                </div>
                <div className="mockup-bulk-list">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="mockup-bulk-row">
                      <div className="mockup-bulk-avatar"></div>
                      <div className="mockup-bulk-line"></div>
                      <div className="mockup-bulk-check">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mockup-bulk-btn">Send to Selected</button>
              </div>
            </div>
          </div>

          <div className="backend-arrow-connector">
            <svg viewBox="0 0 40 24" fill="none" stroke="var(--backend-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="0" y1="12" x2="32" y2="12" />
              <polyline points="24 4 32 12 24 20" />
            </svg>
          </div>

          {/* Card 02 */}
          <div className="backend-card-wrapper">
            <div className="backend-step-number">02</div>
            <div className="company-backend-card">
              <div className="backend-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--backend-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="backend-icon">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </div>
              <h4 className="backend-card-title">Custom Intervention</h4>
              <span className="backend-card-subtitle">Move candidates into action.</span>
              <p className="backend-card-desc">
                System chooses the next action for each candidate — Move to Screening, Mail Trip, Add Reminder, or Change Stage.
              </p>

              <div className="backend-mockup-container">
                <div className="mockup-action-card">
                  <div className="mockup-action-card-header">
                    <span className="mockup-action-card-title">Senior Backend Engineer • Payments</span>
                    <span className="mockup-action-card-subtitle">RAZORPAY • CLOUD • 7Y</span>
                  </div>
                  <p className="mockup-action-card-body">Expert in scaling AWS environments for high-traffic platforms.</p>
                  <div className="mockup-action-card-tags">
                    <span className="mockup-card-tag tag-ivory">READY TO MOVE</span>
                    <span className="mockup-card-tag tag-teal">AWS</span>
                    <span className="mockup-card-tag tag-orange">REACT</span>
                  </div>
                  <div className="mockup-action-card-divider"></div>
                  <div className="mockup-action-card-footer">
                    <div className="mockup-footer-left">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2f8e64" strokeWidth="2.5" className="mockup-mic-icon">
                        <rect x="9" y="3" width="6" height="12" rx="3" />
                        <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                        <line x1="12" y1="19" x2="12" y2="21" />
                      </svg>
                      <div className="mockup-dropdown-trigger">
                        <span>Interested</span>
                        <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
                      </div>
                    </div>
                    <div className="mockup-footer-right">
                      <div className="mockup-cand-meta">
                        <span className="mockup-candidate-name">ARYAN MEHTA</span>
                        <span className="mockup-time-ago">1H AGO</span>
                      </div>
                      <div className="mockup-action-icons">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mockup-icon-action">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mockup-icon-action">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mockup-dropdown-menu">
                    <div className="mockup-dropdown-item active"><span className="check-mark">✓</span><span>Interested</span></div>
                    <div className="mockup-dropdown-item"><span className="check-mark"></span><span>Screened</span></div>
                    <div className="mockup-dropdown-item"><span className="check-mark"></span><span>Evaluated</span></div>
                    <div className="mockup-dropdown-item"><span className="check-mark"></span><span>Move to client</span></div>
                    <div className="mockup-dropdown-item"><span className="check-mark"></span><span>Archive</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="backend-arrow-connector">
            <svg viewBox="0 0 40 24" fill="none" stroke="var(--backend-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="0" y1="12" x2="32" y2="12" />
              <polyline points="24 4 32 12 24 20" />
            </svg>
          </div>

          {/* Card 03 */}
          <div className="backend-card-wrapper">
            <div className="backend-step-number">03</div>
            <div className="company-backend-card">
              <div className="backend-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--backend-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="backend-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h4 className="backend-card-title">Candidate Receives Trip</h4>
              <span className="backend-card-subtitle">Personalized. Instant. Actionable.</span>
              <p className="backend-card-desc">
                Career Passport sends a personalized career trip link with clear next steps.
              </p>

              <div className="backend-mockup mockup-trip">
                <div className="mockup-trip-card">
                  <div className="mockup-trip-header">
                    <div className="mockup-trip-logo">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mockup-trip-logo-icon">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                      <span>CAREER PASSPORT</span>
                    </div>
                  </div>
                  <div className="mockup-trip-content">
                    <div className="mockup-trip-meta">
                      <span className="mockup-trip-badge">New Trip</span>
                      <span className="mockup-trip-time">Just now</span>
                    </div>
                    <h6 className="mockup-trip-greeting">Hey! 👋</h6>
                    <h5 className="mockup-trip-headline">Here is your <span className="mockup-trip-blue">custom career trip</span></h5>
                    <p className="mockup-trip-desc">We've crafted a personalized career journey just for you.</p>
                    <div className="mockup-trip-steps">
                      <div className="trip-step-item done">
                        <div className="trip-step-dot">✓</div>
                        <span>Role details reviewed</span>
                      </div>
                      <div className="trip-step-item active">
                        <div className="trip-step-dot">2</div>
                        <span>Solve assessment (5 mins)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mockup-trip-footer">
                    <div className="mockup-trip-link-circle">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <button className="mockup-trip-btn">
                      <span>View My Trip on Career Passport</span>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="arrow-right-icon">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="backend-arrow-connector">
            <svg viewBox="0 0 40 24" fill="none" stroke="var(--backend-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="0" y1="12" x2="32" y2="12" />
              <polyline points="24 4 32 12 24 20" />
            </svg>
          </div>

          {/* Card 04 */}
          <div className="backend-card-wrapper">
            <div className="backend-step-number">04</div>
            <div className="company-backend-card">
              <div className="backend-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--backend-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="backend-icon">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h4 className="backend-card-title">Company Gets Results</h4>
              <span className="backend-card-subtitle">Clear signals. Confident decisions.</span>
              <p className="backend-card-desc">
                Recruiter sees trip results, match %, signals and stage updates all in one place.
              </p>

              <div className="backend-mockup mockup-results">
                <span className="mockup-results-title">Trips Overview</span>
                <div className="mockup-results-metrics">
                  {[
                    { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>, num: "125", lbl: "Trips Sent" },
                    { icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>, num: "78%", lbl: "Avg. Match" },
                    { icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>, num: "18", lbl: "High Match" },
                  ].map((m, i) => (
                    <div key={i} className="results-metric-box">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">{m.icon}</svg>
                      <span className="results-metric-num">{m.num}</span>
                      <span className="results-metric-lbl">{m.lbl}</span>
                    </div>
                  ))}
                </div>
                <div className="mockup-results-table">
                  <div className="results-table-row table-header">
                    <span>Candidate</span>
                    <span>Role (Top Match)</span>
                    <span className="text-right">Match %</span>
                  </div>
                  {[
                    { name: "Aarav Sharma", role: "Product Manager", pct: 87, cls: "bar-green" },
                    { name: "Riya Patel", role: "Data Analyst", pct: 76, cls: "bar-green" },
                    { name: "Neha Singh", role: "UX Designer", pct: 68, cls: "bar-orange" },
                    { name: "Vikram Kumar", role: "Marketing Manager", pct: 54, cls: "bar-red" },
                  ].map((row) => (
                    <div key={row.name} className="results-table-row">
                      <span className="candidate-name">{row.name}</span>
                      <span className="candidate-role">{row.role}</span>
                      <span className="match-pct">
                        <span className="match-bar-track">
                          <span className={`match-bar ${row.cls}`} style={{ width: `${row.pct}%` }}></span>
                        </span>
                        <span>{row.pct}%</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section Footer */}
      <footer className="company-backend-footer">
        <div className="company-backend-footer-inner">
          <div className="company-backend-footer-divider">
            <div className="divider-line"></div>
            <div className="divider-star">✦</div>
            <div className="divider-line"></div>
          </div>
          <div className="company-backend-tagline">
            <span>Less manual work.</span>
            <span>Faster hiring.</span>
            <span>Better outcomes.</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
