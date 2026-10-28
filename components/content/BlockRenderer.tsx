import { getTranslations } from "next-intl/server";
import type { Block } from "@/content/schema";
import { tx } from "@/lib/text";
import { Callout } from "@/components/ui/Callout";
import { getLearnItem } from "@/lib/content";
import { LearnMedia } from "./LearnMedia";

/** Renders structured guide content: headings, paragraphs, steps, tables, callouts and media. */
export async function BlockRenderer({ blocks, locale }: { blocks: Block[]; locale: string }) {
  const t = await getTranslations("crops");

  return (
    <div className="prose-x">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <h2 key={i} id={b.id} className="t-h2 mt-12 mb-4 scroll-mt-28 first:mt-0">
                {tx(b.text, locale)}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="my-4 text-[1.08rem]">
                {tx(b.text, locale)}
              </p>
            );
          case "steps":
            return (
              <ol key={i} className="print-break my-6 space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft font-bold text-accent-ink tabular-nums"
                      lang="en"
                      aria-hidden="true"
                    >
                      {j + 1}
                    </span>
                    <span className="pt-0.5">{tx(item, locale)}</span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={i} className="print-break my-8">
                <figcaption className="t-label mb-2">{tx(b.caption, locale)}</figcaption>
                <div className="overflow-x-auto rounded-2xl ring-1 ring-line" tabIndex={0} role="region" aria-label={tx(b.caption, locale)}>
                  <table className="w-full min-w-[32rem] text-start">
                    <thead className="bg-surface-2">
                      <tr>
                        {b.columns.map((c, j) => (
                          <th key={j} scope="col" className="px-4 py-3 text-start text-[0.95rem] font-bold">
                            {tx(c, locale)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r} className="border-t border-line odd:bg-surface even:bg-bg">
                          {row.map((cell, c) => {
                            const text = cell === "—" ? "—" : tx(cell, locale);
                            return c === 0 ? (
                              <th key={c} scope="row" className="px-4 py-3 text-start font-semibold">
                                {text}
                              </th>
                            ) : (
                              <td key={c} className="px-4 py-3 tabular-nums">
                                {text}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </figure>
            );
          case "callout":
            return (
              <Callout key={i} tone={b.tone} title={t(b.tone)}>
                {tx(b.text, locale)}
              </Callout>
            );
          case "media": {
            const item = getLearnItem(b.learn);
            if (!item) return null;
            return (
              <div key={i} className="no-print my-8">
                <p className="t-label mb-2">{t("listenWatch")}</p>
                <LearnMedia item={item} locale={locale} />
              </div>
            );
          }
        }
      })}
    </div>
  );
}
