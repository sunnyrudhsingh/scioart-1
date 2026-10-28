import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WifiOff } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Scarecrow } from "@/components/illustrations/Decor";
import { ButtonLink } from "@/components/ui/Button";
import { pageLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/offline">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "offline" });
  return { title: t("metaTitle"), robots: { index: false } };
}

/** Shown by the service worker when a page isn't cached and there is no connection. */
export default async function OfflinePage({ params }: PageProps<"/[locale]/offline">) {
  await pageLocale(params);
  const t = await getTranslations("offline");
  return (
    <div className="container-x grid min-h-[70vh] items-center gap-10 py-16 md:grid-cols-2">
      <Scarecrow className="mx-auto w-full max-w-sm" />
      <div>
        <WifiOff className="size-12 text-wheat" aria-hidden="true" />
        <h1 className="t-h1 mt-4">{t("title")}</h1>
        <p className="t-lead mt-4 max-w-lg">{t("text")}</p>
        <ButtonLink href="/" className="mt-8">
          {t("retry")}
        </ButtonLink>
      </div>
    </div>
  );
}
