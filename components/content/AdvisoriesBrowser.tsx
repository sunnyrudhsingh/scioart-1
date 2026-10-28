"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useRegion } from "@/components/layout/RegionProvider";
import { todayISO } from "@/lib/text";
import { cn } from "@/lib/cn";

type Opt = { id: string; label: string };
type A = { slug: string; type: string; crops: string[]; districts: string[]; issuedOn: string; validUntil: string };

/** Current vs archive is decided in the browser with today's date, so expired advisories move automatically. */
export function AdvisoriesBrowser({
  advisories,
  cards,
  types,
  crops,
  districts,
}: {
  advisories: A[];
  cards: Record<string, ReactNode>;
  types: Opt[];
  crops: Opt[];
  districts: Opt[];
}) {
  const t = useTranslations("advisories");
  const tc = useTranslations("common");
  const { district: myDistrict } = useRegion();
  const [tab, setTab] = useState<"current" | "archive">("current");
  const [f, setF] = useState({ type: "", crop: "", district: "" });
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    // The date is only known in the browser (pages are pre-built).
    /* eslint-disable react-hooks/set-state-in-effect */
    setToday(todayISO());
    if (myDistrict) setF((x) => (x.district ? x : { ...x, district: myDistrict }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [myDistrict]);

  const list = useMemo(() => {
    if (!today) return [];
    return advisories.filter((a) => {
      const active = a.issuedOn <= today && today <= a.validUntil;
      const inTab = tab === "current" ? active : today > a.validUntil;
      return (
        inTab &&
        (!f.type || a.type === f.type) &&
        (!f.crop || a.crops.includes(f.crop)) &&
        (!f.district || a.districts.length === 0 || a.districts.includes(f.district))
      );
    });
  }, [advisories, today, tab, f]);

  const sel = (label: string, key: keyof typeof f, opts: Opt[], allLabel: string) => (
    <label className="grid gap-1.5">
      <span className="t-label">{label}</span>
      <select
        value={f[key]}
        onChange={(e) => setF({ ...f, [key]: e.target.value })}
        className="h-12 rounded-[var(--radius-input)] border border-line-strong bg-surface px-3"
      >
        <option value="">{allLabel}</option>
        {opts.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div>
      <div role="tablist" aria-label={t("title")} className="mb-6 inline-flex gap-1 rounded-full bg-surface-2 p-1.5">
        {(["current", "archive"] as const).map((id) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              "min-h-11 rounded-full px-5 font-semibold transition-colors",
              tab === id ? "bg-primary text-on-primary" : "text-muted hover:text-text",
            )}
          >
            {t(id)}
          </button>
        ))}
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {sel(t("type"), "type", types, tc("all"))}
        {sel(t("crop"), "crop", crops, t("allCrops"))}
        {sel(t("district"), "district", districts, t("allPunjab"))}
      </div>

      {today === null ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-48" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="rounded-2xl bg-surface-2 p-6 text-lg">{t("none")}</p>
      ) : (
        <ul className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", tab === "archive" && "opacity-90")}>
          {list.map((a, i) => (
            <li key={`${a.slug}-${tab}`} className="pop-in" style={{ animationDelay: `${i * 50}ms` }}>
              {cards[a.slug]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
