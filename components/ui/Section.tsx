import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-14 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  id,
  title,
  lead,
  action,
  className,
}: {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className="max-w-2xl">
        <h2 id={id} className="t-h2">
          {title}
        </h2>
        {lead && <p className="t-lead mt-3">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

/** Page title block used at the top of inner pages. */
export function PageHeader({
  title,
  lead,
  children,
  className,
  eyebrow,
}: {
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
}) {
  return (
    <div className={cn("pt-6 pb-10 sm:pt-10 sm:pb-14", className)}>
      {eyebrow}
      <h1 className="t-h1 max-w-3xl">{title}</h1>
      {lead && <p className="t-lead mt-4 max-w-2xl">{lead}</p>}
      {children}
    </div>
  );
}
