"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

type Opt = { id: string; label: string };
type Item = { slug: string; category: string; crops: string[]; topics: string[]; languages: string[]; large: boolean };

/** The library: category chips and crop/topic/language filters over a grid of item cards. */
export function LibraryBrowser({
  items,
  cards,
  categories,
  crops,
  topics,
  languages,
}: {
  items: Item[];
  cards: Record<string, ReactNode>;
  /** Category chips; leave empty on a single category's page. */
  categories: Opt[];
  crops: Opt[];
  topics: Opt[];
  languages: Opt[];
}) {
  const t = useTranslations("library");
  const tc = useTranslations("common");
  const empty = { category: "", crop: "", topic: "", language: "" };
  const [f, setF] = useState(empty);
  const [showMore, setShowMore] = useState(false);

  const visible = useMemo(
    () =>
      items.filter(
        (i) =>
          (!f.category || i.category === f.category) &&
          (!f.crop || i.crops.includes(f.crop)) &&
          (!f.topic || i.topics.includes(f.topic)) &&
          (!f.language || i.languages.includes(f.language)),
      ),
    [items, f],
  );
  const signature = Object.values(f).join("|");
  const active = Object.values(f).some(Boolean);

  const usedCategories = categories.filter((x) => items.some((i) => i.category === x.id));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label={t("category")}>
        {usedCategories.length > 0 && (
          <>
            <Chip active={!f.category} onClick={() => setF({ ...f, category: "" })}>
              {tc("all")}
            </Chip>
            {usedCategories.map((x) => (
              <Chip key={x.id} active={f.category === x.id} onClick={() => setF({ ...f, category: f.category === x.id ? "" : x.id })}>
                {x.label}
              </Chip>
            ))}
          </>
        )}
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="library-more-filters"
          className="ms-auto inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-semibold text-primary hover:bg-accent-soft"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          {showMore ? tc("hideFilters") : tc("showFilters")}
        </button>
      </div>

      <div
        id="library-more-filters"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)]",
          showMore ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-3 pb-4 sm:grid-cols-3">
            <Select label={t("crop")} value={f.crop} options={crops} onChange={(v) => setF({ ...f, crop: v })} all={tc("all")} />
            <Select label={t("topic")} value={f.topic} options={topics} onChange={(v) => setF({ ...f, topic: v })} all={tc("all")} />
            <Select
              label={t("language")}
              value={f.language}
              options={languages}
              onChange={(v) => setF({ ...f, language: v })}
              all={tc("all")}
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <h2 className="t-small font-body font-normal text-muted" aria-live="polite">
          {tc("results", { count: visible.length })}
        </h2>
        {active && (
          <button type="button" onClick={() => setF(empty)} className="t-small font-semibold text-primary underline underline-offset-2">
            {tc("clearFilters")}
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl bg-surface-2 p-6 text-lg">{t("none")}</p>
      ) : (
        <ul className="grid auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item, i) => (
            <li
              key={`${item.slug}-${signature}`}
              className={cn("pop-in", item.large && !active && "sm:col-span-2 lg:row-span-2")}
              style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
            >
              {cards[item.slug]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-4 font-semibold transition-[background-color,color,transform] duration-300 active:scale-95",
        active ? "bg-primary text-on-primary" : "bg-surface-2 text-text hover:bg-surface-3",
      )}
    >
      {children}
    </button>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
  all,
}: {
  label: string;
  value: string;
  options: Opt[];
  onChange: (v: string) => void;
  all: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="t-label">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-[var(--radius-input)] border border-line-strong bg-surface px-3"
      >
        <option value="">{all}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
