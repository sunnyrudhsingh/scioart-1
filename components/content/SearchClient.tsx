"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { History, Search, X } from "lucide-react";
import type Fuse from "fuse.js";
import type { FuseResultMatch } from "fuse.js";
import { Link } from "@/i18n/navigation";
import type { SearchEntry } from "@/lib/search-index";
import { KEYS, readStore, writeStore } from "@/lib/storage";

const order: SearchEntry["type"][] = ["crop", "operation", "topic", "learn", "kit", "advisory", "resource", "glossary"];

function highlight(text: string, matches: readonly FuseResultMatch[] | undefined, key: string) {
  const m = matches?.find((x) => x.key === key);
  if (!m || !m.indices.length) return text;
  const parts: React.ReactNode[] = [];
  let last = 0;
  [...m.indices]
    .filter(([a, b]) => b - a >= 1)
    .sort((a, b) => a[0] - b[0])
    .forEach(([a, b], i) => {
      if (a < last) return;
      parts.push(<Fragment key={`t${i}`}>{text.slice(last, a)}</Fragment>);
      parts.push(
        <mark key={`m${i}`} className="rounded bg-mustard/60 px-0.5 text-ink">
          {text.slice(a, b + 1)}
        </mark>,
      );
      last = b + 1;
    });
  parts.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return parts;
}

export function SearchClient() {
  const t = useTranslations("search");
  const locale = useLocale();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null);
  const [error, setError] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([fetch(`/search-index/${locale}`).then((r) => r.json() as Promise<SearchEntry[]>), import("fuse.js")])
      .then(([data, mod]) => {
        if (!alive) return;
        setFuse(
          new mod.default(data, {
            keys: [
              { name: "title", weight: 3 },
              { name: "alt", weight: 2 },
              { name: "text", weight: 1 },
              { name: "textAlt", weight: 0.7 },
            ],
            includeMatches: true,
            ignoreLocation: true,
            threshold: 0.34,
            minMatchCharLength: 2,
          }),
        );
      })
      .catch(() => alive && setError(true));
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecent(JSON.parse(readStore(KEYS.recent) || "[]"));
    } catch {
      setRecent([]);
    }
    return () => {
      alive = false;
    };
  }, [locale]);

  const query = q.trim();
  const results = useMemo(() => (fuse && query.length >= 2 ? fuse.search(query).slice(0, 40) : []), [fuse, query]);
  const grouped = order.map((type) => ({ type, items: results.filter((r) => r.item.type === type) })).filter((g) => g.items.length);

  // Remember the query once the reader pauses typing.
  useEffect(() => {
    if (query.length < 2 || !results.length) return;
    const id = setTimeout(() => {
      const next = [query, ...recent.filter((r) => r !== query)].slice(0, 6);
      setRecent(next);
      writeStore(KEYS.recent, JSON.stringify(next));
    }, 1200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, results.length]);

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor="site-search" className="sr-only">
          {t("label")}
        </label>
        <Search className="pointer-events-none absolute start-5 top-1/2 size-6 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          ref={input}
          id="site-search"
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("placeholder")}
          className="shadow-soft h-16 w-full rounded-full border border-line-strong bg-surface ps-14 pe-14 text-[1.15rem] outline-none focus:border-primary"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              input.current?.focus();
            }}
            aria-label={t("clear")}
            className="absolute end-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full hover:bg-surface-2"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        )}
      </form>
      <p className="t-small mt-3 text-muted">{t("hint")}</p>

      {error && (
        <p role="alert" className="mt-6 rounded-2xl bg-surface-2 p-4">
          {t("error")}
        </p>
      )}

      {!query && recent.length > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-3">
            <h2 className="t-label">{t("recent")}</h2>
            <button
              type="button"
              onClick={() => {
                setRecent([]);
                writeStore(KEYS.recent, null);
              }}
              className="t-small font-semibold text-primary underline"
            >
              {t("clearRecent")}
            </button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {recent.map((r) => (
              <li key={r}>
                <button
                  type="button"
                  onClick={() => setQ(r)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-surface-2 px-4 font-semibold hover:bg-surface-3"
                >
                  <History className="size-4" aria-hidden="true" />
                  {r}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div aria-live="polite" className="mt-8">
        {query.length >= 2 && !fuse && !error && <p className="text-muted">{t("loading")}</p>}
        {query.length >= 2 && fuse && results.length === 0 && <p className="text-lg">{t("none", { q: query })}</p>}
      </div>

      <div className="space-y-10">
        {grouped.map((g) => (
          <section key={g.type} aria-labelledby={`g-${g.type}`}>
            <h2 id={`g-${g.type}`} className="t-h3 mb-3">
              {t(`group_${g.type}`)} <span className="text-muted">({g.items.length})</span>
            </h2>
            <ul className="grid gap-2">
              {g.items.map((r) => (
                <li key={`${r.item.href}-${r.item.title}`}>
                  <Link href={r.item.href} className="pressable block rounded-2xl bg-surface p-4 ring-1 ring-line hover:ring-primary">
                    <span className="block font-semibold">{highlight(r.item.title, r.matches, "title")}</span>
                    <span className="t-small block text-muted" lang={locale === "en" ? "pa" : "en"}>
                      {highlight(r.item.alt, r.matches, "alt")}
                    </span>
                    <span className="t-small mt-1 line-clamp-2 block">{highlight(r.item.text, r.matches, "text")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
