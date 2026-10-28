"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Pause, Play } from "lucide-react";

/** An infinite, pausable band. The children are rendered twice for a seamless loop. */
export function Marquee({ children, label }: { children: ReactNode; label: string }) {
  const t = useTranslations("common");
  const [paused, setPaused] = useState(false);

  return (
    <div className="marquee relative" data-paused={paused} role="region" aria-label={label}>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max">
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute end-2 -top-14 grid size-11 place-items-center rounded-full border border-line-strong bg-surface hover:border-primary"
        aria-label={paused ? t("playScrolling") : t("pauseScrolling")}
      >
        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
