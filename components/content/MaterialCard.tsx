import { CalendarClock, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Material } from "@/content/schema";
import { getCategory, materialHref } from "@/lib/content";
import { isRealYouTubeId, youTubeThumb } from "@/lib/media";
import { formatDateTime, tx } from "@/lib/text";
import { categoryIcon, categoryTint } from "./categoryIcons";
import { PhulkariTexture } from "@/components/illustrations/Phulkari";
import { cn } from "@/lib/cn";

/** A library item as a card: a picture panel (cover, video still, or the category's icon) over its title. */
export async function MaterialCard({
  item,
  locale,
  index = 0,
  large = false,
  headingLevel = 3,
}: {
  item: Material;
  locale: string;
  index?: number;
  large?: boolean;
  headingLevel?: 2 | 3;
}) {
  const t = await getTranslations("common");
  const category = getCategory(item.category)!;
  const Icon = categoryIcon[item.category];
  const tint = categoryTint(category);
  const picture = item.media.cover ?? (isRealYouTubeId(item.media.youtubeId) ? youTubeThumb(item.media.youtubeId) : undefined);
  const Heading = `h${headingLevel}` as const;

  return (
    <Link
      href={materialHref(item)}
      data-reveal
      style={{ ["--i" as string]: index % 8 }}
      className="group pressable lift shadow-soft relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface ring-1 ring-line"
    >
      <div className={cn("relative grid place-items-center overflow-hidden", large ? "aspect-[16/9]" : "aspect-[16/8]", tint)}>
        {picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={picture}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            <PhulkariTexture className="opacity-[0.07]" />
            <Icon
              aria-hidden="true"
              strokeWidth={1.25}
              className={cn("relative transition-transform duration-700 group-hover:-rotate-6", large ? "size-28" : "size-16")}
            />
          </>
        )}
        <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 text-sm font-semibold text-text backdrop-blur">
          <Icon className="size-4" aria-hidden="true" />
          {tx(category.name, locale)}
        </span>
        {item.sample && <span className="sample-badge absolute end-3 top-3">{t("sample")}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className={cn("font-display leading-snug font-semibold", large ? "text-[1.5rem]" : "text-[1.15rem]")}>
          {tx(item.title, locale)}
        </Heading>
        <p className="t-small mt-2 line-clamp-3 text-muted">{tx(item.description, locale)}</p>
        <span className="t-small mt-auto inline-flex items-center gap-1.5 pt-4 text-muted">
          {item.live ? (
            <>
              <CalendarClock className="size-4" aria-hidden="true" />
              {formatDateTime(item.live.startsAt, locale)}
            </>
          ) : (
            <>
              <Clock className="size-4" aria-hidden="true" />
              {tx(item.duration, locale)}
            </>
          )}
        </span>
      </div>
    </Link>
  );
}
