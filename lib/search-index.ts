import { getCategories, getCategory, getCrops, getGlossary, getMaterials, getResources, getTopics, materialHref } from "./content";
import { tx, txOther } from "./text";

export type SearchEntry = {
  type: "material" | "section" | "crop" | "topic" | "resource" | "glossary";
  href: string;
  title: string;
  alt: string;
  text: string;
  textAlt: string;
};

/** Everything searchable, in both languages (so English words also find Punjabi pages and vice versa). */
export function buildSearchIndex(locale: string): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const m of getMaterials()) {
    const c = getCategory(m.category)!;
    entries.push({
      type: "material",
      href: materialHref(m),
      title: tx(m.title, locale),
      alt: `${txOther(m.title, locale)} ${tx(c.name, locale)} ${txOther(c.name, locale)}`,
      text: tx(m.description, locale),
      textAlt: txOther(m.description, locale),
    });
  }
  for (const c of getCategories()) {
    entries.push({
      type: "section",
      href: `/${c.id}`,
      title: tx(c.name, locale),
      alt: txOther(c.name, locale),
      text: tx(c.short, locale),
      textAlt: txOther(c.short, locale),
    });
  }
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
  for (const r of getResources()) {
    entries.push({
      type: "resource",
      href: `/resources/research`,
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
