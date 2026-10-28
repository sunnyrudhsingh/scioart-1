import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { OperationView } from "@/components/content/OperationView";
import { getArchivedGuideParams, getCrop, getEdition, getOperation, getOperationGuide } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export const dynamicParams = false;

// Archived (superseded) editions that have content, e.g. /crops/wheat/irrigation/rabi-2025
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getArchivedGuideParams().map((p) => ({ locale, ...p })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/crops/[crop]/[operation]/[edition]">): Promise<Metadata> {
  const { locale, crop: c, operation: o, edition: e } = await params;
  const crop = getCrop(c);
  const op = getOperation(o);
  const ed = getEdition(e);
  if (!crop || !op || !ed) return {};
  const meta = buildMetadata({
    locale,
    path: `/crops/${c}/${o}/${e}`,
    title: `${tx(op.name, locale)} — ${tx(crop.name, locale)} (${tx(ed.label, locale)})`,
    description: tx(op.short, locale),
    og: `crop:${c}`,
  });
  // Older editions should not compete with the current page in search results.
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function ArchivedOperationPage({ params }: PageProps<"/[locale]/crops/[crop]/[operation]/[edition]">) {
  const locale = await pageLocale(params);
  const { crop: c, operation: o, edition: e } = await params;
  const crop = getCrop(c);
  const op = getOperation(o);
  const edition = getEdition(e);
  const guide = getOperationGuide(c, o, e);
  if (!crop || !op || !edition || !guide) notFound();

  return <OperationView locale={locale} crop={crop} operation={op} guide={guide} edition={edition} />;
}
