import {
  getAdvisories,
  getAllOperationsForSearch,
  getCrops,
  getGlossary,
  getKits,
  getLearnItems,
  getResources,
  getTopics,
} from "./content";
import { tx, txOther } from "./text";

export type SearchEntry = {
  type: "crop" | "operation" | "topic" | "learn" | "kit" | "advisory" | "resource" | "glossary";
  href: string;
  title: string;
  alt: string;
  text: string;
  textAlt: string;
};

/** Everything searchable, in both languages (so English words also find Punjabi pages and vice versa). */
export function buildSearchIndex(locale: string): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const c of getCrops()) {
    entries.push({
      type: "crop",
      href: `/crops/${c.slug}`,
      title: tx(c.name, locale),
      alt: txOther(c.name, locale),
      text: tx(c.description, locale),
      textAlt: txOther(c.description, locale),
    });
  }
  for (const { crop, op, ready } of getAllOperationsForSearch()) {
    if (!ready) continue;
    entries.push({
      type: "operation",
      href: `/crops/${crop.slug}/${op.slug}`,
      title: `${tx(op.name, locale)} — ${tx(crop.name, locale)}`,
      alt: `${txOther(op.name, locale)} ${txOther(crop.name, locale)}`,
      text: tx(op.short, locale),
      textAlt: txOther(op.short, locale),
    });
  }
  for (const t of getTopics()) {
    entries.push({
      type: "topic",
      href: `/topics/${t.slug}`,
      title: tx(t.name, locale),
      alt: txOther(t.name, locale),
      text: tx(t.short, locale),
      textAlt: txOther(t.short, locale),
    });
  }
  for (const i of getLearnItems()) {
    entries.push({
      type: "learn",
      href: `/learn/${i.slug}`,
      title: tx(i.title, locale),
      alt: txOther(i.title, locale),
      text: tx(i.description, locale),
      textAlt: txOther(i.description, locale),
    });
  }
  for (const k of getKits()) {
    entries.push({
      type: "kit",
      href: `/extension/${k.slug}`,
      title: tx(k.title, locale),
      alt: txOther(k.title, locale),
      text: tx(k.summary, locale),
      textAlt: txOther(k.summary, locale),
    });
  }
  for (const a of getAdvisories()) {
    entries.push({
      type: "advisory",
      href: `/advisories/${a.slug}`,
      title: tx(a.title, locale),
      alt: txOther(a.title, locale),
      text: tx(a.summary, locale),
      textAlt: txOther(a.summary, locale),
    });
  }
  for (const r of getResources()) {
    entries.push({
      type: "resource",
      href: `/resources/${r.type === "leaflet" ? "leaflets" : "research"}`,
      title: tx(r.title, locale),
      alt: txOther(r.title, locale),
      text: tx(r.description, locale),
      textAlt: txOther(r.description, locale),
    });
  }
  for (const g of getGlossary()) {
    entries.push({
      type: "glossary",
      href: `/resources/glossary`,
      title: locale === "en" ? `${g.en} (${g.pa})` : `${g.pa} (${g.en})`,
      alt: locale === "en" ? g.pa : g.en,
      text: tx(g.definition, locale),
      textAlt: txOther(g.definition, locale),
    });
  }
  return entries;
}
