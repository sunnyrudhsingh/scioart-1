import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { TopicIcon } from "@/components/illustrations/FieldIcons";
import { getTopics } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx, txOther } from "@/lib/text";

export async function generateMetadata({ params }: PageProps<"/[locale]/topics">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "topics" });
  return buildMetadata({ locale, path: "/topics", title: t("metaTitle"), description: t("metaDescription"), og: "topics" });
}

export default async function TopicsPage({ params }: PageProps<"/[locale]/topics">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("topics");

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getTopics().map((topic, i) => (
            <li key={topic.slug}>
              <Link
                href={`/topics/${topic.slug}`}
                data-reveal
                style={{ ["--i" as string]: i % 6 }}
                className="group pressable lift shadow-soft flex h-full gap-4 rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line"
              >
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent-soft text-primary transition-transform duration-500 group-hover:rotate-6">
                  <TopicIcon name={topic.icon} className="size-10" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.2rem] leading-snug font-semibold">{tx(topic.name, locale)}</span>
                  <span className="t-small block text-muted" lang={locale === "en" ? "pa" : "en"}>
                    {txOther(topic.name, locale)}
                  </span>
                  <span className="mt-2 block text-[0.98rem]">{tx(topic.short, locale)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
