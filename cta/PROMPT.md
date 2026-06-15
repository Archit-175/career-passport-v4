I am adding two pre-built CTA sections to this project — one for the **candidate page** and one for the **company page**. All files are already in the `cta/` folder.

---

## Folder structure

```
cta/
├── candidate/
│   ├── CandidateCta.tsx
│   └── CandidateCta.css
├── company/
│   ├── CompanyCta.tsx
│   └── CompanyCta.css
├── public/
│   └── common/
│       └── CTABGV.mp4     ← shared background video
└── PROMPT.md  (this file)
```

---

## What these sections do

Both sections share the same visual structure — they differ only in copy, tokens, and trust badge text.

Each section has:
- A **looping background video** (`CTABGV.mp4`) with a top-to-bottom gradient fade overlay
- An **eyebrow label** + **Playfair Display heading** with an italic gold highlight
- A short **description** paragraph
- An **email input + submit button** in a flex row (stacks on mobile)
- **3 trust indicator badges** with glassmorphism icon circles
- An **animated toast** (framer-motion) for success and error states — auto-dismisses after 3.5s
- A **bottom tagline** pinned to the floor of the section

### Candidate CTA

| Element | Content |
|---|---|
| Heading | *Ready to document, prove, and own **your journey?*** |
| Button | "Join the waitlist" |
| Trust badges | No resume required · No spam. Ever. · Be the first to know |
| Bottom tagline | BUILT FOR AMBITIOUS ONES |
| Success toast | "✨ Thanks for joining the waitlist! We'll keep you updated." |

### Company CTA

| Element | Content |
|---|---|
| Heading | *Ready to **hire differently?*** |
| Button | "Connect with us" |
| Trust badges | Free to start · Pay only when you hire · Cancel anytime |
| Bottom tagline | BUILT FOR MODERN HIRING TEAMS |
| Success toast | "✨ Thank you! We'll reach out to design your journey within 24 hours." |

---

## Dependencies

| Package | Used for |
|---|---|
| `framer-motion` | Toast enter/exit animation (`AnimatePresence`) |

`useReveal` (IntersectionObserver scroll entrance) is **inlined in each TSX file** — no separate hook file needed.

```bash
npm install framer-motion
```

---

## Steps to integrate

### 1. Copy the video

Copy `cta/public/common/CTABGV.mp4` into this project's public folder so it's served at `/common/CTABGV.mp4`.

If your project's public folder uses a different subfolder structure, put it there and pass the path via `videoSrc` prop:

```tsx
<CandidateCta videoSrc="/assets/videos/CTABGV.mp4" />
```

---

### 2. Import the CSS

In whichever file loads your section styles (global CSS or component):

```css
/* Candidate page */
@import "./cta/candidate/CandidateCta.css";

/* Company page */
@import "./cta/company/CompanyCta.css";
```

Or import directly at the top of each TSX file:

```tsx
import "./CandidateCta.css";
import "./CompanyCta.css";
```

---

### 3. Override the theme tokens

**Candidate CTA** — defaults are fine for a warm cream palette. Override if needed:

```css
:root {
  --cta-bg:     #f8ead9;   /* section background */
  --cta-accent: #B87A3A;   /* gold — heading highlight, icons, focus ring */
}
```

**Company CTA** — slightly different cream, same gold:

```css
:root {
  --company-cta-bg:     #fcebd1;   /* section background */
  --company-cta-accent: #B7792A;   /* gold */
}
```

Both CSS files define their own token defaults inside `.cta-shell` / `.company-cta-shell`, so they work without any `:root` overrides — just customize when you need a different palette.

---

### 4. Wire up the form submission

Both components have a `handleSubmit` function with a `// ↓ Replace this with your API call` comment. Replace the `console.log` line with your actual call:

```tsx
// Example — replace with your own API
const res = await fetch("/api/waitlist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});
if (!res.ok) throw new Error("Failed");
```

The toast messages below the API call are already wired — update the success/error message strings if your copy differs.

---

### 5. Place the components

**Candidate page** — import and render at the bottom:

```tsx
import { CandidateCta } from "./cta/candidate/CandidateCta";

// at the end of your candidate page:
<CandidateCta />
```

**Company page** — same pattern:

```tsx
import { CompanyCta } from "./cta/company/CompanyCta";

// at the end of your company page:
<CompanyCta />
```

Both accept an optional `videoSrc` prop (default `/common/CTABGV.mp4`). No other props required.

---

### 6. Entrance animation (optional)

Both sections use `.reveal-up` + `.in` (IntersectionObserver adds `.in` on scroll). This is self-contained — it just works.

If this project already has its own scroll-reveal system and you want to use it instead:
1. Remove `ref={sectionRef}` and `className="... reveal-up"` from the `<section>` element
2. Delete the `useReveal` hook at the top of the TSX
3. Delete the `.reveal-up` / `.reveal-up.in` block from the CSS

---

## What NOT to change

- The heading copy, trust badge text, and toast messages — these are product copy
- The video overlay gradient — it's tuned to keep the heading readable at all viewport heights
- The toast positioning (`position: fixed`) — it stays above the home indicator on mobile

---

## Responsive behavior (already handled in the CSS)

| Breakpoint | Behavior |
|---|---|
| Desktop (≥ 1025px) | Email input + button side by side, trust badges in one row |
| Tablet (≤ 1024px) | Heading scales down to `clamp(34px, 4.5vw, 48px)` |
| Mobile (≤ 767px / 768px) | Form stacks vertically, trust badges stack in a column, section height becomes `auto` |

Safe-area insets (`env(safe-area-inset-bottom)`) and touch-target minimums (`min-height: 48px`) are already applied — no extra work needed for notched phones.
