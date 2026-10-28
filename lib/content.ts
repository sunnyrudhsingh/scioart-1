/**
 * Content access layer.
 *
 * Pages and components get ALL content through these functions. Today the
 * data comes from typed files in /content; when a CMS (e.g. Sanity) is
 * added, only this file needs to change.
 */
import { z } from "zod";
import * as S from "@/content/schema";
import { crops as rawCrops } from "@/content/crops";
import { editions as rawEditions, publications as rawPublications } from "@/content/editions";
import { wheatGuides } from "@/content/guides/wheat";
import { topics as rawTopics } from "@/content/topics";
import { calendarTasks as rawCalendar } from "@/content/calendar";
import { learnItems as rawLearn } from "@/content/learn";
import { kits as rawKits } from "@/content/kits";
import { advisories as rawAdvisories } from "@/content/advisories";
import { resources as rawResources } from "@/content/resources";
import { glossary as rawGlossary } from "@/content/glossary";
import { locations as rawLocations } from "@/content/locations";
import { advisoryTypes, allOperations, audiences, coreOperations, cropGroups, formats, resourceTypes, seasons } from "@/content/taxonomy";

// Validate everything once, when the module loads (at build time).
const crops = z.array(S.Crop).parse(rawCrops);
const publications = z.array(S.Publication).parse(rawPublications);
const editions = z.array(S.Edition).parse(rawEditions);
// Only reviewed guides reach the site: "draft" and "in-review" stay hidden.
const guides = z
  .array(S.OperationGuide)
  .parse([...wheatGuides])
  .filter((g) => g.status === "published" || g.status === "archived");
const topics = z.array(S.Topic).parse(rawTopics);
const calendar = z.array(S.CalendarTask).parse(rawCalendar);
const learn = z.array(S.LearnItem).parse(rawLearn);
const kits = z.array(S.Kit).parse(rawKits);
const advisories = z.array(S.Advisory).parse(rawAdvisories);
const resources = z.array(S.Resource).parse(rawResources);
const glossary = z.array(S.GlossaryTerm).parse(rawGlossary);
const locations = z.array(S.Location).parse(rawLocations);

// Integrity checks: every reference must point at something that exists.
(() => {
  const cropSlugs = new Set(crops.map((c) => c.slug));
  const opSlugs = new Set(allOperations.map((o) => o.slug));
  const topicSlugs = new Set(topics.map((t) => t.slug));
  const learnSlugs = new Set(learn.map((i) => i.slug));
  const problems: string[] = [];
  for (const c of crops) {
    if (!cropGroups.some((g) => g.id === c.group)) problems.push(`crop ${c.slug}: unknown group ${c.group}`);
    for (const o of c.operations) if (!opSlugs.has(o)) problems.push(`crop ${c.slug}: unknown operation ${o}`);
    for (const t of c.topics) if (!topicSlugs.has(t)) problems.push(`crop ${c.slug}: unknown topic ${t}`);
  }
  for (const g of guides) {
    if (!cropSlugs.has(g.crop)) problems.push(`guide: unknown crop ${g.crop}`);
    if (!editions.some((e) => e.id === g.edition)) problems.push(`guide: unknown edition ${g.edition}`);
    for (const b of g.blocks) if (b.type === "media" && !learnSlugs.has(b.learn)) problems.push(`guide: unknown learn item ${b.learn}`);
  }
  for (const t of topics)
    for (const lnk of t.links) if (!cropSlugs.has(lnk.crop)) problems.push(`topic ${t.slug}: unknown crop ${lnk.crop}`);
  for (const k of kits) if (!learnSlugs.has(k.activity)) problems.push(`kit ${k.slug}: unknown activity ${k.activity}`);
  if (problems.length) throw new Error(`Content problems:\n${problems.join("\n")}`);
})();

// ── Taxonomy ────────────────────────────────────────────────────────────
export const getSeasons = () => seasons;
export const getSeason = (id: string) => seasons.find((s) => s.id === id);
export const getCropGroups = (season?: S.SeasonId) => (season ? cropGroups.filter((g) => g.season === season) : cropGroups);
export const getFormats = () => formats;
export const getFormat = (id: string) => formats.find((f) => f.id === id);
export const getAdvisoryTypes = () => advisoryTypes;
export const getResourceTypes = () => resourceTypes;
export const getAudiences = () => audiences;
export const getAudience = (id: string) => audiences.find((a) => a.id === id);
export const getCoreOperations = () => coreOperations;
export const getOperation = (slug: string) => allOperations.find((o) => o.slug === slug);

// ── Crops & operations ─────────────────────────────────────────────────
export const getCrops = (filter?: { season?: S.SeasonId; group?: string }) =>
  crops.filter((c) => (!filter?.season || c.season === filter.season) && (!filter?.group || c.group === filter.group));
export const getCrop = (slug: string) => crops.find((c) => c.slug === slug);

export const getOperations = (cropSlug: string): S.Operation[] => {
  const crop = getCrop(cropSlug);
  if (!crop) return [];
  return crop.operations.map((slug) => getOperation(slug)).filter((o): o is S.Operation => Boolean(o));
};

// ── Publications & editions ────────────────────────────────────────────
export const getPublications = () => publications;
export const getPublication = (id: string) => publications.find((p) => p.id === id);
export const getEditions = (publicationId?: string) =>
  (publicationId ? editions.filter((e) => e.publication === publicationId) : editions).sort((a, b) => b.year - a.year);
export const getEdition = (id: string) => editions.find((e) => e.id === id);
export const getLatestEdition = (publicationId: string) => editions.find((e) => e.publication === publicationId && e.isLatest);

/** Editions of a crop's publication that actually hold guide content for this crop. */
export const getCropEditions = (cropSlug: string) => {
  const crop = getCrop(cropSlug);
  if (!crop) return [];
  const withContent = new Set(guides.filter((g) => g.crop === cropSlug).map((g) => g.edition));
  return getEditions(crop.publication).filter((e) => e.isLatest || withContent.has(e.id));
};

export const getOperationGuide = (crop: string, operation: string, editionId?: string) => {
  const c = getCrop(crop);
  if (!c) return undefined;
  const ed = editionId ?? getLatestEdition(c.publication)?.id;
  return guides.find((g) => g.crop === crop && g.operation === operation && g.edition === ed);
};

export const getGuidesForCrop = (crop: string, editionId?: string) => {
  const c = getCrop(crop);
  if (!c) return [];
  const ed = editionId ?? getLatestEdition(c.publication)?.id;
  return guides.filter((g) => g.crop === crop && g.edition === ed);
};

/** All archived (non-latest) editions that have guide content: used for static params. */
export const getArchivedGuideParams = () =>
  guides.filter((g) => !getEdition(g.edition)?.isLatest).map((g) => ({ crop: g.crop, operation: g.operation, edition: g.edition }));

/** Every crop × operation pair, flagged with whether the latest guide exists (for search). */
export const getAllOperationsForSearch = () =>
  crops.flatMap((crop) => getOperations(crop.slug).map((op) => ({ crop, op, ready: Boolean(getOperationGuide(crop.slug, op.slug)) })));

// ── Topics ─────────────────────────────────────────────────────────────
export const getTopics = () => topics;
export const getTopic = (slug: string) => topics.find((t) => t.slug === slug);

// ── Calendar ───────────────────────────────────────────────────────────
export const getCalendar = (crop: string) => calendar.filter((t) => t.crop === crop);
export const getCalendarCrops = () => [...new Set(calendar.map((t) => t.crop))];

// ── Learn & Play ───────────────────────────────────────────────────────
export type LearnFilter = {
  format?: S.FormatId;
  crop?: string;
  topic?: string;
  operation?: string;
  audience?: S.AudienceId;
};
export const getLearnItems = (f: LearnFilter = {}) =>
  learn.filter(
    (i) =>
      (!f.format || i.format === f.format) &&
      (!f.crop || i.crops.includes(f.crop)) &&
      (!f.topic || i.topics.includes(f.topic)) &&
      (!f.operation || i.operations.includes(f.operation)) &&
      (!f.audience || i.audience.includes(f.audience)),
  );
export const getLearnItem = (slug: string) => learn.find((i) => i.slug === slug);

// ── Kits ───────────────────────────────────────────────────────────────
export const getKits = (f: { crop?: string; operation?: string; topic?: string } = {}) =>
  kits.filter(
    (k) => (!f.crop || k.crop === f.crop) && (!f.operation || k.operation === f.operation) && (!f.topic || k.topics.includes(f.topic)),
  );
export const getKit = (slug: string) => kits.find((k) => k.slug === slug);

// ── Advisories ─────────────────────────────────────────────────────────
export const isAdvisoryActive = (a: S.Advisory, today: string) => a.issuedOn <= today && today <= a.validUntil;
export const getAdvisories = (f: { type?: S.AdvisoryType; crop?: string; district?: string } = {}) =>
  advisories
    .filter(
      (a) =>
        (!f.type || a.type === f.type) &&
        (!f.crop || a.crops.includes(f.crop)) &&
        (!f.district || a.districts.length === 0 || a.districts.includes(f.district)),
    )
    .sort((a, b) => b.issuedOn.localeCompare(a.issuedOn));
export const getAdvisory = (slug: string) => advisories.find((a) => a.slug === slug);

// ── Resources ──────────────────────────────────────────────────────────
export const getResources = (type?: S.Resource["type"]) =>
  resources.filter((r) => !type || r.type === type).sort((a, b) => b.year - a.year);
export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
export const getGlossary = () => glossary;

// ── Locations ──────────────────────────────────────────────────────────
export const getLocations = () => locations;
export const getLocation = (slug: string) => locations.find((x) => x.slug === slug);
export const getDistricts = (state = "punjab") => locations.filter((x) => x.kind === "district" && x.parent === state);

// ── Stats for the home page counters ───────────────────────────────────
export const getStats = () => ({
  crops: crops.length,
  operations: coreOperations.length,
  topics: topics.length,
  learn: learn.length,
  kits: kits.length,
});
