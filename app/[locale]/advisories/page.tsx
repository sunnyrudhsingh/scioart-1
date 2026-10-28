import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { AdvisoryCard } from "@/components/content/AdvisoryCard";
import { AdvisoriesBrowser } from "@/components/content/AdvisoriesBrowser";
import { getAdvisories, getAdvisoryTypes, getCrops, getDistricts } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/advisories">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "advisories" });
  return buildMetadata({ locale, path: "/advisories", title: t("metaTitle"), description: t("metaDescription"), og: "advisories" });
}

export default async function AdvisoriesPage({ params }: PageProps<"/[locale]/advisories">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("advisories");
  const advisories = getAdvisories();
  const used = new Set(advisories.flatMap((a) => a.crops));

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <AdvisoriesBrowser
          advisories={advisories.map((a) => ({
            slug: a.slug,
            type: a.type,
            crops: a.crops,
            districts: a.districts,
            issuedOn: a.issuedOn,
            validUntil: a.validUntil,
          }))}
          cards={Object.fromEntries(advisories.map((a) => [a.slug, <AdvisoryCard key={a.slug} advisory={a} locale={locale} />]))}
          types={getAdvisoryTypes().map((x) => ({ id: x.id, label: tx(x.name, locale) }))}
          crops={getCrops()
            .filter((c) => used.has(c.slug))
            .map((c) => ({ id: c.slug, label: tx(c.name, locale) }))}
          districts={getDistricts().map((d) => ({ id: d.slug, label: tx(d.name, locale) }))}
        />
      </div>
    </PageShell>
  );
}
