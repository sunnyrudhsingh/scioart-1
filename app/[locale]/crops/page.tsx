import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { CropCard } from "@/components/content/CropCard";
import { CropsBrowser } from "@/components/content/CropsBrowser";
import { getCropGroups, getCrops, getGuidesForCrop, getSeasons } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/crops">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "crops" });
  return buildMetadata({ locale, path: "/crops", title: t("metaTitle"), description: t("metaDescription"), og: "crops" });
}

export default async function CropsPage({ params }: PageProps<"/[locale]/crops">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("crops");
  const crops = getCrops();

  const cards = Object.fromEntries(
    crops.map((c, i) => [
      c.slug,
      <CropCard key={c.slug} crop={c} locale={locale} index={i} morph meta={t("readyCount", { count: getGuidesForCrop(c.slug).length })} />,
    ]),
  );

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <CropsBrowser
          seasons={getSeasons().map((s) => ({ id: s.id, label: tx(s.name, locale) }))}
          groups={getCropGroups().map((g) => ({ id: g.id, season: g.season, label: tx(g.name, locale) }))}
          crops={crops.map((c) => ({ slug: c.slug, season: c.season, group: c.group, en: c.name.en, pa: c.name.pa }))}
          cards={cards}
        />
      </div>
    </PageShell>
  );
}
