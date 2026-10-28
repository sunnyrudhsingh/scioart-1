import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Punjabi first: it is the default language for farmers in Punjab.
  locales: ["pa", "en"],
  defaultLocale: "pa",
  localePrefix: "always",
  // "/" uses the saved choice (NEXT_LOCALE cookie), then the browser language, then Punjabi.
  localeDetection: true,
  // Pages print their own hreflang tags with the real domain (lib/metadata.ts).
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
