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

export const Operation = z.object({
  slug: z.string(),
  name: LText,
  short: LText,
  /** Icon key in components/illustrations/OperationIcon. */
  icon: z.string(),
});
export type Operation = z.infer<typeof Operation>;

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
  /** Which Package of Practices publication covers this crop. */
  publication: z.string(),
  /** Operation slugs, in order. */
  operations: z.array(z.string()),
  quickFacts: z.array(z.object({ label: LText, value: LText })),
  topics: z.array(z.string()),
});
export type Crop = z.infer<typeof Crop>;

export const Publication = z.object({
  id: z.string(),
  title: LText,
  publisher: LText,
});
export type Publication = z.infer<typeof Publication>;

export const Edition = z.object({
  id: z.string(),
  publication: z.string(),
  year: z.number().int(),
  label: LText,
  isLatest: z.boolean(),
  /** Link to the PDF once available; empty means "coming soon". */
  file: z.string(),
});
export type Edition = z.infer<typeof Edition>;

const Cell = z.union([LText, z.literal("—")]);
export type Cell = z.infer<typeof Cell>;

export const Block = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), id: z.string(), text: LText }),
  z.object({ type: z.literal("paragraph"), text: LText }),
  z.object({ type: z.literal("steps"), items: z.array(LText) }),
  z.object({
    type: z.literal("table"),
    caption: LText,
    columns: z.array(LText),
    rows: z.array(z.array(Cell)),
  }),
  z.object({
    type: z.literal("callout"),
    tone: z.enum(["important", "caution", "tip"]),
    text: LText,
  }),
  z.object({ type: z.literal("media"), learn: z.string() }),
]);
export type Block = z.infer<typeof Block>;

export const GuideStatus = z.enum(["draft", "in-review", "published", "archived"]);

export const OperationGuide = z.object({
  crop: z.string(),
  operation: z.string(),
  edition: z.string(),
  blocks: z.array(Block),
  districtNotes: z.record(z.string(), LText),
  topics: z.array(z.string()),
  lastReviewed: z.string(),
  reviewer: LText,
  status: GuideStatus,
  sample: z.boolean(),
});
export type OperationGuide = z.infer<typeof OperationGuide>;

export const Topic = z.object({
  slug: z.string(),
  name: LText,
  short: LText,
  overview: z.array(LText),
  icon: z.string(),
  links: z.array(z.object({ crop: z.string(), operation: z.string() })),
});
export type Topic = z.infer<typeof Topic>;

export const CalendarTask = z.object({
  crop: z.string(),
  operation: z.string(),
  weekStart: z.number().int(),
  weekEnd: z.number().int(),
  title: LText,
  description: LText,
});
export type CalendarTask = z.infer<typeof CalendarTask>;

export const AudienceId = z.enum(["farmers", "extension-workers", "students", "researchers"]);
export type AudienceId = z.infer<typeof AudienceId>;

export const FormatId = z.enum(["game", "song", "jingle", "video", "emodule", "quiz", "story", "podcast", "play-film"]);
export type FormatId = z.infer<typeof FormatId>;

export const QuizQuestion = z.object({
  question: LText,
  options: z.array(LText),
  answer: z.number().int(),
  explain: LText,
});
export type QuizQuestion = z.infer<typeof QuizQuestion>;

export const LearnItem = z.object({
  slug: z.string(),
  format: FormatId,
  title: LText,
  description: LText,
  crops: z.array(z.string()),
  topics: z.array(z.string()),
  operations: z.array(z.string()),
  audience: z.array(AudienceId),
  languages: z.array(z.enum(["en", "pa"])),
  media: z.object({
    audio: z.string().optional(),
    youtubeId: z.string().optional(),
    pdf: z.string().optional(),
  }),
  lyrics: LText.optional(),
  rules: z.array(LText).optional(),
  lesson: z.array(z.object({ title: LText, body: LText })).optional(),
  quiz: z.array(QuizQuestion).optional(),
  story: z.array(LText).optional(),
  duration: LText,
  featured: z.boolean(),
  sample: z.boolean(),
});
export type LearnItem = z.infer<typeof LearnItem>;

export const KitFile = z.object({
  kind: z.enum(["facilitator-guide", "slides", "leaflet", "activity", "pre-test", "post-test", "feedback-form"]),
  title: LText,
  path: z.string(),
});
export type KitFile = z.infer<typeof KitFile>;

export const Kit = z.object({
  slug: z.string(),
  crop: z.string(),
  operation: z.string(),
  topics: z.array(z.string()),
  title: LText,
  summary: LText,
  objectives: z.array(LText),
  audience: z.array(AudienceId),
  duration: LText,
  files: z.array(KitFile),
  activity: z.string(),
  sample: z.boolean(),
});
export type Kit = z.infer<typeof Kit>;

export const AdvisoryType = z.enum(["seasonal", "alert", "weather", "variety", "event", "news"]);
export type AdvisoryType = z.infer<typeof AdvisoryType>;

export const Advisory = z.object({
  slug: z.string(),
  type: AdvisoryType,
  title: LText,
  summary: LText,
  body: z.array(LText),
  crops: z.array(z.string()),
  /** Empty array = all of Punjab. */
  districts: z.array(z.string()),
  issuedOn: z.string(),
  validUntil: z.string(),
  urgent: z.boolean(),
  sample: z.boolean(),
});
export type Advisory = z.infer<typeof Advisory>;

export const Resource = z.object({
  slug: z.string(),
  type: z.enum(["leaflet", "research"]),
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

export const Location = z.object({
  slug: z.string(),
  kind: z.enum(["country", "state", "district"]),
  name: LText,
  parent: z.string().nullable(),
  comingSoon: z.boolean(),
});
export type Location = z.infer<typeof Location>;

export const Audience = z.object({
  id: AudienceId,
  name: LText,
  singular: LText,
  intro: LText,
  icon: z.string(),
});
export type Audience = z.infer<typeof Audience>;
