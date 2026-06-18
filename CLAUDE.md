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
| **Inter** (sans) | Function | Body copy (300), labels, navigation, UI text. Heavy weights (700) used for S3.5 step titles (01–04). Headline uses Playfair like all other sections. |
| **IBM Plex Mono** (`--font-mono`) | Data/technical | S3.5 eyebrow, numerals (01–04) & coordinates. Loaded in `layout.tsx`, exposed via `@theme` + `.font-mono` |

The contrast between serif emotion and sans function creates the "premium register." Never swap these roles.

### Colour Palette — Strict Usage Rules

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0B0E14` | Primary background (~95% of dark surfaces) |
| `slate` | `#1C2231` | Secondary background, cards, nav bg on scroll |
| `pearl` | `#F5F2EC` | Primary text — **never pure white** |
| `gold` | `#A3C940` | **The accent** — lime green; max ONE element per screen/section |
| `blue` | `#A3C940` | **Interactive only** — CTAs, hover states, links (same lime green as `gold`) |
| `teal` | `#1A4D5C` | Cards, hover states, secondary surfaces |

**Rules:**
- No colourful gradients. Dark-to-transparent overlays only.
- Gold/lime is precious — use sparingly. One accent element per visual unit.
- **Buttons with `bg-gold`/`bg-blue` MUST use `text-ink` (dark text), not white** — the lime green is light enough to need dark text for contrast.
- Hover state for blue/lime buttons: lighten to `#bcd96b`.
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

/candidates     ✅ S1 CandidateHero          — images/hero/candidate.png bg; GSAP/SplitText masked-line headline entrance + eyebrow/subtext/CTA fade-up; eyebrow "Built on what you've done" (letterSpacing: "0.28em"); headline "Design the career / you're *proud* of."; CTA bg `#A3C940` with `text-ink`; **bottom blend gradient** (`transparent → rgba(0,0,0,0.97)`, `h-48`, `z-11`) dissolves hero photo into S2's black bg
                ✅ S2 TheProblem             — black bg, **2-column layout** (left 40%: gold-dot eyebrow "THE REALITY" + divider + Playfair headline "The best candidate doesn't always get noticed." + body "Talent rarely survives the first scan."; right: 3 numbered items with strikethrough/accent + "SEE HOW IT WORKS →" href="#globe"). **Items:** 01 "You hit apply." / "It went nowhere." — 02 "A person ~~reads~~ every résumé." / "Software does." — 03 "What gets you noticed now?" / "Proof." + CTA link. **Mobile layout:** left col has border-b (mobile) → border-r lg:pr-16 (desktop) as column divider; right col uses divide-y between items + py-8 per row + flex gap-6 (mono number left-rail + content) — no pl-* on mobile. TileOverlay **temporarily disabled**. RSC — no Framer Motion, no opacity:0 on mount.
                ✅ S3 BridgeV2              — `images/sections/bridge.jpeg` bg, glass card, **vertical transformation rail** (3 stages: Raw material → Career Passport analysis → Verified proof); left 40% col (editorial copy); right 60% col (numbered spine with connector, stage content chips/list/proof stamps); Framer Motion fade-up stagger on scroll; **top blend gradient** (`rgba(0,0,0,0.95) → transparent`, `h-40`, `z-[1]`) receives black from S2; **bottom blend gradient** (`transparent → rgba(0,0,0,0.95)`, `h-40`, `z-[1]`) dissolves photo edge into S3.5
                ✅ S3.5 GlobeVisibility      — **id="globe"** on the section element — S2 "SEE HOW IT WORKS →" href="#globe" anchors here. **pure-black `#000000`** bg, 2-col interactive ("Trip" globe section, inserted after S3). LEFT col: mono lime eyebrow (`0.65rem / tracking-[0.28em]`) + **Playfair Display** headline `clamp(1.75–2.8rem)` with gold italic `<em>` highlights on *listen*, *nudge*, *build* + Inter 300 subtext ("Speak honestly about who you are and where you want to go. We turn that into verified proof.") + 4 numbered steps (mono numerals/coords + Inter 700 titles + Inter 300 desc). The **steps glow one by one on a loop** (`CYCLE_MS = 2200ms` → toggles `.gv-item--active`: gold glowing numeral `text-shadow`, lit gold rule, brightened coords, white title, `translateX(6px)`); manual hover/focus pauses loop. Loop only runs while in view (`IntersectionObserver` threshold 0.35) and is disabled under `prefers-reduced-motion`. RIGHT col: **decorative 3D wireframe globe** (`WireframeGlobe.tsx`, Three.js) — graticule + GeoJSON country outlines (`/data/countries.geo.json`) + **exactly 2 gently-pulsing markers** (NY + Tokyo), slow auto-rotation + drag-to-rotate + inertia. A **"What's a Trip?" gold-border pill button** (links to `/trips`) sits in a dedicated `btn` grid area **below the globe**. Globe is **decoupled from steps** (`activeIndex={null}`) — no connector lines. **Desktop (≥901px):** 3-row grid (`intro/globe`, `items/globe`, `·/btn`), `min-height: 100dvh`, globe `min(56vh, 560px)`. **Mobile/tablet (≤900px):** stacks as intro → **4 steps → globe → button** (steps intentionally before globe). **WebGL init is deferred one rAF** to prevent StrictMode context-loss. Files: `WireframeGlobe.tsx` + `GlobeVisibility.tsx`/`.css`. **NOTE:** shares eyebrow/headline/4-step copy with S4 — likely supersedes it (decide whether to remove S4).
                ⚠️ S4 HowVisibilityWorks     — **temporarily disabled** (import + JSX commented out in `candidates/page.tsx` — uncomment both to restore). full-bleed `images/sections/s4.png` bg, `bg-black/60` overlay, glass card (`rgba(255,255,255,0.07)` + `blur(28px)` + `border rgba(255,255,255,0.14)`); **top blend gradient** (`rgba(0,0,0,0.95) → transparent`, `h-40`, `z-[1]`) receives the fade from S3; left 40% col (eyebrow `0.65rem / tracking-[0.28em]` gold, Playfair heading `clamp(1.75–2.6rem)` with gold italic `<em>` highlights, gold rule `w-8`, 2-line subtext `leading-[1.7]`, rounded-full gold-border CTA link); right 52% col (step list `01–04`: large Playfair gold numerals `clamp(1.3–1.7rem) / rgba(163,201,64,0.55)` + Playfair title `clamp(1.05–1.2rem) / opacity 0.95 pearl` + Inter light body `clamp(0.83–0.9rem) / rgba(245,242,236,0.65)` + `border-white/[0.12]` dividers + `py-7` rows); Framer Motion fade-up stagger on both cols
                ✅ S5 YourPassportMeasured  — black bg, 2-col: interactive SVG radar chart (8 dimensions, whole-chart continuous hover) left + headline/detail-card/trip-CTA right; Framer Motion reveals. See "YourPassportMeasured — Radar Hover" below.
                ⚠️ OpportunitiesSection      — NOT rendered (dead code; see Notes). opportunities-bg.jpeg bg, glass card with GSAP looping gold word + opportunities.png + 4 floating recruiter cards
                ✅ S7 CandidateCta          — final waitlist CTA; GSAP/SplitText entrance + slot-text button roller

/companies      ✅ S1 CompanyHero            — images/hero/companies.png bg, 4-step flow; GSAP/SplitText masked-line headline entrance + step cards stagger; layout: `flex-col justify-center` (single centered block, NOT justify-between); padding `clamp(4rem,10vh,7rem)` top; steps flow naturally after CTA via `marginTop: clamp(2rem,5vh,3.5rem)` — NOT pinned to bottom
                ✅ S2 CompanyHowItWorks    — flat-ink static zigzag: heading + 4 alternating text/demo rows (compact dark-glass demos), Framer Motion fade-up on scroll; section header has faint full-width divider after eyebrow + short gold rule after headline; each step text has a small gold accent rule under the step number
                ✅ S3 CompanyWhatHappensInBackend
                ✅ S4 CompanyCta             — GSAP/SplitText entrance + slot-text button roller

/blog           ✅ BlogGallery              — full-screen Three.js gallery (phantom.land-style): flat tight grid at rest, curves into a sphere + zooms out while dragging; click a card → article dialog animates in. See "Blog — Gallery" below.

/trips          ✅ TripsPage                — full editorial content page explaining "What's a Trip." `"use client"` — Framer Motion scroll reveals. **No `min-h-[100dvh]`** on any section (sizes to content). Shared constants: `PX = "clamp(1.5rem, 7vw, 7rem)"`, `PY = "clamp(1.75rem, 2.5vw, 2.5rem)"`. **Sections:** (1) Hero — 2-col `lg:grid-cols-[3fr,2fr]` with `lg:items-center`; Playfair "What's a Trip" + gold italic "Trip" left col, `lg:pr-16 lg:border-r lg:border-white/[0.07]`; body + italic pullquote right col, `lg:pl-16`; decorative `"Trip"` watermark `rgba(245,242,236,0.025)` hidden below xl; bottom fade gradient; (2) "What a Trip Is" — equal 2-col grid, centred absolute `1px rgba(255,255,255,0.06)` divider at `left-1/2`; mono gold eyebrow + Playfair headline + body each col; (3) "How Trips Work" — asymmetric `lg:grid-cols-[5fr,7fr]`; (4) Four Trip Types — 2×2 card grid, dark-glass cards (`linear-gradient(160deg,#1e2638→#1C2231→#161d2b)`) + gold top hairline `rgba(163,201,64,0.22) 1.5px` + hover radial glow; types: **Discovery / Skill / Job Specific / Journalling** (no hyphens in names); (5) CTA — centered, links to `/candidates#waitlist` + `/candidates`. **Fixed "← Candidates" back link** (`position: fixed bottom-7 left-7 z-50`) — slate-glass pill (`rgba(28,34,49,0.75)` + `backdrop-filter: blur(12px)` + `1px solid rgba(255,255,255,0.08)`) always visible during scroll. Section separators: standalone `1px rgba(255,255,255,0.07)` rule divs between each section. Files: `src/app/trips/page.tsx` (RSC metadata wrapper) + `src/components/trips/TripsPage.tsx`. Linked from /candidates S3.5 globe "What's a Trip?" button, NOT in global nav.
```

### Responsiveness

The whole site is **fully fluid** from ~360px phones to ultrawide. Type tokens in `globals.css` are all `clamp()`-based (display **and** body/label). `body { overflow-x: clip }` + `img,svg,video,canvas { max-width:100% }` are global safety nets, but overflow is fixed at the source per-section. The glass-card sections `BridgeV2` & `HowVisibilityWorks` share the same full-bleed photo → overlay → glass-card pattern. Their fixed `40%/8%/60%` flex splits go `flex-col` and become `position: relative` (in-flow) **below `lg` (1024px)**, switching back to the `absolute inset-0` desktop row at `lg`+. `CompanyHero`'s content column uses `justify-center` so the whole block (eyebrow → headline → subtext → CTA → steps) sits vertically centered in the `100dvh` section; padding/gaps are all `clamp()`-based. The 4-step row is a `grid grid-cols-2` on mobile, `md:flex` row on desktop. `YourPassportMeasured` uses `grid-template-areas` on `.ypm-layout` so the header can be a separate grid item from the radar/detail-block: desktop `"chart header" / "chart content"`, mobile/tablet (≤900px) `"header" / "chart" / "content"` (text → radar → hover/detail block). `BlogGallery` is WebGL with adaptive FOV (`HFOV_TARGET`) so it self-scales — no CSS grid to break. Verify with Playwright at 375 / 768 / 1024 / 1440 (assert `scrollWidth <= clientWidth`).

### Loader & Page Transitions  (`src/components/loader/`)

`LoaderProvider` (client) is mounted once in `layout.tsx`, wrapping `<Nav/>` + `<main/>`; it owns a `"initial" | "transition" | "idle"` phase machine and renders the `Loader` overlay (fixed, `z-index:1000` above `.grain`, "Career **Passport**" wordmark reusing `.text-gold-shimmer`). The splash is **server-rendered opaque** so there's no flash on first paint.
- **First load:** held until the current route's hero `next/image` `onLoad` fires (`reportHeroReady`), with a `MIN_DISPLAY_MS` floor and `SAFETY_TIMEOUT_MS` ceiling. Routes with no hero (blog/trips) lift after the floor.
- **Candidates↔Companies toggle:** Nav's toggle `<Link>`s call `beginToggle()` (and use `scroll={false}`); the overlay re-shows, scroll resets to top via `useLayoutEffect` (`scrollTo({behavior:"instant"})`) **under** the overlay, so the new page always lands on Section 1. Other navs just instant-reset scroll, no overlay.
- Heroes gate their GSAP entrance on the context `heroStart` flag so the reveal plays **as the loader lifts** (`useGSAP(..., { dependencies:[heroStart] })`). `history.scrollRestoration="manual"`. Honors `prefers-reduced-motion`.

### Scrolling

Both pages use **normal document scrolling** — no scroll snapping. (The former `SmoothSnapScroller` on candidates and `SnapHtml` on companies were removed.) Since there's no snap, mid-page sections need not be one screen each — on **both** pages only the **hero** and **CTA** wrappers force `minHeight: 100dvh`; every middle section is a plain `<div>` sized by its own content. Cross-route scroll-to-top is handled by `LoaderProvider` (see above), not by Next's default. `BridgeV2`/`HowVisibilityWorks` keep `min-h-[80vh]` on desktop (content is `absolute inset-0` there); on mobile the card is in-flow so the section grows with content.

### Global Nav (all pages)

```
Career Passport  ·  [Candidates | Companies toggle]  ·  About  ·  Blog  ·  Join the Waitlist
```

- Logo: Playfair Display `text-[1.35rem] sm:text-[1.6rem]` — "Career" pearl, "Passport" gold
- Toggle pill: `absolute left-1/2 -translate-x-1/2` — truly centred in nav
- Right: About / Blog / "Join the Waitlist" (blue pill)
- Nav is **transparent at rest** (top of page: `bg-transparent border-transparent`); becomes glassmorphic on scroll (`bg-white/5 backdrop-blur-xl border-white/10`)

---

## Folder Structure (actual)

```
src/
├── app/
│   ├── layout.tsx                    ← root layout, fonts, Nav, grain body; imports slot-text/style.css
│   ├── globals.css                   ← @theme tokens, base styles, animations
│   ├── page.tsx                      ← redirects to /candidates
│   ├── candidates/
│   │   └── page.tsx                  ← 6 sections (normal scroll, each full-height)
│   ├── companies/
│   │   └── page.tsx                  ← 4 sections (normal scroll)
│   ├── blog/
│   │   └── page.tsx                  ← server component; renders <BlogGallery /> + route metadata
│   ├── trips/
│   │   └── page.tsx                  ← RSC metadata wrapper; renders <TripsPage />
│   └── sandbox/
│       └── bridge/
│           └── page.tsx              ← isolated preview route for BridgeV2 (safe to delete)
│
├── components/
│   ├── layout/
│   │   └── Nav.tsx                   ← global nav (always glassmorphic)
│   ├── TileOverlay.tsx               ← shared overlay utility
│   ├── candidates/
│   │   ├── CandidateHero.tsx         ← S1
│   │   ├── TheProblem.tsx            ← S2
│   │   ├── BridgeV2.tsx              ← S3 (active)
│   │   ├── Bridge.tsx                ← S3 legacy (dead code — replaced by BridgeV2; uses s3.png bg)
│   │   ├── GlobeVisibility.tsx       ← S3.5 ("Trip" globe section — layout/hover/SVG connectors)
│   │   ├── GlobeVisibility.css       ← S3.5 styles (grid-areas, mono numerals, connector overlay)
│   │   ├── WireframeGlobe.tsx        ← S3.5 WebGL globe (Three.js: graticule + GeoJSON borders + markers)
│   │   ├── HowVisibilityWorks.tsx    ← S4
│   │   ├── YourPassportMeasured.tsx  ← S5 (radar-chart skill section)
│   │   ├── OpportunitiesSection.tsx  ← S6
│   │   ├── CandidateCta.tsx          ← S7
│   │   └── CandidateCta.css
│   ├── companies/
│   │   ├── CompanyHero.tsx           ← S1
│   │   ├── CompanyHowItWorks.tsx     ← S2
│   │   ├── CompanyHowItWorks.css
│   │   ├── CompanyWhatHappensInBackend.tsx  ← S3
│   │   ├── CompanyWhatHappensInBackend.css
│   │   ├── CompanyCta.tsx            ← S4
│   │   └── CompanyCta.css
│   ├── blog/
│   │   ├── BlogGallery.tsx           ← "use client" — Three.js sphere gallery + GSAP + article dialog
│   │   └── blogData.ts               ← POSTS array, image list, shared article body/pull-quote
│   ├── trips/
│   │   └── TripsPage.tsx             ← "use client" — full editorial Trips explainer (5 sections, Framer Motion reveals, fixed back pill)
│   └── loader/
│       ├── LoaderProvider.tsx        ← "use client" — phase machine, scroll-reset, body-lock (wraps Nav + main)
│       ├── Loader.tsx                ← "use client" — branded splash overlay
│       └── loaderContext.ts          ← context + useLoader()/useHeroLoad() hooks + constants
│
└── lib/
    └── utils.ts                      ← cn() helper (clsx + tailwind-merge)
```

## Static Assets

The `/public` folder is organised into subfolders with kebab-case, conventionally-named files (renamed from the old spaced names; unused assets were deleted).

```
public/
  common/CTA.png                        → CompanyCta (S4) background image (opacity 0.85; top-blend gradient in CSS)
  data/countries.geo.json               → GlobeVisibility (S3.5) world country borders (Natural Earth 110m GeoJSON; id = ISO-A3) — fetched client-side by WireframeGlobe
  images/
    hero/candidate.png                  → CandidateHero (S1) background
    hero/companies.png                  → CompanyHero (S1) background
    sections/bridge.jpeg                → BridgeV2 (S3 active) background
    sections/s3.png                     → Bridge.tsx (S3 legacy/dead code) background — do not recreate references
    sections/s4.png                     → HowVisibilityWorks (S4) background (replaced trip.jpeg)
    sections/trip.jpeg                  → old S4 background (superseded by s4.png — no longer referenced)
    sections/cta-candidate.png          → CandidateCta (S7) background image
    sections/opportunities-bg.jpeg      → OpportunitiesSection background (component currently unused — see Notes)
    sections/opportunities.png          → OpportunitiesSection illustration (unused)
    blog/journal-01..24.jpeg            → BlogGallery (24 photos cycled across 54 posts)
  video/cta-background.mp4              → CandidateCta (S7) background video
```

Path generator for blog images lives in `blogData.ts` (`/images/blog/journal-NN.jpeg`).

> **Note on removed files:** `how-visibility.jpeg` (old name for `trip.jpeg`) and `candidate-cta.png` (duplicate of `cta-candidate.png`) were deleted — both were unused. Do not recreate them.

### next/image Rules

- `next.config.ts` explicitly allows `images.qualities: [75, 90]` — only these two quality values are valid. Do not use other values (e.g. `quality={85}`) without adding them to the config.
- Every `<Image fill …>` component **must** include a `sizes` prop (Next.js 16 enforces this). Pattern: `sizes="(max-width: 768px) 100vw, 50vw"` — adjust breakpoints to match the actual layout column width.

---

## Component Conventions

- All components are **React Server Components by default**. Add `"use client"` only when hooks or event listeners are needed.
- Use the `cn()` utility from `@/lib/utils` for conditional Tailwind classes.
- **Framer Motion** (`motion.div`, `whileInView`, stagger `variants`) for scroll-triggered entrance animations in `BridgeV2` and `HowVisibilityWorks`. Toast in CTA sections uses `AnimatePresence`.
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

### GSAP `clearProps: "all"` — Never include elements with React inline styles

`gsap.set(el, { clearProps: "all" })` wipes the **entire** inline `style` attribute — including properties React set via JSX `style={{...}}`. This permanently removes `background`, `border`, `boxShadow`, etc. from any element whose styling is managed by React inline styles.

**Rule:** Never put an element with React inline styles (e.g. a styled `<a>` or `<button>`) inside a `clearProps: "all"` call. Only include elements that use Tailwind classes or have no inline styles of their own.

**Pattern for `fromTo` targets with inline styles:** since `fromTo` sets an explicit start state, `clearProps` is unnecessary anyway — omit those refs entirely from the `gsap.set` clearProps call.

Affected in: `CompanyHero.tsx` — `ctaRef.current` must NOT be in the `clearProps: "all"` set call. The eyebrow/subtext/headline/step refs are fine (they rely on Tailwind classes, not inline styles).

### CTA Sections (`CandidateCta` / `CompanyCta`)

Both CTAs use **co-located `.css` files** (not Tailwind utilities) — intentional for components with many CSS custom properties and glass effects. Each CSS file defines scoped tokens on the shell class (`--cta-bg`, `--cta-accent`, `--cta-blue`).

**Background — `CompanyCta`:** `/common/CTA.png` at `opacity: 0.85`. A `::after` on `.company-cta-bg-layer` (z-index 2) applies a top-blend gradient: `rgba(11,14,20,1)` 0% → transparent ~35% → light centre → `rgba(11,14,20,0.60)` 100%. Blends seamlessly into the `#0B0E14` `CompanyWhatHappensInBackend` section above. **Never remove this overlay or reset image opacity to 1 — the abrupt black-to-bright-image jump will return.**

**Background — `CompanyHero`:** Two-layer overlay — gradient (`rgba(11,14,20,0.72)` 0%, `0.62` 25%, `0.70` 55%, `0.94` 82%, `1.0` 100%) plus a flat `rgba(11,14,20,0.28)` layer on top. Intentionally dark to match the page's black-first aesthetic.

Structure:
- `CompanyCta` background: `/common/CTA.png` at opacity 0.85 with top-blend gradient overlay; `CandidateCta` background: video `/video/cta-background.mp4`
- Eyebrow label now rendered as a **solid lime-green chip** (background `#A3C940`, text `#0B0E14` dark ink, uppercase) — not just text color
- Playfair heading with italic `<span>` highlight (now pearl/white, not gold)
- Heading size reduced: `clamp(34px,3.6vw,52px)` (previously `clamp(46px,5vw,68px)`)
- **Form row uses underline style** — `border-bottom: 1px solid rgba(163,201,64,0.4)` + `border-bottom-color: var(--cta-accent)` on focus; no box border, no background box
- Email `<input>` (transparent, no border box) + lime submit `<button>` (`text-ink`, `color: #0B0E14`) in an underline row — stacks on mobile
- Submit button hover: `background: #bcd96b`
- 3 trust badge items: slate-glass icon circle (gold icon stroke) + label text
- Framer Motion `AnimatePresence` toast — success (gold border) / error (red border), auto-dismisses after 3.5s
- **`CandidateCta`** uses `useGSAP` + `SplitText` for scroll-triggered entrance animations (eyebrow, heading, desc, form, trust badges stagger in). Button label uses `slot-text` for character-roller hover effect. No `useReveal` hook — GSAP drives all reveals.
- **`CompanyCta`** mirrors `CandidateCta` exactly — same `useGSAP` + `SplitText` entrance sequence, same `slot-text` button roller. Label initialises to "Connect with us"; success rolls to "We'll be in touch!".
- **`handleSubmit` is a `console.log` placeholder** — replace with real API call when backend exists
- Candidate CTA: `id="waitlist"` · Company CTA: `id="company-waitlist"`
- Image asset: `public/common/CTA.png` → served at `/common/CTA.png`
- **Bottom tagline** — `.cta-bottom-tagline` is `position: absolute; bottom: 28px; left: 50%` (centred). Text: `"BUILT FOR AMBITIOUS ONES"`. Monospace, `font-size: 10px`, `letter-spacing: 0.3em`. Color: `rgba(245,242,236,0.45)` — subtle but legible. **Do not drop opacity below 0.35** or the text becomes invisible against the video background.

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
- The section is below the fold on mount — `modern-screenshot` captures it correctly; a `document.body` clone does not
- **Never use Framer Motion `initial="hidden"` (or any `opacity: 0` initial state) inside `[data-tile-content]`** — `domToCanvas` captures the DOM at mount time, before the user scrolls to the section. Elements at `opacity: 0` produce a black canvas, which gets applied as tile textures, making the entire section appear black. `TheProblem` (S2) is a pure RSC with no Framer Motion for this reason.

**Usage pattern:**
```tsx
<section className="relative ...">
  <div data-tile-content>{/* section content */}</div>
  <TileOverlay className="absolute inset-0 z-10" />
</section>
```

---

## YourPassportMeasured — Radar Hover (`/candidates` S5)

`YourPassportMeasured.tsx` (`"use client"`) + `YourPassportMeasured.css`. 8-dimension SVG radar chart on the left; a detail card / default panel on the right driven by hover state (`activeIdx: number | null`).

**Hover model — whole-chart surface (not point targets):**
The SVG has `onMouseMove` / `onMouseLeave` directly on it. `handlePointerMove` maps cursor position to the nearest dimension by angle from centre (Voronoi-by-angle):
```ts
const dx = ((e.clientX - rect.left) / rect.width) * 440 - CX;
const dy = ((e.clientY - rect.top) / rect.height) * 440 - CY;
if (Math.hypot(dx, dy) < 14) return; // dead-centre: keep last active
const ang = Math.atan2(dy, dx) + Math.PI / 2; // rotate so "up" = idx 0
const idx = ((Math.round((ang / (2*Math.PI)) * N) % N) + N) % N;
onNodeHover(idx);
```
This means moving the cursor anywhere over the chart always shows a detail card — no dead zones between the 8 small dot targets. `onMouseLeave` on the SVG clears `activeIdx` → shows the default panel.

**Critical: do not key the detail card by dimension id.**
`AnimatePresence mode="wait"` is used to animate between the default panel and the detail card. The detail card uses `key="detail"` (stable), **not** `key={activeItem.id}`. This keeps the card mounted while switching dimensions so content updates in place (progress bar tweens, name/score swap) — using `key={id}` would remount the card on every node change, causing a 0.28s exit-then-enter stutter under `mode="wait"`.

**Fixed card-area height — no layout shift on hover:**
`.ypm-card-area` has a fixed `height: 320px` (desktop) / `height: 290px` (≤900px). Both `.ypm-detail-card` and `.ypm-default-panel` are `position: absolute; top: 0; left: 0; right: 0;` so they overlay within the fixed container. Without this, the taller detail card would push the section height up on hover.

---

## Blog — Gallery (`/blog`)

`BlogGallery.tsx` (`"use client"`) is a full-screen phantom.land-style gallery: a **flat, tightly-packed grid at rest** that **curves into a sphere and zooms out while you drag**, relaxing back to flat when you stop. Cards (one per `POSTS` entry — 54 posts, 24 `journal-NN.jpeg` photos cycled) are drawn as canvas textures.

**Grid & curve (the core model):**
- Cards are a `COLS × ROWS` block of centred grid coordinates (`cellX`/`cellY`); the camera sits at the origin looking `-Z` at a flat plane at `z = -FLAT_DEPTH`. Each card is a shared `PlaneGeometry` + per-card `CanvasTexture` from `drawCard()` (photo + ink gradient + gold category + Playfair title + date + read-time; header text has a shadow for contrast over bright photos).
- **Pan** is a 2D offset driven by drag (`target`→`pan` `FOLLOW` lerp + release inertia). Each card's flat position wraps toroidally via `wrap(cell + pan, GRID_W/H)` → an **infinite** grid (block dims exceed the visible window, so no duplicate is ever on screen at once).
- **`curve` ∈ [0,1]** eases toward 1 while there's drag motion and back to 0 at rest (`CURVE_EASE`; forced 0 under `prefers-reduced-motion`). Per frame each card's flat `(fx,fy,-FLAT_DEPTH)` is bent onto a sphere whose front pole sits at the grid centre (`SPHERE_R`); `position = lerp(flat, sphere, curve)` and orientation `slerp`s from identity (faces camera) to the sphere normal. A `CURVE_ZOOM` factor pushes everything back as it curves → the "zoom out into a globe" feel.
- `computeFov(aspect)` derives vertical FOV to preserve a constant **horizontal** field (`HFOV_TARGET`) so density is consistent from ultrawide desktop to portrait phone.

**Open/close:** clicking a card raycasts (`world.updateMatrixWorld(true)` first so hit-testing matches the drawn frame), then `openArticle` zooms the chosen card toward the camera while others fade and the HTML article overlay crossfades in. `closeArticle` reverses it. The selected card is `frozen` (render loop skips it) while GSAP owns its transform; the open/close tweens are tracked in `openTween`/`overlayTween` and killed in cleanup / on close to avoid the close-during-open race and post-unmount ticking.

**Accessibility:** the WebGL canvas is `aria-hidden`; an `sr-only` `<ul>` lists every story (title + category + read-time) as focusable buttons — the keyboard entry point **and** crawlable content. The article overlay is a real dialog (`role="dialog"`, `aria-modal`, `aria-labelledby`), focus moves to the Back button on open and is restored to the originating list item on close, **Esc** closes, Tab is trapped, and the gallery chrome is `inert` while open. All large motion (entrance, open-zoom, overlay reveal) honours `prefers-reduced-motion`.

**Lifecycle:** cleanup disposes every material + `CanvasTexture` + the shared geometry + the starfield, kills all GSAP tweens, removes listeners, and calls **both** `renderer.dispose()` and `renderer.forceContextLoss()` (dispose alone does not release the GL context — important for StrictMode double-mount / HMR).

---

## Notes

- `OpportunitiesSection.tsx` exists but is **not rendered** anywhere (the candidates page renders Hero → TheProblem → BridgeV2 → HowVisibilityWorks → YourPassportMeasured → CandidateCta). It is dead code — wire it into `candidates/page.tsx` or delete it. (`Payoff.tsx` stub was removed.)
- `Bridge.tsx` is also dead code — replaced by `BridgeV2.tsx` as S3. Keep for reference or delete. Its image reference (`s3.png`) should not be used in active components.
- Trips page (`/trips`) is a supporting explainer page (currently a placeholder). It is **not** in the top nav — only linked from Candidates S4.
- The `#waitlist` form section appears on every page as the final CTA.
- No analytics, no CMS, no auth. Pure frontend.
- GitHub repo: `https://github.com/Archit-175/career-passport-v4`
- Tailwind v4: **do not create `tailwind.config.ts`** — all customisation lives in `globals.css` under `@theme {}`. PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`.

---

## Companies Page — Architecture Notes

### Scrolling: Only Hero + CTA Are Full-Height

The page uses normal document scrolling, so mid-page sections need not be one screen each. In `companies/page.tsx` only the **hero** and **CTA** wrappers carry `minHeight: 100dvh`; `CompanyHowItWorks` and `CompanyWhatHappensInBackend` are plain `<div>`s sized by their own content. `CompanyHowItWorks` is a static section (no scroll-tracking) whose 4 stacked rows define its height (~1.8 screens); `CompanyWhatHappensInBackend` has **no** internal `min-height` either (its shell sizes to content).

### CompanyHowItWorks — Static Dark Zigzag

Rebuilt as a flat-ink section (no photo, no glassmorphism, no sticky/scroll machinery). Heading at top, then **4 alternating text↔demo rows** that fade up on scroll via Framer Motion `whileInView` (parent `staggerChildren`, `useReducedMotion` guard) — same reveal pattern as `Bridge`/`HowVisibilityWorks`.

- **Shell**: `.hiw-section` flat `--hiw-bg` (ink). Rows are CSS grid `1fr 1fr`; even rows get `.reverse` which flips column `order`. Collapses to single column (text above demo) at ≤900px.
- **Section header underlines** (matching candidates page language): `.hiw-header-rule` — faint full-width `1px` line (`rgba(255,255,255,0.08)`) between eyebrow and title (mirrors TheProblem's divider); `.hiw-gold-rule` — short `2rem` gold `1px` line (`rgba(163,201,64,0.45)`) after the title (mirrors HowVisibilityWorks); `.hiw-step-rule` — small `1.25rem` gold `1px` accent line (`rgba(163,201,64,0.35)`) under each step number.
- **Demos** (`DemoCard` shell + `BriefDemo`/`JourneyDemo`/`MomentsDemo`/`CalendarDemo`): compact **dark-glass** cards — gradient `linear-gradient(160deg,#232b3e→#1C2231→#161d2b)`, lime-gold top hairline (`rgba(163,201,64,0.20)`), pearl text. **All demos stay dark** (no `#fff` surfaces — same rule as S3 below). One gold accent per demo.
- **`DemoCard` header**: macOS-style **traffic-light dots** (red `#ff5f57` / amber `#febc2e` / green `#28c840`) pinned **left** via `.hiw-demo-dots i:nth-child(n)`, followed by the section label.
- **Teal token**: `--hiw-teal: #6fd0a3` (lightened from the design-system teal for legibility on the dark surface).
- The `MiraRaoAvatar`/`ArnavNairAvatar` inline SVGs are reused in `CalendarDemo`.
- `companiess2.jpeg` was deleted (it was this section's pre-redesign background; the static zigzag uses no photo).

### CompanyHero → S2 blend

`CompanyHero`'s bottom overlay gradient ramps to **fully opaque ink** at the very bottom (`…rgba(11,14,20,0.92) 85%, rgba(11,14,20,1) 100%`) so the hero photo dissolves into the exact ink colour S2 starts on — no visible seam between the hero and the flat-ink "How it works" section.

### CompanyWhatHappensInBackend — Dark Theme Rules

- Background: `#0B0E14` (ink) via `--backend-bg` token — matches S2 for a seamless transition
- Cards: gradient `linear-gradient(160deg, #232b3e → #1C2231 → #161d2b)` + gold top border `1.5px solid rgba(163,201,64,0.32)`
- **All mockup components must stay dark** — never `background: #ffffff`. Use `rgba(255,255,255,0.05–0.07)` glass + pearl text
- Mockup 1 CTA: gold `rgba(163,201,64,0.85)`. Mockup 2 tags: tinted dark glass. Mockup 3 trip: dark glass + `#93b4f8`. Mockup 4 metrics: dark glass + gold Playfair numbers
- Connector arrows: `color: rgba(163,201,64,0.55)`

### Preview / Verification

**Always use Playwright for previewing the app — never the `preview_*` tools.** Start the dev server with `npm run dev` (port 3000), then verify with the `playwright` MCP (`browser_navigate` to `http://localhost:3000`, `browser_take_screenshot`, `browser_console_messages`, etc.). Stop the dev server when done — never leave it idle.
