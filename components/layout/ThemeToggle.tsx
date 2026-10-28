"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { KEYS, writeStore } from "@/lib/storage";
import { cn } from "@/lib/cn";

const subscribe = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const getTheme = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("common");
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  const toDark = theme !== "dark";

  return (
    <button
      type="button"
      onClick={() => {
        const next = toDark ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        writeStore(KEYS.theme, next);
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0e1912" : "#fbf7ef");
      }}
      aria-label={toDark ? t("themeToDark") : t("themeToLight")}
      className={cn(
        "grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-primary hover:text-primary",
        className,
      )}
    >
      {toDark ? <Moon className="size-[18px]" aria-hidden="true" /> : <Sun className="size-[18px]" aria-hidden="true" />}
    </button>
  );
}

/** Inline script for <head>: applies the saved or system theme before first paint. */
export const themeScript = `(function(){try{var d=document.documentElement;var s=localStorage.getItem('${KEYS.theme}');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;d.dataset.theme=s||(m?'dark':'light');}catch(e){}document.documentElement.classList.add('js');})();`;
