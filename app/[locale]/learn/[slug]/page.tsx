import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Clock, Download, ExternalLink, Languages, Users } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AudioPlayer } from "@/components/content/AudioPlayer";
import { LiteYouTube } from "@/components/content/LiteYouTube";
import { EModuleViewer } from "@/components/content/EModuleViewer";
import { QuizPlayer } from "@/components/content/QuizPlayer";
import { LearnCard } from "@/components/content/LearnCard";
import { SampleBanner } from "@/components/content/SampleBanner";
import { ShareButton } from "@/components/content/ShareButton";
import { formatIcon } from "@/components/content/formatIcons";
import { getAudience, getCrop, getFormat, getLearnItem, getLearnItems } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { SITE_URL } from "@/lib/site";
import { tx } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getLearnItems().map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/learn/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getLearnItem(slug);
  if (!item) return {};
  return buildMetadata({
    locale,
    path: `/learn/${slug}`,
    title: tx(item.title, locale),
    description: tx(item.description, locale),
    og: `learn:${item.format}`,
  });
}

export default async function LearnItemPage({ params }: PageProps<"/[locale]/learn/[slug]">) {
  const locale = await pageLocale(params);
  const { slug } = await params;
  const item = getLearnItem(slug);
  if (!item) notFound();

  const t = await getTranslations("learn");
  const tc = await getTranslations("common");
  const Icon = formatIcon[item.format];
  const format = getFormat(item.format);
  const title = tx(item.title, locale);
  const firstCrop = item.crops[0] ? getCrop(item.crops[0]) : undefined;
  const related = getLearnItems()
    .filter((x) => x.slug !== item.slug && (x.topics.some((tp) => item.topics.includes(tp)) || x.format === item.format))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: title,
    description: tx(item.description, locale),
    inLanguage: item.languages,
    learningResourceType: item.format,
    url: `${SITE_URL}/${locale}/learn/${item.slug}`,
    provider: { "@type": "Organization", name: "SciOArt", url: SITE_URL },
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x" data-season={firstCrop?.season}>
        <Breadcrumbs locale={locale} items={[{ href: "/learn", label: t("title") }, { label: title }]} />

        <header className="pt-6 pb-8 sm:pt-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent-ink">
            <Icon className="size-4" aria-hidden="true" />
            {format ? tx(format.name, locale) : item.format}
          </span>
          <h1 className="t-h1 mt-4 max-w-3xl">{title}</h1>
          <p className="t-lead mt-3 max-w-2xl">{tx(item.description, locale)}</p>
          <dl className="t-small mt-6 flex flex-wrap gap-x-6 gap-y-2 text-muted">
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              <dt className="sr-only">{t("duration")}</dt>
              <dd>{tx(item.duration, locale)}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="size-4" aria-hidden="true" />
              <dt className="sr-only">{t("for")}</dt>
              <dd>{item.audience.map((a) => (getAudience(a) ? tx(getAudience(a)!.name, locale) : a)).join(", ")}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Languages className="size-4" aria-hidden="true" />
              <dt className="sr-only">{t("languages")}</dt>
              <dd>{item.languages.map((l) => (l === "pa" ? t("langPa") : t("langEn"))).join(", ")}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <ShareButton title={title} />
          </div>
        </header>

        {item.sample && <SampleBanner text={tc("sampleItem")} />}

        <div className="grid gap-10 py-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            {/* Audio: songs, jingles, podcasts */}
            {item.media.audio && (
              <div className="mb-8">
                <AudioPlayer src={item.media.audio} title={title} placeholder={item.sample} className="p-4" />
              </div>
            )}

            {item.lyrics && (
              <section aria-labelledby="lyrics" className="mb-10">
                <h2 id="lyrics" className="t-h2 mb-4">
                  {t("lyrics")}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <blockquote
                    lang="pa"
                    className="rounded-[var(--radius-card)] bg-surface p-6 text-[1.12rem] whitespace-pre-line ring-1 ring-line"
                  >
                    {item.lyrics.pa}
                  </blockquote>
                  <blockquote
                    lang="en"
                    className="rounded-[var(--radius-card)] bg-surface-2 p-6 text-[1.05rem] whitespace-pre-line text-muted ring-1 ring-line"
                  >
                    {item.lyrics.en}
                  </blockquote>
                </div>
              </section>
            )}

            {item.media.youtubeId && <LiteYouTube id={item.media.youtubeId} title={title} className="mb-10" />}

            {item.rules && (
              <section aria-labelledby="rules" className="mb-10">
                <h2 id="rules" className="t-h2 mb-4">
                  {t("rules")}
                </h2>
                <ol className="space-y-3">
                  {item.rules.map((r, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft font-bold text-accent-ink"
                        lang="en"
                      >
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{tx(r, locale)}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {item.media.pdf && (
              <section className="mb-10">
                <div className="flex flex-wrap gap-3">
                  <a
                    href={item.media.pdf}
                    download
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
                  >
                    <Download className="size-5" aria-hidden="true" />
                    {t("downloadGame")}
                  </a>
                  <a
                    href={item.media.pdf}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-semibold hover:border-primary"
                  >
                    <ExternalLink className="size-5" aria-hidden="true" />
                    {t("openPdf")}
                    <span className="sr-only">{tc("opensInNewTab")}</span>
                  </a>
                </div>
                <object
                  data={item.media.pdf}
                  type="application/pdf"
                  aria-label={title}
                  className="mt-6 hidden h-[34rem] w-full rounded-[var(--radius-card)] ring-1 ring-line md:block"
                >
                  <p className="p-4">
                    <a href={item.media.pdf} className="link">
                      {t("openPdf")}
                    </a>
                  </p>
                </object>
              </section>
            )}

            {item.lesson && <EModuleViewer lesson={item.lesson} quiz={item.quiz} title={title} />}
            {!item.lesson && item.quiz && <QuizPlayer questions={item.quiz} title={title} />}

            {item.story && (
              <section aria-label={t("story")} className="prose-x space-y-5 text-[1.12rem]">
                {item.story.map((p, i) => (
                  <p key={i} className={i === 0 ? "font-display text-[1.35rem] leading-snug" : undefined}>
                    {tx(p, locale)}
                  </p>
                ))}
              </section>
            )}
          </div>

          <aside className="space-y-4">
            {item.crops.length > 0 && (
              <div className="rounded-[var(--radius-card)] bg-surface-2 p-5">
                <p className="t-label mb-2">{t("crop")}</p>
                <ul className="flex flex-wrap gap-2">
                  {item.crops.map((c) => {
                    const crop = getCrop(c);
                    return crop ? (
                      <li key={c}>
                        <Link
                          href={`/crops/${c}`}
                          className="inline-flex min-h-10 items-center rounded-full bg-surface px-3 font-semibold ring-1 ring-line hover:ring-primary"
                        >
                          {tx(crop.name, locale)}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="py-10">
            <h2 id="related" className="t-h2 mb-6">
              {t("related")}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <li key={r.slug}>
                  <LearnCard item={r} locale={locale} index={i} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
