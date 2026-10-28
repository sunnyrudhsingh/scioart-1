import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { GlossaryClient } from "@/components/content/GlossaryClient";
import { getGlossary } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/resources/glossary">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "resources" });
  return buildMetadata({ locale, path: "/resources/glossary", title: t("glossaryTitle"), description: t("glossaryLead"), og: "resources" });
}

export default async function GlossaryPage({ params }: PageProps<"/[locale]/resources/glossary">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("resources");

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ href: "/resources", label: t("title") }, { label: t("glossaryTitle") }]} />
        <PageHeader title={t("glossaryTitle")} lead={t("glossaryLead")} />
        <GlossaryClient terms={getGlossary()} />
      </div>
    </PageShell>
  );
}
