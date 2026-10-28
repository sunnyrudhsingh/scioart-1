import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

type Args = {
  locale: string;
  /** Path without the locale prefix, e.g. "/crops/wheat" or "/". */
  path: string;
  title: string;
  description: string;
  /** Which Open Graph artwork to use (see app/og/route.tsx). */
  og?: string;
  /** Use the title exactly, without the " · SciOArt" suffix. */
  absoluteTitle?: boolean;
};

export function ogImageUrl(locale: string, title: string, kind = "default") {
  const qs = new URLSearchParams({ l: locale, t: title, k: kind });
  return `/og?${qs.toString()}`;
}

export function buildMetadata({ locale, path, title, description, og = "default", absoluteTitle }: Args): Metadata {
  const p = path === "/" ? "" : path;
  const url = `${SITE_URL}/${locale}${p}`;
  const image = ogImageUrl(locale, title, og);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${p}`,
        pa: `${SITE_URL}/pa${p}`,
        "x-default": `${SITE_URL}/pa${p}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_IN" : "pa_IN",
      alternateLocale: locale === "en" ? ["pa_IN"] : ["en_IN"],
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
