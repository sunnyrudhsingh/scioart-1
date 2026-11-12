import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CalendarDays, Clock, Download, ExternalLink, Languages } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AudioPlayer } from "@/components/content/AudioPlayer";
import { LiteYouTube } from "@/components/content/LiteYouTube";
import { EModuleViewer } from "@/components/content/EModuleViewer";
import { QuizPlayer } from "@/components/content/QuizPlayer";
import { MaterialCard } from "@/components/content/MaterialCard";
import { SampleBanner } from "@/components/content/SampleBanner";
import { ShareButton } from "@/components/content/ShareButton";
import { LiveStatus } from "@/components/content/LiveStatus";
import { categoryIcon, categoryTint } from "@/components/content/categoryIcons";
import { getCategory, getCrop, getMaterial, getMaterials, getTopic, materialHref } from "@/lib/content";
import { BUILT_AT } from "@/lib/build";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { SITE_URL } from "@/lib/site";
import { formatDate, formatDateTime, tx } from "@/lib/text";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getMaterials().map((m) => ({ locale, category: m.category, slug: m.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[category]/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getMaterial(slug);
  if (!item) return {};
  return buildMetadata({
    locale,
    path: materialHref(item),
    title: tx(item.title, locale),
    description: tx(item.description, locale),
    og: "library",
  });
}

const schemaType: Record<string, string> = {
  documentaries: "Movie",
  "short-films": "Movie",
  theatre: "VideoObject",
  culture: "CreativeWork",
  live: "Event",
  jingles: "MusicRecording",
  "scientific-songs": "MusicRecording",
  podcasts: "PodcastEpisode",
  games: "Game",
  "e-modules": "LearningResource",
  "e-books": "Book",
  "posters-comics": "VisualArtwork",
};

export default async function MaterialPage({ params }: PageProps<"/[locale]/[category]/[slug]">) {
  const locale = await pageLocale(params);
  const { slug, category: categoryId } = await params;
  const item = getMaterial(slug);
  if (!item || item.category !== categoryId) notFound();

  const t = await getTranslations("library");
  const tp = await getTranslations("player");
  const tc = await getTranslations("common");
  const category = getCategory(item.category)!;
  const Icon = categoryIcon[item.category];
  const title = tx(item.title, locale);
  const firstCrop = item.crops[0] ? getCrop(item.crops[0]) : undefined;
  const related = getMaterials()
    .filter((x) => x.slug !== item.slug && (x.category === item.category || x.topics.some((tp) => item.topics.includes(tp))))
    .slice(0, 3);
  const { media } = item;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType[item.category] ?? "CreativeWork",
    name: title,
    description: tx(item.description, locale),
    inLanguage: item.languages,
    url: `${SITE_URL}/${locale}${materialHref(item)}`,
    ...(item.live ? { startDate: item.live.startsAt, eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode" } : {}),
    publisher: { "@type": "Organization", name: "SciOArt", url: SITE_URL },
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x" data-season={firstCrop?.season}>
        <Breadcrumbs
          locale={locale}
          items={[{ href: "/library", label: t("title") }, { href: `/${category.id}`, label: tx(category.name, locale) }, { label: title }]}
        />

        <header className="pt-6 pb-8 sm:pt-10">
          <Link
            href={`/${category.id}`}
            className={cn("inline-flex min-h-10 items-center gap-2 rounded-full px-3 py-1 font-semibold", categoryTint(category))}
          >
            <Icon className="size-4" aria-hidden="true" />
            {tx(category.name, locale)}
          </Link>
          <h1 className="t-h1 mt-4 max-w-3xl">{title}</h1>
          <p className="t-lead mt-3 max-w-2xl">{tx(item.description, locale)}</p>
          <dl className="t-small mt-6 flex flex-wrap gap-x-6 gap-y-2 text-muted">
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              <dt className="sr-only">{t("duration")}</dt>
              <dd>{tx(item.duration, locale)}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Languages className="size-4" aria-hidden="true" />
              <dt className="sr-only">{t("languages")}</dt>
              <dd>{item.languages.map((l) => (l === "pa" ? t("langPa") : t("langEn"))).join(", ")}</dd>
            </div>
            {!item.live && (
              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden="true" />
                <dt className="sr-only">{t("released")}</dt>
                <dd>{formatDate(item.date, locale)}</dd>
              </div>
            )}
          </dl>
          <div className="mt-6">
            <ShareButton title={title} />
          </div>
        </header>

        {item.sample && <SampleBanner text={tc("sampleItem")} />}

        <div className="grid gap-10 py-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0 space-y-10">
            {item.live && (
              <LiveStatus
                builtAt={BUILT_AT}
                start={Date.parse(item.live.startsAt)}
                end={Date.parse(item.live.startsAt) + item.live.durationMinutes * 60_000}
                url={item.live.url}
                platform={item.live.platform}
                when={formatDateTime(item.live.startsAt, locale)}
                hasRecording={Boolean(media.youtubeId || media.link)}
              />
            )}

            {media.youtubeId && <LiteYouTube id={media.youtubeId} title={title} />}

            {media.audio && <AudioPlayer src={media.audio} title={title} placeholder={item.sample} className="p-4" />}

            {media.images && media.images.length > 0 && (
              <section aria-label={t("pictures")}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {media.images.map((src, i) => (
                    <li key={src}>
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener"
                        className="block overflow-hidden rounded-[var(--radius-card)] ring-1 ring-line"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`${title} (${i + 1})`} loading="lazy" className="w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {media.link && (
              <a
                href={media.link}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
              >
                <ExternalLink className="size-5" aria-hidden="true" />
                {t("openLink")}
                <span className="sr-only">{tc("opensInNewTab")}</span>
              </a>
            )}

            {item.lyrics && (
              <section aria-labelledby="lyrics">
                <h2 id="lyrics" className="t-h2 mb-4">
                  {tp("lyrics")}
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

            {item.rules && (
              <section aria-labelledby="rules">
                <h2 id="rules" className="t-h2 mb-4">
                  {tp("rules")}
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

            {media.pdf && (
              <section>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={media.pdf}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
                  >
                    <ExternalLink className="size-5" aria-hidden="true" />
                    {category.action === "play" ? tp("openGame") : tp("read")}
                    <span className="sr-only">{tc("opensInNewTab")}</span>
                  </a>
                  <a
                    href={media.pdf}
                    download
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-semibold hover:border-primary"
                  >
                    <Download className="size-5" aria-hidden="true" />
                    {tp("downloadPdf")}
                  </a>
                </div>
                <object
                  data={media.pdf}
                  type="application/pdf"
                  aria-label={title}
                  className="mt-6 hidden h-[36rem] w-full rounded-[var(--radius-card)] ring-1 ring-line md:block"
                >
                  <p className="p-4">
                    <a href={media.pdf} className="link">
                      {tp("read")}
                    </a>
                  </p>
                </object>
              </section>
            )}

            {item.lesson && <EModuleViewer lesson={item.lesson} quiz={item.quiz} title={title} />}
            {!item.lesson && item.quiz && <QuizPlayer questions={item.quiz} title={title} />}

            {item.body && (
              <section aria-label={t("about")} className="space-y-5 text-[1.1rem]">
                {item.body.map((p, i) => (
                  <p key={i}>{tx(p, locale)}</p>
                ))}
              </section>
            )}
          </div>

          <aside className="space-y-4">
            {item.credits && item.credits.length > 0 && (
              <div className="rounded-[var(--radius-card)] bg-surface-2 p-5">
                <h2 className="t-label mb-3">{t("credits")}</h2>
                <dl className="space-y-2">
                  {item.credits.map((c, i) => (
                    <div key={i}>
                      <dt className="t-small text-muted">{tx(c.role, locale)}</dt>
                      <dd className="font-semibold">{tx(c.name, locale)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {(item.crops.length > 0 || item.topics.length > 0) && (
              <div className="rounded-[var(--radius-card)] bg-surface-2 p-5">
                <h2 className="t-label mb-3">{t("about")}</h2>
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
                  {item.topics.map((s) => {
                    const topic = getTopic(s);
                    return topic ? (
                      <li key={s}>
                        <Link
                          href={`/topics/${s}`}
                          className="inline-flex min-h-10 items-center rounded-full bg-surface px-3 font-semibold ring-1 ring-line hover:ring-primary"
                        >
                          {tx(topic.name, locale)}
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
                  <MaterialCard item={r} locale={locale} index={i} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
