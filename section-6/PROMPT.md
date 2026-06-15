I am adding a pre-built section to this project. It will be **Section 6** of the page. All the files are already in the `section-6/` folder I've dropped in.

---

## What's in the folder

```
section-6/
├── OpportunitiesSection.tsx
├── OpportunitiesSection.css
├── PROMPT.md  (this file)
└── public/
    └── opportunities-new.png
```

---

## What this section does

Full-viewport section (`100svh`) with:
- A **background illustration** (`opportunities-new.png`) that fills the viewport via `object-fit: cover`
- A **cream gradient wash** at the top to keep the headline readable over the image
- An **HTML headline** with a **GSAP-animated looping word** that cycles through: *doors → people → offers → teams* (rise-and-fade swap, no layout shift)
- **4 floating glassmorphism cards** that enter with a framer-motion stagger on scroll-into-view, then gently bob via CSS keyframe animation
- A **footer statement** pinned to the bottom of the section

The headline reads:
> *When quality work is visible, the right [looping word] find you.*

The 4 cards are recruiter/hiring manager reach-out messages — they float at specific positions (top-left, bottom-left, top-right, bottom-right) on desktop, and restack in a zigzag on mobile.

---

## Dependencies

| Package | Used for |
|---|---|
| `framer-motion` | Card stagger entrance animation |
| `gsap` | LoopingWord animation (fade + rise) |

Both are already used inside `OpportunitiesSection.tsx` — no wrappers or providers needed. Install them if not already present:

```bash
npm install framer-motion gsap
```

`LoopingWord` and `useReveal` are **inlined inside the TSX file** — no separate imports needed.

There is **no Next.js `Image` dependency** — it uses a plain `<img>` tag.

There is **no snap-scroll dependency** — the section scrolls normally.

---

## Steps to integrate

**1. Copy the image**

Copy `section-6/public/opportunities-new.png` into this project's public folder. Then pass the correct path via prop:

```tsx
<OpportunitiesSection imageSrc="/opportunities-new.png" />
```

If your project's public folder has a subfolder structure (e.g. `/assets/` or `/images/`), put it there and update `imageSrc` accordingly.

---

**2. Import the CSS**

Add the CSS import wherever this project loads section styles — either in a global CSS file or directly at the top of the component file:

```css
/* in your global CSS */
@import "./section-6/OpportunitiesSection.css";
```

or in the TSX:

```tsx
import "./OpportunitiesSection.css";
```

---

**3. Override the theme tokens**

The CSS file defines these tokens with defaults at the top of `.opps-shell`. Override them in your project's root CSS to match this project's design theme:

```css
:root {
  --opp-bg:      #efe3cf;   /* section background — replace with your bg color */
  --opp-text:    #2a2218;   /* headline text color */
  --opp-subtext: #5a4636;   /* footer statement + card attribution color */
  --opp-accent:  #B7792A;   /* looping word color — usually your brand accent */
}
```

The card glassmorphism background (`rgba(253,250,244,0.90)`) and the 4 icon accent colors (olive, slate blue, terracotta, amber) are fixed in the CSS. If this project has a very different palette you can update those too — they are all in `OpportunitiesSection.css` under the `/* Icon circles */` comment block.

---

**4. Adjust navbar clearance**

The headline is positioned with:

```css
top: clamp(80px, 13vh, 180px);
```

Change the `clamp` values in `.opps-headline` inside `OpportunitiesSection.css` to match the height of this project's fixed navbar so the headline sits cleanly below it.

---

**5. Place the component in the page**

Import and render it as Section 6:

```tsx
import { OpportunitiesSection } from "./section-6/OpportunitiesSection";

// inside your page, after section 5:
<OpportunitiesSection imageSrc="/opportunities-new.png" />
```

---

**6. Wire the entrance animation (optional)**

The section element gets class `reveal-up` and the `useReveal` hook (inlined in the TSX) adds class `in` via `IntersectionObserver` when it scrolls into view.

The CSS already handles this:

```css
.reveal-up      { opacity: 0; transform: translateY(28px); transition: ... }
.reveal-up.in   { opacity: 1; transform: translateY(0); }
```

This works out of the box — no extra setup needed. If this project already has its own scroll-reveal system and you want to use that instead, remove `ref={sectionRef}` and `className="reveal-up"` from the `<section>` element in the TSX, and delete the `useReveal` hook and `.reveal-up` / `.reveal-up.in` rules from the CSS.

---

## What NOT to change

- The card text, attribution lines, and looping words — these are product copy, leave as-is
- The card positions and float animation timings — these are tuned for the layout
- The background image — it is a specific illustration, not a generic stock image
- The `LoopingWord` and `useReveal` implementations inside the TSX — they are self-contained and correct

---

## Responsive behavior (already handled in the CSS)

| Breakpoint | Behavior |
|---|---|
| Desktop (≥ 1025px) | 4 cards spread across left/right sides of the illustration |
| Tablet (≤ 1024px) | Cards closer to edges, image zoomed out slightly |
| Mobile (≤ 767px) | Cards in zigzag column (right, left, right, left top-to-bottom), image full-bleed cover |
