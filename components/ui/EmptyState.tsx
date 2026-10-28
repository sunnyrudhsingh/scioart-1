import type { ReactNode } from "react";
import { LeafSprig } from "@/components/illustrations/Decor";

export function EmptyState({ title, text, children }: { title: string; text?: string; children?: ReactNode }) {
  return (
    <div className="furrows rounded-[var(--radius-section)] bg-surface-2 px-6 py-12 text-center ring-1 ring-line">
      <LeafSprig className="mx-auto h-12 w-24 text-leaf" />
      <h2 className="t-h3 mt-4">{title}</h2>
      {text && <p className="mx-auto mt-2 max-w-md text-muted">{text}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
