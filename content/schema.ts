/**
 * Content schemas for SciOArt.
 *
 * Every piece of content is typed and validated with zod. When a CMS
 * (for example Sanity) is added later, it only needs to return data in
 * these shapes; the pages and components do not change.
 */
import { z } from "zod";

/** A text in both languages. */
export const LText = z.object({ en: z.string(), pa: z.string() });
export type L = z.infer<typeof LText>;

/** Small helper for writing bilingual text in data files. */
export const l = (en: string, pa: string): L => ({ en, pa });

export const SeasonId = z.enum(["rabi", "kharif", "fruit", "vegetable", "allied"]);
export type SeasonId = z.infer<typeof SeasonId>;

export const Season = z.object({
  id: SeasonId,
  name: LText,
  description: LText,
});
export type Season = z.infer<typeof Season>;

export const CropGroup = z.object({
  id: z.string(),
  season: SeasonId,
  name: LText,
});
export type CropGroup = z.infer<typeof CropGroup>;

export const Crop = z.object({
  slug: z.string(),
  name: LText,
  season: SeasonId,
  group: z.string(),
  description: LText,
  /** Icon key in components/illustrations/CropIcon (usually the slug). */
  illustration: z.string(),
  /** Optional photo, e.g. /images/crops/wheat.jpg. Falls back to illustration. */
  image: z.string(),
  topics: z.array(z.string()),
});
export type Crop = z.infer<typeof Crop>;

export const Topic = z.object({
  slug: z.string(),
  name: LText,
  short: LText,
  overview: z.array(LText),
  icon: z.string(),
});
export type Topic = z.infer<typeof Topic>;

/**
 * The library sections. Each id is also the web address of its page,
 * e.g. scioart.co.in/en/jingles. Never change an id once it is live.
 */
export const CategoryId = z.enum([
  "culture",
  "documentaries",
  "live",
  "jingles",
  "scientific-songs",
  "theatre",
  "short-films",
  "podcasts",
  "games",
  "e-modules",
  "e-books",
  "posters-comics",
]);
export type CategoryId = z.infer<typeof CategoryId>;

export const Category = z.object({
  id: CategoryId,
  name: LText,
  /** One line under the name on buttons and the section page. */
  short: LText,
  /** The main action on an item: watch, listen, play or read. */
  action: z.enum(["watch", "listen", "play", "read", "learn"]),
});
export type Category = z.infer<typeof Category>;

export const QuizQuestion = z.object({
  question: LText,
  options: z.array(LText),
  answer: z.number().int(),
  explain: LText,
});
export type QuizQuestion = z.infer<typeof QuizQuestion>;

/** A live program streamed on YouTube or Facebook. Times include the offset, e.g. 2026-12-05T11:00:00+05:30. */
export const LiveInfo = z.object({
  startsAt: z.string().refine((v) => !Number.isNaN(Date.parse(v)), "startsAt must be a date and time"),
  durationMinutes: z.number().int().positive(),
  platform: z.enum(["youtube", "facebook", "other"]),
  /** Link to the live stream page. */
  url: z.string(),
});
export type LiveInfo = z.infer<typeof LiveInfo>;

/** One item in the library: a film, song, game, e-book and so on. */
export const Material = z.object({
  slug: z.string(),
  category: CategoryId,
  title: LText,
  description: LText,
  crops: z.array(z.string()),
  topics: z.array(z.string()),
  languages: z.array(z.enum(["en", "pa"])),
  media: z.object({
    /** 11-character YouTube video ID. */
    youtubeId: z.string().optional(),
    /** MP3 file, e.g. /media/jingles/straw-is-gold.mp3 */
    audio: z.string().optional(),
    /** PDF to read or download (e-books, games, posters). */
    pdf: z.string().optional(),
    /** Picture files (posters, comics, photo stories). */
    images: z.array(z.string()).optional(),
    /** A page elsewhere, e.g. a Facebook video. */
    link: z.string().optional(),
    /** Cover picture for cards, e.g. /media/e-books/stories-cover.jpg. */
    cover: z.string().optional(),
  }),
  live: LiveInfo.optional(),
  /** Who made it: writer, singer, director, cast. */
  credits: z.array(z.object({ role: LText, name: LText })).optional(),
  lyrics: LText.optional(),
  rules: z.array(LText).optional(),
  lesson: z.array(z.object({ title: LText, body: LText })).optional(),
  quiz: z.array(QuizQuestion).optional(),
  /** Longer description, one paragraph per entry. */
  body: z.array(LText).optional(),
  duration: LText,
  /** Release date, YYYY-MM-DD. */
  date: z.string(),
  featured: z.boolean(),
  sample: z.boolean(),
});
export type Material = z.infer<typeof Material>;

export const Resource = z.object({
  slug: z.string(),
  type: z.literal("research"),
  title: LText,
  description: LText,
  year: z.number().int(),
  authors: LText.optional(),
  crops: z.array(z.string()),
  topics: z.array(z.string()),
  file: z.string(),
  link: z.string(),
  sample: z.boolean(),
});
export type Resource = z.infer<typeof Resource>;

export const GlossaryTerm = z.object({
  slug: z.string(),
  en: z.string(),
  pa: z.string(),
  definition: LText,
});
export type GlossaryTerm = z.infer<typeof GlossaryTerm>;
