"use client";

import { useTranslations } from "next-intl";
import { ChevronDown, MapPin } from "lucide-react";
import { useRegion } from "./RegionProvider";
import { cn } from "@/lib/cn";

export function RegionChip({ className, compact = false }: { className?: string; compact?: boolean }) {
  const t = useTranslations("region");
  const { districtName, openPicker } = useRegion();
  const label = districtName ?? t("allPunjab");

  return (
    <button
      type="button"
      onClick={openPicker}
      aria-haspopup="dialog"
      className={cn(
        "inline-flex h-11 max-w-[11rem] items-center gap-1.5 rounded-full bg-surface-2 ps-3 pe-2.5 font-semibold transition-colors hover:bg-surface-3",
        className,
      )}
    >
      <MapPin className="size-[18px] shrink-0 text-primary" aria-hidden="true" />
      <span className={cn("truncate", compact && "max-[400px]:sr-only")}>{label}</span>
      <span className="sr-only">{t("choose")}</span>
      <ChevronDown className="size-4 shrink-0 text-muted" aria-hidden="true" />
    </button>
  );
}
