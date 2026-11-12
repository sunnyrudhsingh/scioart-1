"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Search } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/illustrations/Logo";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { isActive, moreNav, primaryNav, type SectionLink } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function Header({ sections }: { sections: SectionLink[] }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const overlay = pathname === "/";

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const solid = scrolled || !overlay;

  return (
    <header
      data-site-header
      data-scrolled={scrolled}
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] shadow-[0_1px_0_var(--line)] backdrop-blur-md backdrop-saturate-150"
          : "bg-transparent",
        overlay && "-mb-[var(--header-h)]",
      )}
    >
      <div className={cn("container-x flex items-center gap-3 transition-[height] duration-300", scrolled ? "h-14" : "h-16")}>
        <Link href="/" className="me-auto flex h-11 items-center rounded-lg lg:me-6">
          <Logo />
          <span className="sr-only">{t("home")}</span>
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:me-auto lg:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <MoreMenu id="sections-menu" label={t("sections")} pathname={pathname} items={sections} wide />
            </li>
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center rounded-full px-2 font-semibold whitespace-nowrap transition-colors hover:text-primary xl:px-3",
                      active ? "text-primary" : "text-text",
                    )}
                  >
                    {t(item.key)}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-2 bottom-1.5 h-[3px] origin-left rounded-full bg-mustard transition-transform duration-300 xl:inset-x-3",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
            <li>
              <MoreMenu
                id="more-menu"
                label={tc("more")}
                pathname={pathname}
                items={moreNav.map((i) => ({ href: i.href, label: t(i.key) }))}
              />
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-primary hover:text-primary"
            aria-label={tc("search")}
          >
            <Search className="size-[18px]" aria-hidden="true" />
          </Link>
          <LanguageSwitch compact />
          <ThemeToggle className="hidden lg:grid" />
        </div>
      </div>
    </header>
  );
}

function MoreMenu({
  id,
  label,
  pathname,
  items,
  wide,
}: {
  id: string;
  label: string;
  pathname: string;
  items: SectionLink[];
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = items.some((i) => isActive(pathname, i.href));

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 items-center gap-1 rounded-full px-2 font-semibold whitespace-nowrap transition-colors hover:text-primary xl:px-3",
          active && "text-primary",
        )}
      >
        {label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <ul
        id={id}
        hidden={!open}
        className={cn(
          "shadow-lift absolute top-full mt-2 rounded-2xl border border-line bg-surface p-2",
          wide ? "start-0 grid w-[34rem] grid-cols-2 gap-x-1" : "end-0 min-w-56",
        )}
      >
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-xl px-3 font-semibold hover:bg-surface-2 aria-[current=page]:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
