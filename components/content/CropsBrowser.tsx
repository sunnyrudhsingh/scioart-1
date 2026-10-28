"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

type Group = { id: string; season: string; label: string };
type Season = { id: string; label: string };
type CropRef = { slug: string; season: string; group: string; en: string; pa: string };

/** Crops index: season tabs, sub-group headings and an instant bilingual filter. */
export function CropsBrowser({
  seasons,
  groups,
  crops,
  cards,
}: {
  seasons: Season[];
  groups: Group[];
  crops: CropRef[];
  cards: Record<string, ReactNode>;
}) {
  const t = useTranslations("crops");
  const tc = useTranslations("common");
  const [season, setSeason] = useState<string>("all");
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const visible = useMemo(
    () =>
      crops.filter(
        (c) =>
          (season === "all" || c.season === season) &&
          (!query || c.en.toLowerCase().includes(query) || c.pa.includes(q.trim()) || c.slug.includes(query)),
      ),
    [crops, season, query, q],
  );

  const tabs = [{ id: "all", label: tc("all") }, ...seasons];

  return (
    <div data-season={season === "all" ? undefined : season}>
      <div className="sticky top-14 z-20 -mx-4 mb-8 bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] px-4 py-3 backdrop-blur-md sm:mx-0 sm:px-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <div role="radiogroup" aria-label={t("season")} className="inline-flex gap-1 rounded-full bg-surface-2 p-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="radio"
                  aria-checked={season === tab.id}
                  data-season={tab.id === "all" ? undefined : tab.id}
                  onClick={() => setSeason(tab.id)}
                  className={cn(
                    "min-h-11 rounded-full px-4 font-semibold whitespace-nowrap transition-colors duration-300",
                    season === tab.id
                      ? tab.id === "all"
                        ? "shadow-soft bg-primary text-on-primary"
                        : "shadow-soft bg-accent text-ink"
                      : "text-muted hover:text-text",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <label className="relative md:ms-auto md:w-80">
            <span className="sr-only">{t("filterLabel")}</span>
            <Search className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("filterPlaceholder")}
              className="h-12 w-full rounded-full border border-line-strong bg-surface ps-10 pe-4 outline-none focus:border-primary"
            />
          </label>
        </div>
        <p className="sr-only" aria-live="polite">
          {tc("results", { count: visible.length })}
        </p>
      </div>

      {visible.length === 0 && <p className="text-lg text-muted">{t("noMatch", { q })}</p>}

      {seasons
        .filter((s) => visible.some((c) => c.season === s.id))
        .map((s) => (
          <section key={s.id} aria-labelledby={`s-${s.id}`} data-season={s.id} className="mb-14">
            <h2 id={`s-${s.id}`} className="t-h2 mb-6 flex items-center gap-3">
              <span aria-hidden="true" className="h-8 w-2 rounded-full bg-accent" />
              {s.label}
            </h2>
            {groups
              .filter((g) => g.season === s.id && visible.some((c) => c.group === g.id))
              .map((g) => (
                <div key={g.id} className="mb-8">
                  {groups.filter((x) => x.season === s.id).length > 1 && <h3 className="t-h3 mb-4 text-muted">{g.label}</h3>}
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {visible
                      .filter((c) => c.group === g.id)
                      .map((c) => (
                        <li key={c.slug}>{cards[c.slug]}</li>
                      ))}
                  </ul>
                </div>
              ))}
          </section>
        ))}
    </div>
  );
}
