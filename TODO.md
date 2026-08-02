# TODO — Things only you can do

Everything below is already wired up in code. You just need to swap the
placeholders for your real values/assets.

---

## 1. Web3Forms key (contact form) — REQUIRED

The contact form now sends real emails via [Web3Forms](https://web3forms.com),
but it's running on a placeholder key, so it currently shows
"Contact form is not configured yet" on submit.

1. Go to https://web3forms.com and enter your email → they send you a free
   **Access Key** (no signup needed).
2. Replace the placeholder in **both** files:
   - `.env.local`   → `VITE_WEB3FORMS_KEY=REPLACE_WITH_YOUR_WEB3FORMS_KEY`
   - `.env.production` → same line
3. On Vercel: Project → Settings → Environment Variables → add
   `VITE_WEB3FORMS_KEY` with the same value, then redeploy.
4. Test: submit the form on the live site → the message should land in your
   email inbox.

---

## 2. OG image + favicons — WORKING PLACEHOLDERS, replace if you want

I generated a full set of branded assets in `public/` (they work and look
decent, so this is optional):

| File | What it is |
|------|-----------|
| `public/favicon.svg` | "YK" monogram, dark + cyan accent |
| `public/favicon.png` | 32x32 raster of the same |
| `public/apple-touch-icon.png` | 180x180 for iOS home screen |
| `public/og-image.png` | 1200x630 social preview (LinkedIn/WhatsApp/X embeds) |
| `public/og-source.svg` | editable source for the OG image |

To regenerate after editing `og-source.svg` or `favicon.svg`:

```powershell
npx sharp-cli -i public/og-source.svg -o public/og-image.png -f png resize 1200 630
npx sharp-cli -i public/favicon.svg -o public/favicon.png -f png resize 32 32
npx sharp-cli -i public/favicon.svg -o public/apple-touch-icon.png -f png resize 180 180
```

---

## 3. Profile photo — IMPORTANT, read this

Your original `src/public/images/profile.png` was **6.6 MB** and shipped to
every visitor. I converted it to `src/public/images/profile.webp` (45 KB,
720px wide — looks identical on the card) and **deleted the original PNG**
to keep the repo light.

The project is NOT a git repo, so the 6.6 MB original is not recoverable
from here. If you don't have another copy of that photo, check wherever it
originally came from (phone/Drive). The site itself needs nothing — the
webp is in place and working.

If you ever want to swap the photo: replace `profile.webp` with a new image
resized the same way:

```powershell
npx sharp-cli -i your-new-photo.png -o src/public/images/profile.webp -f webp -q 82 resize 720
```

---

## 4. Strongly recommended: initialize git

This folder has no version control — one bad edit and there's no undo.

```powershell
cd c:\Users\dines\WebstormProjects\portfolio
git init
git add .
git commit -m "Portfolio v2 with optimizations"
```

(`.env.local` should be added to `.gitignore` before committing if you put
the real Web3Forms key in it.)

---

## 5. FYI — nothing to do, just so you know

- **Performance score (~67 mobile)** is capped by your splash screen: the
  page content is intentionally hidden for a few seconds, so Lighthouse
  measures FCP/LCP through it. If you ever want a higher score, shorten the
  splash or skip it for first-time mobile visitors. Accessibility is 96+,
  SEO and Best Practices are 100.
- `public/Temp_files/` (duplicate project images) was deleted.
- Old project PNGs were replaced by WebP versions in
  `public/images/projects/` — `src/data/projects.ts` already points to them.
