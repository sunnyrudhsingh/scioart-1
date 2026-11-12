# SciOArt: project brief for AI assistants

This file (AGENTS.md) is read automatically by Codex and, through CLAUDE.md, by Claude Code. Read it first, then README.md (stack, deploy) and CONTENT_GUIDE.md (how content is added). They are the source of truth for this project.

## Who and what

- **Owner and maintainer:** Sunnyrudh Singh, PhD scholar in Agricultural Extension at Punjab Agricultural University (PAU), Ludhiana. Writes in English and Punjabi; not a professional programmer, so explain steps plainly and do the work rather than handing back instructions.
- **Content reviewer:** his advisor, the Associate Director in charge of media and communication at PAU. Every item is approved by him before it goes live.
- **Site:** scioart.co.in, a bilingual (Punjabi default, English) **library of science and art materials** made at PAU: culture & heritage, documentaries, live programs, jingles, scientific songs, theatre, short films, podcasts & radio talks, games, e-modules, e-books, posters & comics. Items can also be browsed by crop and by theme.
- **What it is not:** since v2.0 (November 2026) SciOArt gives **no personal farm advice and answers no questions**. The owner removed the crop guides (Package of Practices chapters), crop calendar, advisories, extension kits and Ask an Expert on purpose. Do not add them back unless he asks.
- **Audiences:** farmers, students, teachers, extension workers and the general public. Many use cheap Android phones on mobile data in Punjab.

## Working with Sunnyrudh (owner's standing instructions)

- He is not a programmer. Do the work yourself; explain only what he needs to know or decide, in plain words, and keep technical detail out of your replies.
- Never invent farm facts (doses, varieties, dates, chemicals, yields) or the details of an item (credits, dates, links). He supplies them. If something is missing, put "To be added" and ask him.
- Every text in English and Punjabi. Mark Punjabi you wrote yourself with `// pa: needs expert review`.
- New items stay `sample: true` until he says his advisor has approved them. Do not decide this yourself.
- Before any change goes live: `npm run lint && npm run typecheck && npm run build` must pass, and the changed pages must be checked at phone width (about 360px) in both `/pa/...` and `/en/...`. If you cannot open a browser, say so plainly and ask him to check the preview link on his phone. Never claim a check you did not do.

## How a change reaches scioart.co.in

Hosting is Vercel (project `scioart-1`, connected to GitHub `sunnyrudhsingh/scioart-1`). Sunnyrudh owns every account: the GitHub repository, the Vercel project (free Hobby plan) and the GoDaddy account that holds scioart.co.in. His brother Mahir Singh (GitHub `mahirsinghh`) set the site up and helps only when Sunnyrudh asks. Sunnyrudh works through Codex and GitHub. When a task needs a Vercel or DNS setting changed, say so plainly and give Sunnyrudh step-by-step instructions; never ask him for passwords or codes. Every push to `main` goes live on scioart.co.in within a few minutes, so:

1. Never push directly to `main`. Make each change on a new branch and open a pull request with a short, plain description of what changed.
2. Vercel builds the branch and adds a preview link to the pull request. Give Sunnyrudh that link. Content changes are shown to his advisor there.
3. Only when Sunnyrudh says it is approved, the pull request is merged into `main` (by him, or by you when he asks). The site updates automatically.
4. If the Vercel build fails, the live site stays as it was. Read the error, fix it on the same branch, and push again.

## Non-negotiable rules

1. **Materials, not advice, and never invented facts.** The site shares items; it does not advise. Any farm fact inside an item (doses, varieties, dates, chemical names, yields) comes only from PAU research or a PAU expert, supplied by Sunnyrudh. If something is missing, leave "To be added" and ask.
2. **Both languages, always.** Every visible string is bilingual: content uses `l("English", "ਪੰਜਾਬੀ")`; interface text lives in `messages/en.json` and `messages/pa.json` with identical keys. Unicode Gurmukhi only. Mark Punjabi you drafted yourself with `// pa: needs expert review`.
3. **Samples stay marked** with `sample: true` until the reviewer approves.
4. **Never change a slug** of a live page (slugs are URLs).
5. Keep it fast and accessible: no heavy libraries, keyboard and screen-reader friendly, touch targets at least 44px, respect reduced motion.

## Current state (v2.0.0, November 2026)

- The site is a library: 12 sections (`content/taxonomy.ts` → `categories`), each with its own page at `/<section-id>`, and one page per item at `/<section-id>/<slug>`. All items live in `content/materials.ts`. `/library` shows every section and every item with filters (section, crop, theme, language). The Live section works out "coming up / live now / past" on the visitor's clock (`components/content/LiveBoard.tsx`, `LiveStatus.tsx`, `components/home/NextLive.tsx`).
- Also: 36 crops and 11 themes as ways to browse, research summaries, a bilingual glossary, bilingual search, dark mode, offline support, sitemap, hreflang and share images.
- Old v1 web addresses (`/learn/...`, `/calendar`, `/ask`, `/advisories/...`, `/extension/...`, `/for/...`, `/crops/<crop>/<chapter>...`, `/resources/editions`, `/resources/leaflets`) redirect permanently to the nearest new page (`next.config.ts` → `redirects`).
- **All 17 library items are SAMPLES** (silent audio and one-page PDFs in `public/samples/`, `SAMPLE_VIDEO_ID` for videos). Real files go in `public/media/<section-id>/`.
- Owner's to-do list:
  - Real items for each section, reviewed, then `sample: false`; delete the sample items as real ones arrive
  - Real date, time and YouTube/Facebook link for the sample live program, or remove it
  - Cover pictures for items (`media.cover`) and crop photos per IMAGES.md
  - Replace the placeholder contact email in `lib/site.ts`
  - Expert review of Punjabi lines marked `// pa: needs expert review`, and of `messages/pa.json` (drafted by an assistant in November 2026)
  - Mobile Lighthouse performance on the home page measured ~70–80 in a lab in v1 (target 85). Re-measure with PageSpeed Insights.

## How the code is organised

- `content/*.ts`: all content as typed data, validated with zod in `lib/content.ts` (which also checks every cross-reference and fails the build on problems). Pages read data only through `lib/content.ts`.
- Library items: `content/materials.ts`. A new section needs its id in `CategoryId` (`content/schema.ts`), an entry in `categories` (`content/taxonomy.ts`) and an icon in `components/content/categoryIcons.tsx`.
- `app/[locale]/…`: pages. `components/`: illustrations (original SVG art), layout, motion, ui, content, home.
- `messages/`: interface strings; `messages/index.ts` chooses which namespaces reach client components.
- `public/media/<section-id>/`: real audio, PDFs and covers. `public/samples/`: placeholder files made by `npm run samples`.

## Technical notes (this is Next.js 16, not what older docs describe)

- Next.js 16 with Turbopack, React 19.3, TypeScript, Tailwind CSS v4 (CSS-first tokens in `app/globals.css`, dark mode via `[data-theme=dark]`, season colours via `data-season`).
- Colours: the owner chose the **Phulkari** palette (maroon, gold, magenta) in November 2026. `PALETTE` in `lib/site.ts` sets `data-palette` on `<html>`; the palettes (`phulkari`, `truck`, `sarson`, each with a dark version) are in `app/globals.css`. Each kind of item has one colour (`--cat-watch`, `--cat-listen`, `--cat-play`, `--cat-learn`, `--cat-read`, `--cat-live`); use `categoryTint`/`categorySolid` from `components/content/categoryIcons.tsx`, not new hard-coded colours. The phulkari pattern is `components/illustrations/Phulkari.tsx`. Browser theme colour, app icons and the share image use the Phulkari colours directly; update them too if the palette ever changes.
- next-intl 4: routes are `/pa/...` and `/en/...`; routing in `i18n/`; middleware is `proxy.ts` (Next 16 renamed middleware). Cast locales `as Locale` where needed.
- Pages are statically generated (`generateStaticParams`, `dynamicParams = false`). After adding routes, run `npx next typegen` before `tsc`.
- Page transitions: React `<ViewTransition>`; scroll reveals: CSS scroll-driven animations (`[data-reveal]`); hero motion starts after load (`components/motion/HeroParallax.tsx`). No Framer/Motion library.
- Fonts are self-hosted in `app/fonts/` (Fraunces, Inter, Noto Sans Gurmukhi, Mukta Mahee); `assets/og-fonts/` for share images. `app/og/route.tsx` reorders the Gurmukhi sihari because the image renderer does not shape text.
- Service worker: Serwist (`app/sw.ts`, `app/serwist/[path]/route.ts`); media files are deliberately not precached.
- Search: Fuse.js over `/search-index/[locale]`.

## Before every commit

```bash
npm run lint && npm run typecheck && npm run build
```

The build must pass: it validates all content. Check changed pages on a phone-width screen in both languages. Commit in small, clearly described steps; `main` deploys to production on Vercel, other branches get preview links.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
