import { ViewTransition } from "react";
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
import { TopicIcon } from "@/components/illustrations/FieldIcons";
import { MaterialCard } from "@/components/content/MaterialCard";
import { getCrop, getCropGroups, getCrops, getMaterials, getSeason, getTopic } from "@/lib/content";
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
    description: `${tx(crop.description, locale)} ${t("materialsLead")}`,
    og: `crop:${slug}`,
  });
}

export default async function CropPage({ params }: PageProps<"/[locale]/crops/[crop]">) {
  const locale = await pageLocale(params);
  const { crop: slug } = await params;
  const crop = getCrop(slug);
  if (!crop) notFound();

  const t = await getTranslations("crops");
  const season = getSeason(crop.season);
  const group = getCropGroups().find((g) => g.id === crop.group);
  const items = getMaterials({ crop: slug });
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

          {/* Materials about this crop */}
          <section aria-labelledby="materials-title" className="py-8">
            <h2 id="materials-title" className="t-h2 mb-2">
              {t("materialsTitle")}
            </h2>
            <p className="mb-6 text-muted">{t("materialsLead")}</p>
            {items.length === 0 ? (
              <p className="rounded-2xl bg-surface-2 p-6 text-lg">{t("noMaterials")}</p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <li key={item.slug}>
                    <MaterialCard item={item} locale={locale} index={i} />
                  </li>
                ))}
              </ul>
            )}
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
        </div>
      </div>
    </PageShell>
  );
}
