import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { getEditions, getPublications } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";
import { cn } from "@/lib/cn";

export async function generateMetadata({ params }: PageProps<"/[locale]/resources/editions">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "resources" });
  return buildMetadata({ locale, path: "/resources/editions", title: t("editionsTitle"), description: t("editionsLead"), og: "resources" });
}

export default async function EditionsPage({ params }: PageProps<"/[locale]/resources/editions">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("resources");
  const tc = await getTranslations("common");

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ href: "/resources", label: t("title") }, { label: t("editionsTitle") }]} />
        <PageHeader title={t("editionsTitle")} lead={t("editionsLead")} />
        <div className="space-y-10">
          {getPublications().map((p) => (
            <section key={p.id} aria-labelledby={`pub-${p.id}`}>
              <h2 id={`pub-${p.id}`} className="t-h3">
                {tx(p.title, locale)}
              </h2>
              <p className="t-small mb-4 text-muted">{tx(p.publisher, locale)}</p>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {getEditions(p.id).map((e) => (
                  <li
                    key={e.id}
                    className={cn(
                      "flex flex-col gap-2 rounded-[var(--radius-card)] p-4 ring-1",
                      e.isLatest ? "bg-accent-soft ring-2 ring-primary" : "bg-surface ring-line",
                    )}
                  >
                    <span className="font-display text-xl font-semibold">{tx(e.label, locale)}</span>
                    <span
                      className={cn(
                        "w-fit rounded-full px-2.5 py-0.5 text-xs font-bold",
                        e.isLatest ? "bg-primary text-on-primary" : "bg-surface-2 text-muted",
                      )}
                    >
                      {e.isLatest ? t("current") : t("superseded")}
                    </span>
                    {e.file ? (
                      <a
                        href={e.file}
                        download
                        className="mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:underline"
                      >
                        <Download className="size-4" aria-hidden="true" />
                        {tc("download")}
                      </a>
                    ) : (
                      <span className="t-small mt-auto text-muted">{t("pdfSoon")}</span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
