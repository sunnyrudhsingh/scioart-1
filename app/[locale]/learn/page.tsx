import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { LearnCard } from "@/components/content/LearnCard";
import { LearnBrowser } from "@/components/content/LearnBrowser";
import { getAudiences, getCrops, getFormats, getLearnItems, getTopics } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/learn">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "learn" });
  return buildMetadata({ locale, path: "/learn", title: t("metaTitle"), description: t("metaDescription"), og: "learn" });
}

export default async function LearnPage({ params }: PageProps<"/[locale]/learn">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("learn");
  const items = getLearnItems();
  const usedCrops = new Set(items.flatMap((i) => i.crops));
  const usedTopics = new Set(items.flatMap((i) => i.topics));

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <LearnBrowser
          items={items.map((i) => ({
            slug: i.slug,
            format: i.format,
            crops: i.crops,
            topics: i.topics,
            audience: i.audience,
            languages: i.languages,
            large: i.featured && (i.format === "game" || i.format === "emodule"),
          }))}
          cards={Object.fromEntries(
            items.map((i) => [
              i.slug,
              <LearnCard key={i.slug} item={i} locale={locale} large={i.featured && (i.format === "game" || i.format === "emodule")} />,
            ]),
          )}
          formats={getFormats().map((f) => ({ id: f.id, label: tx(f.plural, locale) }))}
          crops={getCrops()
            .filter((c) => usedCrops.has(c.slug))
            .map((c) => ({ id: c.slug, label: tx(c.name, locale) }))}
          topics={getTopics()
            .filter((x) => usedTopics.has(x.slug))
            .map((x) => ({ id: x.slug, label: tx(x.name, locale) }))}
          audiences={getAudiences().map((a) => ({ id: a.id, label: tx(a.name, locale) }))}
          languages={[
            { id: "pa", label: t("langPa") },
            { id: "en", label: t("langEn") },
          ]}
        />
      </div>
    </PageShell>
  );
}
