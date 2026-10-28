import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  CalendarDays,
  Download,
  FileArchive,
  Gamepad2,
  GraduationCap,
  Library,
  Megaphone,
  MessageCircleQuestion,
  Microscope,
  Music,
  Puzzle,
  Share2,
  Sprout,
  Tractor,
  Presentation,
  FlaskConical,
  BookA,
  Shapes,
} from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/motion/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LearnCard } from "@/components/content/LearnCard";
import { KitCard } from "@/components/content/KitCard";
import { getAudience, getAudiences, getKits, getLearnItems } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";
import type { AudienceId } from "@/content/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAudiences().map((a) => ({ locale, audience: a.id })));
}

const heroIcon = { farmers: Tractor, "extension-workers": Presentation, students: GraduationCap, researchers: FlaskConical };

const starts: Record<AudienceId, { href: string; Icon: typeof Sprout }[]> = {
  farmers: [
    { href: "/calendar", Icon: CalendarDays },
    { href: "/advisories", Icon: Megaphone },
    { href: "/ask", Icon: MessageCircleQuestion },
    { href: "/learn", Icon: Music },
  ],
  "extension-workers": [
    { href: "/extension", Icon: Download },
    { href: "/learn", Icon: Puzzle },
    { href: "/advisories", Icon: Share2 },
    { href: "/extension", Icon: FileArchive },
  ],
  students: [
    { href: "/crops", Icon: Sprout },
    { href: "/learn/ipm-basics-module", Icon: Gamepad2 },
    { href: "/resources/glossary", Icon: BookA },
    { href: "/topics", Icon: Shapes },
  ],
  researchers: [
    { href: "/resources/editions", Icon: Library },
    { href: "/resources/research", Icon: Microscope },
    { href: "/learn", Icon: Gamepad2 },
    { href: "/extension", Icon: FileArchive },
  ],
};

export async function generateMetadata({ params }: PageProps<"/[locale]/for/[audience]">): Promise<Metadata> {
  const { locale, audience } = await params;
  const a = getAudience(audience);
  if (!a) return {};
  const t = await getTranslations({ locale: locale as "pa" | "en", namespace: "audiences" });
  return buildMetadata({
    locale,
    path: `/for/${audience}`,
    title: tx(a.name, locale),
    description: t("metaDescription", { audience: tx(a.name, locale) }),
    og: "default",
  });
}

export default async function AudiencePage({ params }: PageProps<"/[locale]/for/[audience]">) {
  const locale = await pageLocale(params);
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) notFound();

  const t = await getTranslations("audiences");
  const Icon = heroIcon[a.id];
  const learn = getLearnItems({ audience: a.id }).slice(0, 3);
  const kits = a.id === "extension-workers" || a.id === "researchers" ? getKits() : [];

  return (
    <PageShell>
      <div className="container-x">
        <Breadcrumbs locale={locale} items={[{ label: tx(a.name, locale) }]} />
        <header className="furrows relative mt-6 overflow-hidden rounded-[var(--radius-section)] bg-field px-6 py-12 text-paper sm:px-12 sm:py-16">
          <Icon className="absolute -end-6 -bottom-8 size-56 text-white/10" aria-hidden="true" />
          <span className="grid size-16 place-items-center rounded-full bg-mustard text-ink">
            <Icon className="size-8" aria-hidden="true" />
          </span>
          <h1 className="t-h1 mt-5">{tx(a.name, locale)}</h1>
          <p className="mt-3 max-w-2xl text-[1.2rem] text-[#d9e8dc]">{tx(a.intro, locale)}</p>
        </header>

        <section aria-labelledby="start" className="py-12">
          <h2 id="start" className="t-h2 mb-6">
            {t("startHere")}
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {starts[a.id].map(({ href, Icon: I }, i) => (
              <li key={i}>
                <Link
                  href={href}
                  data-reveal
                  style={{ ["--i" as string]: i }}
                  className="group pressable lift shadow-soft flex min-h-20 items-center gap-4 rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-primary">
                    <I className="size-6" aria-hidden="true" />
                  </span>
                  <span className="text-[1.1rem] font-semibold">{t(`${a.id}_${i + 1}` as "farmers_1")}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {(learn.length > 0 || kits.length > 0) && (
          <section aria-labelledby="featured" className="py-6">
            <h2 id="featured" className="t-h2 mb-6">
              {t("featured")}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {kits.slice(0, 2).map((k, i) => (
                <li key={k.slug}>
                  <KitCard kit={k} locale={locale} index={i} />
                </li>
              ))}
              {learn.map((item, i) => (
                <li key={item.slug}>
                  <LearnCard item={item} locale={locale} index={i + 2} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
