"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Radio } from "lucide-react";

/** On a live program's page: whether it is coming up, on air or over, and the link to watch it live. */
export function LiveStatus({
  start,
  end,
  url,
  platform,
  when,
  hasRecording,
  builtAt,
}: {
  start: number;
  end: number;
  url: string;
  platform: "youtube" | "facebook" | "other";
  /** The start time, already written out for the reader. */
  when: string;
  hasRecording: boolean;
  builtAt: number;
}) {
  const t = useTranslations("live");
  const [now, setNow] = useState(builtAt);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const state = now < start ? "upcoming" : now < end ? "onAir" : "past";
  const where = platform === "youtube" ? "YouTube" : platform === "facebook" ? "Facebook" : "";

  return (
    <div className="rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line sm:p-6" aria-live="polite">
      <p className="flex items-center gap-2 font-semibold">
        {state === "onAir" ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d6402b] px-3 py-1 text-white">
            <Radio className="size-4" aria-hidden="true" />
            {t("onAirBadge")}
          </span>
        ) : (
          <span className="rounded-full bg-surface-2 px-3 py-1">{state === "upcoming" ? t("upcomingBadge") : t("pastBadge")}</span>
        )}
      </p>
      <p className="mt-3 font-display text-[1.35rem] font-semibold">{when}</p>
      <p className="t-small text-muted">{t("indiaTime")}</p>
      {state !== "past" &&
        (url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
          >
            <ExternalLink className="size-5" aria-hidden="true" />
            {where ? t("watchOn", { where }) : t("watchLive")}
            <span className="sr-only">({t("newTab")})</span>
          </a>
        ) : (
          <p className="mt-4 rounded-xl bg-surface-2 px-3 py-2">{t("linkSoon")}</p>
        ))}
      {state === "past" && !hasRecording && <p className="mt-4 rounded-xl bg-surface-2 px-3 py-2">{t("recordingSoon")}</p>}
    </div>
  );
}
