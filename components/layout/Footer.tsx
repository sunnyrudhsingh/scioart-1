import { getTranslations } from "next-intl/server";
import { BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/illustrations/Logo";
import { SoilLayers } from "@/components/illustrations/Decor";
import { LanguageSwitch } from "./LanguageSwitch";
import { CONTACT_EMAIL } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const groups = [
    {
      title: t("explore"),
      links: [
        { href: "/crops", label: nav("crops") },
        { href: "/topics", label: nav("topics") },
        { href: "/calendar", label: nav("calendar") },
        { href: "/advisories", label: nav("advisories") },
      ],
    },
    {
      title: t("learn"),
      links: [
        { href: "/learn", label: nav("learn") },
        { href: "/extension", label: nav("extension") },
        { href: "/resources", label: nav("resources") },
        { href: "/ask", label: nav("ask") },
      ],
    },
    {
      title: t("info"),
      links: [
        { href: "/about", label: nav("about") },
        { href: "/privacy", label: nav("privacy") },
        { href: "/search", label: nav("search") },
      ],
    },
  ];

  return (
    <footer data-site-footer className="relative mt-24 bg-surface-2 pb-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] lg:pb-0">
      <SoilLayers className="absolute inset-x-0 -top-10 h-10 w-full" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-muted">{t("about")}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-semibold text-primary">
            <BadgeCheck className="size-5" aria-hidden="true" />
            {t("reviewed")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="t-label mb-3">{g.title}</h2>
              <ul className="space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-primary hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3">
            <h2 className="t-label mb-2">{t("contact")}</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className="link" lang="en">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="t-small text-muted">{t("rights", { year })}</p>
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
