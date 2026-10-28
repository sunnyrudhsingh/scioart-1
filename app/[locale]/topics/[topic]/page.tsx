import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TopicIcon, OperationIcon } from "@/components/illustrations/FieldIcons";
import { CropIcon } from "@/components/illustrations/CropIcon";
import { LearnCard } from "@/components/content/LearnCard";
import { KitCard } from "@/components/content/KitCard";
import { AdvisoryCard } from "@/components/content/AdvisoryCard";
import { SampleBanner } from "@/components/content/SampleBanner";
import {
  getAdvisories,
  getCrop,
  getKits,
  getLearnItems,
  getOperation,
  getOperationGuide,
  getResources,
  getTopic,
  getTopics,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx, txOther } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getTopics().map((t) => ({ locale, topic: t.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/topics/[topic]">): Promise<Metadata> {
  const { locale, topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return buildMetadata({
    locale,
    path: `/topics/${slug}`,
    title: tx(topic.name, locale),
    description: tx(topic.short, locale),
    og: "topics",
  });
}

export default async function TopicPage({ params }: PageProps<"/[locale]/topics/[topic]">) {
  const locale = await pageLocale(params);
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const t = await getTranslations("topics");
  const tc = await getTranslations("common");
  const tCrops = await getTranslations("crops");
  const learn = getLearnItems({ topic: slug });
  const kits = getKits({ topic: slug });
  const cropSlugs = new Set(topic.links.map((x) => x.crop));
  const advisories = getAdvisories()
    .filter((a) => a.crops.some((c) => cropSlugs.has(c)))
    .slice(0, 3);
  const resources = getResources().filter((r) => r.topics.includes(slug));

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ href: "/topics", label: t("title") }, { label: tx(topic.name, locale) }]} />

        <header className="furrows relative mt-6 overflow-hidden rounded-[var(--radius-section)] bg-surface-2 px-6 py-10 sm:px-10 sm:py-14">
          <TopicIcon name={topic.icon} className="absolute -end-8 -bottom-10 size-64 text-primary opacity-15" />
          <span className="shadow-soft grid size-16 place-items-center rounded-full bg-surface text-primary">
            <TopicIcon name={topic.icon} className="size-10" />
          </span>
          <h1 className="t-h1 mt-5 max-w-3xl">{tx(topic.name, locale)}</h1>
          <p className="mt-1 text-lg text-muted" lang={locale === "en" ? "pa" : "en"}>
            {txOther(topic.name, locale)}
          </p>
          <p className="t-lead mt-4 max-w-2xl">{tx(topic.short, locale)}</p>
        </header>

        <section aria-labelledby="overview" className="py-10">
          <h2 id="overview" className="t-h2 mb-4">
            {t("overview")}
          </h2>
          <SampleBanner />
          <div className="prose-x space-y-4 text-[1.08rem]">
            {topic.overview.map((p, i) => (
              <p key={i}>{tx(p, locale)}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="in-crops" className="py-8">
          <h2 id="in-crops" className="t-h2">
            {t("inCrops")}
          </h2>
          <p className="mt-2 mb-6 text-muted">{t("inCropsLead")}</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topic.links.map((lnk) => {
              const crop = getCrop(lnk.crop);
              const op = getOperation(lnk.operation);
              if (!crop || !op) return null;
              const ready = Boolean(getOperationGuide(lnk.crop, lnk.operation));
              return (
                <li key={`${lnk.crop}-${lnk.operation}`}>
                  <Link
                    href={`/crops/${crop.slug}/${op.slug}`}
                    data-season={crop.season}
                    className="pressable lift shadow-soft flex items-center gap-3 rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                      <CropIcon name={crop.illustration} className="size-8" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{tx(crop.name, locale)}</span>
                      <span className="t-small flex items-center gap-1.5 text-muted">
                        <OperationIcon name={op.icon} className="size-4" />
                        {tx(op.name, locale)}
                      </span>
                    </span>
                    <span
                      className={
                        ready
                          ? "rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-on-primary"
                          : "rounded-full bg-surface-2 px-2 py-0.5 text-xs font-bold text-muted"
                      }
                    >
                      {ready ? tCrops("ready") : tCrops("soon")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {learn.length > 0 && (
          <section aria-labelledby="t-learn" className="py-8">
            <h2 id="t-learn" className="t-h3 mb-4">
              {t("relatedLearn")}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learn.map((item, i) => (
                <li key={item.slug}>
                  <LearnCard item={item} locale={locale} index={i} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {kits.length > 0 && (
          <section aria-labelledby="t-kits" className="py-8">
            <h2 id="t-kits" className="t-h3 mb-4">
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

        {advisories.length > 0 && (
          <section aria-labelledby="t-adv" className="py-8">
            <h2 id="t-adv" className="t-h3 mb-4">
              {t("relatedAdvisories")}
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {advisories.map((a, i) => (
                <li key={a.slug}>
                  <AdvisoryCard advisory={a} locale={locale} index={i} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {resources.length > 0 && (
          <section aria-labelledby="t-res" className="py-8">
            <h2 id="t-res" className="t-h3 mb-4">
              {t("relatedResources")}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {resources.map((r) => (
                <li
                  key={r.slug}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line"
                >
                  <span className="font-semibold">{tx(r.title, locale)}</span>
                  {r.file ? (
                    <a
                      href={r.file}
                      download
                      className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:underline"
                    >
                      <Download className="size-4" aria-hidden="true" />
                      {tc("download")}
                    </a>
                  ) : (
                    <Link href={`/resources/${r.type === "leaflet" ? "leaflets" : "research"}`} className="link font-semibold">
                      {tc("seeAll")}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {learn.length + kits.length === 0 && <p className="py-6 text-muted">{t("nothingYet")}</p>}
      </div>
    </PageShell>
  );
}
