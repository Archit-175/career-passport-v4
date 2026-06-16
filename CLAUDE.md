# Career Passport V4 — Waitlist Website

## Project Overview

A premium waitlist landing website for **Career Passport** — a platform that gives professionals a verified, portable passport of their real-world work, and gives companies signal they can trust when hiring.

**Frontend only. No backend. No database. Static/SSR pages.**

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| Styling | **Tailwind CSS v4** + custom design tokens |
| Animation | Framer Motion v12 + **GSAP v3** (`gsap` + `@gsap/react` for `useGSAP` hook + `SplitText` plugin) |
| 3D / WebGL | Three.js (`three` + `@types/three`) |
| DOM Capture | `modern-screenshot` — **not** html2canvas (supports Tailwind v4 oklab colors) |
| Text FX | `slot-text` — character-slot roller for CTA button labels |
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

### Tailwind v4 — Critical Notes

- Config is **CSS-first** via `@theme {}` in `globals.css` — there is **no** `tailwind.config.ts`
- PostCSS plugin: `"@tailwindcss/postcss": {}` in `postcss.config.js` (NOT `tailwindcss: {}`)
- Import: `@import "tailwindcss"` at top of `globals.css`
- Do **not** create `tailwind.config.ts` — it will break the build

### CSS Variables

Defined in `globals.css` via `@theme {}` and `:root`:
```css
--color-ink, --color-slate, --color-pearl, --color-gold, --color-blue, --color-teal
--ink, --slate, --pearl, --gold, --blue, --teal  (aliases for raw CSS)
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

## Site Structure & Build Status

```
/ → redirects to /candidates

/candidates     ✅ S1 CandidateHero          — hero candidate.png bg; GSAP/SplitText masked-line headline entrance + eyebrow/subtext/CTA fade-up
                ✅ S2 TheProblem             — black bg, 3-panel numbered grid; TileOverlay (RSC — no Framer Motion, no opacity:0 on mount)
                ✅ S3 Bridge                 — bridge.jpeg bg, glass card, 3-col layout; Framer Motion fade-up stagger on scroll
                ✅ S4 HowVisibilityWorks     — black bg, text + trip.jpeg; Framer Motion stagger (left col fade-up, right step cards slide-in from right)
                🔲 S5 YourPassportMeasured  — blank black placeholder (content TBD)
                ✅ S6 OpportunitiesSection   — section6.jpeg bg, glass card (heading strip at top with GSAP looping gold word, opportunities-new.png fills body, 4 recruiter cards float absolutely with CSS oppFloat keyframe + Framer Motion stagger)
                ✅ S7 CandidateCta          — final waitlist CTA; GSAP/SplitText entrance + slot-text button roller

/companies      ✅ S1 CompanyHero            — companies hero.png bg, 4-step flow; GSAP/SplitText masked-line headline entrance + step cards stagger
                ✅ S2 CompanyHowItWorks
                ✅ S3 CompanyWhatHappensInBackend
                ✅ S4 CompanyCta             — GSAP/SplitText entrance + slot-text button roller

/trips          🔲 placeholder — not yet built
                   (linked from /candidates S4, NOT in global nav)
```

### Scroll Snapping

**Candidates** (`/candidates`) uses `<SmoothSnapScroller>` — a custom client component that intercepts `wheel`, `touch`, and keyboard events and calls `scrollTo({ behavior: "smooth" })` one section at a time. Native `scroll-snap-type` is intentionally absent here; the interceptor locks for ~950ms per gesture to prevent multi-section skipping. Each section child must have `data-snap` attribute so the scroller can find them via `querySelectorAll(":scope > [data-snap]")`.

**Companies** (`/companies`) uses native CSS scroll snapping via `<SnapHtml>` — a client component that sets `scroll-snap-type: y mandatory` on `document.documentElement`. This is required because `CompanyHowItWorks` uses `window` scroll events for its step animations; intercepting wheel events (as candidates does) would break that. Each section div has `scroll-snap-align: start`.

### Global Nav (all pages)

```
Career Passport  ·  [Candidates | Companies toggle]  ·  About  ·  Blog  ·  Join the Waitlist
```

- Logo: Playfair Display `text-[1.6rem]` — "Career" pearl, "Passport" gold
- Toggle pill: `absolute left-1/2 -translate-x-1/2` — truly centred in nav
- Right: About / Blog / "Join the Waitlist" (blue pill)
- Nav is always glassmorphic: `bg-white/5 backdrop-blur-xl`

---

## Folder Structure (actual)

```
src/
├── app/
│   ├── layout.tsx                    ← root layout, fonts, Nav, grain body; imports slot-text/style.css
│   ├── globals.css                   ← @theme tokens, base styles, animations
│   ├── page.tsx                      ← redirects to /candidates
│   ├── candidates/
│   │   └── page.tsx                  ← SmoothSnapScroller wrapper + 7 sections (data-snap on each)
│   ├── companies/
│   │   ├── page.tsx                  ← scroll-snap wrapper + 4 sections
│   │   └── SnapHtml.tsx              ← "use client" — applies html scroll-snap
│   └── trips/
│       └── page.tsx                  ← placeholder
│
├── components/
│   ├── layout/
│   │   └── Nav.tsx                   ← global nav (always glassmorphic)
│   ├── TileOverlay.tsx               ← shared overlay utility
│   ├── SmoothSnapScroller.tsx        ← "use client" — wheel/touch/keyboard interceptor for candidates scroll
│   ├── candidates/
│   │   ├── CandidateHero.tsx         ← S1
│   │   ├── TheProblem.tsx            ← S2
│   │   ├── Bridge.tsx                ← S3
│   │   ├── HowVisibilityWorks.tsx    ← S4
│   │   ├── YourPassportMeasured.tsx  ← S5 (blank black placeholder)
│   │   ├── OpportunitiesSection.tsx  ← S6
│   │   ├── CandidateCta.tsx          ← S7
│   │   └── CandidateCta.css
│   └── companies/
│       ├── CompanyHero.tsx           ← S1
│       ├── CompanyHowItWorks.tsx     ← S2
│       ├── CompanyHowItWorks.css
│       ├── CompanyWhatHappensInBackend.tsx  ← S3
│       ├── CompanyWhatHappensInBackend.css
│       ├── CompanyCta.tsx            ← S4
│       └── CompanyCta.css
│
└── lib/
    └── utils.ts                      ← cn() helper (clsx + tailwind-merge)
```

## Static Assets

### Video (`/public/common/`)

| File | Used in |
|---|---|
| `CTABGV.mp4` | `CandidateCta` (S7) and `CompanyCta` (S4) background video |

### Images (`/public/images/`)

| File | Used in |
|---|---|
| `hero candidate.png` | CandidateHero (S1) background |
| `bridge.jpeg` | Bridge (S3) background |
| `trip.jpeg` | HowVisibilityWorks (S4) right image |
| `section6.jpeg` | OpportunitiesSection (S6) background |
| `opportunities-new.png` | OpportunitiesSection (S6) illustration (inside glass card body) |
| `companies hero.png` | CompanyHero (S1) background |
| `companiess2.jpeg` | CompanyHowItWorks (S2) glassmorphism background |
| `section3.jpeg` | Available, unused |
| `Candidatehero2.png` | Available, unused |

---

## Component Conventions

- All components are **React Server Components by default**. Add `"use client"` only when hooks or event listeners are needed.
- Use the `cn()` utility from `@/lib/utils` for conditional Tailwind classes.
- **Framer Motion** (`motion.div`, `whileInView`, stagger `variants`) for scroll-triggered entrance animations in `Bridge` and `HowVisibilityWorks`. Toast in CTA sections uses `AnimatePresence`.
- **GSAP** (`useGSAP` + `SplitText`) for hero entrance animations (`CandidateHero`, `CompanyHero`) and CTA reveals (`CandidateCta`, `CompanyCta`). Also used imperatively for the `LoopingWord` cycling word swap in `OpportunitiesSection`.
- Sections use `<section id="...">` with `py-section` vertical rhythm.
- Every section header uses `font-playfair` for the headline and `font-inter font-light` for the subhead.

### GSAP Word-Swap Pattern (`LoopingWord`)

Used in `OpportunitiesSection` for the cycling italic word in the headline:
- **Single `overflow: hidden` only** — the outer container is the only clip point. Adding `overflow: hidden` on the inner animated span defeats the padding trick and causes the word to be invisible between swaps.
- Use `y: "120%"` / `y: "-120%"` (not `yPercent`) to avoid sub-pixel drift.
- Outer container: `position: relative`, `display: inline-block`, `overflow: hidden`, `paddingTop/paddingBottom: 0.18em`, matching negative `marginTop/marginBottom: -0.18em` — gives GSAP breathing room before the clip fires without affecting line-height.
- An invisible `aria-hidden` sibling span holding the longest word reserves the correct slot width.
- Animated span uses `position: absolute`, `inset: 0`, `display: flex`, `alignItems: center` — fills the container exactly.
- Interval fires `gsap.to` (exit up to `y: "-120%"`), `onComplete` bumps `idx` state, second `useEffect` fires `gsap.fromTo` (`y: "120%"` → `y: "0%"`).

### SplitText `mask: "lines"` — Descender & Italic Overhang Fix

`SplitText` with `mask: "lines"` wraps each line in an `overflow: hidden` div sized to the line-height. This clips descenders (g, y, j) at the bottom and italic glyphs that lean right (e.g. `?` in Playfair Display italic) on the right side.

**Always apply this after `SplitText.create`:**
```ts
split.lines.forEach((line) => {
  const mask = (line as HTMLElement).parentElement;
  if (mask) {
    mask.style.paddingBottom = "0.35em";
    mask.style.marginBottom = "-0.35em";
    mask.style.paddingRight = "0.15em";
    mask.style.marginRight = "-0.15em";
  }
});
```
- `paddingBottom/marginBottom` — room for descenders and characters with deep baselines
- `paddingRight/marginRight` — room for italic glyphs that overhang their logical box to the right
- The matching negative margin cancels the layout shift so line spacing is unaffected

Applied in: `CandidateHero.tsx`, `CandidateCta.tsx`, `CompanyHero.tsx`, `CompanyCta.tsx`.

### CTA Sections (`CandidateCta` / `CompanyCta`)

Both CTAs use **co-located `.css` files** (not Tailwind utilities) — intentional for components with many CSS custom properties and glass effects. Each CSS file defines scoped tokens on the shell class (`--cta-bg`, `--cta-accent`, `--cta-blue`).

Structure:
- Looping background video (`/common/CTABGV.mp4`, `opacity: 0.35`) with an ink-to-transparent gradient overlay
- Eyebrow monospace label in gold + Playfair heading with italic gold `<span>` highlight
- Email `<input>` (slate-glass, gold focus ring) + blue submit `<button>` in a flex row — stacks on mobile
- 3 trust badge items: slate-glass icon circle (gold icon stroke) + label text
- Framer Motion `AnimatePresence` toast — success (gold border) / error (red border), auto-dismisses after 3.5s
- **`CandidateCta`** uses `useGSAP` + `SplitText` for scroll-triggered entrance animations (eyebrow, heading, desc, form, trust badges stagger in). Button label uses `slot-text` for character-roller hover effect. No `useReveal` hook — GSAP drives all reveals.
- **`CompanyCta`** mirrors `CandidateCta` exactly — same `useGSAP` + `SplitText` entrance sequence, same `slot-text` button roller. Label initialises to "Connect with us"; success rolls to "We'll be in touch!".
- **`handleSubmit` is a `console.log` placeholder** — replace with real API call when backend exists
- Candidate CTA: `id="waitlist"` · Company CTA: `id="company-waitlist"`
- Video asset: `public/common/CTABGV.mp4` → served at `/common/CTABGV.mp4`

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

## TileOverlay — Three.js Code Slice Hero

Applied to `/candidates` S2 (`TheProblem`). On hover, nearby tiles lift in 3D toward the cursor carrying their content slice, with spring physics.

**Architecture:**
- `"use client"` — Three.js `WebGLRenderer` + `PerspectiveCamera` (fov 50, camZ = H / 2·tan(25°))
- Grid of `THREE.Group` objects: face plane (UV-mapped texture) + white depth slab at `z = -24`
- Spring lerp `t = 0.10` per frame via `requestAnimationFrame` — no Framer Motion (too slow for 100+ tiles)
- Mouse events on the **parent section**, not the overlay — clicks pass through

**Capture pipeline:**
- Wait `document.fonts.ready`, then `domToCanvas(container)` from `modern-screenshot`
- Hide `[data-tile-mount]` before capture, restore after
- On success: `[data-tile-content]` → `visibility: hidden`; apply UV-mapped `CanvasTexture` to each tile face

**Critical gotchas:**
- **Never use `html2canvas`** — it throws on Tailwind v4's `color-mix(in oklab, ...)` opacity utilities; use `modern-screenshot` instead
- **Tile geometry must be exact `TW × TH`** — any fractional reduction (`TW - 0.5`) creates visible seam lines
- The section is below the fold on mount (scroll-snap) — `modern-screenshot` captures it correctly; a `document.body` clone does not
- **Never use Framer Motion `initial="hidden"` (or any `opacity: 0` initial state) inside `[data-tile-content]`** — `domToCanvas` captures the DOM at mount time, before the user scrolls to the section. Elements at `opacity: 0` produce a black canvas, which gets applied as tile textures, making the entire section appear black. `TheProblem` (S2) is a pure RSC with no Framer Motion for this reason.

**Usage pattern:**
```tsx
<section className="relative ...">
  <div data-tile-content>{/* section content */}</div>
  <TileOverlay className="absolute inset-0 z-10" />
</section>
```

---

## Notes

- `Payoff.tsx` in `src/components/candidates/` is an **unused stub** — the active S6 section is `OpportunitiesSection.tsx`.
- Trips page (`/trips`) is a supporting explainer page (currently a placeholder). It is **not** in the top nav — only linked from Candidates S4.
- The `#waitlist` form section appears on every page as the final CTA.
- No analytics, no CMS, no auth. Pure frontend.
- GitHub repo: `https://github.com/Archit-175/career-passport-v4`
- Tailwind v4: **do not create `tailwind.config.ts`** — all customisation lives in `globals.css` under `@theme {}`. PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`.

---

## Companies Page — Architecture Notes

### Scroll Snap: Why `<html>` and Not a Div

`SnapHtml.tsx` applies `scroll-snap-type: y mandatory` on `document.documentElement`, **not** a wrapper div. This is critical: `CompanyHowItWorks` detects active steps via `window` scroll events + `getBoundingClientRect`. Snap on a div kills `window` scroll events. The HIW section wrapper also has no `minHeight: "100dvh"` — it is taller than the viewport (multi-step scroll triggers) and the snap engine is allowed to scroll freely through it.

### CompanyHowItWorks — Glassmorphism

- **Background**: `companiess2.jpeg`, `background-attachment: fixed` (parallax). No full-page overlay — photo shows raw in 40px side margins
- **Glass card** (`.company-hiw-container`): `width: calc(100% - 80px)`, `background: rgba(11,14,20,0.86)`, `backdrop-filter: blur(48px) saturate(160%)`
- **Critical**: `.company-hiw-shell` must keep `overflow: visible` — sticky header/footer break otherwise
- **Token scoping**: `.premium-showcase-window` overrides `--hiw-text: #111111` locally — pearl on white = invisible without this
- **Mobile**: `background-attachment: scroll` at ≤960px

### CompanyWhatHappensInBackend — Dark Theme Rules

- Background: `#000000` via `--backend-bg` token
- Cards: gradient `linear-gradient(160deg, #232b3e → #1C2231 → #161d2b)` + gold top border `1.5px solid rgba(201,168,76,0.32)`
- **All mockup components must stay dark** — never `background: #ffffff`. Use `rgba(255,255,255,0.05–0.07)` glass + pearl text
- Mockup 1 CTA: gold `rgba(201,168,76,0.85)`. Mockup 2 tags: tinted dark glass. Mockup 3 trip: dark glass + `#93b4f8`. Mockup 4 metrics: dark glass + gold Playfair numbers
- Connector arrows: `color: rgba(201,168,76,0.55)`

### Preview Server

Config at `.claude/launch.json` (port 3000, `autoPort: false`). Start with `preview_start`, use Playwright for screenshots, then **stop immediately with `preview_stop`** — never leave idle. Use `npm run dev` externally for longer sessions.
