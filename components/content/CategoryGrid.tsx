import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { countByCategory, getCategories } from "@/lib/content";
import { tx, txOther } from "@/lib/text";
import { categoryIcon, categoryTint } from "./categoryIcons";
import { cn } from "@/lib/cn";

/** The library's sections as big buttons: icon, name in both languages, one line and how many items. */
export async function CategoryGrid({ locale, className }: { locale: string; className?: string }) {
  const t = await getTranslations("library");
  const counts = countByCategory();

  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
      {getCategories().map((c, i) => {
        const Icon = categoryIcon[c.id];
        return (
          <li key={c.id}>
            <Link
              href={`/${c.id}`}
              data-reveal
              style={{ ["--i" as string]: i % 8 }}
              className="group pressable lift shadow-soft flex h-full min-h-36 flex-col rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line hover:ring-primary sm:p-5"
            >
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6",
                  categoryTint(c),
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="mt-3 font-display text-[1.15rem] leading-snug font-semibold sm:text-[1.25rem]">{tx(c.name, locale)}</span>
              <span className="t-small text-muted" lang={locale === "en" ? "pa" : "en"}>
                {txOther(c.name, locale)}
              </span>
              <span className="t-small mt-2 hidden text-muted sm:block">{tx(c.short, locale)}</span>
              <span className="t-small mt-auto pt-3 font-semibold text-primary">{t("count", { count: counts[c.id] ?? 0 })}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
