import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LearnItem } from "@/content/schema";
import { getFormat } from "@/lib/content";
import { tx } from "@/lib/text";
import { AudioPlayer } from "./AudioPlayer";
import { LiteYouTube } from "./LiteYouTube";
import { formatIcon } from "./formatIcons";

/** A compact inline embed of a Learn & Play item (used inside guides and topic pages). */
export async function LearnMedia({ item, locale }: { item: LearnItem; locale: string }) {
  const t = await getTranslations("learn");
  const title = tx(item.title, locale);
  const Icon = formatIcon[item.format];
  const format = getFormat(item.format);

  return (
    <div className="rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-5 text-primary" aria-hidden="true" />
        <span className="t-small text-muted">{format ? tx(format.name, locale) : ""}</span>
        <Link href={`/learn/${item.slug}`} className="font-semibold hover:underline">
          {title}
        </Link>
      </div>
      {item.media.audio && <AudioPlayer src={item.media.audio} title={title} placeholder={item.sample} />}
      {item.media.youtubeId && <LiteYouTube id={item.media.youtubeId} title={title} />}
      {item.media.pdf && (
        <a
          href={item.media.pdf}
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
        >
          <Download className="size-4" aria-hidden="true" />
          {t("downloadGame")}
        </a>
      )}
    </div>
  );
}
