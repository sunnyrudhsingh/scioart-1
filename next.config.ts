import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSerwist } from "@serwist/turbopack";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const L = "/:locale(pa|en)";

/** Learn & Play items from version 1 and the library section they moved to. */
const movedItems: Record<string, string> = {
  "ipm-snakes-and-ladders": "games",
  "weed-watch-cards": "games",
  "song-of-the-soil": "scientific-songs",
  "every-drop-counts-song": "scientific-songs",
  "straw-is-gold-jingle": "jingles",
  "ipm-basics-module": "e-modules",
  "kheti-gal-baat-episode-1": "podcasts",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The OG image route reads these font files at request time.
  outputFileTracingIncludes: {
    "/og": ["./assets/og-fonts/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Version 1 pages (farm advice, calendar, Ask an Expert, kits, advisories)
  // were removed when SciOArt became a library. Old links land somewhere useful.
  async redirects() {
    const toHome = ["/calendar", "/ask", "/advisories", "/advisories/:path*", "/extension", "/extension/:path*", "/for/:path*"];
    return [
      ...Object.entries(movedItems).map(([slug, category]) => ({
        source: `${L}/learn/${slug}`,
        destination: `/:locale/${category}/${slug}`,
        permanent: true,
      })),
      { source: `${L}/learn`, destination: "/:locale/library", permanent: true },
      { source: `${L}/learn/:path*`, destination: "/:locale/library", permanent: true },
      ...toHome.map((p) => ({ source: `${L}${p}`, destination: "/:locale", permanent: true })),
      { source: `${L}/crops/:crop/:rest+`, destination: "/:locale/crops/:crop", permanent: true },
      { source: `${L}/resources/editions`, destination: "/:locale/resources", permanent: true },
      { source: `${L}/resources/leaflets`, destination: "/:locale/resources", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/samples/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default withSerwist(withNextIntl(nextConfig));
