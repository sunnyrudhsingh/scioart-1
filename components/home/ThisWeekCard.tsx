"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { L } from "@/content/schema";
import { useRegion } from "@/components/layout/RegionProvider";
import { KEYS, readStore, writeStore } from "@/lib/storage";
import { toISO, weekSinceSowing } from "@/lib/calendar";

type Task = { operation: string; operationName: L; weekStart: number; weekEnd: number; title: L };
type CropOption = { slug: string; name: L; season: string; tasks: Task[] };

/** A ruled "field notebook" card showing this week's tasks for the chosen crop and sowing date. */
export function ThisWeekCard({ crops }: { crops: CropOption[] }) {
  const t = useTranslations("home");
  const tr = useTranslations("region");
  const locale = useLocale();
  const { districtName } = useRegion();
  const id = useId();
  const [crop, setCrop] = useState(crops[0]?.slug ?? "");
  const [sown, setSown] = useState("");

  useEffect(() => {
    // Restore choices saved on this device (browser only).
    const savedCrop = readStore(KEYS.weekCrop);
    const savedSown = readStore(KEYS.sowing);
    /* eslint-disable react-hooks/set-state-in-effect */
    if (savedCrop && crops.some((c) => c.slug === savedCrop)) setCrop(savedCrop);
    setSown(savedSown || toISO(new Date(Date.now() - 21 * 86_400_000)));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [crops]);

  const current = crops.find((c) => c.slug === crop) ?? crops[0];
  const week = sown ? weekSinceSowing(sown) : null;
  const lastWeek = useMemo(() => Math.max(0, ...(current?.tasks.map((x) => x.weekEnd) ?? [0])), [current]);
  const due = week === null ? [] : (current?.tasks.filter((x) => x.weekStart <= week && week <= x.weekEnd) ?? []);
  const L = (x: L) => (locale === "en" ? x.en : x.pa);

  return (
    <div
      className="shadow-lift relative overflow-hidden rounded-[var(--radius-section)] bg-surface ring-1 ring-line"
      data-season={current?.season}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-accent-soft px-5 py-4 sm:px-7">
        <h2 id={`${id}-title`} className="t-h3 flex items-center gap-2">
          <CalendarDays className="size-6 text-accent-ink" aria-hidden="true" />
          {t("weekTitle")}
        </h2>
        <span className="t-small inline-flex items-center gap-1.5 font-semibold text-accent-ink">
          <MapPin className="size-4" aria-hidden="true" />
          {t("weekFor", { district: districtName ?? tr("allPunjab") })}
        </span>
      </div>

      <div className="grid gap-6 px-5 py-6 sm:px-7 md:grid-cols-[minmax(0,15rem)_1fr]">
        <div className="grid content-start gap-4">
          <label className="grid gap-1.5">
            <span className="t-label">{t("weekCrop")}</span>
            <select
              value={crop}
              onChange={(e) => {
                setCrop(e.target.value);
                writeStore(KEYS.weekCrop, e.target.value);
              }}
              className="h-12 rounded-[var(--radius-input)] border border-line-strong bg-bg px-3"
            >
              {crops.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {L(c.name)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="t-label">{t("weekSowing")}</span>
            <input
              type="date"
              value={sown}
              onChange={(e) => {
                setSown(e.target.value);
                writeStore(KEYS.sowing, e.target.value);
              }}
              className="h-12 rounded-[var(--radius-input)] border border-line-strong bg-bg px-3"
            />
          </label>
        </div>

        <div className="ruled min-h-44 rounded-2xl px-1" aria-live="polite">
          {week === null ? (
            <div className="skeleton h-40" />
          ) : week < 0 ? (
            <p className="leading-8">{t("weekBefore")}</p>
          ) : week > lastWeek ? (
            <p className="leading-8">{t("weekDone")}</p>
          ) : (
            <>
              <p className="font-display text-[1.6rem] leading-8 font-semibold text-accent-ink">{t("weekNumber", { week })}</p>
              {due.length === 0 ? (
                <p className="leading-8">{t("weekNone")}</p>
              ) : (
                <ul>
                  {due.map((task, i) => (
                    <li key={i} className="flex gap-3 leading-8">
                      <span aria-hidden="true" className="mt-3 size-2 shrink-0 rounded-full bg-accent" />
                      <span>
                        <Link href={`/crops/${current.slug}/${task.operation}`} className="font-semibold hover:underline">
                          {L(task.title)}
                        </Link>
                        <span className="t-small text-muted"> — {L(task.operationName)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          <p className="mt-2 leading-8">
            <Link href={`/calendar?crop=${crop}${sown ? `&sown=${sown}` : ""}`} className="link font-semibold">
              {t("weekOpen")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
