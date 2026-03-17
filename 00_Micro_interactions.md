---
Master Micro Interaction Plan
Last updated: 2026-03-17

STATUS KEY:  ✅ Done  🔄 In Progress  ⬜ Pending
---

=============================================================
FOUNDATION (must be done first — everything depends on these)
=============================================================

✅ F-1. Haptic Utility — src/utils/haptic.ts
    haptic("tap")     → 8ms   general tap
    haptic("tick")    → 6ms   very light (ring snap, icon tap)
    haptic("flip")    → 12ms  ID card flip
    haptic("confirm") → [10,50,10]  form submit double pulse
    haptic(rawArray)  → custom pattern
    Guard: if ('vibrate' in navigator) — desktop silently ignores.

✅ F-2. Scroll Progress Bar — src/components/ui/ScrollProgressBar.tsx
    2px accent line fixed at top of viewport, fills L→R on scroll.
    Framer Motion useScroll + useSpring (stiffness:120, damping:24).
    zIndex: 99998 (just below custom cursor at 99999).
    Wired into App.tsx above SmoothCursor.

=============================================================
SECTION TASKS
=============================================================

⬜ S-1. Navbar — Skills icon + haptic
    - Change icon: Wrench → Layers  (CONFIRMED by user)
    - Add haptic("tap") to handleNavigate (mobile only)
    Files: src/components/layout/navbar.tsx

✅ S-2. Hero Section — CTA button feedback
    - Primary "View My Work": whileHover scale:1.03, whileTap scale:0.97
    - "Resume": same whileTap
    - haptic("tap") on mobile tap for both
    - NO shimmer (decided against)
    Files: src/components/sections/hero-section.tsx

⬜ S-3. About Section — heading underline + card entrance
    - Heading underline: scaleX 0→1 on scroll into view (transformOrigin: left)
    - Card entrance: add scale 0.97→1 alongside existing opacity/y
    Files: src/components/sections/about-section.tsx

⬜ S-4. Skills Section — hover, rotation, mobile swipe + haptic
    Desktop:
    - Verify/add continuous slow ring rotation (CSS keyframe)
    - Skill cards: whileHover y:-4, scale:1.04, accent glow shadow
    - Active label: subtle scale pulse on ring settle
    Mobile:
    - Swipe gesture to rotate ring (if not present)
    - haptic("tick") on each snap point
    Files: src/components/sections/skills-section.tsx + CSS
    NOTE: Read file before implementing.

⬜ S-5. Projects Section — hover effects + mobile haptic
    Desktop (hover: hover only):
    - Card: scale:1.02, border → accent-primary/40, soft glow
    - Title: underline draw on hover
    - CTA arrow: x nudge +3px on hover
    - Preview image: brightness(1.1) on hover
    Mobile:
    - whileTap scale:0.97 + haptic("tap") on card tap
    Files: src/components/sections/projects-section.tsx
    NOTE: Read file before implementing.

⬜ S-6. Coding Stats Section — restructure + hover effects
    Layout: Keep all 4 cards [ Problems Solved | Contests | Best Rating | Platforms ]
    - Align flush, equal width, no orphan spacing
    - Clone hover lift+glow effect from Problems Solved → apply to all 4 cards

    Best Rating card — hover/tap expand panel:
    - Shows platform breakdown on hover (desktop) / tap (mobile)
    - Data structure: dynamic from API vars + one static entry
        Platforms (dynamic via API):
          codeforces_rating  (variable name)
          leetcode_rating    (variable name)
          codechef_rating    (variable name)
        Static:
          AtCoder: 632
    - CSS class logic:
        .rating-row.is-highest → color: #A7F3D0 (accent-secondary / green)
        .rating-row (default)  → color: #8ECAE6 (accent-primary / blue)
        Highest = Math.max of all dynamic values (AtCoder static included)
    Files: src/components/sections/dashboard/coding-stats-section.tsx
    NOTE: Read file before implementing.

⬜ S-7. Contact Section — input focus + submit feedback
    - Input focus: accent bottom border draws L→R (scaleX transition)
    - Submit: whileTap scale:0.97 + haptic("confirm") on mobile
    - Success state: animated checkmark (Framer Motion scale+opacity, UI-only)
    Files: src/components/sections/contact-section.tsx
    NOTE: Read file before implementing.

⬜ S-8. Footer Social Links — bounce + haptic
    - Icon: whileHover y:-3, scale:1.15 (spring)
    - whileTap scale:0.9 + haptic("tick") on mobile
    Files: src/components/layout/footer.tsx

=============================================================
EXTRAS (exceptional / premium touches)
=============================================================

✅ E-1. Scroll Progress Bar → done above (F-2)

⬜ E-2. Section Entrance Animations
    - Each section fades + slides up (y:20→0, opacity:0→1) on first scroll into view
    - One shared useInView pattern, once:true
    - Applies to: #skills, #projects, #coding, #contact
    - About already has its own entrance logic — skip

✅ E-3. Hero Page Load Stagger
    - ID Card: delay 0.10s, scale 0.94→1 + y 20→0 + opacity
    - Greeting: delay 0.20s, y 18→0 + opacity
    - Name:     delay 0.32s
    - Role:     delay 0.44s
    - Desc:     delay 0.56s
    - Buttons:  delay 0.70s (wrapper div, both buttons inside)
    - Scroll indicator: delay 0.90s
    - transition-all → transition-colors on text elements (Framer Motion owns transform+opacity)
    Files: src/components/sections/hero-section.tsx

=============================================================
DECISIONS LOG
=============================================================

- Skills nav icon: Layers ✅
- Button shimmer (Hero CTA): SKIPPED — too heavy for theme
- ID Card 3D tilt: SKIPPED — keep flip-only
- Best Rating platforms: Codeforces, CodeChef, LeetCode (dynamic) + AtCoder 632 (static)
- Coding Stats layout: Keep all 4 cards (user may modify Platforms card manually later)