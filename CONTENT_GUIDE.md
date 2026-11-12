# Content guide

This guide is for the people who keep SciOArt up to date. You do not need to be a programmer. You will edit plain text files in the `content/` folder, either on github.com (open the file, press the pencil icon, edit, then **Commit changes**) or in Codex.

After every change, Vercel rebuilds the site. If something is wrong (a missing comma, a crop name that does not exist), the build stops and the old site stays online, so a mistake can never break the live site. The error message names the file and the problem.

## The golden rules

1. **Materials, not advice.** SciOArt shares films, songs, plays, games and books. It does not give personal farm advice or answer individual questions.
2. **Never invent facts.** Any figure, variety, dose or date inside an item must come from PAU research or a PAU expert, word for word.
3. **Every item is reviewed** by the content reviewer before `sample` is set to `false`.
4. **Both languages, always.** Every title and description has an English and a Punjabi version.
5. **Mark samples.** Anything not yet final keeps `sample: true`. The site then shows a "Sample" badge.

## How text is written

Every bilingual text uses `l("English", "ਪੰਜਾਬੀ")`:

```ts
title: l("Song of the soil", "ਮਿੱਟੀ ਦਾ ਗੀਤ"),
```

- Keep the quotes and the comma between the two languages.
- If your text contains a double quote, write it as `\"`.
- Use Unicode Gurmukhi (as typed with Google Input Tools or the phone keyboard), not old Asees/Anmol Lipi fonts. Text copied from old PDFs often uses those fonts and turns into Latin letters: retype it.
- Use the nukta letters where they belong (ਸ਼, ਖ਼, ਗ਼, ਜ਼, ਫ਼, ਲ਼).
- Lines marked `// pa: needs expert review` are first drafts of the Punjabi. Remove the comment once a Punjabi expert has checked them.

Slugs (the short ids such as `wheat` or `song-of-the-soil`) are lowercase English with hyphens. They become web addresses, so never change a slug once the page is live.

## Where everything lives

| What                                            | File                                   |
| ----------------------------------------------- | -------------------------------------- |
| **Library items** (films, songs, games, books…) | `content/materials.ts`                 |
| The twelve library sections                     | `content/taxonomy.ts` (`categories`)   |
| Crops                                           | `content/crops.ts`                     |
| Themes (topics)                                 | `content/topics.ts`                    |
| Research summaries                              | `content/resources.ts`                 |
| Glossary                                        | `content/glossary.ts`                  |
| Buttons, menus and other interface words        | `messages/en.json`, `messages/pa.json` |
| Audio, PDFs and cover pictures                  | `public/media/<section>/`              |
| Crop photos                                     | `public/images/crops/` (see IMAGES.md) |

## Add an item to the library

Open `content/materials.ts` and copy an existing item **from the same section**, then change it. Every item has:

| Field                  | What to put                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `slug`                 | Short web name, e.g. `paddy-straw-jingle`. Must be new.                                                |
| `category`             | The section (see the list below). Its page is `scioart.co.in/en/<category>/<slug>`.                    |
| `title`, `description` | Both languages. The description is one or two sentences.                                               |
| `crops`, `topics`      | Crop and theme slugs, so the item also appears on those pages. `[]` if none.                           |
| `languages`            | `["pa"]`, `["en"]` or both.                                                                            |
| `media`                | The file or video (see below).                                                                         |
| `credits`              | Optional: who wrote, sang, directed or acted, e.g. `{ role: l("Singer", "ਗਾਇਕ"), name: l("…", "…") }`. |
| `duration`             | Length in both languages: `l("3 minutes", "3 ਮਿੰਟ")`, or pages for books.                              |
| `date`                 | Release date, `YYYY-MM-DD`. Newest items show first.                                                   |
| `featured`             | `true` puts it in the home page showcase for its section.                                              |
| `sample`               | `true` until the reviewer approves.                                                                    |

What goes in `media`, by section:

| Section (`category`)                                 | What to fill in                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `documentaries`, `short-films`, `theatre`, `culture` | `youtubeId`: the 11 characters after `v=` in the YouTube link. For a Facebook video use `link` instead.                               |
| `live`                                               | `live` (see below), and `youtubeId` once the recording is on YouTube                                                                  |
| `jingles`, `scientific-songs`, `podcasts`            | `audio`: the MP3 file. Add `lyrics` for songs and jingles.                                                                            |
| `games`                                              | `pdf`: the printable game, plus `rules` (list of steps)                                                                               |
| `e-modules`                                          | `lesson` (list of title + text) and `quiz` (each question has `options` and `answer`, the number of the right option counting from 0) |
| `e-books`                                            | `pdf`: the book                                                                                                                       |
| `posters-comics`                                     | `images` (list of picture files) and/or `pdf`                                                                                         |

Any item can also have a `cover` picture (`media.cover`, 1600 × 900, under 300 KB) for its card, and `body` (paragraphs) for a longer description. Culture items can use any mix: a video, a recording, pictures.

Put files in `public/media/<section>/`, for example `public/media/jingles/paddy-straw.mp3`, and write the path from `/media/…`: `audio: "/media/jingles/paddy-straw.mp3"`.

> Sample items use `SAMPLE_VIDEO_ID` and files in `public/samples/`. Replace them, or delete the sample items, as the real ones arrive.

## Add a live program

Live items go in the `live` section. Add them a week or two before the program:

```ts
live: {
  startsAt: "2026-12-05T11:00:00+05:30", // date and India time
  durationMinutes: 90,
  platform: "youtube", // or "facebook"
  url: "https://www.youtube.com/watch?v=…", // the live stream page
},
```

The site works out on its own whether a program is **coming up**, **live now** or **past**, using the visitor's clock. While it is live, the home page shows it with a "Live now" badge. After the program, add the recording's `youtubeId` and it moves to "Past programs" with the video.

## Add a library section

The twelve sections are in `content/taxonomy.ts`. To add one, add its id to `CategoryId` in `content/schema.ts`, add it to `categories` in `content/taxonomy.ts` (name, one-line description and whether people watch, listen, play, learn or read it), and give it an icon in `components/content/categoryIcons.tsx`. Its page, menu entry and home page button appear automatically. Never rename a section that is live: its id is its web address.

## Add a crop

Open `content/crops.ts` and copy an existing entry inside the `seeds` list:

```ts
{ slug: "sunflower", name: l("Sunflower", "ਸੂਰਜਮੁਖੀ"), season: "kharif", group: "kharif-oilseeds",
  description: l("One sentence about the crop.", "ਫ਼ਸਲ ਬਾਰੇ ਇੱਕ ਵਾਕ।"),
  topics: ["diversification"] },
```

- `season`: one of `rabi`, `kharif`, `fruit`, `vegetable`, `allied`
- `group`: an id from `cropGroups` in `content/taxonomy.ts`
- The crop page, its search entry and the sitemap appear automatically. Library items tagged with the crop show on its page.
- A drawn icon is used until a photo is added. A brand-new crop borrows the wheat icon until its own is drawn in `components/illustrations/CropIcon.tsx`.

## Add a theme (topic)

In `content/topics.ts`, copy an entry. Library items that list the theme's slug in `topics` appear on its page automatically.

## Add a research summary

In `content/resources.ts`, copy an entry. Put the PDF in `public/media/research/` and set `file`, or set `link` to an outside page (for example a journal article). Leave the other one as `""`.

## Add a glossary word

In `content/glossary.ts`, add a line:

```ts
g("slug", "English term", "ਪੰਜਾਬੀ ਸ਼ਬਦ", "Short English definition.", "ਛੋਟੀ ਪੰਜਾਬੀ ਪਰਿਭਾਸ਼ਾ।"),
```

## Change interface words

Menus, buttons and headings are in `messages/en.json` and `messages/pa.json`. Both files must have the same keys. Change only the text on the right of the colon.

## File sizes

| Kind                       | Tips                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| Songs, jingles, podcasts   | MP3, 64–96 kbps mono is plenty                                                                           |
| E-books, games, comics     | PDF under 10 MB, so it opens on mobile data                                                              |
| Cover pictures and posters | JPG under 300 KB, about 1600 px wide                                                                     |
| Films                      | Upload to YouTube (or Facebook) and use the video's id or link. Never put video files in the repository. |

## Before you publish

- Facts in the item checked against PAU research, word for word
- Punjabi checked by a Punjabi expert
- `sample: false` after the reviewer approves
- Look at the preview link on a phone, in both languages
