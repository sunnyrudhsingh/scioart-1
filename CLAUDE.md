@AGENTS.md

# SciOArt: project brief for AI assistants

Read this file first, then README.md (stack, deploy) and CONTENT_GUIDE.md (how content is added). They are the source of truth for this project.

## Who and what

- **Owner and maintainer:** Sunnyrudh Singh, PhD scholar in Agricultural Extension at Punjab Agricultural University (PAU), Ludhiana. Writes in English and Punjabi; not a professional programmer, so explain steps plainly and do the work rather than handing back instructions.
- **Content reviewer:** his advisor, the Associate Director in charge of media and communication at PAU. Every recommendation is approved by him before it goes live.
- **Site:** scioart.co.in, a bilingual (Punjabi default, English) farm knowledge, extension and edutainment platform built around the PAU Package of Practices (Rabi, Kharif, fruits, vegetables, allied occupations), every yearly edition from 2023, with an extension kit for every agronomic operation.
- **Audiences:** farmers (first), extension workers, students, researchers. Many use cheap Android phones on mobile data in Punjab.

## Non-negotiable rules

1. **Never invent agricultural recommendations.** No doses, varieties, dates, chemical names, quantities or yields from memory or the web. They come only from the official PAU Package of Practices text or a PAU expert, supplied by Sunnyrudh. If something is missing, leave "—" / "to be added" and ask.
2. **Both languages, always.** Every visible string is bilingual: content uses `l("English", "ਪੰਜਾਬੀ")`; interface text lives in `messages/en.json` and `messages/pa.json` with identical keys. Unicode Gurmukhi only. Mark Punjabi you drafted yourself with `// pa: needs expert review`.
3. **Samples stay marked** with `sample: true` until the reviewer approves. Guides use `status`: `draft` and `in-review` are hidden from the site; `published` and `archived` are shown.
4. **Never change a slug** of a live page (slugs are URLs).
5. Keep it fast and accessible: no heavy libraries, keyboard and screen-reader friendly, touch targets at least 44px, respect reduced motion.

## Current state (v1.0.0, October 2026)

- Full site built: 36 crops, 10 core operations each (allied occupations have their own), editions 2023–2026 with archive, 11 topics, crop calendar with .ics export, Learn & Play (10 sample items), 3 sample wheat extension kits with ZIP download, advisories with urgent banner, resources and glossary, bilingual search, Ask an Expert, audience pages, district picker, dark mode, offline support, sitemap, hreflang, share images.
- **All agricultural content is SAMPLE.** Only wheat has (sample) operation guides, in `content/guides/wheat.ts`; it is the template for every other crop.
- Not yet done (owner's to-do list):
  - Deploy on Vercel and connect scioart.co.in (GoDaddy DNS); set env vars (see `.env.example`)
  - Run `supabase/schema.sql` for Ask an Expert (otherwise demo mode, nothing stored)
  - Real Package of Practices text, crop by crop, reviewed and published
  - Real kit PDFs, audio and game files in place of `public/samples/`
  - Photos per IMAGES.md (crop photos are picked up automatically)
  - Replace `SAMPLE_VIDEO_ID` in `content/learn.ts`; replace placeholder contact email in `lib/site.ts`
  - Expert review of Punjabi lines marked `// pa: needs expert review`
  - Mobile Lighthouse performance on the home page measured ~70–80 in a lab (target 85); accessibility, best practices and SEO measured 95–100. Re-measure with PageSpeed Insights after deploy.

## How the code is organised

- `content/*.ts`: all content as typed data, validated with zod in `lib/content.ts` (which also checks every cross-reference and fails the build on problems). Pages read data only through `lib/content.ts`.
- New crop guides: create `content/guides/<crop>.ts` (copy `wheat.ts`) and register it in `lib/content.ts` next to `wheatGuides`.
- `app/[locale]/…`: pages. `components/`: illustrations (original SVG art), layout, motion, ui, content, home.
- `messages/`: interface strings; `messages/index.ts` chooses which namespaces reach client components.
- `public/samples/`: placeholder downloads made by `npm run samples`.

## Technical notes (this is Next.js 16, not what older docs describe)

- Next.js 16 with Turbopack, React 19.3, TypeScript, Tailwind CSS v4 (CSS-first tokens in `app/globals.css`, dark mode via `[data-theme=dark]`, season colours via `data-season`).
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
