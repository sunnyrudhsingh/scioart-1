import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ExternalLink, Microscope } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { getResources } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/resources/research">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "resources" });
  return buildMetadata({ locale, path: "/resources/research", title: t("researchTitle"), description: t("researchLead"), og: "resources" });
}

export default async function ResearchPage({ params }: PageProps<"/[locale]/resources/research">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("resources");
  const tc = await getTranslations("common");

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ href: "/resources", label: t("title") }, { label: t("researchTitle") }]} />
        <PageHeader title={t("researchTitle")} lead={t("researchLead")} />
        <ul className="grid gap-4 md:grid-cols-2">
          {getResources("research").map((r, i) => (
            <li key={r.slug} data-reveal style={{ ["--i" as string]: i }}>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-primary">
                    <Microscope className="size-6" aria-hidden="true" />
                  </span>
                  {r.sample && <span className="sample-badge">{tc("sample")}</span>}
                </div>
                <h2 className="mt-4 font-display text-[1.3rem] leading-snug font-semibold">{tx(r.title, locale)}</h2>
                <dl className="t-small mt-2 flex flex-wrap gap-x-5 text-muted">
                  {r.authors && (
                    <div className="flex gap-1">
                      <dt>{t("authors")}:</dt>
                      <dd>{tx(r.authors, locale)}</dd>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <dt>{t("year")}:</dt>
                    <dd lang="en">{r.year}</dd>
                  </div>
                </dl>
                <p className="mt-4">{tx(r.description, locale)}</p>
                {r.link && (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-auto inline-flex items-center gap-1.5 pt-4 font-semibold"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    {tc("source")}
                    <span className="sr-only">{tc("opensInNewTab")}</span>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
