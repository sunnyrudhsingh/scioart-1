import { getTranslations } from "next-intl/server";
import { ChevronLeft, ChevronRight, History, MessageCircleQuestion } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Crop, Edition, Operation, OperationGuide } from "@/content/schema";
import { getEditions, getKits, getLearnItems, getOperations, getPublication, getTopic } from "@/lib/content";
import { tx } from "@/lib/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { OperationIcon, TopicIcon } from "@/components/illustrations/FieldIcons";
import { BlockRenderer } from "./BlockRenderer";
import { SampleBanner } from "./SampleBanner";
import { SourceBox } from "./SourceBox";
import { ShareButton } from "./ShareButton";
import { PrintButton } from "./PrintButton";
import { DistrictNote } from "./DistrictNote";
import { LearnCard } from "./LearnCard";
import { KitCard } from "./KitCard";
import { PageShell } from "@/components/motion/PageShell";

/** One chapter of a crop's Package of Practices, for the latest or an archived edition. */
export async function OperationView({
  locale,
  crop,
  operation,
  guide,
  edition,
}: {
  locale: string;
  crop: Crop;
  operation: Operation;
  guide?: OperationGuide;
  edition?: Edition;
}) {
  const t = await getTranslations("crops");
  const ops = getOperations(crop.slug);
  const index = ops.findIndex((o) => o.slug === operation.slug);
  const prev = ops[index - 1];
  const next = ops[index + 1];
  const publication = getPublication(crop.publication)!;
  const latest = getEditions(crop.publication).find((e) => e.isLatest);
  const archived = edition && !edition.isLatest;
  const suffix = archived ? `/${edition.id}` : "";
  const toc = guide?.blocks.filter((b) => b.type === "heading") ?? [];
  const learn = getLearnItems({ crop: crop.slug, operation: operation.slug });
  const kit = getKits({ crop: crop.slug, operation: operation.slug })[0];
  const topics = (guide?.topics ?? []).map((s) => getTopic(s)).filter((x) => !!x);
  const title = `${tx(operation.name, locale)} — ${tx(crop.name, locale)}`;

  return (
    <PageShell>
      <article data-season={crop.season}>
        <div className="container-x">
          <Breadcrumbs
            locale={locale}
            items={[
              { href: "/crops", label: t("title") },
              { href: `/crops/${crop.slug}`, label: tx(crop.name, locale) },
              { label: tx(operation.name, locale) },
            ]}
          />

          <header className="flex flex-wrap items-start gap-5 pt-6 pb-6 sm:pt-10">
            <span className="grid size-20 shrink-0 place-items-center rounded-3xl bg-accent-soft text-accent-ink">
              <OperationIcon name={operation.icon} className="size-12" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="t-label">
                <Link href={`/crops/${crop.slug}`} className="hover:underline">
                  {tx(crop.name, locale)}
                </Link>
                <span aria-hidden="true"> / </span>
                {t("chapterOf", { n: index + 1, total: ops.length })}
              </p>
              <h1 className="t-h1 mt-1">{tx(operation.name, locale)}</h1>
              <p className="t-lead mt-2">{tx(operation.short, locale)}</p>
            </div>
          </header>

          {archived && latest && (
            <div
              role="status"
              className="mb-4 flex flex-wrap items-start gap-3 rounded-2xl border border-[#b4541a]/40 bg-[#fbe8d8] p-4 text-[#5a2608] dark:bg-[#36210f] dark:text-[#f8dcc4]"
            >
              <History className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="font-bold">{t("supersededTitle")}</p>
                <p>{t("supersededText", { latest: tx(latest.label, locale) })}</p>
              </div>
              <Link href={`/crops/${crop.slug}/${operation.slug}`} className="link font-semibold">
                {t("goLatest")}
              </Link>
            </div>
          )}

          {guide?.sample && <SampleBanner />}

          <div className="no-print flex flex-wrap gap-2 py-2">
            <ShareButton title={title} />
            {guide && <PrintButton />}
            <ButtonLink href={`/ask?crop=${crop.slug}&operation=${operation.slug}`} variant="ghost" className="border border-transparent">
              <MessageCircleQuestion className="size-4" aria-hidden="true" />
              {t("askAbout")}
            </ButtonLink>
          </div>

          {guide ? (
            <div className="grid grid-cols-1 gap-10 pt-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
              {toc.length > 0 && (
                <nav aria-label={t("onThisPage")} className="no-print min-w-0 lg:sticky lg:top-24 lg:self-start">
                  <p className="t-label mb-2">{t("onThisPage")}</p>
                  <ol className="flex gap-2 overflow-x-auto border-line pb-2 lg:block lg:space-y-1 lg:border-s-2 lg:pb-0">
                    {toc.map((h) =>
                      h.type === "heading" ? (
                        <li key={h.id} className="shrink-0">
                          <a
                            href={`#${h.id}`}
                            className="block rounded-full bg-surface-2 px-3 py-2 text-[0.95rem] leading-snug font-semibold hover:text-primary lg:-ms-[2px] lg:rounded-none lg:border-s-2 lg:border-transparent lg:bg-transparent lg:py-1.5 lg:ps-4 lg:hover:border-primary"
                          >
                            {tx(h.text, locale)}
                          </a>
                        </li>
                      ) : null,
                    )}
                  </ol>
                </nav>
              )}
              <div className={toc.length === 0 ? "lg:col-span-2" : undefined}>
                <DistrictNote notes={guide.districtNotes} />
                <BlockRenderer blocks={guide.blocks} locale={locale} />

                {kit && (
                  <section aria-labelledby="kit-title" className="no-print mt-12">
                    <h2 id="kit-title" className="t-h3 mb-4">
                      {t("relatedKit")}
                    </h2>
                    <div className="max-w-md">
                      <KitCard kit={kit} locale={locale} />
                    </div>
                  </section>
                )}

                {topics.length > 0 && (
                  <ul className="no-print mt-10 flex flex-wrap gap-2">
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
                )}

                <div className="mt-12">
                  <SourceBox
                    locale={locale}
                    publication={publication.title}
                    publisher={publication.publisher}
                    edition={(edition ?? latest)?.label}
                    lastReviewed={guide.lastReviewed}
                    reviewer={guide.reviewer}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <EmptyState
                title={t("notReadyTitle")}
                text={t("notReadyText", { operation: tx(operation.name, locale), crop: tx(crop.name, locale) })}
              >
                <ButtonLink href={`/ask?crop=${crop.slug}&operation=${operation.slug}`}>{t("askAbout")}</ButtonLink>
                <ButtonLink href={`/crops/${crop.slug}`} variant="secondary">
                  {t("allChapters")}
                </ButtonLink>
              </EmptyState>
              {learn.length > 0 && (
                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {learn.map((item, i) => (
                    <li key={item.slug}>
                      <LearnCard item={item} locale={locale} index={i} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Previous / next chapter */}
          <nav aria-label={t("allChapters")} className="no-print mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/crops/${crop.slug}/${prev.slug}${suffix}`}
                transitionTypes={["nav-back"]}
                className="group pressable flex items-center gap-3 rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line hover:ring-primary"
              >
                <ChevronLeft
                  className="size-6 shrink-0 text-primary transition-transform group-hover:-translate-x-1 rtl:rotate-180"
                  aria-hidden="true"
                />
                <span>
                  <span className="t-small block text-muted">{t("previous")}</span>
                  <span className="font-semibold">{tx(prev.name, locale)}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/crops/${crop.slug}/${next.slug}${suffix}`}
                transitionTypes={["nav-forward"]}
                className="group pressable flex items-center justify-end gap-3 rounded-[var(--radius-card)] bg-surface p-4 text-end ring-1 ring-line hover:ring-primary"
              >
                <span>
                  <span className="t-small block text-muted">{t("next")}</span>
                  <span className="font-semibold">{tx(next.name, locale)}</span>
                </span>
                <ChevronRight
                  className="size-6 shrink-0 text-primary transition-transform group-hover:translate-x-1 rtl:rotate-180"
                  aria-hidden="true"
                />
              </Link>
            )}
          </nav>
        </div>
      </article>
    </PageShell>
  );
}
