import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page so route changes fade and rise gently (View Transitions API).
 * Browsers without support simply swap pages instantly.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
