import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAdvisories, getAudiences, getCrops, getKits, getLearnItems, getTopics } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/crops",
    "/topics",
    "/calendar",
    "/learn",
    "/extension",
    "/advisories",
    "/resources",
    "/resources/editions",
    "/resources/leaflets",
    "/resources/glossary",
    "/resources/research",
    "/search",
    "/ask",
    "/about",
    "/privacy",
    ...getAudiences().map((a) => `/for/${a.id}`),
    ...getCrops().flatMap((c) => [`/crops/${c.slug}`, ...c.operations.map((o) => `/crops/${c.slug}/${o}`)]),
    ...getTopics().map((t) => `/topics/${t.slug}`),
    ...getLearnItems().map((i) => `/learn/${i.slug}`),
    ...getKits().map((k) => `/extension/${k.slug}`),
    ...getAdvisories().map((a) => `/advisories/${a.slug}`),
  ];

  const now = new Date();
  return paths.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${p}`,
      lastModified: now,
      changeFrequency: p.startsWith("/advisories") ? ("daily" as const) : ("weekly" as const),
      priority: p === "" ? 1 : p.split("/").length <= 2 ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${p}`])),
      },
    })),
  );
}
