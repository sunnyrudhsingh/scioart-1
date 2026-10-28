import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Clock, Download, Target, Users } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CropIcon } from "@/components/illustrations/CropIcon";
import { OperationIcon } from "@/components/illustrations/FieldIcons";
import { DownloadAll } from "@/components/content/DownloadAll";
import { LearnCard } from "@/components/content/LearnCard";
import { SampleBanner } from "@/components/content/SampleBanner";
import { ShareButton } from "@/components/content/ShareButton";
import { kitPartIcons } from "@/components/content/kitParts";
import { getAudience, getCrop, getKit, getKits, getLearnItem, getOperation } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getKits().map((k) => ({ locale, kit: k.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/extension/[kit]">): Promise<Metadata> {
  const { locale, kit: slug } = await params;
  const kit = getKit(slug);
  if (!kit) return {};
  return buildMetadata({
    locale,
    path: `/extension/${slug}`,
    title: tx(kit.title, locale),
    description: tx(kit.summary, locale),
    og: "extension",
  });
}

export default async function KitPage({ params }: PageProps<"/[locale]/extension/[kit]">) {
  const locale = await pageLocale(params);
  const { kit: slug } = await params;
  const kit = getKit(slug);
  if (!kit) notFound();

  const t = await getTranslations("extension");
  const tc = await getTranslations("common");
  const crop = getCrop(kit.crop);
  const op = getOperation(kit.operation);
  const activity = getLearnItem(kit.activity);
  const title = tx(kit.title, locale);

  return (
    <PageShell>
      <div className="container-x" data-season={crop?.season}>
        <Breadcrumbs locale={locale} items={[{ href: "/extension", label: t("title") }, { label: title }]} />

        <header className="grid gap-8 pt-6 pb-8 sm:pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                <CropIcon name={crop?.illustration ?? "wheat"} className="size-9" />
              </span>
              <span className="grid size-14 place-items-center rounded-2xl bg-surface-2 text-primary">
                <OperationIcon name={op?.icon ?? "crop-care"} className="size-9" />
              </span>
            </div>
            <h1 className="t-h1 mt-5 max-w-3xl">{title}</h1>
            <p className="t-lead mt-3 max-w-2xl">{tx(kit.summary, locale)}</p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-primary" aria-hidden="true" />
                <dt className="t-small text-muted">{t("duration")}:</dt>
                <dd className="font-semibold">{tx(kit.duration, locale)}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-5 text-primary" aria-hidden="true" />
                <dt className="t-small text-muted">{t("audience")}:</dt>
                <dd className="font-semibold">{kit.audience.map((a) => tx(getAudience(a)!.name, locale)).join(", ")}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <DownloadAll
              name={`scioart-${kit.slug}`}
              files={kit.files.map((f) => ({ path: f.path, filename: f.path.split("/").pop()! }))}
            />
            <ShareButton title={title} />
          </div>
        </header>

        {kit.sample && <SampleBanner text={tc("sampleItem")} />}

        <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <section aria-labelledby="contents">
            <h2 id="contents" className="t-h2 mb-5">
              {t("contents")}
            </h2>
            <ol className="grid gap-3">
              {kit.files.map((f, i) => {
                const Icon = kitPartIcons[f.kind];
                return (
                  <li
                    key={f.kind}
                    className="flex items-center gap-4 rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line"
                    data-reveal
                    style={{ ["--i" as string]: i }}
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{tx(f.title, locale)}</span>
                      <span className="t-small text-muted" lang="en">
                        PDF
                      </span>
                    </span>
                    <a
                      href={f.path}
                      download
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 font-semibold hover:border-primary hover:text-primary"
                    >
                      <Download className="size-4" aria-hidden="true" />
                      <span>{tc("download")}</span>
                      <span className="sr-only">{tx(f.title, locale)}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </section>

          <div className="space-y-8">
            <section aria-labelledby="objectives" className="rounded-[var(--radius-card)] bg-surface-2 p-6">
              <h2 id="objectives" className="t-h3 flex items-center gap-2">
                <Target className="size-5 text-primary" aria-hidden="true" />
                {t("objectives")}
              </h2>
              <ul className="mt-4 space-y-2">
                {kit.objectives.map((o, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-accent" />
                    {tx(o, locale)}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="howto" className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
              <h2 id="howto" className="t-h3">
                {t("howTo")}
              </h2>
              <ol className="mt-4 space-y-3">
                {(["howTo1", "howTo2", "howTo3", "howTo4"] as const).map((k, i) => (
                  <li key={k} className="flex gap-3">
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-on-primary"
                      lang="en"
                    >
                      {i + 1}
                    </span>
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ol>
              <p className="t-small mt-4 text-muted">{t("measure")}</p>
            </section>

            {op && crop && (
              <Link href={`/crops/${crop.slug}/${op.slug}`} className="link inline-block font-semibold">
                {t("openChapter")}: {tx(op.name, locale)} — {tx(crop.name, locale)}
              </Link>
            )}
          </div>
        </div>

        {activity && (
          <section aria-labelledby="activity" className="py-8">
            <h2 id="activity" className="t-h3 mb-4">
              {t("activity")}
            </h2>
            <div className="max-w-md">
              <LearnCard item={activity} locale={locale} />
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
