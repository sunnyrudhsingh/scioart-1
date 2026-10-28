import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Download, FileText } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { getResources } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/resources/leaflets">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "resources" });
  return buildMetadata({ locale, path: "/resources/leaflets", title: t("leafletsTitle"), description: t("leafletsLead"), og: "resources" });
}

export default async function LeafletsPage({ params }: PageProps<"/[locale]/resources/leaflets">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("resources");
  const tc = await getTranslations("common");

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ href: "/resources", label: t("title") }, { label: t("leafletsTitle") }]} />
        <PageHeader title={t("leafletsTitle")} lead={t("leafletsLead")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getResources("leaflet").map((r, i) => (
            <li
              key={r.slug}
              data-reveal
              style={{ ["--i" as string]: i }}
              className="flex flex-col rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-primary">
                  <FileText className="size-6" aria-hidden="true" />
                </span>
                {r.sample && <span className="sample-badge">{tc("sample")}</span>}
              </div>
              <h2 className="mt-4 font-display text-[1.2rem] leading-snug font-semibold">{tx(r.title, locale)}</h2>
              <p className="t-small mt-2 text-muted">{tx(r.description, locale)}</p>
              <div className="mt-auto pt-5">
                {r.file ? (
                  <a
                    href={r.file}
                    download
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-semibold hover:border-primary hover:text-primary"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {tc("download")}
                  </a>
                ) : (
                  <span className="t-small text-muted">{tc("fileComingSoon")}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
