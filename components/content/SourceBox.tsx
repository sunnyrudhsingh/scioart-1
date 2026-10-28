import { getTranslations } from "next-intl/server";
import { BookMarked } from "lucide-react";
import type { L } from "@/content/schema";
import { formatDate, tx } from "@/lib/text";

export async function SourceBox({
  locale,
  publication,
  publisher,
  edition,
  lastReviewed,
  reviewer,
}: {
  locale: string;
  publication: L;
  publisher: L;
  edition?: L;
  lastReviewed?: string;
  reviewer?: L;
}) {
  const t = await getTranslations("common");
  const rows: [string, string][] = [
    [t("source"), tx(publication, locale)],
    [t("publisher"), tx(publisher, locale)],
  ];
  if (edition) rows.push([t("edition"), tx(edition, locale)]);
  if (lastReviewed) rows.push([t("lastReviewed"), formatDate(lastReviewed, locale)]);
  if (reviewer) rows.push([t("reviewer"), tx(reviewer, locale)]);

  return (
    <aside className="print-break rounded-[var(--radius-card)] bg-surface-2 p-5 ring-1 ring-line">
      <p className="flex items-center gap-2 font-bold">
        <BookMarked className="size-5 text-primary" aria-hidden="true" />
        {t("source")}
      </p>
      <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="t-small text-muted">{k}</dt>
            <dd className="t-small font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
