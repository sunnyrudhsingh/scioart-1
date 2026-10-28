"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, Gamepad2, House, LayoutGrid, Wheat } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { isActive, mobileMoreNav } from "@/lib/nav";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { RegionChip } from "./RegionChip";
import { cn } from "@/lib/cn";

const items = [
  { href: "/", key: "home", Icon: House },
  { href: "/crops", key: "crops", Icon: Wheat },
  { href: "/calendar", key: "calendarShort", Icon: CalendarDays },
  { href: "/learn", key: "learnShort", Icon: Gamepad2 },
] as const;

export function BottomNav() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const sheet = useRef<HTMLDialogElement>(null);

  const activeIndex = items.findIndex((i) => isActive(pathname, i.href));
  const moreActive = activeIndex === -1 && mobileMoreNav.some((i) => isActive(pathname, i.href));
  const index = activeIndex === -1 ? (moreActive ? 4 : -1) : activeIndex;

  useEffect(() => {
    sheet.current?.close();
  }, [pathname]);

  return (
    <>
      <nav
        data-bottom-nav
        aria-label={t("mobile")}
        style={{ viewTransitionName: "bottom-nav" }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="relative mx-auto grid h-[var(--bottom-nav-h)] max-w-xl grid-cols-5">
          {index >= 0 && (
            <span
              aria-hidden="true"
              className="absolute start-0 top-2 h-10 w-1/5 px-2 transition-transform duration-500 ease-[var(--ease-out-soft)]"
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              <span className="block h-full rounded-full bg-accent-soft" />
            </span>
          )}
          {items.map(({ href, key, Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-full flex-col items-center justify-center gap-0.5 text-[0.75rem] leading-tight font-semibold",
                    active ? "text-primary" : "text-muted",
                  )}
                >
                  <Icon className="mt-1 size-[22px]" aria-hidden="true" />
                  <span className="max-w-full truncate px-1">{t(key)}</span>
                </Link>
              </li>
            );
          })}
          <li className="relative">
            <button
              type="button"
              onClick={() => sheet.current?.showModal()}
              aria-haspopup="dialog"
              className={cn(
                "flex h-full w-full flex-col items-center justify-center gap-0.5 text-[0.75rem] leading-tight font-semibold",
                moreActive ? "text-primary" : "text-muted",
              )}
            >
              <LayoutGrid className="mt-1 size-[22px]" aria-hidden="true" />
              <span>{tc("more")}</span>
            </button>
          </li>
        </ul>
      </nav>

      <dialog
        ref={sheet}
        className="sheet lg:hidden"
        aria-labelledby="more-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) sheet.current?.close();
        }}
      >
        <div className="px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line-strong" aria-hidden="true" />
          <h2 id="more-title" className="t-h3 mb-3">
            {t("moreTitle")}
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {mobileMoreNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center rounded-2xl bg-surface-2 px-4 leading-snug font-semibold aria-[current=page]:bg-accent-soft aria-[current=page]:text-primary"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="t-label mt-6 mb-2">{t("settings")}</h3>
          <div className="flex flex-wrap items-center gap-2">
            <RegionChip />
            <LanguageSwitch />
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => sheet.current?.close()}
            className="mt-6 h-12 w-full rounded-full border border-line-strong font-semibold"
          >
            {tc("close")}
          </button>
        </div>
      </dialog>
    </>
  );
}
