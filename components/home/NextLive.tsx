"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Radio } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Item = { href: string; title: string; when: string; start: number; end: number };

/**
 * Home page band: the program on air now, else the next one coming up,
 * else the latest recording. Worked out on the visitor's clock.
 */
export function NextLive({ items, builtAt }: { items: Item[]; builtAt: number }) {
  const t = useTranslations("live");
  const [now, setNow] = useState(builtAt);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const onAir = items.find((i) => i.start <= now && now < i.end);
  const next = items.filter((i) => now < i.start).sort((a, b) => a.start - b.start)[0];
  const last = items.filter((i) => i.end <= now).sort((a, b) => b.start - a.start)[0];
  const pick = onAir ?? next ?? last;
  if (!pick) return null;
  const label = onAir ? t("onAirBadge") : next ? t("nextLive") : t("latestRecording");

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius-section)] bg-field p-6 text-paper sm:flex-row sm:items-center sm:p-8">
      <span aria-hidden="true" className="absolute inset-y-0 start-0 w-2" style={{ background: "var(--mustard)" }} />
      <span className="flex items-center gap-3">
        <span
          className={
            onAir
              ? "glow grid size-12 shrink-0 place-items-center rounded-full bg-[#d6402b] text-white"
              : "grid size-12 shrink-0 place-items-center rounded-full bg-white/10 text-mustard"
          }
        >
          <Radio className="size-6" aria-hidden="true" />
        </span>
        <span className="font-semibold text-mustard">{label}</span>
      </span>
      <span className="min-w-0 flex-1">
        <Link href={pick.href} className="font-display text-[1.3rem] leading-snug font-semibold hover:underline">
          {pick.title}
        </Link>
        <span className="t-small mt-1 block opacity-80">{pick.when}</span>
      </span>
      <Link
        href="/live"
        className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-mustard px-6 font-semibold text-ink hover:brightness-105"
      >
        {t("allLive")}
      </Link>
    </div>
  );
}
