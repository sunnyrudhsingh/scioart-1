"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import type { GlossaryTerm } from "@/content/schema";
import { cn } from "@/lib/cn";

// Independent vowels group under their bearer letter (ੳ, ਅ, ੲ), as in a Punjabi dictionary.
const bearer: Record<string, string> = { ਉ: "ੳ", ਊ: "ੳ", ਓ: "ੳ", ਆ: "ਅ", ਐ: "ਅ", ਔ: "ਅ", ਇ: "ੲ", ਈ: "ੲ", ਏ: "ੲ" };
const paLetter = (w: string) => {
  const c = w.trim().charAt(0);
  return bearer[c] ?? c;
};

export function GlossaryClient({ terms }: { terms: GlossaryTerm[] }) {
  const t = useTranslations("resources");
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [order, setOrder] = useState<"en" | "pa">(locale === "en" ? "en" : "pa");

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    const list = terms.filter(
      (x) =>
        !query ||
        x.en.toLowerCase().includes(query) ||
        x.pa.includes(q.trim()) ||
        x.definition.en.toLowerCase().includes(query) ||
        x.definition.pa.includes(q.trim()),
    );
    const collator = new Intl.Collator(order === "pa" ? "pa" : "en");
    const sorted = [...list].sort((a, b) => collator.compare(order === "pa" ? a.pa : a.en, order === "pa" ? b.pa : b.en));
    const map = new Map<string, GlossaryTerm[]>();
    for (const term of sorted) {
      const key = order === "pa" ? paLetter(term.pa) : term.en.charAt(0).toUpperCase();
      map.set(key, [...(map.get(key) ?? []), term]);
    }
    return [...map.entries()];
  }, [terms, q, order]);

  const count = groups.reduce((n, [, l]) => n + l.length, 0);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{t("glossarySearch")}</span>
          <Search className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("glossarySearch")}
            className="h-12 w-full rounded-full border border-line-strong bg-surface ps-10 pe-4 outline-none focus:border-primary"
          />
        </label>
        <div role="radiogroup" aria-label={t("glossaryTitle")} className="inline-flex gap-1 rounded-full bg-surface-2 p-1.5">
          {(["pa", "en"] as const).map((o) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={order === o}
              onClick={() => setOrder(o)}
              className={cn("min-h-11 rounded-full px-4 font-semibold", order === o ? "bg-primary text-on-primary" : "text-muted")}
            >
              {o === "pa" ? t("orderPa") : t("orderEn")}
            </button>
          ))}
        </div>
      </div>

      <p className="t-small mb-4 text-muted" aria-live="polite">
        {t("termsCount", { count })}
      </p>

      {count === 0 && <p className="rounded-2xl bg-surface-2 p-6 text-lg">{t("noTerms", { q })}</p>}

      <nav aria-label={t("glossaryTitle")} className="mb-6 flex flex-wrap gap-1.5">
        {groups.map(([letter]) => (
          <a
            key={letter}
            href={`#g-${encodeURIComponent(letter)}`}
            className="grid size-10 place-items-center rounded-full bg-surface font-bold ring-1 ring-line hover:bg-accent-soft"
            lang={order}
          >
            {letter}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {groups.map(([letter, list]) => (
          <section key={letter} id={`g-${encodeURIComponent(letter)}`} aria-label={letter} className="scroll-mt-28">
            <h2 className="mb-3 font-display text-3xl font-semibold text-accent-ink" lang={order}>
              {letter}
            </h2>
            <dl className="grid gap-3 md:grid-cols-2">
              {list.map((term) => (
                <div key={term.slug} className="rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line">
                  <dt className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-lg font-bold" lang={order}>
                      {order === "pa" ? term.pa : term.en}
                    </span>
                    <span className="text-muted" lang={order === "pa" ? "en" : "pa"}>
                      {order === "pa" ? term.en : term.pa}
                    </span>
                  </dt>
                  <dd className="mt-1">{locale === "en" ? term.definition.en : term.definition.pa}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
