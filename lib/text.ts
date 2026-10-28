import type { L } from "@/content/schema";

export type Lang = "en" | "pa";

/** Pick the text for the current language. */
export function tx(text: L, locale: string): string {
  return locale === "en" ? text.en : text.pa;
}

/** The other language's text, used for small secondary labels. */
export function txOther(text: L, locale: string): string {
  return locale === "en" ? text.pa : text.en;
}

export const otherLocale = (locale: string): Lang => (locale === "en" ? "pa" : "en");

/** Format an ISO date (YYYY-MM-DD) for display, without timezone surprises. */
export function formatDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale === "en" ? "en-IN" : "pa-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Digits in the reader's script: Gurmukhi numerals are not used for data, so keep Western digits. */
export const num = (n: number) => String(n);

export function todayISO(): string {
  const d = new Date();
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
