"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { L } from "@/content/schema";
import { KEYS, readStore, writeStore } from "@/lib/storage";
import { addDays, toISO, weekSinceSowing, daysBetween, parseISO } from "@/lib/calendar";
import { cn } from "@/lib/cn";

type Task = { operation: string; operationName: L; weekStart: number; weekEnd: number; title: L; description: L };
type CropOpt = { slug: string; name: L; season: string; tasks: Task[] };

function icsEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function CalendarView({ crops }: { crops: CropOpt[] }) {
  const t = useTranslations("calendar");
  const locale = useLocale();
  const params = useSearchParams();
  const L = (x: L) => (locale === "en" ? x.en : x.pa);

  const withCal = crops.filter((c) => c.tasks.length > 0);
  const [crop, setCrop] = useState(params.get("crop") ?? withCal[0]?.slug ?? crops[0]?.slug);
  const [sown, setSown] = useState(params.get("sown") ?? "");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!sown) {
      // Use the date saved on this device, or today.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSown(readStore(KEYS.sowing) || toISO(new Date()));
    }
  }, [sown]);

  const current = crops.find((c) => c.slug === crop) ?? crops[0];
  const tasks = useMemo(() => current?.tasks ?? [], [current]);
  const lastWeek = Math.max(0, ...tasks.map((x) => x.weekEnd));
  const week = sown ? weekSinceSowing(sown) : null;

  const weeks = useMemo(() => {
    const byWeek: { week: number; tasks: Task[] }[] = [];
    for (let w = 0; w <= lastWeek; w++) {
      const starting = tasks.filter((x) => x.weekStart === w);
      if (starting.length) byWeek.push({ week: w, tasks: starting });
    }
    return byWeek;
  }, [tasks, lastWeek]);

  const downloadIcs = () => {
    if (!sown || !current) return;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SciOArt//Crop Calendar//EN", "CALSCALE:GREGORIAN"];
    tasks.forEach((task, i) => {
      const start = addDays(sown, task.weekStart * 7).replace(/-/g, "");
      const end = addDays(sown, (task.weekEnd + 1) * 7).replace(/-/g, "");
      lines.push(
        "BEGIN:VEVENT",
        `UID:${current.slug}-${i}-${sown}@scioart.co.in`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${icsEscape(`${L(current.name)}: ${L(task.title)}`)}`,
        `DESCRIPTION:${icsEscape(`${L(task.operationName)}. ${L(task.description)}`)}`,
        "END:VEVENT",
      );
    });
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `scioart-${current.slug}-calendar.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  let status = "";
  if (week !== null && sown) {
    if (week < 0) status = t("statusBefore", { days: -daysBetween(parseISO(sown), new Date(new Date().toDateString())) });
    else if (week > lastWeek) status = t("statusDone");
    else status = t("statusWeek", { week });
  }

  return (
    <div data-season={current?.season}>
      <div className="grid gap-4 rounded-[var(--radius-section)] bg-surface p-5 ring-1 ring-line sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-6">
        <label className="grid gap-1.5">
          <span className="t-label">{t("crop")}</span>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="h-12 rounded-[var(--radius-input)] border border-line-strong bg-bg px-3 font-semibold"
          >
            {crops.map((c) => (
              <option key={c.slug} value={c.slug}>
                {L(c.name)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="t-label">{t("sowingDate")}</span>
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
        {tasks.length > 0 && (
          <div className="grid gap-1">
            <button
              type="button"
              onClick={downloadIcs}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
            >
              <CalendarPlus className="size-5" aria-hidden="true" />
              {t("addToPhone")}
            </button>
          </div>
        )}
        {tasks.length > 0 && <p className="t-small text-muted sm:col-span-3">{t("addToPhoneHint")}</p>}
      </div>

      {tasks.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-surface-2 p-6 text-lg">{t("noCalendar", { crop: L(current.name) })}</p>
      ) : (
        <>
          <p className="mt-8 text-xl font-semibold text-accent-ink" aria-live="polite">
            {status}
          </p>
          <p className="t-small mt-2 rounded-xl bg-surface-2 px-3 py-2 text-muted">{t("sampleNote")}</p>

          <ol className="relative mt-8 border-s-2 border-line ps-6 sm:ps-8">
            {weeks.map(({ week: w, tasks: list }, i) => {
              const isNow = week !== null && list.some((x) => x.weekStart <= week && week <= x.weekEnd);
              const date = sown ? addDays(sown, w * 7) : "";
              return (
                <li key={w} className="relative pb-8" data-reveal style={{ ["--i" as string]: i % 6 }}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -start-[calc(1.5rem+9px)] top-1 size-4 rounded-full border-2 border-bg sm:-start-[calc(2rem+9px)]",
                      isNow ? "glow bg-accent" : "bg-line-strong",
                    )}
                  />
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-[1.25rem] font-semibold">{t("week", { n: w })}</span>
                    {date && (
                      <span className="t-small text-muted" lang="en">
                        {new Intl.DateTimeFormat(locale === "en" ? "en-IN" : "pa-IN", { day: "numeric", month: "short" }).format(
                          parseISO(date),
                        )}
                      </span>
                    )}
                    {isNow && <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-ink">{t("thisWeek")}</span>}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {list.map((task, j) => {
                      const key = `${w}-${j}`;
                      const expanded = !!open[key];
                      return (
                        <li key={key} className={cn("rounded-2xl bg-surface ring-1 ring-line", isNow && "ring-2 ring-accent")}>
                          <button
                            type="button"
                            aria-expanded={expanded}
                            aria-controls={`task-${key}`}
                            onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}
                            className="flex min-h-14 w-full items-center gap-3 px-4 py-2 text-start"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold">{L(task.title)}</span>
                              <span className="t-small block text-muted">
                                {L(task.operationName)}
                                {task.weekEnd > task.weekStart && ` · ${t("weeks", { a: task.weekStart, b: task.weekEnd })}`}
                              </span>
                            </span>
                            <ChevronDown
                              className={cn("size-5 shrink-0 transition-transform duration-300", expanded && "rotate-180")}
                              aria-hidden="true"
                            />
                            <span className="sr-only">{expanded ? t("hideDetails") : t("showDetails")}</span>
                          </button>
                          <div
                            id={`task-${key}`}
                            className={cn(
                              "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)]",
                              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                            )}
                          >
                            <div className="overflow-hidden">
                              <div className="px-4 pb-4">
                                <p className="text-muted">{L(task.description)}</p>
                                <Link href={`/crops/${current.slug}/${task.operation}`} className="link mt-2 inline-block font-semibold">
                                  {t("openGuide")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
