import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CalendarClock, CalendarDays, MapPin, Wheat } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SampleBanner } from "@/components/content/SampleBanner";
import { ShareButton } from "@/components/content/ShareButton";
import { advisoryTone } from "@/components/content/AdvisoryCard";
import { getAdvisories, getAdvisory, getAdvisoryTypes, getCrop, getLocation } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { SITE_URL } from "@/lib/site";
import { formatDate, tx } from "@/lib/text";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAdvisories().map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/advisories/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = getAdvisory(slug);
  if (!a) return {};
  return buildMetadata({
    locale,
    path: `/advisories/${slug}`,
    title: tx(a.title, locale),
    description: tx(a.summary, locale),
    og: "advisories",
  });
}

export default async function AdvisoryPage({ params }: PageProps<"/[locale]/advisories/[slug]">) {
  const locale = await pageLocale(params);
  const { slug } = await params;
  const a = getAdvisory(slug);
  if (!a) notFound();

  const t = await getTranslations("advisories");
  const tc = await getTranslations("common");
  const type = getAdvisoryTypes().find((x) => x.id === a.type);
  const title = tx(a.title, locale);
  const region =
    a.districts.length === 0 ? t("allPunjab") : a.districts.map((d) => (getLocation(d) ? tx(getLocation(d)!.name, locale) : d)).join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: a.issuedOn,
    expires: a.validUntil,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: "SciOArt", url: SITE_URL },
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="container-x">
        <Breadcrumbs locale={locale} items={[{ href: "/advisories", label: t("title") }, { label: title }]} />
        <header
          className={cn(
            "mt-6 rounded-[var(--radius-section)] border-s-[8px] bg-surface p-6 ring-1 ring-line sm:p-10",
            advisoryTone[a.type],
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-muted">{type ? tx(type.name, locale) : a.type}</span>
            {a.urgent && <span className="rounded-full bg-[#c2410c] px-2.5 py-0.5 text-sm font-bold text-white">{t("urgent")}</span>}
          </div>
          <h1 className="t-h1 mt-3 max-w-3xl">{title}</h1>
          <p className="t-lead mt-3 max-w-2xl">{tx(a.summary, locale)}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-2">
              <CalendarDays className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div>
                <dt className="t-small text-muted">{t("issued")}</dt>
                <dd className="font-semibold">{formatDate(a.issuedOn, locale)}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CalendarClock className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div>
                <dt className="t-small text-muted">{t("validUntil")}</dt>
                <dd className="font-semibold">{formatDate(a.validUntil, locale)}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div>
                <dt className="t-small text-muted">{t("region")}</dt>
                <dd className="font-semibold">{region}</dd>
              </div>
            </div>
            {a.crops.length > 0 && (
              <div className="flex items-start gap-2">
                <Wheat className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                <div>
                  <dt className="t-small text-muted">{t("crops")}</dt>
                  <dd className="flex flex-wrap gap-x-2 font-semibold">
                    {a.crops.map((c) => {
                      const crop = getCrop(c);
                      return crop ? (
                        <Link key={c} href={`/crops/${c}`} className="hover:underline">
                          {tx(crop.name, locale)}
                        </Link>
                      ) : null;
                    })}
                  </dd>
                </div>
              </div>
            )}
          </dl>
        </header>

        {a.sample && <SampleBanner text={tc("sampleItem")} />}

        <div className="prose-x space-y-4 py-8 text-[1.1rem]">
          {a.body.map((p, i) => (
            <p key={i}>{tx(p, locale)}</p>
          ))}
        </div>
        <ShareButton title={title} />
      </article>
    </PageShell>
  );
}
