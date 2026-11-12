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
import { topics as rawTopics } from "@/content/topics";
import { materials as rawMaterials } from "@/content/materials";
import { resources as rawResources } from "@/content/resources";
import { glossary as rawGlossary } from "@/content/glossary";
import { categories, cropGroups, seasons } from "@/content/taxonomy";

// Validate everything once, when the module loads (at build time).
const crops = z.array(S.Crop).parse(rawCrops);
const topics = z.array(S.Topic).parse(rawTopics);
const materials = z
  .array(S.Material)
  .parse(rawMaterials)
  // Newest first.
  .sort((a, b) => b.date.localeCompare(a.date));
const resources = z.array(S.Resource).parse(rawResources);
const glossary = z.array(S.GlossaryTerm).parse(rawGlossary);

// Integrity checks: every reference must point at something that exists.
(() => {
  const cropSlugs = new Set(crops.map((c) => c.slug));
  const topicSlugs = new Set(topics.map((t) => t.slug));
  const problems: string[] = [];
  for (const c of crops) {
    if (!cropGroups.some((g) => g.id === c.group)) problems.push(`crop ${c.slug}: unknown group ${c.group}`);
    for (const t of c.topics) if (!topicSlugs.has(t)) problems.push(`crop ${c.slug}: unknown topic ${t}`);
  }
  const seen = new Set<string>();
  for (const m of materials) {
    if (seen.has(m.slug)) problems.push(`material ${m.slug}: the same slug is used twice`);
    seen.add(m.slug);
    for (const c of m.crops) if (!cropSlugs.has(c)) problems.push(`material ${m.slug}: unknown crop ${c}`);
    for (const t of m.topics) if (!topicSlugs.has(t)) problems.push(`material ${m.slug}: unknown topic ${t}`);
    if (m.category === "live" && !m.live) problems.push(`material ${m.slug}: a live item needs "live" (date, time and link)`);
    if (m.quiz)
      for (const q of m.quiz)
        if (q.answer < 0 || q.answer >= q.options.length) problems.push(`material ${m.slug}: a quiz answer points at no option`);
  }
  for (const r of resources) for (const c of r.crops) if (!cropSlugs.has(c)) problems.push(`resource ${r.slug}: unknown crop ${c}`);
  if (problems.length) throw new Error(`Content problems:\n${problems.join("\n")}`);
})();

// ── Taxonomy ────────────────────────────────────────────────────────────
export const getSeasons = () => seasons;
export const getSeason = (id: string) => seasons.find((s) => s.id === id);
export const getCropGroups = (season?: S.SeasonId) => (season ? cropGroups.filter((g) => g.season === season) : cropGroups);
export const getCategories = () => categories;
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const isCategoryId = (id: string): id is S.CategoryId => categories.some((c) => c.id === id);

// ── Crops & topics ─────────────────────────────────────────────────────
export const getCrops = (filter?: { season?: S.SeasonId; group?: string }) =>
  crops.filter((c) => (!filter?.season || c.season === filter.season) && (!filter?.group || c.group === filter.group));
export const getCrop = (slug: string) => crops.find((c) => c.slug === slug);
export const getTopics = () => topics;
export const getTopic = (slug: string) => topics.find((t) => t.slug === slug);

// ── Library ────────────────────────────────────────────────────────────
export type MaterialFilter = { category?: S.CategoryId; crop?: string; topic?: string };
export const getMaterials = (f: MaterialFilter = {}) =>
  materials.filter(
    (m) => (!f.category || m.category === f.category) && (!f.crop || m.crops.includes(f.crop)) && (!f.topic || m.topics.includes(f.topic)),
  );
export const getMaterial = (slug: string) => materials.find((m) => m.slug === slug);
/** The web address of an item, without the language prefix. */
export const materialHref = (m: Pick<S.Material, "category" | "slug">) => `/${m.category}/${m.slug}`;
export const countByCategory = () => Object.fromEntries(categories.map((c) => [c.id, materials.filter((m) => m.category === c.id).length]));

// ── Resources ──────────────────────────────────────────────────────────
export const getResources = () => [...resources].sort((a, b) => b.year - a.year);
export const getGlossary = () => glossary;

// ── Stats for the home page counters ───────────────────────────────────
export const getStats = () => ({
  materials: materials.length,
  categories: categories.length,
  crops: crops.length,
  topics: topics.length,
});
