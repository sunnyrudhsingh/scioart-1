import { ViewTransition } from "react";
import { Link } from "@/i18n/navigation";
import { CropIcon } from "@/components/illustrations/CropIcon";
import type { Crop } from "@/content/schema";
import { tx, txOther } from "@/lib/text";
import { cn } from "@/lib/cn";

/**
 * The seed-packet card: a crimped packet top in the crop's season colour,
 * the crop drawn large, and a label with both names — the way seed is
 * actually sold in Punjab's mandis.
 */
export function CropCard({
  crop,
  locale,
  meta,
  index = 0,
  morph = false,
}: {
  crop: Crop;
  locale: string;
  meta?: string;
  index?: number;
  morph?: boolean;
}) {
  const art = (
    <div className="relative grid aspect-[5/4] place-items-center overflow-hidden bg-accent-soft">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: "radial-gradient(90% 70% at 70% 20%, color-mix(in oklab, var(--accent-2) 45%, transparent), transparent 70%)",
        }}
      />
      <div className="furrows absolute inset-0" />
      <CropIcon name={crop.illustration} className="zoom-img relative size-[66%] text-accent-ink" strokeWidth={1.4} />
    </div>
  );

  return (
    <Link
      href={`/crops/${crop.slug}`}
      data-season={crop.season}
      data-reveal
      style={{ ["--i" as string]: index % 8 }}
      transitionTypes={["nav-forward"]}
      className={cn(
        "group pressable lift shadow-soft relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface ring-1 ring-line",
      )}
    >
      {/* crimped packet top */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-2.5 bg-accent"
        style={{
          mask: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 12px 100%",
          WebkitMask: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 12px 100%",
        }}
      />
      {morph ? (
        <ViewTransition name={`crop-art-${crop.slug}`} share="morph" default="none">
          {art}
        </ViewTransition>
      ) : (
        art
      )}
      <div className="flex flex-1 flex-col gap-0.5 border-t-2 border-dashed border-line px-4 pt-3 pb-4">
        <span className="font-display text-[1.3rem] leading-tight font-semibold">{tx(crop.name, locale)}</span>
        <span className="t-small text-muted" lang={locale === "en" ? "pa" : "en"}>
          {txOther(crop.name, locale)}
        </span>
        {meta && <span className="t-small mt-auto pt-2 font-semibold text-accent-ink">{meta}</span>}
      </div>
    </Link>
  );
}
