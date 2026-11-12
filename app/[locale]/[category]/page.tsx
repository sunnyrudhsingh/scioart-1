import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { MaterialCard } from "@/components/content/MaterialCard";
import { LibraryBrowser } from "@/components/content/LibraryBrowser";
import { LiveBoard } from "@/components/content/LiveBoard";
import { categoryIcon, categoryTint } from "@/components/content/categoryIcons";
import { getCategories, getCategory, getCrops, getMaterials, getTopics, isCategoryId } from "@/lib/content";
import { BUILT_AT } from "@/lib/build";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx, txOther } from "@/lib/text";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getCategories().map((c) => ({ locale, category: c.id })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[category]">): Promise<Metadata> {
  const { locale, category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  const t = await getTranslations({ locale: locale as Locale, namespace: "library" });
  return buildMetadata({
    locale,
    path: `/${c.id}`,
    title: tx(c.name, locale),
    description: `${tx(c.short, locale)}. ${t("metaDescription")}`,
    og: "library",
  });
}

export default async function CategoryPage({ params }: PageProps<"/[locale]/[category]">) {
  const locale = await pageLocale(params);
  const { category: id } = await params;
  if (!isCategoryId(id)) notFound();
  const category = getCategory(id)!;
  const t = await getTranslations("library");
  const Icon = categoryIcon[category.id];
  const items = getMaterials({ category: category.id });
  const usedCrops = new Set(items.flatMap((i) => i.crops));
  const usedTopics = new Set(items.flatMap((i) => i.topics));
  const cards = Object.fromEntries(items.map((i) => [i.slug, <MaterialCard key={i.slug} item={i} locale={locale} />]));

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ href: "/library", label: t("title") }, { label: tx(category.name, locale) }]} />
        <PageHeader
          title={tx(category.name, locale)}
          lead={tx(category.short, locale)}
          eyebrow={
            <span className={cn("mb-4 inline-grid size-14 place-items-center rounded-2xl", categoryTint(category))}>
              <Icon className="size-7" aria-hidden="true" />
            </span>
          }
        >
          <p className="t-small mt-2 text-muted" lang={locale === "en" ? "pa" : "en"}>
            {txOther(category.name, locale)}
          </p>
        </PageHeader>

        {items.length === 0 ? (
          <p className="mb-16 rounded-2xl bg-surface-2 p-6 text-lg">{t("emptyCategory")}</p>
        ) : category.id === "live" ? (
          <LiveBoard
            builtAt={BUILT_AT}
            cards={cards}
            items={items
              .filter((i) => i.live)
              .map((i) => {
                const start = Date.parse(i.live!.startsAt);
                return { slug: i.slug, start, end: start + i.live!.durationMinutes * 60_000 };
              })}
          />
        ) : (
          <LibraryBrowser
            items={items.map((i) => ({
              slug: i.slug,
              category: i.category,
              crops: i.crops,
              topics: i.topics,
              languages: i.languages,
              large: false,
            }))}
            cards={cards}
            categories={[]}
            crops={getCrops()
              .filter((c) => usedCrops.has(c.slug))
              .map((c) => ({ id: c.slug, label: tx(c.name, locale) }))}
            topics={getTopics()
              .filter((x) => usedTopics.has(x.slug))
              .map((x) => ({ id: x.slug, label: tx(x.name, locale) }))}
            languages={[
              { id: "pa", label: t("langPa") },
              { id: "en", label: t("langEn") },
            ]}
          />
        )}
      </div>
    </PageShell>
  );
}
