"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, MapPin, Search, X } from "lucide-react";
import type { Location } from "@/content/schema";
import { KEYS, readStore, writeStore } from "@/lib/storage";
import { cn } from "@/lib/cn";

type RegionCtx = {
  district: string | null;
  districtName: string | null;
  setDistrict: (slug: string | null) => void;
  openPicker: () => void;
  districts: Location[];
};

const Ctx = createContext<RegionCtx | null>(null);

export function useRegion() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRegion must be used inside RegionProvider");
  return c;
}

// A tiny external store so every component sees the same saved district.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEYS.district && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
};
const getSnapshot = () => readStore(KEYS.district);
const getServerSnapshot = () => null;

export function RegionProvider({ children, locations }: { children: ReactNode; locations: Location[] }) {
  const locale = useLocale();
  const district = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const districts = useMemo(() => locations.filter((l) => l.kind === "district"), [locations]);
  const districtName = useMemo(() => {
    const d = districts.find((x) => x.slug === district);
    return d ? (locale === "en" ? d.name.en : d.name.pa) : null;
  }, [district, districts, locale]);

  const setDistrict = useCallback((slug: string | null) => {
    writeStore(KEYS.district, slug);
    listeners.forEach((l) => l());
  }, []);

  const openPicker = useCallback(() => dialogRef.current?.showModal(), []);

  const value = useMemo(
    () => ({ district, districtName, setDistrict, openPicker, districts }),
    [district, districtName, setDistrict, openPicker, districts],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <RegionSheet ref={dialogRef} locations={locations} />
    </Ctx.Provider>
  );
}

function RegionSheet({ ref, locations }: { ref: React.RefObject<HTMLDialogElement | null>; locations: Location[] }) {
  const t = useTranslations("region");
  const tc = useTranslations("common");
  const locale = useLocale();
  const { district, setDistrict } = useRegion();
  const [q, setQ] = useState("");

  const name = (l: Location) => (locale === "en" ? l.name.en : l.name.pa);
  const other = (l: Location) => (locale === "en" ? l.name.pa : l.name.en);
  const districts = locations.filter((l) => l.kind === "district");
  const query = q.trim().toLowerCase();
  const filtered = query ? districts.filter((d) => d.name.en.toLowerCase().includes(query) || d.name.pa.includes(q.trim())) : districts;
  const india = locations.find((l) => l.slug === "india");
  const punjab = locations.find((l) => l.slug === "punjab");
  const california = locations.find((l) => l.slug === "california");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => setQ("");
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [ref]);

  const choose = (slug: string | null) => {
    setDistrict(slug);
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="region-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      <div className="flex max-h-[inherit] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 pt-5 pb-4">
          <div>
            <h2 id="region-title" className="t-h3">
              {t("title")}
            </h2>
            <p className="t-small mt-1 text-muted">{t("intro")}</p>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-surface-2"
            aria-label={tc("close")}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pt-4 pb-6">
          <nav aria-label={t("country")} className="t-small mb-4 flex flex-wrap items-center gap-2 text-muted">
            {india && <span>{name(india)}</span>}
            <span aria-hidden="true">/</span>
            {punjab && <span className="font-semibold text-text">{name(punjab)}</span>}
            {california && (
              <span className="ms-auto inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1">
                {name(california)}
                <span className="rounded-full bg-surface-2 px-2 text-xs font-semibold">{t("comingSoon")}</span>
              </span>
            )}
          </nav>

          <label className="relative block">
            <span className="sr-only">{t("find")}</span>
            <Search className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("find")}
              className="h-12 w-full rounded-[var(--radius-input)] border border-line-strong bg-bg ps-10 pe-3 outline-none focus:border-primary"
            />
          </label>

          <button
            type="button"
            onClick={() => choose(null)}
            className={cn(
              "mt-4 flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-start hover:bg-surface-2",
              district === null && "bg-accent-soft font-semibold",
            )}
          >
            <MapPin className="size-5 text-primary" aria-hidden="true" />
            {t("allPunjab")}
            {district === null && <Check className="ms-auto size-5 text-primary" aria-hidden="true" />}
          </button>

          <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {filtered.map((d) => (
              <li key={d.slug}>
                <button
                  type="button"
                  onClick={() => choose(d.slug)}
                  aria-pressed={district === d.slug}
                  className={cn(
                    "flex min-h-12 w-full items-center gap-2 rounded-xl px-3 text-start hover:bg-surface-2",
                    district === d.slug && "bg-accent-soft font-semibold",
                  )}
                >
                  <span>{name(d)}</span>
                  <span className="t-small text-muted" lang={locale === "en" ? "pa" : "en"}>
                    {other(d)}
                  </span>
                  {district === d.slug && <Check className="ms-auto size-5 text-primary" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
          {filtered.length === 0 && <p className="mt-4 text-muted">{t("noMatch", { q })}</p>}
          <p className="t-small mt-6 text-muted">{t("californiaNote")}</p>
        </div>
      </div>
    </dialog>
  );
}
