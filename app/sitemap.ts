import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCategories, getCrops, getMaterials, getTopics, materialHref } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/library",
    ...getCategories().map((c) => `/${c.id}`),
    "/crops",
    "/topics",
    "/resources",
    "/resources/glossary",
    "/resources/research",
    "/search",
    "/about",
    "/privacy",
    ...getMaterials().map((m) => materialHref(m)),
    ...getCrops().map((c) => `/crops/${c.slug}`),
    ...getTopics().map((t) => `/topics/${t.slug}`),
  ];

  const now = new Date();
  return paths.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${p}`,
      lastModified: now,
      changeFrequency: p === "/live" ? ("daily" as const) : ("weekly" as const),
      priority: p === "" ? 1 : p.split("/").length <= 2 ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${p}`])),
      },
    })),
  );
}
