# SciOArt

A bilingual (ਪੰਜਾਬੀ and English) library of science and art from Punjab's fields, made at Punjab Agricultural University (PAU). Live at **scioart.co.in**.

SciOArt shares **materials**: it does not give personal farm advice or answer individual questions. The library has twelve sections:

- **Watch:** Culture & heritage, Documentaries, Theatre, Short films, Live (upcoming programs and recordings)
- **Listen:** Jingles, Scientific songs, Podcasts & radio talks
- **Play / learn:** Games, E-modules
- **Read:** E-books, Posters & comics

Every item can also be found by crop and by theme, and the whole site can be searched in Punjabi or English. It works on cheap phones and slow networks, and recently opened pages work offline.

> **All items in this repository are SAMPLES**, marked with a "Sample" badge, until the real films, songs and books replace them. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

## Stack

| Part         | Choice                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack), React 19, TypeScript                |
| Styling      | Tailwind CSS v4 (tokens in `app/globals.css`)                           |
| Languages    | next-intl, routes `/pa/...` (default) and `/en/...`                     |
| Content      | Typed TypeScript files in `content/`, validated with zod at build time  |
| Search       | Fuse.js over a static index (`/search-index/pa`, `/search-index/en`)    |
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

Copy `.env.example` to `.env.local` for local work. It is optional; the site works without it.

| Name                   | What it does                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Full site address, used in canonical links, the sitemap and share images. Default `https://scioart.co.in`. |

## Making changes with Codex (or Claude Code)

Both assistants read `AGENTS.md`, which holds the project rules and the owner's working instructions.

1. At chatgpt.com/codex, connect GitHub and choose `sunnyrudhsingh/scioart-1`. In the environment's setup script, put `npm ci`.
2. Describe the change in plain words, for example "Add this jingle to the library" with the MP3 file, its title in both languages and who made it.
3. Codex makes the change on a new branch and opens a pull request. Vercel adds a preview link to it within a few minutes.
4. Open the preview link on your phone, in Punjabi and English. Content changes go to the reviewer first.
5. When it is approved, merge the pull request on GitHub (**Merge pull request** → **Confirm merge**). scioart.co.in updates within a few minutes.

If the build fails, nothing changes on the live site. Ask Codex to read the error on the pull request and fix it.

## Project layout

```
app/[locale]/          pages: home, library, [category] (one page per section) and [category]/[slug] (one item),
                       crops, topics, resources, search, about, privacy
app/og/                share-image generator
app/serwist/, app/sw.ts service worker
app/search-index/      static search data
components/            illustrations, layout, motion, ui, content, home
content/               ALL site content; the library items are in content/materials.ts
lib/content.ts         reads and validates content; the only place pages get data from
messages/en.json, pa.json   interface text
public/media/          real audio, PDFs and covers, one folder per section (see CONTENT_GUIDE.md)
public/samples/        placeholder files (delete once real items replace them)
public/images/         photos (see IMAGES.md)
```

## Documents

- [CONTENT_GUIDE.md](CONTENT_GUIDE.md): how to add and update content, without coding experience
- [IMAGES.md](IMAGES.md): every photo the site can use, with sizes
- [CHANGELOG.md](CHANGELOG.md): what changed in each version
