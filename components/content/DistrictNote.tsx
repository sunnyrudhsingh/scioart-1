"use client";

import { useLocale, useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import type { L } from "@/content/schema";
import { useRegion } from "@/components/layout/RegionProvider";

/** Shows the note for the reader's chosen district, if the guide has one. */
export function DistrictNote({ notes }: { notes: Record<string, L> }) {
  const t = useTranslations("crops");
  const locale = useLocale();
  const { district, districtName } = useRegion();
  const note = district ? notes[district] : undefined;
  if (!note || !districtName) return null;

  return (
    <aside className="my-6 rounded-2xl border-s-4 border-primary bg-accent-soft p-4 sm:p-5">
      <p className="flex items-center gap-2 font-bold text-primary">
        <MapPin className="size-5" aria-hidden="true" />
        {t("districtNote", { district: districtName })}
      </p>
      <p className="mt-1">{locale === "en" ? note.en : note.pa}</p>
    </aside>
  );
}
