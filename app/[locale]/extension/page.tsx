import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { KitCard } from "@/components/content/KitCard";
import { KitBrowser } from "@/components/content/KitBrowser";
import { kitPartIcons } from "@/components/content/kitParts";
import { getCoreOperations, getCrops, getKits, getTopics } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/extension">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "extension" });
  return buildMetadata({ locale, path: "/extension", title: t("metaTitle"), description: t("metaDescription"), og: "extension" });
}

export default async function ExtensionPage({ params }: PageProps<"/[locale]/extension">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("extension");
  const kits = getKits();
  const parts = Object.keys(kitPartIcons) as (keyof typeof kitPartIcons)[];
  const usedCrops = new Set(kits.map((k) => k.crop));
  const usedTopics = new Set(kits.flatMap((k) => k.topics));

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />

        <section aria-labelledby="template" className="mb-12 rounded-[var(--radius-section)] bg-field p-6 text-paper sm:p-8">
          <h2 id="template" className="t-h3">
            {t("templateTitle")}
          </h2>
          <ol className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {parts.map((p, i) => {
              const Icon = kitPartIcons[p];
              return (
                <li
                  key={p}
                  data-reveal
                  style={{ ["--i" as string]: i }}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-white/8 p-4"
                >
                  <span className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-full bg-mustard text-sm font-bold text-ink" lang="en">
                      {i + 1}
                    </span>
                    <Icon className="size-6 text-mustard" aria-hidden="true" />
                  </span>
                  <span className="leading-snug font-semibold">{t(`file_${p}`)}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-5 text-[#d9e8dc]">{t("measure")}</p>
        </section>

        <KitBrowser
          kits={kits.map((k) => ({ slug: k.slug, crop: k.crop, operation: k.operation, topics: k.topics }))}
          cards={Object.fromEntries(kits.map((k) => [k.slug, <KitCard key={k.slug} kit={k} locale={locale} />]))}
          crops={getCrops()
            .filter((c) => usedCrops.has(c.slug))
            .map((c) => ({ id: c.slug, label: tx(c.name, locale) }))}
          operations={getCoreOperations().map((o) => ({ id: o.slug, label: tx(o.name, locale) }))}
          topics={getTopics()
            .filter((x) => usedTopics.has(x.slug))
            .map((x) => ({ id: x.slug, label: tx(x.name, locale) }))}
        />
      </div>
    </PageShell>
  );
}
