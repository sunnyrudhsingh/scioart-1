import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { CONTACT_EMAIL } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "privacy" });
  return buildMetadata({ locale, path: "/privacy", title: t("metaTitle"), description: t("metaDescription"), og: "default" });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("privacy");
  const sections = [
    ["s1Title", "s1"],
    ["s2Title", "s2"],
    ["s3Title", "s3"],
    ["s4Title", "s4"],
  ] as const;

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <PageHeader title={t("title")} lead={t("lead")} />
        <div className="prose-x space-y-10">
          {sections.map(([h, p]) => (
            <section key={h}>
              <h2 className="t-h3">{t(h)}</h2>
              <p className="mt-2 text-[1.08rem]">{t(p)}</p>
            </section>
          ))}
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="link font-semibold" lang="en">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
