"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tab = { id: string; label: string };

/**
 * Season switcher: an accessible tab list with a sliding pill. The panel's
 * accent colours follow the season (data-season), and transition smoothly.
 */
export function SeasonTabs({ tabs, panels, label }: { tabs: Tab[]; panels: ReactNode[]; label: string }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [active]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <div data-season={tabs[active]?.id} className="transition-colors">
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-2">
        <div
          ref={listRef}
          role="tablist"
          aria-label={label}
          onKeyDown={onKey}
          className="relative inline-flex gap-1 rounded-full bg-surface-2 p-1.5"
        >
          {pill && (
            <span
              aria-hidden="true"
              className="shadow-soft absolute top-1.5 bottom-1.5 rounded-full bg-accent transition-[transform,width,background-color] duration-500 ease-[var(--ease-out-soft)]"
              style={{ transform: `translateX(${pill.x - 6}px)`, width: pill.w, left: 6 }}
            />
          )}
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`season-tab-${tab.id}`}
              aria-selected={i === active}
              aria-controls={`season-panel-${tab.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative z-10 min-h-11 rounded-full px-4 font-semibold whitespace-nowrap transition-colors duration-300 sm:px-5",
                i === active ? "text-ink" : "text-muted hover:text-text",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`season-panel-${tab.id}`}
          aria-labelledby={`season-tab-${tab.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-6 outline-none"
        >
          {panels[i]}
        </div>
      ))}
    </div>
  );
}
