import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/app/fonts";
import { clientMessages, type Messages } from "@/messages";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { RegionProvider } from "@/components/layout/RegionProvider";
import { themeScript } from "@/components/layout/ThemeToggle";
import { AdvisoryBanner } from "@/components/content/AdvisoryBanner";
import { PwaProvider } from "@/components/layout/PwaProvider";
import { getAdvisories, getLocations } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "home" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("metaTitle"), template: "%s · SciOArt" },
    description: t("metaDescription"),
    applicationName: "SciOArt",
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: "SciOArt", statusBarStyle: "default" },
    formatDetection: { telephone: false },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icons/icon-192.png", sizes: "192x192" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1912" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  const messages = (await getMessages()) as Messages;
  const tc = await getTranslations("common");
  const urgent = getAdvisories().filter((a) => a.urgent);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed start-3 top-3 z-[100] -translate-y-24 rounded-full bg-primary px-5 py-3 font-semibold text-on-primary transition-transform focus:translate-y-0"
        >
          {tc("skip")}
        </a>
        <NextIntlClientProvider messages={clientMessages(messages)}>
          <PwaProvider>
            <RegionProvider locations={getLocations()}>
              <AdvisoryBanner advisories={urgent} />
              <Header />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <Footer />
              <BottomNav />
            </RegionProvider>
          </PwaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
