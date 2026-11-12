import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Phulkari, Punjab's embroidery, drawn as a repeating pattern of nested
 * diamonds ("bagh" style). Colours come from the palette (--ph-*), so the
 * pattern changes with it. Original artwork for SciOArt.
 */
function Tile({ id, size }: { id: string; size: number }) {
  const h = size / 2;
  const q = size / 4;
  const e = size / 8;
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
      <rect width={size} height={size} style={{ fill: "var(--ph-cloth)" }} />
      {/* outer diamond */}
      <path d={`M${h} 1 L${size - 1} ${h} L${h} ${size - 1} L1 ${h} Z`} style={{ fill: "var(--ph-1)" }} />
      {/* middle diamond */}
      <path d={`M${h} ${q - 1} L${size - q + 1} ${h} L${h} ${size - q + 1} L${q - 1} ${h} Z`} style={{ fill: "var(--ph-2)" }} />
      {/* centre */}
      <path d={`M${h} ${h - e} L${h + e} ${h} L${h} ${h + e} L${h - e} ${h} Z`} style={{ fill: "var(--ph-3)" }} />
      {/* stitches at the corners */}
      {[
        [0, 0],
        [size, 0],
        [0, size],
        [size, size],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - e / 1.5} L${x + e / 1.5} ${y} L${x} ${y + e / 1.5} L${x - e / 1.5} ${y} Z`}
          style={{ fill: "var(--ph-4)" }}
        />
      ))}
    </pattern>
  );
}

/** A horizontal band of phulkari, e.g. between the hero and the page. */
export function PhulkariBand({ className, size = 28 }: { className?: string; size?: number }) {
  const id = `ph-${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden="true" className={cn("block h-7 w-full", className)} preserveAspectRatio="none">
      <defs>
        <Tile id={id} size={size} />
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A faint phulkari texture to lay behind a picture panel or heading. */
export function PhulkariTexture({ className, size = 36 }: { className?: string; size?: number }) {
  const id = `pht-${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 size-full", className)}>
      <defs>
        <Tile id={id} size={size} />
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
