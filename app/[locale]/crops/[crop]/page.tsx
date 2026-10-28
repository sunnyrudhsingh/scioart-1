import { Suspense, ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SmartImage } from "@/components/ui/SmartImage";
import { CropIcon } from "@/components/illustrations/CropIcon";
import { OperationIcon, TopicIcon } from "@/components/illustrations/FieldIcons";
import { CropEditionView } from "@/components/content/CropEditionView";
import { LearnCard } from "@/components/content/LearnCard";
import { KitCard } from "@/components/content/KitCard";
import { SourceBox } from "@/components/content/SourceBox";
import { SampleBanner } from "@/components/content/SampleBanner";
import {
  getCrop,
  getCropEditions,
  getCropGroups,
  getCrops,
  getGuidesForCrop,
  getKits,
  getLearnItems,
  getOperations,
  getPublication,
  getSeason,
  getTopic,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx, txOther } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getCrops().map((c) => ({ locale, crop: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/crops/[crop]">): Promise<Metadata> {
  const { locale, crop: slug } = await params;
  const crop = getCrop(slug);
  if (!crop) return {};
  const t = await getTranslations({ locale: locale as Locale, namespace: "crops" });
  return buildMetadata({
    locale,
    path: `/crops/${slug}`,
    title: tx(crop.name, locale),
    description: `${tx(crop.description, locale)} ${t("operationsLead")}`,
    og: `crop:${slug}`,
  });
}

export default async function CropPage({ params }: PageProps<"/[locale]/crops/[crop]">) {
  const locale = await pageLocale(params);
  const { crop: slug } = await params;
  const crop = getCrop(slug);
  if (!crop) notFound();

  const t = await getTranslations("crops");
  const tc = await getTranslations("common");
  const season = getSeason(crop.season);
  const group = getCropGroups().find((g) => g.id === crop.group);
  const publication = getPublication(crop.publication)!;
  const editions = getCropEditions(slug);
  const latestGuides = getGuidesForCrop(slug);
  const ops = getOperations(slug);
  const editionGuides = Object.fromEntries(editions.map((e) => [e.id, getGuidesForCrop(slug, e.id).map((g) => g.operation)]));
  const latest = editions.find((e) => e.isLatest);
  const learn = getLearnItems({ crop: slug });
  const kits = getKits({ crop: slug });
  const topics = crop.topics.map((s) => getTopic(s)).filter((x) => !!x);

  return (
    <PageShell>
      <div data-season={crop.season}>
        <div className="container-x">
          <Breadcrumbs locale={locale} items={[{ href: "/crops", label: t("title") }, { label: tx(crop.name, locale) }]} />

          {/* Hero */}
          <header className="grid items-center gap-8 pt-6 pb-12 md:grid-cols-[1.1fr_1fr] md:pt-10">
            <div className="order-2 md:order-1">
              <div className="mb-4 flex flex-wrap gap-2">
                {season && <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-ink">{tx(season.name, locale)}</span>}
                {group && group.id !== crop.season && (
                  <span className="rounded-full bg-surface-2 px-3 py-1 text-sm font-semibold">{tx(group.name, locale)}</span>
                )}
              </div>
              <h1 className="t-h1">{tx(crop.name, locale)}</h1>
              <p className="mt-1 text-xl text-muted" lang={locale === "en" ? "pa" : "en"}>
                {txOther(crop.name, locale)}
              </p>
              <p className="t-lead mt-5 max-w-xl">{tx(crop.description, locale)}</p>

              <section aria-labelledby="facts" className="mt-8 rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line">
                <div className="flex items-center justify-between gap-3">
                  <h2 id="facts" className="font-bold">
                    {t("quickFacts")}
                  </h2>
                  <span className="sample-badge">{tc("sample")}</span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
                  {crop.quickFacts.map((f, i) => (
                    <div key={i}>
                      <dt className="t-small text-muted">{tx(f.label, locale)}</dt>
                      <dd className="font-semibold">{tx(f.value, locale)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
            <ViewTransition name={`crop-art-${crop.slug}`} share="morph" default="none">
              <div className="order-1 md:order-2">
                <SmartImage
                  src={crop.image}
                  alt=""
                  priority
                  className="aspect-[16/10] w-full md:aspect-[5/4]"
                  rounded="rounded-[var(--radius-section)]"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  fallback={<CropIcon name={crop.illustration} className="size-[62%]" strokeWidth={1.3} />}
                />
              </div>
            </ViewTransition>
          </header>

          {latestGuides.some((g) => g.sample) && <SampleBanner />}

          {/* Operations */}
          <section aria-labelledby="ops-title" className="py-8">
            <Suspense
              fallback={
                <h2 id="ops-title" className="t-h2">
                  {t("operationsTitle")}
                </h2>
              }
            >
              <CropEditionView
                crop={crop.slug}
                editions={editions.map((e) => ({ id: e.id, label: e.label, isLatest: e.isLatest }))}
                ops={ops.map((o) => ({
                  slug: o.slug,
                  name: o.name,
                  short: o.short,
                  readyIn: Object.entries(editionGuides)
                    .filter(([, list]) => list.includes(o.slug))
                    .map(([id]) => id),
                }))}
                icons={Object.fromEntries(ops.map((o) => [o.slug, <OperationIcon key={o.slug} name={o.icon} className="size-9" />]))}
              />
            </Suspense>
          </section>

          {/* Related topics */}
          {topics.length > 0 && (
            <section aria-labelledby="rel-topics" className="py-8">
              <h2 id="rel-topics" className="t-h3 mb-4">
                {t("relatedTopics")}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {topics.map((tp) => (
                  <li key={tp.slug}>
                    <Link
                      href={`/topics/${tp.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-4 font-semibold ring-1 ring-line hover:ring-primary"
                    >
                      <TopicIcon name={tp.icon} className="size-6 text-primary" />
                      {tx(tp.name, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {learn.length > 0 && (
            <section aria-labelledby="rel-learn" className="py-8">
              <h2 id="rel-learn" className="t-h3 mb-4">
                {t("relatedLearn")}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {learn.slice(0, 6).map((item, i) => (
                  <li key={item.slug}>
                    <LearnCard item={item} locale={locale} index={i} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {kits.length > 0 && (
            <section aria-labelledby="rel-kits" className="py-8">
              <h2 id="rel-kits" className="t-h3 mb-4">
                {t("relatedKits")}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kits.map((k, i) => (
                  <li key={k.slug}>
                    <KitCard kit={k} locale={locale} index={i} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="py-8">
            <SourceBox
              locale={locale}
              publication={publication.title}
              publisher={publication.publisher}
              edition={latest?.label}
              lastReviewed={latestGuides[0]?.lastReviewed}
              reviewer={latestGuides[0]?.reviewer}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
