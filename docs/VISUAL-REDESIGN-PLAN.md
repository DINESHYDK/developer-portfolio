# Visual redesign plan (not implemented yet)

Status: proposal for review. Nothing in this file has been built.
Branch: `redesign/ux-polish`

## Ground rules

- **Colours stay.** Background `#0A0A0F`, surface `#12121A`, cyan `#8ECAE6`, mint `#A7F3D0`, body text `#94A3B8`. The change is in how they're used: fewer glows, more flat surfaces and thin borders.
- **One signature effect per section, at most.** Today most sections stack 3–4 (glass, glow, hover lift, continuous motion).
- **Show evidence.** Real numbers, real screenshots and real outcomes do more against the "AI template" feel than any styling.

## What makes it look generated today

| Pattern                                          | Where                                                      | Proposed change                                                                                                                                                        |
| ------------------------------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Glassmorphism (`backdrop-blur`) on cards         | orbit cards, about cards, ID card, modal, tooltips         | Keep blur only on the navbar (it floats over content). Cards become flat `#12121A` with a 1px `white/8` border.                                                        |
| Glow shadows `rgba(142,202,230,.3)` on hover     | buttons, filter pills, nav, cards                          | Remove. Hover = border goes from `white/8` to `accent/40`, no shadow.                                                                                                  |
| Blurred colour blobs                             | hero background                                            | Remove both blobs.                                                                                                                                                     |
| "Word **Accent**" heading + 16px bar             | every section                                              | Replace with a left-aligned mono label + plain heading, e.g. `02 / about` above "About me". Same pattern in every section (Projects currently breaks it).              |
| Pills everywhere (`rounded-full`, `rounded-3xl`) | buttons, cards, tabs                                       | Tags stay pills. Buttons `rounded-lg` (8px). Cards `rounded-xl` (12px).                                                                                                |
| Five font families                               | Poppins, Jakarta, Fira Code, Bebas, Alex Brush             | Two: **Plus Jakarta Sans** (headings 700, body 400) and **Fira Code** (labels, numbers, terminal). Bebas only for the footer YDK. Alex Brush only if the splash stays. |
| Infinite animations                              | orbit rings, ID card glow pulse, status blink, heart pulse | Stop all of them by default. Motion only in response to the user.                                                                                                      |

## Section by section

### Splash (8s today)

- Option A (recommended): remove it. The ID card already carries the personal touch.
- Option B: keep the signature, shorten it to 1.2s, add a "Skip" button, and still show it only once per session.
- Either way, LCP improves. Your TODO.md puts Lighthouse mobile at ~67, mostly because of this.

### Custom cursor

- Go back to the native cursor across the site.
- Keep the triangle cursor only inside the footer YDK spotlight, where it adds to the effect.

### Navbar

- Keep the floating pill and the mobile bottom bar.
- Remove the glow on the active pill; use a solid `accent/15` background instead.

### Hero

- Add a stats strip under the description, in Fira Code: `LeetCode 2033 · Knight │ CodeChef 3★ │ Codeforces Pupil │ 2,200+ solved`. Pull it from the existing stats context.
- Primary button "View my work". Secondary "Resume" as a text link with an arrow, not a second outlined button.
- Remove the hover-to-brighten on the whole section (already toned down in the a11y commit).

### ID card

- Keep the flip. It's the most personal element on the page.
- Remove the infinite `front-glow` / `back-glow` pulse and the blinking status dot. Use a static 1px accent border.

### About (rebuilt in this branch)

- Already shorter, with new illustrations. Visual follow-up: the mono `01–04` labels become the pattern for all section headers.

### Skills

- Replace the six spinning orbit cards with a static grouped list: category name on the left, skills as tags on the right, one row per category.
- Each skill links to the projects that use it (the data already exists in `projects.ts` tags). Clicking "Supabase" highlights StudySync, IntelliDesk and GolfGive. This makes the section say something instead of just showing logos.
- Removes six `requestAnimationFrame` loops.

### Projects

- Top: the three strongest projects as large case-study cards, each with a screenshot, one outcome line ("50+ users in 2 weeks", "2nd place", "< 100 ms solve") and the stack.
- Below: the other four as a compact list (title, one-line description, links).
- This replaces the alternating left/right accordion. Alternating alignment makes titles harder to scan.
- Needs from you: screenshots for Agent SLAM and IntelliDesk AI.

### Coding stats

- Keep the section. It's real data and fits a competitive programmer.
- Lead with one chart: the LeetCode contest rating history (the API already returns 16 contests). A rating line says more than four pie charts.
- Consider replacing recharts with small hand-written SVG charts: the stats chunk is 394 KB, mostly recharts.

### Contact

- Keep the form as the default and the terminal as the secondary tab. The terminal is a good personal touch.
- Flatten the form: no glow on submit; the focus ring stays (it's useful).

### Footer

- Keep the YDK spotlight.
- Remove the pulsing heart; "Made by Dinesh" is enough.

## Suggested order

| Step | Work                                                                                | Effort | Risk   |
| ---- | ----------------------------------------------------------------------------------- | ------ | ------ |
| 1    | Shared tokens: radius scale, border colours, section-header component, drop Poppins | S      | Low    |
| 2    | Remove glass/glow/blobs and infinite animations                                     | S      | Low    |
| 3    | Splash decision + native cursor                                                     | S      | Low    |
| 4    | Hero stats strip                                                                    | S      | Low    |
| 5    | Skills as linked list                                                               | M      | Medium |
| 6    | Projects case-study layout (needs screenshots)                                      | M      | Medium |
| 7    | Rating-history chart, recharts replacement                                          | M      | Medium |

## Decisions needed from you

- [ ] Splash: remove, or shorten to ~1.2s with Skip?
- [ ] Custom cursor: native everywhere except the footer, OK?
- [ ] Skills: OK to replace the orbit cards?
- [ ] Projects: which three are the featured case studies? (Suggested: StudySync, Agent SLAM, Rubik's Cube Solver)
- [ ] Fonts: OK to drop Poppins and use Plus Jakarta Sans for headings?
