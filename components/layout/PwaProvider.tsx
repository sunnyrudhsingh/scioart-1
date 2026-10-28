"use client";

import type { ReactNode } from "react";
import { SerwistProvider } from "@serwist/turbopack/react";

/** Registers the service worker in production so recent pages work offline. */
export function PwaProvider({ children }: { children: ReactNode }) {
  return (
    <SerwistProvider swUrl="/serwist/sw.js" disable={process.env.NODE_ENV !== "production"} cacheOnNavigation reloadOnOnline={false}>
      {children}
    </SerwistProvider>
  );
}
