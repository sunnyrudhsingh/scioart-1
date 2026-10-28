"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

type Opt = { id: string; label: string };
type K = { slug: string; crop: string; operation: string; topics: string[] };

export function KitBrowser({
  kits,
  cards,
  crops,
  operations,
  topics,
}: {
  kits: K[];
  cards: Record<string, ReactNode>;
  crops: Opt[];
  operations: Opt[];
  topics: Opt[];
}) {
  const t = useTranslations("extension");
  const tc = useTranslations("common");
  const [f, setF] = useState({ crop: "", operation: "", topic: "" });
  const visible = useMemo(
    () =>
      kits.filter(
        (k) => (!f.crop || k.crop === f.crop) && (!f.operation || k.operation === f.operation) && (!f.topic || k.topics.includes(f.topic)),
      ),
    [kits, f],
  );
  const sig = Object.values(f).join("|");

  const sel = (label: string, key: keyof typeof f, opts: Opt[]) => (
    <label className="grid gap-1.5">
      <span className="t-label">{label}</span>
      <select
        value={f[key]}
        onChange={(e) => setF({ ...f, [key]: e.target.value })}
        className="h-12 rounded-[var(--radius-input)] border border-line-strong bg-surface px-3"
      >
        <option value="">{tc("all")}</option>
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
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {sel(t("crop"), "crop", crops)}
        {sel(t("operation"), "operation", operations)}
        {sel(t("topic"), "topic", topics)}
      </div>
      <p className="t-small mb-4 text-muted" aria-live="polite">
        {tc("results", { count: visible.length })}
      </p>
      {visible.length === 0 ? (
        <p className="rounded-2xl bg-surface-2 p-6 text-lg">{t("none")}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((k, i) => (
            <li key={`${k.slug}-${sig}`} className="pop-in" style={{ animationDelay: `${i * 50}ms` }}>
              {cards[k.slug]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
