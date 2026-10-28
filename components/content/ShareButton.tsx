"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/cn";

/** Web Share on phones; otherwise copy link and a WhatsApp link. */
export function ShareButton({ title, className }: { title: string; className?: string }) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled: fall back to the menu */
      }
    }
    setOpen((v) => !v);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked */
    }
  };

  const wa = typeof window !== "undefined" ? `https://wa.me/?text=${encodeURIComponent(`${title} ${window.location.href}`)}` : "#";

  return (
    <div className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={share}
        aria-expanded={open}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-semibold hover:border-primary hover:text-primary"
      >
        <Share2 className="size-4" aria-hidden="true" />
        {t("share")}
      </button>
      {open && (
        <div className="shadow-lift absolute start-0 top-full z-20 mt-2 grid min-w-56 gap-1 rounded-2xl border border-line bg-surface p-2">
          <button
            type="button"
            onClick={copy}
            className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-start font-semibold hover:bg-surface-2"
          >
            {copied ? <Check className="size-4 text-primary" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
            <span aria-live="polite">{copied ? t("shareCopied") : t("copyLink")}</span>
          </button>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 rounded-xl px-3 font-semibold hover:bg-surface-2"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t("shareWhatsApp")}
            <span className="sr-only">{t("opensInNewTab")}</span>
          </a>
        </div>
      )}
    </div>
  );
}
