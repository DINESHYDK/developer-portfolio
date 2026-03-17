# Development Workflow — YDK Portfolio v2

## Stack
- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (CSS-first config via `@theme` in `index.css`)
- Framer Motion 12
- Lucide React (icons)

## Local Dev
```bash
cd ydk-portfolio-v2
npm run dev        # Vite dev server (HMR)
npm run build      # production build
npm run preview    # preview production build locally
```

## Project Structure
```
src/
  assets/           SVG illustrations (svg-about-1…4.svg, dev-character-*.svg)
  components/
    id-card/        Flip card (front + back), id-card.css
    layout/         Navbar, Footer (YdkSpotlight)
    sections/       HeroSection, AboutSection, SkillsSection, …
    smooth-cursor/  SmoothCursor — two-layer: instant triangle + lerp ring (0.12)
    splash-screen/  SplashScreen — SVG signature draw animation (CSS stroke-dashoffset)
  config/           site-metadata.ts, footer-links.ts
  data/             profile-data.ts, terminal-commands.ts
  utils/            cn.ts (clsx helper)
  index.css         Global styles + CSS custom properties + layout classes
  App.tsx           Top-level wiring
```

## CSS Conventions
- All colours via CSS custom properties defined in `:root` and `@theme` in `index.css`
- Never hardcode hex values in component files — always use `var(--color-*)` or Tailwind utilities
- Exception: SVG fill/stroke values in `.svg` files may use hex directly
- Tailwind v4 uses `@theme` block instead of `tailwind.config.js`

## SVG Imports (Vite)
- `?url` → returns hashed URL → use as `<img src={…} />` (about section illustrations)
- `?raw` → returns SVG markup string → use with `dangerouslySetInnerHTML` (draw-in animations)
- Never mix the two on the same element

## Key Design Decisions

### Custom Cursor
`SmoothCursor` is a two-layer cursor: instant triangle + lerp-trailing ring (factor 0.12).
Both layers use `requestAnimationFrame` loop with direct DOM writes — no `useState`, zero re-renders.
Ring expands on hover over `a/button/input/textarea/[data-cursor-hover]`, shrinks on click.
CSS states (`.ring-hover`, `.ring-click`, `.triangle-click`) defined in `index.css`.
Hidden on `pointer: coarse` (touch) devices. `cursor: none` applied globally via
`@media (pointer: fine)` in `index.css`.

### About Section — Sticky + Sequential Reveal
- Left column: `position: sticky; top: 100px` — SVG swaps between 4 illustrations
- Right column: only **unlocked** sections rendered in DOM (`ABOUT_SECTIONS.slice(0, unlockedCount)`)
  — no empty placeholder space for locked sections
- SVG border: conic-gradient on wrapper div, updated via direct DOM ref (no re-renders)
- SVG swap: `isAnimating` ref prevents overlapping transitions (300ms swap + 400ms settle)
- IntersectionObserver: `threshold: 0.55`, `rootMargin: "0px 0px -30% 0px"`
- Each card: `min-height: 65vh` so only one card visible at a time

### Footer YDK Spotlight
- Canvas-based, scoped to container (not window)
- Lerp (factor 0.10) for smooth cursor following + subtle sine pulse (2000ms)
- 3-pass: dark overlay → `destination-out` cut → teal glow ring
- `ResizeObserver` keeps canvas sized to container
- Disabled on `pointer: coarse`

### Footer Layout
- `footer-top`: `grid-template-columns: 1fr auto` — brand left, connect right (desktop)
- `footer-mobile-columns`: 2-col nav + connect grid (mobile only, `display: none` on desktop)
- Divider lines: all use `border-white/5` (1px, `rgba(255,255,255,0.05)`) at full viewport width
  (NOT inside the `max-w-5xl` container — moved outside to match top `border-t`)

### ID Card
- 3D flip: `perspective`, `transform-style: preserve-3d`, `backface-visibility: hidden`
- Card size: 360×515px (desktop), 300×430px (≤768px), 280×400px (≤400px)
- Front: teal (`--color-accent-primary`) accent
- Back: green (`--color-accent-secondary`) border + glow

## Change Log (Recent)

| Date       | Area          | Change                                                       |
|------------|---------------|--------------------------------------------------------------|
| 2026-03-17 | Footer        | Divider line moved outside max-w container (full-width fix)  |
| 2026-03-17 | About         | SVG box-shadow reduced to ambient-only (0.08 opacity)        |
| 2026-03-17 | About         | IO threshold raised 0.35→0.55; rootMargin tightened          |
| 2026-03-17 | About         | `isAnimating` ref prevents overlapping SVG swap transitions  |
| 2026-03-17 | Footer        | YdkSpotlight: canvas-based with teal glow (replaces mix-blend)|
| 2026-03-17 | About         | Sequential reveal: only unlocked sections in DOM             |
| 2026-03-17 | Footer        | YdkWatermark → YdkSpotlight (canvas technique)               |
| 2026-03-17 | Footer        | footer-top 1fr/auto grid; footer-mobile-columns 2-col        |
| 2026-03-17 | Global        | Custom cursor: outline triangle, teal, instant follow        |
| 2026-03-17 | Hero          | h1/h2/p: text-white/45→30→25 default, group-hover reveals; h1 gets teal text-shadow glow |
| 2026-03-17 | ID Card       | Mobile ≤400px breakpoint: 280×400px                          |
| 2026-03-17 | About         | SVG swap: pendingId queue replaces drop-on-busy lock         |
| 2026-03-17 | About         | IO threshold 0.55→0.35, rootMargin -30%→-20%                 |
| 2026-03-17 | About         | Mobile card entrance: IO-triggered (threshold 0.15), min-height 80vh |
| 2026-03-18 | Splash        | Replaced progress-bar ID card with SVG signature draw animation      |
| 2026-03-18 | ID Card       | Desktop size: 322×460 → 360×515px (+12%); mobile 300×430px           |
| 2026-03-18 | Cursor        | Added lerp-trailing ring (0.12) + hover expand + click shrink states |