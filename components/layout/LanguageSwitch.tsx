"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/** Switches between ਪੰਜਾਬੀ and English on the same page, keeping scroll position and query. */
export function LanguageSwitch({ className, compact = false }: { className?: string; compact?: boolean }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, start] = useTransition();
  const next = locale === "en" ? "pa" : "en";

  return (
    <button
      type="button"
      lang={next}
      title={t("otherLanguageLabel")}
      onClick={() => {
        const search = typeof window !== "undefined" ? window.location.search : "";
        start(() => {
          router.replace(`${pathname}${search}`, { locale: next, scroll: false });
        });
      }}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-3.5 font-semibold transition-colors hover:border-primary hover:text-primary",
        pending && "opacity-60",
        className,
      )}
    >
      <Languages className="size-[18px] shrink-0" aria-hidden="true" />
      <span className={cn(compact && "max-sm:sr-only")}>{t("otherLanguage")}</span>
    </button>
  );
}
