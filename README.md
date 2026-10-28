# SciOArt

A bilingual (ਪੰਜਾਬੀ and English) farm knowledge, extension and edutainment website, built around the Punjab Agricultural University (PAU) Package of Practices. Live at **scioart.co.in** once deployed.

- Every crop, every agronomic operation, every yearly edition (2023 onwards), in Punjabi and English
- An extension kit for each operation: facilitator guide, slides, farmer leaflet, group activity, pre- and post-test, feedback form
- Learn & Play: printable games, songs and jingles, videos, e-modules with quizzes, farmer stories, podcasts
- Crop calendar from your sowing date, with "add to phone calendar"
- Advisories, leaflets, glossary, research summaries, Ask an Expert
- Works on cheap phones and slow networks; recently opened pages work offline

> **All agricultural content in this repository is SAMPLE content.** Values are shown as "—" or "to be added". Nothing here is a recommendation until it is replaced with the official PAU text and approved by the reviewer. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

## Stack

| Part         | Choice                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack), React 19, TypeScript                |
| Styling      | Tailwind CSS v4 (tokens in `app/globals.css`)                           |
| Languages    | next-intl, routes `/pa/...` (default) and `/en/...`                     |
| Content      | Typed TypeScript files in `content/`, validated with zod at build time  |
| Search       | Fuse.js over a static index (`/search-index/pa`, `/search-index/en`)    |
| Forms        | react-hook-form + zod; Supabase for storing questions (optional)        |
| Offline      | Serwist service worker (`/serwist/sw.js`)                               |
| Share images | `next/og` at `/og`                                                      |
| Fonts        | Self-hosted: Fraunces, Inter, Noto Sans Gurmukhi, Mukta Mahee (SIL OFL) |
| Hosting      | Vercel                                                                  |

Page transitions use the browser's View Transitions API through React's `<ViewTransition>`; scroll reveals use CSS scroll-driven animations. Both simply switch off in browsers without support and for anyone who prefers reduced motion.

## Run it on your computer

You need Node.js 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run build        # production build (also validates all content)
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run format       # Prettier (with Tailwind class sorting)
npm run samples      # regenerate the placeholder PDFs/MP3s in public/samples (MP3s need ffmpeg)
npm run icons        # regenerate the app icons from public/icon.svg (needs Playwright)
```

If `npm run build` fails with a content error, the message names the file and the field that is wrong.

## Deploy on Vercel

1. Sign in at vercel.com with GitHub and choose **Add New → Project**.
2. Import this repository. Vercel detects Next.js; keep the defaults.
3. Add the environment variables below (Settings → Environment Variables), then **Deploy**.
4. Domain: Settings → Domains → add `scioart.co.in` and `www.scioart.co.in`. Vercel shows the DNS records to add. At GoDaddy (My Products → scioart.co.in → DNS), add exactly those records:
   - an **A** record for `@` pointing to the IP Vercel gives
   - a **CNAME** record for `www` pointing to the value Vercel gives

   DNS can take up to a few hours.

Every push to `main` deploys automatically. Pull requests get their own preview link.

## Environment variables

Copy `.env.example` to `.env.local` for local work. All are optional; the site works without them.

| Name                            | What it does                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Full site address, used in canonical links, the sitemap and share images. Default `https://scioart.co.in`. |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL, for saving Ask an Expert questions.                                                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public (anon) key.                                                                                |

Without the Supabase variables, the Ask an Expert form runs in demo mode: it validates and shows the success screen but stores nothing.

## Supabase (Ask an Expert)

1. Create a free project at supabase.com (region: Mumbai).
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it. This creates the `expert_questions` table, a `question-photos` storage bucket, and rules that let the public **send** questions but not read them.
3. Project Settings → API: copy the Project URL and the `anon` public key into the Vercel environment variables above, then redeploy.
4. Read incoming questions in Supabase → Table Editor → `expert_questions`. Photos are in Storage → `question-photos`.

## Project layout

```
app/[locale]/          pages (home, crops, topics, calendar, learn, extension, advisories, resources, search, ask, for/[audience], about, privacy)
app/og/                share-image generator
app/serwist/, app/sw.ts service worker
app/search-index/      static search data
components/            illustrations, layout, motion, ui, content, home
content/               ALL site content (see CONTENT_GUIDE.md)
lib/content.ts         reads and validates content; the only place pages get data from
messages/en.json, pa.json   interface text
public/samples/        placeholder downloads (replace with real files)
public/images/         photos (see IMAGES.md)
supabase/schema.sql    database setup for Ask an Expert
```

## Documents

- [CONTENT_GUIDE.md](CONTENT_GUIDE.md): how to add and update content, without coding experience
- [IMAGES.md](IMAGES.md): every photo the site can use, with sizes
- [CHANGELOG.md](CHANGELOG.md): what changed in each version
