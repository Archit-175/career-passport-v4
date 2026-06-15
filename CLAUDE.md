# Career Passport V4 — Waitlist Website

## Project Overview

A premium waitlist landing website for **Career Passport** — a platform that gives professionals a verified, portable passport of their real-world work, and gives companies signal they can trust when hiring.

**Frontend only. No backend. No database. Static/SSR pages.**

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + custom design tokens |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Playfair Display (serif) + Inter 300 (sans) via `next/font/google` |
| Utilities | `clsx` + `tailwind-merge` via `cn()` in `@/lib/utils` |

---

## Design System

### Typography — Two-Font System

| Font | Role | Usage |
|---|---|---|
| **Playfair Display** (serif) | Emotion | Headlines, stats, pull quotes, brand moments |
| **Inter 300** (sans) | Function | Body copy, labels, navigation, UI text |

The contrast between serif emotion and sans function creates the "premium register." Never swap these roles.

### Colour Palette — Strict Usage Rules

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0B0E14` | Primary background (~95% of dark surfaces) |
| `slate` | `#1C2231` | Secondary background, cards, nav bg on scroll |
| `pearl` | `#F5F2EC` | Primary text — **never pure white** |
| `gold` | `#C9A84C` | **The accent** — max ONE element per screen/section |
| `blue` | `#4B7BEC` | **Interactive only** — CTAs, hover states, links |
| `teal` | `#1A4D5C` | Cards, hover states, secondary surfaces |

**Rules:**
- No colourful gradients. Dark-to-transparent overlays only.
- Gold is precious — use sparingly. One gold element per visual unit.
- Blue is interactive — never decorative.
- 95% of every page must be `ink` or `slate`.

### CSS Variables

Available globally via `:root`:
```css
--ink, --slate, --pearl, --gold, --blue, --teal
```

Also exposed as Tailwind classes: `bg-ink`, `text-pearl`, `bg-gold`, `text-blue`, etc.

### Tailwind Extras

Custom font sizes (clamp-based, fluid):
- `text-display-xl` — hero headlines
- `text-display-lg` — section headlines
- `text-display-md` — sub-headlines
- `text-body-lg`, `text-body-md` — body copy
- `text-label-sm` — uppercase labels (letter-spacing: 0.08em)

Custom spacing: `py-section` (clamp 5rem → 10rem)

---

## Site Structure

```
/ → redirects to /candidates

/candidates     — S1 Hero · S2 Problem · S3 Bridge · S4 How Visibility Works
                  S5 Your Passport Measured · S6 Payoff · S7 Final CTA

/companies      — S1 Hero · S2 How It Works · S3 Signal You Can Compare
                  S4 What Happens in the Backend · S5 Final CTA

/trips          — S1 Hero · S2 Inside a Trip · S3 Four Kinds of Trips
                  S4 Why It Can't Be Faked · S5 CTA Back
                  (linked from /candidates S4, NOT in global nav)
```

### Global Nav (all pages)

```
Career Passport  ·  [Candidates | Companies toggle]  ·  About  ·  Blog  ·  Join the Waitlist
```

- Toggle pill switches between `/candidates` and `/companies`
- "Join the Waitlist" = `#waitlist` anchor → Electric Blue CTA button
- Nav becomes `bg-slate/90 backdrop-blur` on scroll

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx          ← root layout, fonts, Nav, globals
│   ├── globals.css         ← design tokens, base styles, utilities
│   ├── page.tsx            ← redirects to /candidates
│   ├── candidates/
│   │   └── page.tsx
│   ├── companies/
│   │   └── page.tsx
│   └── trips/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   └── Nav.tsx         ← global navigation
│   ├── ui/                 ← reusable primitives (Button, Badge, Input, etc.)
│   ├── sections/           ← shared across pages (WaitlistForm, SectionHeader, etc.)
│   ├── candidates/         ← page-specific sections for /candidates
│   ├── companies/          ← page-specific sections for /companies
│   └── trips/              ← page-specific sections for /trips
│
├── lib/
│   └── utils.ts            ← cn() helper
│
├── hooks/                  ← custom React hooks (useInView, useParallax, etc.)
│
└── types/                  ← shared TypeScript types
```

---

## Component Conventions

- All components are **React Server Components by default**. Add `"use client"` only when hooks or event listeners are needed.
- Use the `cn()` utility from `@/lib/utils` for conditional Tailwind classes.
- Animations via **Framer Motion** (`motion.div`, `useInView`, `useScroll`).
- Sections use `<section id="...">` with `py-section` vertical rhythm.
- Every section header uses `font-playfair` for the headline and `font-inter font-light` for the subhead.

---

## Skills (Always Active)

Every UI build session should invoke:
- `/frontend-design` — distinctive, production-grade aesthetics
- `/impeccable` — polish, hierarchy, micro-interactions
- `/ui-ux-pro-max` — comprehensive UI/UX intelligence

---

## Aesthetic Direction

**Premium dark editorial.** Inspired by luxury print, financial journalism, and high-end recruiting.

- No gradients (only dark-to-transparent overlays)
- Generous whitespace / negative space inside dark surfaces
- Serif headlines feel like a magazine cover
- Gold is used like a stamp or seal — authoritative, not decorative
- Grain texture overlay (subtle, 3% opacity) adds depth without noise
- Animations: slow, confident fade-ups (0.7s cubic-bezier ease-out), never bouncy

---

## Commands

```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

---

## Notes

- Trips page (`/trips`) is a supporting explainer page. It lives at `/trips` but is **not** in the top nav — only linked from the Candidates page S4 section.
- The `#waitlist` form section appears on every page as the final CTA.
- No analytics, no CMS, no auth. Pure frontend.
