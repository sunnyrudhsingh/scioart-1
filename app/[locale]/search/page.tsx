import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { SearchClient } from "@/components/content/SearchClient";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/search">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "search" });
  return buildMetadata({ locale, path: "/search", title: t("metaTitle"), description: t("metaDescription"), og: "default" });
}

export default async function SearchPage({ params }: PageProps<"/[locale]/search">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("search");

  return (
    <PageShell>
      <div className="container-x max-w-4xl">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} className="pb-6 sm:pb-8" />
        <Suspense fallback={<div className="skeleton h-16 rounded-full" />}>
          <SearchClient />
        </Suspense>
      </div>
    </PageShell>
  );
}
