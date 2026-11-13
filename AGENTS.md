# AGENTS.md — YDK Portfolio v2

Context for AI assistants. Keep this file short; history lives in `git log`.
Owner notes for the assistant may be in `00_ChangesTodo.md` (gitignored). Read it if present.

## Project

- Personal portfolio of Dinesh Krishna (CSE, IIT (ISM) Dhanbad).
- React 19, TypeScript, Vite 7, Tailwind CSS v4 (config in `src/index.css` `@theme`, no tailwind.config), Framer Motion 12, lucide-react, recharts (stats only).
- `npm run dev` / `npm run build` (runs `tsc -b`) / `npm run lint` / `npm run preview`.
- Deploy: Vercel. `main` = production. Any other pushed branch gets a preview URL.
- `api/codechef`, `api/codeforces`: Vercel serverless functions. They need `axios` and `cheerio`, so **keep those in `dependencies`**.
- Env vars (`VITE_CODECHEF_API_URL`, `VITE_WEB3FORMS_KEY`): `.env.local` for dev, Vercel Environment Variables for deploys. `.env.production` is gitignored.

## Map

| What                                            | Where                                                                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Name, email, links, resume URL                  | `src/config/site-metadata.ts`                                                                                    |
| ID card + fallback stats                        | `src/data/profile-data.ts`                                                                                       |
| About copy (4 blocks)                           | `src/data/about.ts`                                                                                              |
| Projects                                        | `src/data/projects.ts` (images in `public/images/projects/*.webp`)                                               |
| Skills                                          | `src/data/skills.ts`                                                                                             |
| Fallback coding stats                           | `src/data/coding-stats.ts`                                                                                       |
| Live stats fetch + cache (30 min, localStorage) | `src/services/coding-stats-service.ts`, `src/config/coding-platforms.ts`, `src/context/coding-stats-context.tsx` |
| Terminal commands                               | `src/data/terminal-commands.ts`                                                                                  |
| Contact form (Web3Forms)                        | `src/services/contact-service.ts`                                                                                |
| Sections                                        | `src/components/sections/*` (stats in `dashboard/`, one view per platform in `dashboard/platforms/`)             |
| Global styles, tokens, About/footer layout CSS  | `src/index.css`                                                                                                  |
| About illustrations                             | `src/assets/svg-about-1..4.svg` (imported with `?url`)                                                           |

Page order: Hero → About → Skills → Projects → Coding Stats (lazy) → Contact → Footer. Splash shows once per session and is skipped for reduced motion.

## Rules

- **Naming:** "Dinesh Krishna" in UI, "Y. Dinesh Krishna" in SEO only, "@ydk" as handle.
- **Resume:** one file, `public/resume.pdf`, referenced via `SITE_METADATA.resumeUrl`.
- **Facts:** take numbers from `public/resume.pdf` or the live APIs. Never invent achievements. Unknown details go in `[square brackets]` for Dinesh to fill.
- **Colours:** keep the palette (`#0A0A0F`, `#12121A`, cyan `#8ECAE6`, mint `#A7F3D0`, body `#94A3B8`). Use tokens / Tailwind utilities, not new hex values in components (SVG files are the exception).
- **A11y:** use `focus-visible:` rings (a global `:focus-visible` outline is the fallback). Respect reduced motion (`MotionConfig reducedMotion="user"`, CSS media query in `index.css`, `scrollBehavior()` in `src/utils/scroll.ts`). Interactive things must be buttons/links, not clickable divs.
- **Copy:** plain and specific. Avoid "I don't just X", "robust", "seamless", "enterprise-grade", emoji in UI.
- **Git:** work on a branch, commit in small steps, never push to `main` without asking.

## Gotchas

- The editor runs a formatter on save. Re-read a file before `str_replace` if an edit fails.
- Files are mixed LF/CRLF. Multi-line PowerShell `.Replace()` often misses; use the edit tool.
- `npm run lint` has 4 problems that already existed before the redesign branch (codeforces-view `any`, limelight-nav setState in effect, orbit-card `Date.now()` in render, project-modal deps warning).

## Done on `redesign/ux-polish` (not merged yet)

- Removed dead components, duplicate SVGs, an old resume copy and old notes files.
- Consistent names, stats, resume link, footer `#hero` link, terminal email/skills.
- A11y: modal dialog + focus trap, keyboard access for projects and ID card, focus rings, reduced motion, contrast.
- About rebuilt: 4 short blocks, new SVGs, no scroll-jacking.
- First-pass copy for projects and subtitles.
- Visual redesign plan written: `docs/VISUAL-REDESIGN-PLAN.md` (not implemented).

## Open items

- [ ] About placeholders in `src/data/about.ts`: hometown, childhood line, Accenture dates/team/work.
- [ ] Antigravity: Dinesh's project, or Google's IDE? (`skills.ts` lists it as a tool.)
- [ ] Confirm `twitter.com/dineshydk` is his.
- [ ] Confirm the Web3Forms key is real (it was labelled "TEMP PLACEHOLDER"). Test the contact form on the preview.
- [ ] Before merging to `main`: make sure both env vars are set in Vercel (the repo no longer ships `.env.production`).
- [ ] Decisions in `docs/VISUAL-REDESIGN-PLAN.md` (splash, cursor, skills layout, featured projects, fonts), then implement.
- [ ] Screenshots for Agent SLAM and IntelliDesk AI.
- [ ] Dinesh's own pass over all copy (last step).

## Assets

Regenerate the OG image / favicons after editing `public/og-source.svg` or `public/favicon.svg`:

```
npx sharp-cli -i public/og-source.svg -o public/og-image.png -f png resize 1200 630
npx sharp-cli -i public/favicon.svg -o public/favicon.png -f png resize 32 32
npx sharp-cli -i public/favicon.svg -o public/apple-touch-icon.png -f png resize 180 180
```

Profile photo: `src/public/images/profile.webp` (720px wide, webp q82).
