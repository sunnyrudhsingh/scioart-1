/**
 * Original icons for agronomic operations and cross-crop topics,
 * drawn in the same style as CropIcon (48×48, 1.7 stroke, soft fill).
 */
import type { ReactNode } from "react";

const soft = { fill: "currentColor", fillOpacity: 0.14 } as const;

const operationIcons: Record<string, ReactNode> = {
  varieties: (
    <>
      <path d="M12 8h24l-2 32H14z" {...soft} />
      <path d="M12 8h24M16 16h16" />
      <ellipse cx="20" cy="27" rx="2.4" ry="3.6" transform="rotate(-20 20 27)" />
      <ellipse cx="28" cy="27" rx="2.4" ry="3.6" transform="rotate(20 28 27)" />
      <ellipse cx="24" cy="33" rx="2.4" ry="3.6" />
    </>
  ),
  "land-preparation": (
    <>
      <path d="M4 40c8-4 16-4 20 0s12 4 20 0" />
      <path d="M4 32c8-4 16-4 20 0s12 4 20 0" />
      <path d="M14 22l10-12 6 4-8 12z" {...soft} />
      <path d="M30 14l6-6M22 26l-3 4" />
    </>
  ),
  "seed-sowing": (
    <>
      <path d="M6 38c6-3 12-3 18 0s12 3 18 0" />
      <path d="M22 6c4 0 8 3 8 8l-2 6h-8l-2-6c0-5 1-8 4-8z" {...soft} />
      <ellipse cx="22" cy="25" rx="1.6" ry="2.4" fill="currentColor" />
      <ellipse cx="25" cy="30" rx="1.6" ry="2.4" fill="currentColor" />
      <ellipse cx="21" cy="34" rx="1.6" ry="2.4" fill="currentColor" />
    </>
  ),
  irrigation: (
    <>
      <path d="M24 6c6 8 10 13 10 18a10 10 0 0 1-20 0c0-5 4-10 10-18z" {...soft} />
      <path d="M19 25c0 3 2 5 5 5" />
      <path d="M4 42c4-2 8-2 12 0s8 2 12 0 8-2 12 0 4 2 4 2" />
    </>
  ),
  nutrients: (
    <>
      <path d="M12 12h24v28a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" {...soft} />
      <path d="M12 12l3-6h18l3 6" />
      <path d="M18 22h12M18 28h8" />
      <circle cx="20" cy="36" r="1.4" fill="currentColor" />
      <circle cx="25" cy="35" r="1.4" fill="currentColor" />
      <circle cx="29" cy="37" r="1.4" fill="currentColor" />
    </>
  ),
  weeds: (
    <>
      <path d="M18 42V26M18 30c-5-1-8-5-8-10 5 1 8 5 8 10zM18 26c4-2 6-6 5-11-4 2-6 6-5 11z" {...soft} />
      <path d="M6 42h24" />
      <circle cx="35" cy="14" r="8" />
      <path d="M31 10l8 8M39 10l-8 8" />
    </>
  ),
  "insect-pests": (
    <>
      <ellipse cx="24" cy="28" rx="8" ry="11" {...soft} />
      <circle cx="24" cy="14" r="4" />
      <path d="M24 17v22M16 24l-8-4M16 30H7M16 36l-8 4M32 24l8-4M32 30h9M32 36l8 4M22 11l-4-5M26 11l4-5" />
    </>
  ),
  diseases: (
    <>
      <path d="M8 40C8 20 20 8 40 8c0 20-12 32-32 32z" {...soft} />
      <path d="M8 40L30 18" />
      <circle cx="22" cy="18" r="2.4" fill="currentColor" />
      <circle cx="30" cy="26" r="2" fill="currentColor" />
      <circle cx="18" cy="28" r="1.6" fill="currentColor" />
    </>
  ),
  "harvest-storage": (
    <>
      <path d="M24 44c-7 0-11-3-11-9 0-5 3-9 6-11h10c3 2 6 6 6 11 0 6-4 9-11 9z" {...soft} />
      <path d="M19 24l-2-4h14l-2 4" />
      <path d="M8 6c8 0 14 6 14 12" />
      <path d="M8 6l-2 8" />
    </>
  ),
  machinery: (
    <>
      <circle cx="14" cy="34" r="8" {...soft} />
      <circle cx="14" cy="34" r="2.5" />
      <circle cx="36" cy="37" r="5" />
      <path d="M22 34h9M6 28V20h12l4 10M18 20l2-8h8v14h10l2 6" />
      <path d="M28 12v-4" />
    </>
  ),
  "crop-care": (
    <>
      <path d="M10 22h20v16a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" {...soft} />
      <path d="M30 26l10-8M36 14l6 6" />
      <path d="M14 22c0-4 3-7 6-7s6 3 6 7" />
    </>
  ),
  marketing: (
    <>
      <path d="M24 8v32M14 40h20" />
      <path d="M8 16h32" />
      <path d="M12 16l-5 12h10zM36 16l-5 12h10z" {...soft} />
    </>
  ),
};

const topicIcons: Record<string, ReactNode> = {
  "soil-health": (
    <>
      <path d="M4 26h40v16H4z" {...soft} />
      <path d="M4 32h40M4 38h40" />
      <path d="M24 26V12M24 18c-5 0-8-3-8-8 5 0 8 3 8 8zM24 16c4 0 7-3 7-7-4 0-7 3-7 7z" />
    </>
  ),
  "water-conservation": (
    <>
      <path d="M24 8c6 8 9 12 9 17a9 9 0 0 1-18 0c0-5 3-9 9-17z" {...soft} />
      <path d="M38 22a15 15 0 0 1-26 14M10 26A15 15 0 0 1 36 12" />
      <path d="M36 12l1 5-5 0M12 36l-1-5 5 0" />
    </>
  ),
  ipm: (
    <>
      <path d="M24 4l16 6v12c0 10-7 18-16 22-9-4-16-12-16-22V10z" {...soft} />
      <ellipse cx="24" cy="25" rx="5" ry="7" />
      <path d="M24 18v14M19 22l-4-2M19 28h-4M29 22l4-2M29 28h4" />
    </>
  ),
  "residue-management": (
    <>
      <rect x="8" y="22" width="22" height="16" rx="4" {...soft} />
      <path d="M8 28h22M8 33h22M14 22v16M24 22v16" />
      <path d="M38 12c3 4 4 7 2 10-1 2-4 2-5 0-2-3 1-6 3-10z" />
      <path d="M32 30l12-12" />
    </>
  ),
  "climate-smart": (
    <>
      <circle cx="16" cy="16" r="6" {...soft} />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2 2M22.5 22.5l2 2M24.5 7.5l-2 2" />
      <path d="M20 34h18a6 6 0 0 0 0-12 8 8 0 0 0-15-1 6 6 0 0 0-3 13z" {...soft} />
    </>
  ),
  diversification: (
    <>
      <path d="M10 42V26M10 30c-4 0-6-3-6-7 4 0 6 3 6 7zM10 28c3 0 5-3 5-6-3 0-5 3-5 6z" />
      <path d="M24 42V18" />
      <ellipse cx="22" cy="20" rx="1.6" ry="2.6" {...soft} />
      <ellipse cx="26" cy="22" rx="1.6" ry="2.6" {...soft} />
      <ellipse cx="22" cy="25" rx="1.6" ry="2.6" {...soft} />
      <circle cx="38" cy="28" r="6" {...soft} />
      <path d="M38 42v-8M38 22c1-3 3-4 5-4" />
      <path d="M4 42h40" />
    </>
  ),
  "organic-natural": (
    <>
      <path d="M10 38C10 20 22 10 40 10c0 18-12 28-30 28z" {...soft} />
      <path d="M10 38c6-10 14-17 24-22" />
      <path d="M8 22a16 16 0 0 1 6-12M40 28a16 16 0 0 1-6 12" />
    </>
  ),
  "safe-chemical-use": (
    <>
      <path d="M12 16h14v24a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4z" {...soft} />
      <path d="M16 16v-6h6v6M22 10h10l4 4" />
      <path d="M33 26l9 3-9 3" />
      <path d="M16 26h6M16 32h6" />
    </>
  ),
  mechanisation: (
    <>
      <circle cx="24" cy="24" r="8" {...soft} />
      <circle cx="24" cy="24" r="3" />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" />
    </>
  ),
  "value-addition": (
    <>
      <path d="M12 18h16v22a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" {...soft} />
      <path d="M14 18v-4h12v4M12 26h16" />
      <path d="M32 26l6-8 6 8M38 18v18" />
    </>
  ),
  "seed-production": (
    <>
      <ellipse cx="22" cy="28" rx="9" ry="13" transform="rotate(-20 22 28)" {...soft} />
      <path d="M17 38c4-6 7-14 8-22" />
      <path d="M36 6v8M32 10h8M40 22v4M38 24h4" />
    </>
  ),
};

function Svg({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {children}
    </svg>
  );
}

export function OperationIcon({ name, className, title }: { name: string; className?: string; title?: string }) {
  return (
    <Svg className={className} title={title}>
      {operationIcons[name] ?? operationIcons["crop-care"]}
    </Svg>
  );
}

export function TopicIcon({ name, className, title }: { name: string; className?: string; title?: string }) {
  return (
    <Svg className={className} title={title}>
      {topicIcons[name] ?? topicIcons["soil-health"]}
    </Svg>
  );
}
