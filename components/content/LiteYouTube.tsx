"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

const isRealId = (id: string) => /^[A-Za-z0-9_-]{11}$/.test(id) && !id.startsWith("SAMPLE");

/**
 * A YouTube "facade": shows a light preview and only loads the heavy
 * player after a tap. Placeholder IDs show a clear message instead.
 */
export function LiteYouTube({ id, title, className }: { id: string; title: string; className?: string }) {
  const t = useTranslations("learn");
  const [open, setOpen] = useState(false);
  const real = isRealId(id);

  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-ink", className)}>
      {open && real ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group absolute inset-0 grid place-items-center text-paper"
          aria-label={t("playVideo", { title })}
        >
          {real ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-80"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 80% at 70% 30%, rgb(242 194 48 / .35), transparent 60%), linear-gradient(160deg, #1f5e3b, #0e1912)",
              }}
            />
          )}
          <span className="shadow-lift relative grid size-18 place-items-center rounded-full bg-paper text-field transition-transform group-hover:scale-105">
            <Play className="ms-1 size-8" aria-hidden="true" />
          </span>
          {open && !real && (
            <span role="status" className="t-small absolute inset-x-4 bottom-4 rounded-xl bg-black/60 p-3 text-start">
              {t("placeholderVideo")}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
