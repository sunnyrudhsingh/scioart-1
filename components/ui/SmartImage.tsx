import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"><rect width="8" height="5" fill="#e8dcc0"/><rect y="3" width="8" height="2" fill="#c9b37a"/></svg>`,
  ).toString("base64");

function exists(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/**
 * Shows a real photo when the file exists in /public, otherwise a designed
 * fallback (season gradient + original illustration + grain), so the site
 * never looks broken while photos are being collected. See IMAGES.md.
 */
export function SmartImage({
  src,
  alt,
  fallback,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = "rounded-[var(--radius-card)]",
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}) {
  if (exists(src)) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-2", rounded, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR}
          className="zoom-img object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={cn("relative isolate overflow-hidden", rounded, className)}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 10%, color-mix(in oklab, var(--accent-2) 55%, transparent), transparent 60%), linear-gradient(160deg, var(--accent-soft), color-mix(in oklab, var(--accent) 38%, var(--accent-soft)))",
        }}
      />
      <div className="furrows absolute inset-0 -z-10 opacity-70" />
      <div className="zoom-img grid h-full w-full place-items-center text-accent-ink">{fallback}</div>
    </div>
  );
}
