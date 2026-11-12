import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BadgeCheck, FlaskConical, Palette, Search, Share2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroLandscape } from "@/components/illustrations/HeroLandscape";
import { CropIcon } from "@/components/illustrations/CropIcon";
import { TopicIcon } from "@/components/illustrations/FieldIcons";
import { WheatStalkLine } from "@/components/illustrations/Decor";
import { HeroParallax } from "@/components/motion/HeroParallax";
import { WordReveal } from "@/components/motion/WordReveal";
import { Counter } from "@/components/motion/Counter";
import { PageShell } from "@/components/motion/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Section, SectionHeader } from "@/components/ui/Section";
import { SeasonTabs } from "@/components/home/SeasonTabs";
import { Marquee } from "@/components/home/Marquee";
import { NextLive } from "@/components/home/NextLive";
import { CropCard } from "@/components/content/CropCard";
import { CategoryGrid } from "@/components/content/CategoryGrid";
import { MaterialCard } from "@/components/content/MaterialCard";
import { AudioPlayer } from "@/components/content/AudioPlayer";
import { LiteYouTube } from "@/components/content/LiteYouTube";
import { categoryIcon } from "@/components/content/categoryIcons";
import type { CategoryId } from "@/content/schema";
import { getCrops, getMaterials, getSeasons, getStats, getTopics, materialHref } from "@/lib/content";
import { BUILT_AT } from "@/lib/build";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { formatDateTime, tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "home" });
  return buildMetadata({ locale, path: "/", title: t("metaTitle"), description: t("metaDescription"), og: "home", absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const tCrops = await getTranslations("crops");

  const seasons = getSeasons();
  const stats = getStats();
  const topics = getTopics();
  const all = getMaterials();
  // The showcase uses the featured item of a section (featured: true in
  // content/materials.ts), or its newest item.
  const pick = (c: CategoryId) => all.find((m) => m.category === c && m.featured) ?? all.find((m) => m.category === c);
  const game = pick("games");
  const song = pick("scientific-songs");
  const jingle = pick("jingles");
  const film = pick("documentaries") ?? pick("short-films");
  const emodule = pick("e-modules");
  const latest = all.filter((m) => m.category !== "live").slice(0, 6);
  const live = getMaterials({ category: "live" })
    .filter((m) => m.live)
    .map((m) => {
      const start = Date.parse(m.live!.startsAt);
      return {
        href: materialHref(m),
        title: tx(m.title, locale),
        when: formatDateTime(m.live!.startsAt, locale),
        start,
        end: start + m.live!.durationMinutes * 60_000,
      };
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SciOArt",
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    description: t("metaDescription"),
    areaServed: ["Punjab, India"],
    knowsLanguage: ["pa", "en"],
  };

  const GameIcon = categoryIcon.games;
  const SongIcon = categoryIcon["scientific-songs"];
  const ModuleIcon = categoryIcon["e-modules"];

  const madeSteps = [
    { Icon: FlaskConical, title: t("madeScienceTitle"), text: t("madeScience") },
    { Icon: Palette, title: t("madeArtTitle"), text: t("madeArt") },
    { Icon: BadgeCheck, title: t("madeReviewTitle"), text: t("madeReview") },
    { Icon: Share2, title: t("madeShareTitle"), text: t("madeShare") },
  ];

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero: a Punjab field at sunrise ─────────────────────────── */}
      <section
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[min(100svh,980px)] flex-col overflow-hidden pt-[var(--header-h)]"
        style={{ background: "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 48%, var(--sky-horizon) 72%)" }}
      >
        <div className="container-x relative z-10 pt-10 sm:pt-16 lg:pt-20">
          <h1 id="hero-title" className="t-hero max-w-[15ch] text-ink dark:text-paper">
            <WordReveal text={t("heroTitle")} />
          </h1>
          <p className="hero-rise t-lead mt-5 max-w-xl text-[#3d3a31] dark:text-[#e8e1cf]">{t("heroLead")}</p>
          <div className="hero-rise mt-7 flex flex-wrap gap-3" style={{ ["--i" as string]: 1 }}>
            <Magnetic>
              <ButtonLink href="/library" size="lg">
                {t("ctaLibrary")}
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/live" size="lg" variant="mustard">
                {t("ctaLive")}
              </ButtonLink>
            </Magnetic>
          </div>
          <form
            action={`/${locale}/search`}
            role="search"
            className="hero-rise shadow-lift mt-6 flex max-w-lg items-center gap-2 rounded-full bg-surface/90 p-1.5 ps-4 ring-1 ring-line backdrop-blur"
            style={{ ["--i" as string]: 2 }}
          >
            <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
            <label htmlFor="hero-q" className="sr-only">
              {tc("search")}
            </label>
            <input
              id="hero-q"
              name="q"
              type="search"
              placeholder={tc("searchPlaceholder")}
              className="h-11 min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted"
            />
            <button type="submit" className="h-11 rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover">
              {tc("search")}
            </button>
          </form>
        </div>

        <HeroParallax className="pointer-events-none relative mt-auto h-[46svh] min-h-[280px] w-full [contain:paint] sm:h-[52svh]">
          <HeroLandscape className="absolute inset-0 size-full" />
        </HeroParallax>
      </section>

      {/* ── The library's sections ──────────────────────────────────── */}
      <div className="bg-[var(--hl-front-bottom)] pt-2 pb-1" />
      <Section labelledBy="sections-title" className="pt-12">
        <div className="container-x">
          <SectionHeader id="sections-title" title={t("sectionsTitle")} lead={t("sectionsLead")} />
          <CategoryGrid locale={locale} />
        </div>
      </Section>

      {/* ── Live ────────────────────────────────────────────────────── */}
      {live.length > 0 && (
        <div className="container-x pb-6">
          <NextLive items={live} builtAt={BUILT_AT} />
        </div>
      )}

      {/* ── Newest in the library ───────────────────────────────────── */}
      <Section labelledBy="latest-title">
        <div className="container-x">
          <SectionHeader
            id="latest-title"
            title={t("latestTitle")}
            action={
              <ButtonLink href="/library" variant="secondary">
                {tc("seeAll")}
              </ButtonLink>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((m, i) => (
              <li key={m.slug}>
                <MaterialCard item={m} locale={locale} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Watch, listen, play (bento) ─────────────────────────────── */}
      <Section labelledBy="play-title" className="pt-4">
        <div className="container-x">
          <SectionHeader id="play-title" title={t("playTitle")} lead={t("playLead")} />
          <div className="grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
            {game && (
              <Link
                href={materialHref(game)}
                data-season="rabi"
                data-reveal
                className="group pressable lift shadow-soft relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[var(--radius-section)] bg-accent-soft p-6 ring-1 ring-line md:col-span-3 md:row-span-2"
              >
                <SnakesBoard className="absolute -end-6 -top-6 size-[78%] text-accent-ink opacity-90 transition-transform duration-700 group-hover:rotate-3" />
                <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-sm font-semibold">
                  <GameIcon className="size-4" aria-hidden="true" />
                  {game.sample ? tc("sample") : tx(game.duration, locale)}
                </span>
                <h3 className="relative mt-3 font-display text-[1.9rem] leading-tight font-semibold">{tx(game.title, locale)}</h3>
                <p className="relative mt-2 max-w-md text-muted">{tx(game.description, locale)}</p>
              </Link>
            )}

            {song && (
              <div
                data-season="kharif"
                data-reveal
                style={{ ["--i" as string]: 1 }}
                className="shadow-soft flex flex-col gap-4 rounded-[var(--radius-section)] bg-surface p-6 ring-1 ring-line md:col-span-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={materialHref(song)} className="font-display text-[1.4rem] leading-tight font-semibold hover:underline">
                      {tx(song.title, locale)}
                    </Link>
                    <p className="t-small mt-1 text-muted">{tx(song.description, locale)}</p>
                  </div>
                  <SongIcon className="size-7 shrink-0 text-accent-ink" aria-hidden="true" />
                </div>
                {song.media.audio && <AudioPlayer src={song.media.audio} title={tx(song.title, locale)} placeholder={song.sample} />}
                {jingle?.media.audio && (
                  <>
                    <AudioPlayer src={jingle.media.audio} title={tx(jingle.title, locale)} compact />
                    <Link href={materialHref(jingle)} className="t-small -mt-2 text-muted hover:underline">
                      {tx(jingle.title, locale)}
                    </Link>
                  </>
                )}
              </div>
            )}

            {film?.media.youtubeId && (
              <div data-reveal style={{ ["--i" as string]: 2 }} className="md:col-span-2">
                <LiteYouTube id={film.media.youtubeId} title={tx(film.title, locale)} className="h-full min-h-48" />
              </div>
            )}

            {emodule && (
              <Link
                href={materialHref(emodule)}
                data-reveal
                style={{ ["--i" as string]: 3 }}
                className="group pressable lift shadow-soft flex flex-col justify-between rounded-[var(--radius-section)] bg-field p-6 text-paper ring-1 ring-line md:col-span-1"
              >
                <ModuleIcon className="size-8 text-mustard" aria-hidden="true" />
                <span className="mt-6 font-display text-[1.15rem] leading-snug font-semibold">{tx(emodule.title, locale)}</span>
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* ── Topics strip ────────────────────────────────────────────── */}
      <section aria-labelledby="topics-title" className="furrows bg-surface-2 py-14 sm:py-16">
        <div className="container-x">
          <SectionHeader
            id="topics-title"
            title={t("topicsTitle")}
            action={
              <ButtonLink href="/topics" variant="secondary">
                {tc("seeAll")}
              </ButtonLink>
            }
            className="mb-6"
          />
        </div>
        <ul className="no-scrollbar container-x flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
          {topics.map((topic, i) => (
            <li key={topic.slug} className="w-[15.5rem] shrink-0 snap-start">
              <Link
                href={`/topics/${topic.slug}`}
                data-reveal
                style={{ ["--i" as string]: i % 6 }}
                className="pressable lift shadow-soft flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line"
              >
                <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-primary">
                  <TopicIcon name={topic.icon} className="size-9" />
                </span>
                <span className="mt-4 font-display text-[1.1rem] leading-snug font-semibold">{tx(topic.name, locale)}</span>
                <span className="t-small mt-1.5 text-muted">{tx(topic.short, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Crops by season ─────────────────────────────────────────── */}
      <Section labelledBy="seasons-title">
        <div className="container-x">
          <SectionHeader
            id="seasons-title"
            title={t("seasonsTitle")}
            lead={t("seasonsLead")}
            action={
              <ButtonLink href="/crops" variant="secondary">
                {t("allCrops")}
              </ButtonLink>
            }
          />
          <SeasonTabs
            label={t("seasonsLabel")}
            tabs={seasons.map((s) => ({ id: s.id, label: tx(s.name, locale) }))}
            panels={seasons.map((s) => (
              <div key={s.id}>
                <p className="mb-5 text-muted">{tx(s.description, locale)}</p>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {getCrops({ season: s.id }).map((c, i) => (
                    <li key={c.slug}>
                      <CropCard
                        crop={c}
                        locale={locale}
                        index={i}
                        morph
                        meta={tCrops("materialsCount", { count: getMaterials({ crop: c.slug }).length })}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          />
        </div>
      </Section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <Section labelledBy="stats-title" className="py-14 sm:py-16">
        <div className="container-x">
          <h2 id="stats-title" className="sr-only">
            {t("statsTitle")}
          </h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {[
              { n: stats.materials, label: t("statMaterials") },
              { n: stats.categories, label: t("statCategories") },
              { n: stats.crops, label: t("statCrops") },
              { n: stats.topics, label: t("statTopics") },
            ].map((s, i) => (
              <div key={i} className="flex flex-col border-s-2 border-mustard ps-4" data-reveal style={{ ["--i" as string]: i }}>
                <dt className="t-small order-2 text-muted">{s.label}</dt>
                <dd className="order-1 font-display text-[3rem] leading-none font-semibold text-primary tabular-nums" lang="en">
                  <Counter value={s.n} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ── How our materials are made (a real sequence) ────────────── */}
      <section aria-labelledby="made-title" className="relative overflow-hidden bg-surface-2 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="relative" data-reveal>
            <h2 id="made-title" className="t-h2">
              {t("madeTitle")}
            </h2>
            <p className="t-lead mt-3">{t("madeLead")}</p>
            <WheatStalkLine className="mt-6 hidden h-64 w-20 text-wheat lg:block" />
          </div>
          <ol className="relative grid gap-6 sm:grid-cols-2">
            {madeSteps.map(({ Icon, title, text }, i) => (
              <li
                key={title}
                data-reveal
                style={{ ["--i" as string]: i }}
                className="relative rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-primary font-bold text-on-primary" lang="en">
                    {i + 1}
                  </span>
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="t-h3 mt-4">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Crop marquee ────────────────────────────────────────────── */}
      <section aria-label={t("marqueeLabel")} className="py-16">
        <Marquee label={t("marqueeLabel")}>
          {getCrops().map((c) => (
            <Link
              key={c.slug}
              href={`/crops/${c.slug}`}
              data-season={c.season}
              tabIndex={-1}
              className="mx-2 inline-flex items-center gap-3 rounded-full bg-accent-soft py-2 ps-2 pe-5 whitespace-nowrap"
            >
              <span className="grid size-11 place-items-center rounded-full bg-surface text-accent-ink">
                <CropIcon name={c.illustration} className="size-7" />
              </span>
              <span className="font-semibold">{tx(c.name, locale)}</span>
              <span className="t-small text-muted" lang={locale === "en" ? "pa" : "en"}>
                {locale === "en" ? c.name.pa : c.name.en}
              </span>
            </Link>
          ))}
        </Marquee>
      </section>

      {/* ── Share band ──────────────────────────────────────────────── */}
      <section aria-labelledby="share-title" className="container-x">
        <div className="relative overflow-hidden rounded-[var(--radius-section)] bg-field px-6 py-12 text-paper sm:px-12 sm:py-16">
          <Share2 className="absolute -end-10 -bottom-10 size-72 text-white/10" aria-hidden="true" />
          <h2 id="share-title" className="t-h2 relative max-w-xl">
            {t("shareTitle")}
          </h2>
          <p className="relative mt-3 max-w-lg text-[1.15rem] text-[#d9e8dc]">{t("shareLead")}</p>
          <Magnetic>
            <ButtonLink href="/library" variant="mustard" size="lg" className="relative mt-7">
              {t("ctaLibrary")}
            </ButtonLink>
          </Magnetic>
        </div>
      </section>
    </PageShell>
  );
}

/** Original illustration: a snakes-and-ladders board seen at an angle. */
function SnakesBoard({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <g transform="rotate(-12 100 100)">
        <rect x="30" y="30" width="140" height="140" rx="10" fill="currentColor" fillOpacity=".06" />
        {[1, 2, 3, 4].map((i) => (
          <g key={i} opacity=".35">
            <path d={`M${30 + i * 28} 30 V170`} />
            <path d={`M30 ${30 + i * 28} H170`} />
          </g>
        ))}
        <path d="M58 150 L86 66 M70 154 L98 70 M62 136h14 M66 122h14 M70 108h14 M75 94h14 M79 80h14" strokeWidth="2.6" />
        <path d="M140 52 c-30 10 10 30 -18 46 c-24 14 12 30 -16 52" strokeWidth="5" opacity=".85" />
        <circle cx="140" cy="52" r="5" fill="currentColor" />
      </g>
    </svg>
  );
}
