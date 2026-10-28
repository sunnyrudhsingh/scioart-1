import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BadgeCheck, BookOpenCheck, FileCheck2, FlaskConical, GraduationCap, Presentation, RefreshCw, Search, Tractor } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroLandscape } from "@/components/illustrations/HeroLandscape";
import { CropIcon } from "@/components/illustrations/CropIcon";
import { TopicIcon, OperationIcon } from "@/components/illustrations/FieldIcons";
import { WheatStalkLine } from "@/components/illustrations/Decor";
import { HeroParallax } from "@/components/motion/HeroParallax";
import { WordReveal } from "@/components/motion/WordReveal";
import { Counter } from "@/components/motion/Counter";
import { PageShell } from "@/components/motion/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Section, SectionHeader } from "@/components/ui/Section";
import { SeasonTabs } from "@/components/home/SeasonTabs";
import { ThisWeekCard } from "@/components/home/ThisWeekCard";
import { Marquee } from "@/components/home/Marquee";
import { CropCard } from "@/components/content/CropCard";
import { KitCard } from "@/components/content/KitCard";
import { AdvisoryCard } from "@/components/content/AdvisoryCard";
import { AudioPlayer } from "@/components/content/AudioPlayer";
import { LiteYouTube } from "@/components/content/LiteYouTube";
import { formatIcon } from "@/components/content/formatIcons";
import {
  getAdvisories,
  getAudiences,
  getCalendar,
  getCalendarCrops,
  getCrop,
  getCropGroups,
  getCrops,
  getGuidesForCrop,
  getKits,
  getLearnItems,
  getOperation,
  getSeasons,
  getStats,
  getTopics,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { tx } from "@/lib/text";
import type { AudienceId } from "@/content/schema";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "home" });
  return buildMetadata({ locale, path: "/", title: t("metaTitle"), description: t("metaDescription"), og: "home", absoluteTitle: true });
}

const audienceIcon: Record<AudienceId, typeof Tractor> = {
  farmers: Tractor,
  "extension-workers": Presentation,
  students: GraduationCap,
  researchers: FlaskConical,
};

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const tCrops = await getTranslations("crops");

  const seasons = getSeasons();
  const stats = getStats();
  const topics = getTopics();
  const kits = getKits();
  const advisories = getAdvisories().slice(0, 3);
  // The "Learn & Play" showcase uses the featured item of each format
  // (featured: true in content/learn.ts), or the first one of that format.
  const learnItems = getLearnItems();
  const pick = (format: string) =>
    learnItems.find((i) => i.format === format && i.featured) ?? learnItems.find((i) => i.format === format)!;
  const game = pick("game");
  const song = pick("song");
  const video = pick("video");
  const emodule = pick("emodule");
  const jingle = pick("jingle");

  const weekCrops = getCalendarCrops().map((slug) => {
    const crop = getCrop(slug)!;
    return {
      slug,
      name: crop.name,
      season: crop.season,
      tasks: getCalendar(slug).map((task) => ({
        operation: task.operation,
        operationName: getOperation(task.operation)!.name,
        weekStart: task.weekStart,
        weekEnd: task.weekEnd,
        title: task.title,
      })),
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SciOArt",
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    description: t("metaDescription"),
    areaServed: ["Punjab, India", "California, United States"],
    knowsLanguage: ["pa", "en"],
  };

  const verifySteps = [
    { Icon: BookOpenCheck, title: t("verifySourceTitle"), text: t("verifySource") },
    { Icon: BadgeCheck, title: t("verifyReviewTitle"), text: t("verifyReview") },
    { Icon: FileCheck2, title: t("verifyPublishTitle"), text: t("verifyPublish") },
    { Icon: RefreshCw, title: t("verifyUpdateTitle"), text: t("verifyUpdate") },
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
              <ButtonLink href="/crops" size="lg">
                {t("ctaCrops")}
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/learn" size="lg" variant="mustard">
                {t("ctaLearn")}
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
              {t("heroSearch")}
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

      {/* ── Who are you? ────────────────────────────────────────────── */}
      <div className="bg-[var(--hl-front-bottom)]">
        <div className="container-x pb-8">
          <nav aria-label={t("audienceLabel")} className="flex flex-wrap items-center gap-2 pt-1">
            <span className="me-1 font-display text-xl font-semibold text-ink dark:text-paper">{t("iAmA")}</span>
            {getAudiences().map((a) => {
              const Icon = audienceIcon[a.id];
              return (
                <Link
                  key={a.id}
                  href={`/for/${a.id}`}
                  className="pressable shadow-soft inline-flex min-h-11 items-center gap-2 rounded-full bg-paper/95 px-4 font-semibold text-field hover:bg-white"
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                  {tx(a.singular, locale)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── This week ───────────────────────────────────────────────── */}
      <div className="container-x -mt-1 pt-10">
        <ThisWeekCard crops={weekCrops} />
      </div>

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
                  {getCrops({ season: s.id }).map((c, i) => {
                    const ready = getGuidesForCrop(c.slug).length;
                    return (
                      <li key={c.slug}>
                        <CropCard crop={c} locale={locale} index={i} morph meta={tCrops("readyCount", { count: ready })} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          />
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

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <Section labelledBy="stats-title" className="py-14 sm:py-16">
        <div className="container-x">
          <h2 id="stats-title" className="sr-only">
            {t("statsTitle")}
          </h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
            {[
              { n: stats.crops, label: t("statCrops") },
              { n: stats.operations, label: t("statOperations") },
              { n: stats.topics, label: t("statTopics") },
              { n: stats.learn, label: t("statLearn") },
              { n: stats.kits, label: t("statKits") },
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

      {/* ── Learn through play (bento) ──────────────────────────────── */}
      <Section labelledBy="play-title" className="pt-4">
        <div className="container-x">
          <SectionHeader
            id="play-title"
            title={t("playTitle")}
            lead={t("playLead")}
            action={
              <ButtonLink href="/learn" variant="secondary">
                {t("playCta")}
              </ButtonLink>
            }
          />
          <div className="grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
            {/* Game: the big tile */}
            <Link
              href={`/learn/${game.slug}`}
              data-season="rabi"
              data-reveal
              className="group pressable lift shadow-soft relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[var(--radius-section)] bg-accent-soft p-6 ring-1 ring-line md:col-span-3 md:row-span-2"
            >
              <SnakesBoard className="absolute -end-6 -top-6 size-[78%] text-accent-ink opacity-90 transition-transform duration-700 group-hover:rotate-3" />
              <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-sm font-semibold">
                <formatIcon.game className="size-4" aria-hidden="true" />
                {tc("sample")}
              </span>
              <h3 className="relative mt-3 font-display text-[1.9rem] leading-tight font-semibold">{tx(game.title, locale)}</h3>
              <p className="relative mt-2 max-w-md text-muted">{tx(game.description, locale)}</p>
            </Link>

            {/* Song with a mini player */}
            <div
              data-season="kharif"
              data-reveal
              style={{ ["--i" as string]: 1 }}
              className="shadow-soft flex flex-col gap-4 rounded-[var(--radius-section)] bg-surface p-6 ring-1 ring-line md:col-span-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/learn/${song.slug}`} className="font-display text-[1.4rem] leading-tight font-semibold hover:underline">
                    {tx(song.title, locale)}
                  </Link>
                  <p className="t-small mt-1 text-muted">{tx(song.description, locale)}</p>
                </div>
                <formatIcon.song className="size-7 shrink-0 text-accent-ink" aria-hidden="true" />
              </div>
              <AudioPlayer src={song.media.audio!} title={tx(song.title, locale)} placeholder />
              <AudioPlayer src={jingle.media.audio!} title={tx(jingle.title, locale)} compact />
              <span className="t-small -mt-2 text-muted">{tx(jingle.title, locale)}</span>
            </div>

            {/* Video */}
            <div data-reveal style={{ ["--i" as string]: 2 }} className="md:col-span-2">
              <LiteYouTube id={video.media.youtubeId!} title={tx(video.title, locale)} className="h-full min-h-48" />
            </div>

            {/* E-module */}
            <Link
              href={`/learn/${emodule.slug}`}
              data-reveal
              style={{ ["--i" as string]: 3 }}
              className="group pressable lift shadow-soft flex flex-col justify-between rounded-[var(--radius-section)] bg-field p-6 text-paper ring-1 ring-line md:col-span-1"
            >
              <formatIcon.emodule className="size-8 text-mustard" aria-hidden="true" />
              <span className="mt-6 font-display text-[1.15rem] leading-snug font-semibold">{tx(emodule.title, locale)}</span>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Extension kits ──────────────────────────────────────────── */}
      <section aria-labelledby="kits-title" className="bg-field py-16 text-paper sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <h2 id="kits-title" className="t-h2">
              {t("kitsTitle")}
            </h2>
            <p className="mt-3 max-w-md text-[1.15rem] text-[#d9e8dc]">{t("kitsLead")}</p>
            <ol className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {kits[0]?.files.map((f, i) => (
                <li
                  key={f.kind}
                  className="flex items-center gap-3 rounded-xl bg-white/8 px-3 py-2.5"
                  data-reveal
                  style={{ ["--i" as string]: i }}
                >
                  <span
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-mustard font-bold text-ink tabular-nums"
                    lang="en"
                  >
                    {i + 1}
                  </span>
                  <span className="font-semibold">{tx(f.title, locale)}</span>
                </li>
              ))}
            </ol>
            <ButtonLink href="/extension" variant="mustard" className="mt-8">
              {t("kitsCta")}
            </ButtonLink>
          </div>
          <ul className="grid gap-4 text-text sm:grid-cols-2">
            {kits.map((k, i) => (
              <li key={k.slug} className={i === 0 ? "sm:col-span-2" : undefined}>
                <KitCard kit={k} locale={locale} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Advisories ──────────────────────────────────────────────── */}
      <Section labelledBy="adv-title">
        <div className="container-x">
          <SectionHeader
            id="adv-title"
            title={t("advisoriesTitle")}
            action={
              <ButtonLink href="/advisories" variant="secondary">
                {t("advisoriesCta")}
              </ButtonLink>
            }
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {advisories.map((a, i) => (
              <li key={a.slug}>
                <AdvisoryCard advisory={a} locale={locale} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── How content is verified (a real sequence) ───────────────── */}
      <section aria-labelledby="verify-title" className="relative overflow-hidden bg-surface-2 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="relative" data-reveal>
            <h2 id="verify-title" className="t-h2">
              {t("verifyTitle")}
            </h2>
            <p className="t-lead mt-3">{t("verifyLead")}</p>
            <WheatStalkLine className="mt-6 hidden h-64 w-20 text-wheat lg:block" />
          </div>
          <ol className="relative grid gap-6 sm:grid-cols-2">
            {verifySteps.map(({ Icon, title, text }, i) => (
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
          {getCropGroups().length > 0 &&
            getCrops().map((c) => (
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

      {/* ── Ask an Expert ───────────────────────────────────────────── */}
      <section aria-labelledby="ask-title" className="container-x">
        <div className="relative overflow-hidden rounded-[var(--radius-section)] bg-field px-6 py-12 text-paper sm:px-12 sm:py-16">
          <OperationIcon name="diseases" className="absolute -end-10 -bottom-10 size-72 text-white/10" />
          <h2 id="ask-title" className="t-h2 relative max-w-xl">
            {t("askTitle")}
          </h2>
          <p className="relative mt-3 max-w-lg text-[1.15rem] text-[#d9e8dc]">{t("askLead")}</p>
          <Magnetic>
            <ButtonLink href="/ask" variant="mustard" size="lg" className="relative mt-7">
              {t("askCta")}
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
