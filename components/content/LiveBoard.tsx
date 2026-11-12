"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

type LiveItem = { slug: string; start: number; end: number };

/**
 * The Live page: "on air now", "coming up" and "past programs", worked out
 * from the program times on the visitor's own clock (the site itself is
 * built ahead of time, so it cannot know what is live right now).
 */
export function LiveBoard({ items, cards, builtAt }: { items: LiveItem[]; cards: Record<string, ReactNode>; builtAt: number }) {
  const t = useTranslations("live");
  // Start from the build time so the first render matches the server, then use the real clock.
  const [now, setNow] = useState(builtAt);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const onAir = items.filter((i) => i.start <= now && now < i.end);
  const upcoming = items.filter((i) => now < i.start).sort((a, b) => a.start - b.start);
  const past = items.filter((i) => i.end <= now).sort((a, b) => b.start - a.start);

  return (
    <div className="space-y-14">
      {onAir.length > 0 && <Group title={t("onAir")} items={onAir} cards={cards} live />}
      <Group title={t("upcoming")} items={upcoming} cards={cards} empty={t("noUpcoming")} />
      <Group title={t("past")} items={past} cards={cards} empty={t("noPast")} />
    </div>
  );
}

function Group({
  title,
  items,
  cards,
  empty,
  live,
}: {
  title: string;
  items: LiveItem[];
  cards: Record<string, ReactNode>;
  empty?: string;
  live?: boolean;
}) {
  return (
    <section>
      <h2 className="t-h2 mb-5 flex items-center gap-3">
        {live && <span className="glow size-3 rounded-full bg-[#d6402b]" aria-hidden="true" />}
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="rounded-2xl bg-surface-2 p-6 text-lg">{empty}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li key={i.slug}>{cards[i.slug]}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
