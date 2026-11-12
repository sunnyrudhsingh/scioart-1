import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BookA, Microscope } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/resources">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "resources" });
  return buildMetadata({ locale, path: "/resources", title: t("metaTitle"), description: t("metaDescription"), og: "resources" });
}

const sections = [
  { id: "glossary", Icon: BookA },
  { id: "research", Icon: Microscope },
] as const;

export default async function ResourcesPage({ params }: PageProps<"/[locale]/resources">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("resources");

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ id, Icon }, i) => {
            return (
              <li key={id}>
                <Link
                  href={`/resources/${id}`}
                  data-reveal
                  style={{ ["--i" as string]: i }}
                  className="group pressable lift shadow-soft flex h-full items-start gap-5 rounded-[var(--radius-section)] bg-surface p-6 ring-1 ring-line sm:p-8"
                >
                  <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent-soft text-primary">
                    <Icon className="size-8" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="t-h3 block">{t(`${id}Title`)}</span>
                    <span className="mt-2 block text-muted">{t(`${id}Lead`)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
