import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { LearnItem } from "@/content/schema";
import { getFormat } from "@/lib/content";
import { tx } from "@/lib/text";
import { formatIcon } from "./formatIcons";
import { cn } from "@/lib/cn";

const formatTint: Record<string, string> = {
  game: "bg-[#fbefd0] text-[#7a5200] dark:bg-[#33290f] dark:text-[#f2c860]",
  song: "bg-[#e2f0e5] text-[#236b3d] dark:bg-[#183022] dark:text-[#8fd4a6]",
  jingle: "bg-[#fdebd8] text-[#9a4a07] dark:bg-[#352312] dark:text-[#f7b26b]",
  video: "bg-[#e1eef6] text-[#1d5878] dark:bg-[#132634] dark:text-[#9cc9e3]",
  emodule: "bg-[#ece6f6] text-[#4c3a7a] dark:bg-[#231d33] dark:text-[#c3b3ec]",
  quiz: "bg-[#fbe3de] text-[#a12a1a] dark:bg-[#361a15] dark:text-[#f29a8a]",
  story: "bg-[#f1e6da] text-[#6a4024] dark:bg-[#2e2218] dark:text-[#d9ab83]",
  podcast: "bg-[#e2f0e5] text-[#236b3d] dark:bg-[#183022] dark:text-[#8fd4a6]",
  "play-film": "bg-[#e1eef6] text-[#1d5878] dark:bg-[#132634] dark:text-[#9cc9e3]",
};

export async function LearnCard({
  item,
  locale,
  index = 0,
  large = false,
}: {
  item: LearnItem;
  locale: string;
  index?: number;
  large?: boolean;
}) {
  const t = await getTranslations("common");
  const Icon = formatIcon[item.format];
  const format = getFormat(item.format);

  return (
    <Link
      href={`/learn/${item.slug}`}
      data-reveal
      style={{ ["--i" as string]: index % 8 }}
      className="group pressable lift shadow-soft relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line"
    >
      {large && (
        <Icon
          aria-hidden="true"
          strokeWidth={1}
          className="absolute -end-8 -bottom-8 size-56 text-primary opacity-[0.09] transition-transform duration-700 group-hover:-rotate-6"
        />
      )}
      <div className="flex items-center justify-between gap-3">
        <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold", formatTint[item.format])}>
          <Icon className="size-4" aria-hidden="true" />
          {format ? tx(format.name, locale) : item.format}
        </span>
        {item.sample && <span className="sample-badge">{t("sample")}</span>}
      </div>
      <h3 className={cn("mt-4 font-display leading-snug font-semibold", large ? "text-[1.6rem]" : "text-[1.2rem]")}>
        {tx(item.title, locale)}
      </h3>
      <p className="t-small relative mt-2 max-w-sm text-muted">{tx(item.description, locale)}</p>
      <span className="t-small mt-auto inline-flex items-center gap-1.5 pt-4 text-muted">
        <Clock className="size-4" aria-hidden="true" />
        {tx(item.duration, locale)}
      </span>
    </Link>
  );
}
