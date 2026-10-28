import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { CalendarView } from "@/components/content/CalendarView";
import { getCalendar, getCrops, getOperation } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/calendar">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "calendar" });
  return buildMetadata({ locale, path: "/calendar", title: t("metaTitle"), description: t("metaDescription"), og: "calendar" });
}

export default async function CalendarPage({ params }: PageProps<"/[locale]/calendar">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("calendar");

  const crops = getCrops()
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      season: c.season,
      tasks: getCalendar(c.slug).map((task) => ({
        operation: task.operation,
        operationName: getOperation(task.operation)!.name,
        weekStart: task.weekStart,
        weekEnd: task.weekEnd,
        title: task.title,
        description: task.description,
      })),
    }))
    // Crops with a calendar first.
    .sort((a, b) => Number(b.tasks.length > 0) - Number(a.tasks.length > 0));

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <Suspense fallback={<div className="skeleton h-40" />}>
          <CalendarView crops={crops} />
        </Suspense>
      </div>
    </PageShell>
  );
}
