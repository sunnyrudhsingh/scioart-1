import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, UserRound } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/Section";
import { LogoMark } from "@/components/illustrations/Logo";
import { WheatStalkLine, LeafSprig } from "@/components/illustrations/Decor";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { CONTACT_EMAIL } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "about" });
  return buildMetadata({ locale, path: "/about", title: t("metaTitle"), description: t("metaDescription"), og: "default" });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await pageLocale(params);
  const t = await getTranslations("about");

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: t("title") }]} />
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <PageHeader title={t("title")} lead={t("lead")} />
          <LogoMark className="mx-auto hidden size-40 md:block" />
        </div>

        <section aria-labelledby="mission" className="rounded-[var(--radius-section)] bg-field px-6 py-10 text-paper sm:px-12">
          <h2 id="mission" className="t-h3 text-mustard">
            {t("missionTitle")}
          </h2>
          <p className="mt-3 max-w-3xl font-display text-[clamp(1.4rem,2vw+1rem,2.1rem)] leading-snug">{t("mission")}</p>
        </section>

        <section aria-labelledby="story" className="grid gap-10 py-16 md:grid-cols-[auto_1fr]">
          <WheatStalkLine className="mx-auto h-56 w-16 text-wheat" />
          <div className="prose-x" data-reveal>
            <h2 id="story" className="t-h2">
              {t("storyTitle")}
            </h2>
            <p className="mt-4 text-[1.1rem]">{t("story1")}</p>
            <p className="mt-4 text-[1.1rem]">{t("story2")}</p>
          </div>
        </section>

        <section aria-labelledby="team" className="py-8">
          <h2 id="team" className="t-h2 mb-6">
            {t("teamTitle")}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {(["teamRole1", "teamRole2", "teamRole3"] as const).map((role, i) => (
              <li
                key={role}
                data-reveal
                style={{ ["--i" as string]: i }}
                className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line"
              >
                <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-primary">
                  <UserRound className="size-8" aria-hidden="true" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold">{t("teamName")}</p>
                <p className="t-small text-muted">{t(role)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="partners" className="py-8">
          <h2 id="partners" className="t-h2 mb-4">
            {t("partnersTitle")}
          </h2>
          <p className="prose-x text-[1.1rem]">{t("partners")}</p>
        </section>

        <section aria-labelledby="review" className="py-8">
          <h2 id="review" className="t-h2 mb-6">
            {t("reviewTitle")}
          </h2>
          <ol className="grid gap-4 md:grid-cols-4">
            {(["review1", "review2", "review3", "review4"] as const).map((k, i) => (
              <li key={k} data-reveal style={{ ["--i" as string]: i }} className="rounded-[var(--radius-card)] bg-surface-2 p-5">
                <span className="grid size-9 place-items-center rounded-full bg-primary font-bold text-on-primary" lang="en">
                  {i + 1}
                </span>
                <p className="mt-3">{t(k)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="contact"
          className="relative mt-8 overflow-hidden rounded-[var(--radius-section)] bg-surface-2 px-6 py-10 sm:px-10"
        >
          <LeafSprig className="absolute end-6 top-6 h-12 w-24 text-leaf" />
          <h2 id="contact" className="t-h2">
            {t("contactTitle")}
          </h2>
          <p className="mt-3 text-[1.1rem]">{t("contact")}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
            lang="en"
          >
            <Mail className="size-5" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <p className="mt-5">
            <Link href="/ask" className="link font-semibold">
              {t("contactAsk")}
            </Link>
          </p>
        </section>
      </div>
    </PageShell>
  );
}
