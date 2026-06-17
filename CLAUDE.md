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
                ✅ S4 HowVisibilityWorks     — black bg, text + how-visibility.jpeg; glass card stacks vertically below lg; Framer Motion stagger (left col fade-up, right step cards slide-in from right)
                ✅ S5 YourPassportMeasured  — black bg, 2-col: interactive SVG radar chart (8 dimensions, hover-to-detail) left + headline/detail-card/trip-CTA right; Framer Motion reveals
                ⚠️ OpportunitiesSection      — NOT rendered (dead code; see Notes). opportunities-bg.jpeg bg, glass card with GSAP looping gold word + opportunities.png + 4 floating recruiter cards
                ✅ S7 CandidateCta          — final waitlist CTA; GSAP/SplitText entrance + slot-text button roller

/companies      ✅ S1 CompanyHero            — companies hero.png bg, 4-step flow; GSAP/SplitText masked-line headline entrance + step cards stagger
                ✅ S2 CompanyHowItWorks    — flat-ink static zigzag: heading + 4 alternating text/demo rows (compact dark-glass demos), Framer Motion fade-up on scroll
                ✅ S3 CompanyWhatHappensInBackend
                ✅ S4 CompanyCta             — GSAP/SplitText entrance + slot-text button roller

/blog           ✅ BlogGallery              — full-screen Three.js gallery (phantom.land-style): flat tight grid at rest, curves into a sphere + zooms out while dragging; click a card → article dialog animates in. See "Blog — Gallery" below.

/trips          ✅ TripsPage                — branded responsive "coming soon" page (eyebrow + Playfair headline + body + waitlist/back links). Linked from /candidates S4 & S5, NOT in global nav.
```

### Responsiveness

The whole site is **fully fluid** from ~360px phones to ultrawide. Type tokens in `globals.css` are all `clamp()`-based (display **and** body/label). `body { overflow-x: clip }` + `img,svg,video,canvas { max-width:100% }` are global safety nets, but overflow is fixed at the source per-section. The glass-card sections `Bridge` & `HowVisibilityWorks` were the main offenders: their fixed `40%/8–10%/50–52%` flex splits now `flex-col` and become `position: relative` (in-flow) **below `lg` (1024px)**, switching back to the `absolute inset-0` desktop row at `lg`+. `CompanyHero`'s 4-step row is a `grid grid-cols-2` on mobile, `md:flex` row on desktop. `BlogGallery` is WebGL with adaptive FOV (`HFOV_TARGET`) so it self-scales — no CSS grid to break. Verify with Playwright at 375 / 768 / 1024 / 1440 (assert `scrollWidth <= clientWidth`).

### Loader & Page Transitions  (`src/components/loader/`)

`LoaderProvider` (client) is mounted once in `layout.tsx`, wrapping `<Nav/>` + `<main/>`; it owns a `"initial" | "transition" | "idle"` phase machine and renders the `Loader` overlay (fixed, `z-index:1000` above `.grain`, "Career **Passport**" wordmark reusing `.text-gold-shimmer`). The splash is **server-rendered opaque** so there's no flash on first paint.
- **First load:** held until the current route's hero `next/image` `onLoad` fires (`reportHeroReady`), with a `MIN_DISPLAY_MS` floor and `SAFETY_TIMEOUT_MS` ceiling. Routes with no hero (blog/trips) lift after the floor.
- **Candidates↔Companies toggle:** Nav's toggle `<Link>`s call `beginToggle()` (and use `scroll={false}`); the overlay re-shows, scroll resets to top via `useLayoutEffect` (`scrollTo({behavior:"instant"})`) **under** the overlay, so the new page always lands on Section 1. Other navs just instant-reset scroll, no overlay.
- Heroes gate their GSAP entrance on the context `heroStart` flag so the reveal plays **as the loader lifts** (`useGSAP(..., { dependencies:[heroStart] })`). `history.scrollRestoration="manual"`. Honors `prefers-reduced-motion`.

### Scrolling

Both pages use **normal document scrolling** — no scroll snapping. (The former `SmoothSnapScroller` on candidates and `SnapHtml` on companies were removed.) Since there's no snap, mid-page sections need not be one screen each — on **both** pages only the **hero** and **CTA** wrappers force `minHeight: 100dvh`; every middle section is a plain `<div>` sized by its own content. Cross-route scroll-to-top is handled by `LoaderProvider` (see above), not by Next's default. `Bridge`/`HowVisibilityWorks` keep `min-h-[80vh]` on desktop (content is `absolute inset-0` there); on mobile the card is in-flow so the section grows with content.

### Global Nav (all pages)

```
Career Passport  ·  [Candidates | Companies toggle]  ·  About  ·  Blog  ·  Join the Waitlist
```

- Logo: Playfair Display `text-[1.35rem] sm:text-[1.6rem]` — "Career" pearl, "Passport" gold
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
│   │   └── page.tsx                  ← 6 sections (normal scroll, each full-height)
│   ├── companies/
│   │   └── page.tsx                  ← 4 sections (normal scroll)
│   ├── blog/
│   │   └── page.tsx                  ← server component; renders <BlogGallery /> + route metadata
│   └── trips/
│       └── page.tsx                  ← placeholder
│
├── components/
│   ├── layout/
│   │   └── Nav.tsx                   ← global nav (always glassmorphic)
│   ├── TileOverlay.tsx               ← shared overlay utility
│   ├── candidates/
│   │   ├── CandidateHero.tsx         ← S1
│   │   ├── TheProblem.tsx            ← S2
│   │   ├── Bridge.tsx                ← S3
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
  video/cta-background.mp4              → CandidateCta (S7) + CompanyCta (S4) background video
  images/
    hero/candidate.png                  → CandidateHero (S1) background
    hero/companies.png                  → CompanyHero (S1) background
    sections/bridge.jpeg                → Bridge (S3) background
    sections/how-visibility.jpeg        → HowVisibilityWorks (S4) background
    sections/opportunities-bg.jpeg      → OpportunitiesSection background (component currently unused — see Notes)
    sections/opportunities.png          → OpportunitiesSection illustration (unused)
    blog/journal-01..24.jpeg            → BlogGallery (24 photos cycled across 54 posts)
```

Path generator for blog images lives in `blogData.ts` (`/images/blog/journal-NN.jpeg`).

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
- Looping background video (`/video/cta-background.mp4`, `opacity: 0.35`) with an ink-to-transparent gradient overlay
- Eyebrow monospace label in gold + Playfair heading with italic gold `<span>` highlight
- Email `<input>` (slate-glass, gold focus ring) + blue submit `<button>` in a flex row — stacks on mobile
- 3 trust badge items: slate-glass icon circle (gold icon stroke) + label text
- Framer Motion `AnimatePresence` toast — success (gold border) / error (red border), auto-dismisses after 3.5s
- **`CandidateCta`** uses `useGSAP` + `SplitText` for scroll-triggered entrance animations (eyebrow, heading, desc, form, trust badges stagger in). Button label uses `slot-text` for character-roller hover effect. No `useReveal` hook — GSAP drives all reveals.
- **`CompanyCta`** mirrors `CandidateCta` exactly — same `useGSAP` + `SplitText` entrance sequence, same `slot-text` button roller. Label initialises to "Connect with us"; success rolls to "We'll be in touch!".
- **`handleSubmit` is a `console.log` placeholder** — replace with real API call when backend exists
- Candidate CTA: `id="waitlist"` · Company CTA: `id="company-waitlist"`
- Video asset: `public/video/cta-background.mp4` → served at `/video/cta-background.mp4`

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

- `OpportunitiesSection.tsx` exists but is **not rendered** anywhere (the candidates page renders Hero → TheProblem → Bridge → HowVisibilityWorks → YourPassportMeasured → CandidateCta). It is dead code — wire it into `candidates/page.tsx` or delete it. (`Payoff.tsx` stub was removed.)
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
- **Demos** (`DemoCard` shell + `BriefDemo`/`JourneyDemo`/`MomentsDemo`/`CalendarDemo`): compact **dark-glass** cards — gradient `linear-gradient(160deg,#232b3e→#1C2231→#161d2b)`, gold top hairline, pearl text. **All demos stay dark** (no `#fff` surfaces — same rule as S3 below). One gold accent per demo.
- **Teal token**: `--hiw-teal: #6fd0a3` (lightened from the design-system teal for legibility on the dark surface).
- The `MiraRaoAvatar`/`ArnavNairAvatar` inline SVGs are reused in `CalendarDemo`.
- `companiess2.jpeg` was deleted (it was this section's pre-redesign background; the static zigzag uses no photo).

### CompanyWhatHappensInBackend — Dark Theme Rules

- Background: `#0B0E14` (ink) via `--backend-bg` token — matches S2 for a seamless transition
- Cards: gradient `linear-gradient(160deg, #232b3e → #1C2231 → #161d2b)` + gold top border `1.5px solid rgba(201,168,76,0.32)`
- **All mockup components must stay dark** — never `background: #ffffff`. Use `rgba(255,255,255,0.05–0.07)` glass + pearl text
- Mockup 1 CTA: gold `rgba(201,168,76,0.85)`. Mockup 2 tags: tinted dark glass. Mockup 3 trip: dark glass + `#93b4f8`. Mockup 4 metrics: dark glass + gold Playfair numbers
- Connector arrows: `color: rgba(201,168,76,0.55)`

### Preview / Verification

**Always use Playwright for previewing the app — never the `preview_*` tools.** Start the dev server with `npm run dev` (port 3000), then verify with the `playwright` MCP (`browser_navigate` to `http://localhost:3000`, `browser_take_screenshot`, `browser_console_messages`, etc.). Stop the dev server when done — never leave it idle.
