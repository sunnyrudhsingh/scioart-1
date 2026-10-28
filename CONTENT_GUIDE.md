# Content guide

This guide is for the people who keep SciOArt up to date. You do not need to be a programmer. You will edit plain text files in the `content/` folder, either on github.com (open the file, press the pencil icon, edit, then **Commit changes**) or in Codex.

After every change, Vercel rebuilds the site. If something is wrong (a missing comma, a crop name that does not exist), the build stops and the old site stays online, so a mistake can never break the live site. The error message names the file and the problem.

## The golden rules

1. **Never invent a recommendation.** Doses, varieties, dates, quantities and chemical names come only from the official PAU Package of Practices or a PAU expert, word for word.
2. **Every recommendation is reviewed** by the content reviewer before it is published (see "Review status" below).
3. **Both languages, always.** Every piece of text has an English and a Punjabi version.
4. **Mark samples.** Anything that is not yet final keeps `sample: true`. The site then shows a "Sample" badge. Set it to `false` only after review.

## How text is written

Every bilingual text uses `l("English", "ਪੰਜਾਬੀ")`:

```ts
title: l("Seed and sowing", "ਬੀਜ ਅਤੇ ਬਿਜਾਈ"),
```

- Keep the quotes and the comma between the two languages.
- If your text contains a double quote, write it as `\"`.
- Use Unicode Gurmukhi (as typed with Google Input Tools or the phone keyboard), not old Asees/Anmol Lipi fonts. Text copied from old PDFs often uses those fonts and turns into Latin letters: retype it.
- Use the nukta letters where they belong (ਸ਼, ਖ਼, ਗ਼, ਜ਼, ਫ਼, ਲ਼).
- Lines marked `// pa: needs expert review` are first drafts of the Punjabi. Remove the comment once a Punjabi expert has checked them.

Slugs (the short ids such as `wheat` or `seed-sowing`) are lowercase English with hyphens. They become web addresses, so never change a slug once the page is live.

## Where everything lives

| What                                                             | File                                   |
| ---------------------------------------------------------------- | -------------------------------------- |
| Seasons, crop groups, the 10 core operations, formats, audiences | `content/taxonomy.ts`                  |
| Crops                                                            | `content/crops.ts`                     |
| Package of Practices books and yearly editions                   | `content/editions.ts`                  |
| Operation guides (the main crop advice)                          | `content/guides/<crop>.ts`             |
| Topics (soil health, IPM, water…)                                | `content/topics.ts`                    |
| Crop calendar                                                    | `content/calendar.ts`                  |
| Learn & Play items                                               | `content/learn.ts`                     |
| Extension kits                                                   | `content/kits.ts`                      |
| Advisories                                                       | `content/advisories.ts`                |
| Leaflets and research summaries                                  | `content/resources.ts`                 |
| Glossary                                                         | `content/glossary.ts`                  |
| Countries, states, districts                                     | `content/locations.ts`                 |
| Buttons, menus and other interface words                         | `messages/en.json`, `messages/pa.json` |
| Downloadable files (PDF, MP3)                                    | `public/` (see below)                  |
| Photos                                                           | `public/images/` (see IMAGES.md)       |

## Add a crop

Open `content/crops.ts` and copy an existing entry inside the `seeds` list:

```ts
{ slug: "sunflower", name: l("Sunflower", "ਸੂਰਜਮੁਖੀ"), season: "kharif", group: "oilseeds", publication: "kharif",
  description: l("One sentence about the crop.", "ਫ਼ਸਲ ਬਾਰੇ ਇੱਕ ਵਾਕ।"),
  topics: ["diversification"] },
```

- `season`: one of `rabi`, `kharif`, `fruit`, `vegetable`, `allied`
- `group`: an id from `cropGroups` in `content/taxonomy.ts`
- `publication`: which Package of Practices book covers it (`rabi`, `kharif`, `fruits`, `vegetables`, `allied`)
- `operations` (optional): leave it out to use the 10 core operations; allied occupations list their own
- The crop page, its operation pages, the search entry and the sitemap appear automatically.
- A drawn icon is used until a photo is added. A brand-new crop borrows the wheat icon until its own is drawn in `components/illustrations/CropIcon.tsx`.

The quick facts (sowing window, duration, and so on) are in the `facts()` function in the same file and show "—" until filled in.

## Add a new yearly edition

In `content/editions.ts`, add the year to `years`, for example `const years = [2023, 2024, 2025, 2026, 2027];`. The newest year automatically becomes the current edition and older years move to the archive. If you have the official PDF, put it in `public/editions/` and set its path in `file`.

## Add or update an operation guide

Guides live in `content/guides/`. `wheat.ts` is the complete example: open it to see every kind of block. A guide is one crop × one operation × one edition.

To add guides for a new crop:

1. Copy `content/guides/wheat.ts` to `content/guides/<crop>.ts` (for example `paddy.ts`) and change `crop: "wheat"`, the export name (`paddyGuides`) and the editions (`kharif-2026`).
2. Replace all the sample text with the official text.
3. In `lib/content.ts`, add your file next to wheat:

   ```ts
   import { paddyGuides } from "@/content/guides/paddy";
   ...
   .parse([...wheatGuides, ...paddyGuides])
   ```

The building blocks of a guide:

| Block       | Use it for                                                                   |
| ----------- | ---------------------------------------------------------------------------- |
| `heading`   | A section heading. It also appears in the "On this page" list.               |
| `paragraph` | Ordinary text.                                                               |
| `steps`     | Numbered steps to follow in order.                                           |
| `table`     | Varieties, doses, schedules. Use `"—"` for an empty cell.                    |
| `callout`   | A highlighted box: `important`, `caution` (safety warnings) or `tip`.        |
| `media`     | Shows a Learn & Play item (a song or a video) inside the guide, by its slug. |

Other fields:

- `districtNotes`: extra advice for one district, keyed by district slug (`ludhiana`, `bathinda`…). It shows only to people who chose that district.
- `topics`: topic slugs, so the guide is listed on those topic pages.
- `lastReviewed`: date of the last review, written `YYYY-MM-DD`.
- `reviewer`: the reviewer's name in both languages.

### Review status

Each guide has a `status`:

| Status      | Shown on the site?                                                        |
| ----------- | ------------------------------------------------------------------------- |
| `draft`     | No, being written                                                         |
| `in-review` | No, waiting for the reviewer                                              |
| `published` | Yes, as the current advice                                                |
| `archived`  | Yes, but only in the edition archive, with a notice that it is old advice |

Workflow: write as `draft` → `in-review` when ready → the reviewer reads it on a preview link (each pull request on GitHub gets one from Vercel) → `published` and `sample: false` when approved. When a new edition is published, set last year's guides to `archived`.

## Add a topic

In `content/topics.ts`, copy an entry. `links` lists the crop and operation pages that belong to the topic, for example `{ crop: "wheat", operation: "weeds" }`. Learning items, kits, advisories and resources that carry the topic slug are gathered on the topic page automatically.

## Crop calendar

`content/calendar.ts` holds tasks counted in weeks from sowing (week 0 is the sowing week). Each task has a `crop`, an `operation` (its guide is linked), `weekStart`, `weekEnd`, a `title` and a `description`. Week ranges must come from the Package of Practices.

## Add a Learn & Play item

In `content/learn.ts`, copy an entry with the same `format`:

| Format               | What to fill in                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `game`               | `rules` (list of steps) and `media.pdf` (the printable file)                                       |
| `song`, `jingle`     | `media.audio` (MP3) and `lyrics`                                                                   |
| `video`, `play-film` | `media.youtubeId`: the 11 characters after `v=` in the YouTube link                                |
| `emodule`            | `lesson` (list of title + text) and `quiz`                                                         |
| `quiz`               | `quiz`: each question has `options` and `answer` (the number of the right option, counting from 0) |
| `story`              | `story` (paragraphs)                                                                               |
| `podcast`            | `media.audio`                                                                                      |

`featured: true` makes the item larger on the Learn page, and the home page showcases the featured game, song, jingle, video and e-module. Upload audio and PDFs into `public/learn/` and write the path starting with `/learn/...`.

> The sample video uses the placeholder `SAMPLE_VIDEO_ID`. Replace it with a real YouTube id.

## Add an extension kit

In `content/kits.ts`, copy an entry. A kit always has the same seven files: facilitator guide, slides, farmer leaflet, group activity, pre-test, post-test and feedback form.

1. Put the seven PDFs in `public/kits/<kit-slug>/` with the names `facilitator-guide.pdf`, `slides.pdf`, `leaflet.pdf`, `activity.pdf`, `pre-test.pdf`, `post-test.pdf`, `feedback-form.pdf`.
2. In the kit, change `files("...")` to point there. The `files` helper at the top of the file builds the paths; change `/samples/kits/` to `/kits/` once real files exist.
3. `activity` is the slug of a Learn & Play item (usually a game) used in the session.

The "Download all" button zips the files in the browser. Keep each file under 10 MB so it works on mobile data.

## Add an advisory

In `content/advisories.ts`, copy an entry:

- `type`: `seasonal`, `alert`, `weather`, `variety`, `event` or `news`
- `issuedOn` and `validUntil` (`YYYY-MM-DD`): the advisory is current between these dates and moves to the archive afterwards
- `urgent: true` shows it in the red banner at the top of every page while it is current. Use this only for real alerts.
- `districts`: leave empty `[]` for all of Punjab, or list district slugs
- `crops`: crop slugs it concerns

## Add a leaflet or research summary

In `content/resources.ts`: `type` is `leaflet` or `research`. Put the PDF in `public/resources/` and set `file` to `/resources/<name>.pdf`, or set `link` to an outside page (for example a journal article). Leave the other one as `""`.

## Add a glossary word

In `content/glossary.ts`, add a line:

```ts
g("slug", "English term", "ਪੰਜਾਬੀ ਸ਼ਬਦ", "Short English definition.", "ਛੋਟੀ ਪੰਜਾਬੀ ਪਰਿਭਾਸ਼ਾ।"),
```

## Change interface words

Menus, buttons and headings are in `messages/en.json` and `messages/pa.json`. Both files must have the same keys. Change only the text on the right of the colon.

## Downloadable files

| Kind                          | Folder                                 | Tips                           |
| ----------------------------- | -------------------------------------- | ------------------------------ |
| Kit files                     | `public/kits/<kit-slug>/`              | PDF, under 10 MB each          |
| Game boards, leaflets         | `public/resources/` or `public/learn/` | PDF, A4, under 5 MB            |
| Songs, jingles, podcasts      | `public/learn/`                        | MP3, 64–96 kbps mono is plenty |
| Package of Practices editions | `public/editions/`                     | Official PDF                   |

The files in `public/samples/` are placeholders. Delete them once every entry points to a real file.

## Before you publish

- Text checked against the official source, word for word
- Punjabi checked by a Punjabi expert
- `sample: false` and (for guides) `status: "published"`
- Look at the preview link on a phone, in both languages
