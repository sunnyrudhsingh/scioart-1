import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

/** Common setup for every page: enable static rendering for this locale. */
export async function pageLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return locale as Locale;
}
