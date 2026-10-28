import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { AskForm } from "@/components/content/AskForm";
import { OperationIcon } from "@/components/illustrations/FieldIcons";
import { getCrops, getDistricts, getOperations } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/ask">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ask" });
  return buildMetadata({ locale, path: "/ask", title: t("metaTitle"), description: t("metaDescription"), og: "ask" });
}

export default async function AskPage({ params }: PageProps<"/[locale]/ask">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("ask");

  const crops = getCrops().map((c) => ({
    slug: c.slug,
    name: c.name,
    operations: getOperations(c.slug).map((o) => ({ slug: o.slug, name: o.name })),
  }));
  const districts = getDistricts().map((d) => ({ slug: d.slug, name: d.name }));

  return (
    <PageShell>
      <div className="container-x max-w-4xl">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <div className="relative">
          <OperationIcon name="diseases" className="absolute end-0 top-6 hidden size-28 text-leaf opacity-40 sm:block" />
          <PageHeader title={t("title")} lead={t("lead")} />
        </div>
        <Suspense fallback={<div className="skeleton h-[32rem]" />}>
          <AskForm crops={crops} districts={districts} />
        </Suspense>
      </div>
    </PageShell>
  );
}
