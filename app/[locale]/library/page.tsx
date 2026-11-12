import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { MaterialCard } from "@/components/content/MaterialCard";
import { LibraryBrowser } from "@/components/content/LibraryBrowser";
import { CategoryGrid } from "@/components/content/CategoryGrid";
import { getCategories, getCrops, getMaterials, getTopics } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/library">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "library" });
  return buildMetadata({ locale, path: "/library", title: t("metaTitle"), description: t("metaDescription"), og: "library" });
}

export default async function LibraryPage({ params }: PageProps<"/[locale]/library">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("library");
  const items = getMaterials();
  const usedCrops = new Set(items.flatMap((i) => i.crops));
  const usedTopics = new Set(items.flatMap((i) => i.topics));

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <section aria-labelledby="sections-title" className="mb-14">
          <h2 id="sections-title" className="t-h2 mb-5">
            {t("sectionsTitle")}
          </h2>
          <CategoryGrid locale={locale} />
        </section>
        <h2 className="t-h2 mb-5">{t("allTitle")}</h2>
        <LibraryBrowser
          items={items.map((i) => ({
            slug: i.slug,
            category: i.category,
            crops: i.crops,
            topics: i.topics,
            languages: i.languages,
            large: false,
          }))}
          cards={Object.fromEntries(items.map((i) => [i.slug, <MaterialCard key={i.slug} item={i} locale={locale} />]))}
          categories={getCategories().map((c) => ({ id: c.id, label: tx(c.name, locale) }))}
          crops={getCrops()
            .filter((c) => usedCrops.has(c.slug))
            .map((c) => ({ id: c.slug, label: tx(c.name, locale) }))}
          topics={getTopics()
            .filter((x) => usedTopics.has(x.slug))
            .map((x) => ({ id: x.slug, label: tx(x.name, locale) }))}
          languages={[
            { id: "pa", label: t("langPa") },
            { id: "en", label: t("langEn") },
          ]}
        />
      </div>
    </PageShell>
  );
}
