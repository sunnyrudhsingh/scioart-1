import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { OperationView } from "@/components/content/OperationView";
import { getCrop, getCrops, getLatestEdition, getOperation, getOperationGuide } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { pageLocale } from "@/lib/page";
import { tx } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCrops().flatMap((c) => c.operations.map((operation) => ({ locale, crop: c.slug, operation }))),
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/crops/[crop]/[operation]">): Promise<Metadata> {
  const { locale, crop: c, operation: o } = await params;
  const crop = getCrop(c);
  const op = getOperation(o);
  if (!crop || !op) return {};
  return buildMetadata({
    locale,
    path: `/crops/${c}/${o}`,
    title: `${tx(op.name, locale)} — ${tx(crop.name, locale)}`,
    description: `${tx(op.short, locale)}. ${tx(crop.description, locale)}`,
    og: `crop:${c}`,
  });
}

export default async function OperationPage({ params }: PageProps<"/[locale]/crops/[crop]/[operation]">) {
  const locale = await pageLocale(params);
  const { crop: c, operation: o } = await params;
  const crop = getCrop(c);
  const op = getOperation(o);
  if (!crop || !op || !crop.operations.includes(o)) notFound();

  return (
    <OperationView
      locale={locale}
      crop={crop}
      operation={op}
      guide={getOperationGuide(c, o)}
      edition={getLatestEdition(crop.publication)}
    />
  );
}
