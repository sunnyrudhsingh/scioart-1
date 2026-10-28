import { cn } from "@/lib/cn";

/**
 * The SciOArt mark: a sprout growing inside a seed-shaped orbit, with a
 * small mustard "electron" — farming and science in one shape. It doubles
 * as the "O" in the wordmark.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="16" cy="16" r="13" fill="none" stroke="var(--field-green)" strokeWidth="2.6" />
      <path d="M16 24.5v-8.2" stroke="var(--field-green)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M16 17.2c0-4.3 2.6-6.8 6.6-7.1-.2 4.1-2.7 6.7-6.6 7.1z" fill="var(--leaf)" />
      <path d="M16 19.4c-.2-3.3-2.3-5.4-5.6-5.7.1 3.4 2.2 5.4 5.6 5.7z" fill="var(--leaf)" opacity=".8" />
      <circle cx="26.2" cy="7.6" r="2.4" fill="var(--mustard)" stroke="var(--bg)" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span
      className={cn("inline-flex items-center font-display text-[1.45rem] leading-none font-semibold tracking-tight", className)}
      lang="en"
    >
      <span aria-hidden="true">Sci</span>
      <LogoMark className={cn("mx-[0.06em] -translate-y-[0.02em]", compact ? "h-[1.05em] w-[1.05em]" : "h-[1.08em] w-[1.08em]")} />
      <span aria-hidden="true">Art</span>
      <span className="sr-only">SciOArt</span>
    </span>
  );
}
