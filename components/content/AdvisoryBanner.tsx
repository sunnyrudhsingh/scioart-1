"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TriangleAlert, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Advisory } from "@/content/schema";
import { useRegion } from "@/components/layout/RegionProvider";
import { KEYS, readStore, writeStore } from "@/lib/storage";
import { todayISO } from "@/lib/text";

/** Slides in at the top of the site when an urgent advisory is active for the chosen district. */
export function AdvisoryBanner({ advisories }: { advisories: Advisory[] }) {
  const t = useTranslations("advisories");
  const locale = useLocale();
  const { district } = useRegion();
  const [shown, setShown] = useState<Advisory | null>(null);

  useEffect(() => {
    const today = todayISO();
    let dismissed: string[] = [];
    try {
      dismissed = JSON.parse(readStore(KEYS.dismissed) || "[]");
    } catch {
      dismissed = [];
    }
    const match = advisories.find(
      (a) =>
        a.issuedOn <= today &&
        today <= a.validUntil &&
        !dismissed.includes(a.slug) &&
        (a.districts.length === 0 || (district !== null && a.districts.includes(district))),
    );
    // Reading the clock and local storage only works in the browser, so this runs after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(match ?? null);
  }, [advisories, district]);

  if (!shown) return null;

  const dismiss = () => {
    let dismissed: string[] = [];
    try {
      dismissed = JSON.parse(readStore(KEYS.dismissed) || "[]");
    } catch {
      dismissed = [];
    }
    writeStore(KEYS.dismissed, JSON.stringify([...dismissed, shown.slug]));
    setShown(null);
  };

  return (
    <div role="region" aria-label={t("urgent")} className="banner-in no-print relative z-50 bg-[#7a2a12] text-[#fff6ea]">
      <div className="container-x flex items-center gap-3 py-2.5">
        <TriangleAlert className="size-5 shrink-0 text-mustard" aria-hidden="true" />
        <p className="t-small min-w-0 flex-1 leading-snug">
          <span className="me-2 rounded-full bg-mustard px-2 py-0.5 text-xs font-bold text-ink">{t("urgent")}</span>
          <Link href={`/advisories/${shown.slug}`} className="font-semibold underline underline-offset-2">
            {locale === "en" ? shown.title.en : shown.title.pa}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismiss")}
          className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-white/10"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
