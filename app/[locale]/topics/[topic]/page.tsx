import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TopicIcon } from "@/components/illustrations/FieldIcons";
import { MaterialCard } from "@/components/content/MaterialCard";
import { SampleBanner } from "@/components/content/SampleBanner";
import { getMaterials, getTopic, getTopics } from "@/lib/content";
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
  const items = getMaterials({ topic: slug });

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

        <section aria-labelledby="t-materials" className="py-8">
          <h2 id="t-materials" className="t-h2 mb-6">
            {t("materialsTitle")}
          </h2>
          {items.length === 0 ? (
            <p className="rounded-2xl bg-surface-2 p-6 text-lg">{t("nothingYet")}</p>
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
      </div>
    </PageShell>
  );
}
