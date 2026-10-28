import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Advisory } from "@/content/schema";
import { getAdvisoryTypes } from "@/lib/content";
import { formatDate, tx } from "@/lib/text";
import { cn } from "@/lib/cn";

export const advisoryTone: Record<string, string> = {
  alert: "border-s-[#c2410c]",
  seasonal: "border-s-[#e0a526]",
  weather: "border-s-[#5b9cc4]",
  variety: "border-s-[#4fa36b]",
  event: "border-s-[#7a4e2d]",
  news: "border-s-[#1f5e3b]",
};

export async function AdvisoryCard({ advisory, locale, index = 0 }: { advisory: Advisory; locale: string; index?: number }) {
  const t = await getTranslations("advisories");
  const tc = await getTranslations("common");
  const type = getAdvisoryTypes().find((x) => x.id === advisory.type);

  return (
    <Link
      href={`/advisories/${advisory.slug}`}
      data-reveal
      style={{ ["--i" as string]: index }}
      className={cn(
        "group pressable lift shadow-soft flex h-full flex-col rounded-[var(--radius-card)] border-s-[6px] bg-surface p-5 ring-1 ring-line",
        advisoryTone[advisory.type],
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="t-small font-semibold text-muted">{type ? tx(type.name, locale) : advisory.type}</span>
        {advisory.urgent && <span className="rounded-full bg-[#c2410c] px-2 py-0.5 text-xs font-bold text-white">{t("urgent")}</span>}
        {advisory.sample && <span className="sample-badge ms-auto">{tc("sample")}</span>}
      </div>
      <h3 className="mt-3 font-display text-[1.15rem] leading-snug font-semibold">{tx(advisory.title, locale)}</h3>
      <p className="t-small mt-2 text-muted">{tx(advisory.summary, locale)}</p>
      <p className="t-small mt-auto pt-4 text-muted">
        {t("issued")}: {formatDate(advisory.issuedOn, locale)}
      </p>
    </Link>
  );
}
