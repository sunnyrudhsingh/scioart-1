"use client";

import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { History } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import type { L } from "@/content/schema";
import { cn } from "@/lib/cn";

type Edition = { id: string; label: L; isLatest: boolean };
type Op = { slug: string; name: L; short: L; readyIn: string[] };

/**
 * Edition selector + the grid of operation chapters. Choosing an older
 * edition shows a "superseded" banner and links chapters to that edition.
 */
export function CropEditionView({
  crop,
  editions,
  ops,
  icons,
}: {
  crop: string;
  editions: Edition[];
  ops: Op[];
  icons: Record<string, ReactNode>;
}) {
  const t = useTranslations("crops");
  const tc = useTranslations("common");
  const locale = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const L = (x: L) => (locale === "en" ? x.en : x.pa);

  const latest = editions.find((e) => e.isLatest) ?? editions[0];
  const chosen = editions.find((e) => e.id === params.get("edition")) ?? latest;
  const superseded = chosen && latest && chosen.id !== latest.id;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="ops-title" className="t-h2">
            {t("operationsTitle")}
          </h2>
          <p className="mt-2 text-muted">{t("operationsLead")}</p>
        </div>
        {editions.length > 1 && (
          <label className="grid gap-1.5">
            <span className="t-label">{t("editionLabel")}</span>
            <select
              value={chosen?.id}
              onChange={(e) => {
                const id = e.target.value;
                const q = id === latest?.id ? "" : `?edition=${id}`;
                router.replace(`${pathname}${q}`, { scroll: false });
              }}
              className="h-12 min-w-56 rounded-[var(--radius-input)] border border-line-strong bg-surface px-3 font-semibold"
            >
              {editions.map((e) => (
                <option key={e.id} value={e.id}>
                  {L(e.label)}
                  {e.isLatest ? ` (${tc("latest")})` : ""}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {superseded && (
        <div
          role="status"
          className="mb-6 flex flex-wrap items-start gap-3 rounded-2xl border border-[#b4541a]/40 bg-[#fbe8d8] p-4 text-[#5a2608] dark:bg-[#36210f] dark:text-[#f8dcc4]"
        >
          <History className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="font-bold">{t("supersededTitle")}</p>
            <p>{t("supersededText", { latest: L(latest.label) })}</p>
          </div>
          <Link href={pathname} replace scroll={false} className="link font-semibold">
            {t("goLatest")}
          </Link>
        </div>
      )}

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ops.map((op, i) => {
          const ready = chosen ? op.readyIn.includes(chosen.id) : false;
          const href = superseded ? `/crops/${crop}/${op.slug}/${chosen.id}` : `/crops/${crop}/${op.slug}`;
          return (
            <li key={op.slug}>
              <Link
                href={href}
                className={cn(
                  "group pressable lift shadow-soft flex h-full items-start gap-4 rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line",
                  !ready && "opacity-80",
                )}
              >
                <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                  {icons[op.slug]}
                  <span
                    className="absolute -start-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-surface text-xs font-bold ring-1 ring-line"
                    lang="en"
                  >
                    {i + 1}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.12rem] leading-snug font-semibold">{L(op.name)}</span>
                  <span className="t-small block text-muted">{L(op.short)}</span>
                  <span
                    className={cn(
                      "mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold",
                      ready ? "bg-primary text-on-primary" : "bg-surface-2 text-muted",
                    )}
                  >
                    {ready ? t("ready") : t("soon")}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
