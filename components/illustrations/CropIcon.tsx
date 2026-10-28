/**
 * Original line-art icons for every crop and allied enterprise.
 * One consistent style: 48×48 grid, 1.7 stroke, rounded joins, a soft
 * tinted fill (currentColor at low opacity) for volume.
 */
import type { ReactNode } from "react";

const soft = { fill: "currentColor", fillOpacity: 0.14 } as const;

function Grain({ x, y, r = 0, flip = false }: { x: number; y: number; r?: number; flip?: boolean }) {
  return <ellipse cx={x} cy={y} rx="2.3" ry="3.6" transform={`rotate(${flip ? -r : r} ${x} ${y})`} {...soft} />;
}

function Ear({ x, top, count = 6, awns = true }: { x: number; top: number; count?: number; awns?: boolean }) {
  const parts: ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const y = top + 4 + i * 4.4;
    parts.push(<Grain key={`l${i}`} x={x - 2.6} y={y} r={-24} />);
    parts.push(<Grain key={`r${i}`} x={x + 2.6} y={y + 2} r={24} />);
  }
  return (
    <g>
      {parts}
      {awns && (
        <g>
          <path d={`M${x - 3} ${top + 5} l-4 -7`} />
          <path d={`M${x + 3} ${top + 6} l4 -7`} />
          <path d={`M${x} ${top + 3} v-7`} />
        </g>
      )}
    </g>
  );
}

const icons: Record<string, ReactNode> = {
  wheat: (
    <>
      <path d="M24 44V24" />
      <path d="M24 34c-4-1-7-4-8-8" />
      <Ear x={24} top={8} />
    </>
  ),
  barley: (
    <>
      <path d="M25 44c0-8-1-14-3-19" />
      <Ear x={21} top={12} count={5} awns={false} />
      <g>
        <path d="M17 14l-8-10" />
        <path d="M19 18l-10-9" />
        <path d="M23 13l2-11" />
        <path d="M25 17l7-11" />
        <path d="M25 22l9-8" />
      </g>
    </>
  ),
  chickpea: (
    <>
      <path d="M24 44V18" />
      <path d="M24 26l-7-4m7 10l7-4m-7-10l-6-5m6 5l6-5" />
      <ellipse cx="16" cy="21" rx="2.4" ry="1.6" {...soft} />
      <ellipse cx="32" cy="27" rx="2.4" ry="1.6" {...soft} />
      <path d="M10 34c0-5 4-8 8-8s8 3 8 8-4 7-8 7-8-2-8-7z" {...soft} />
      <circle cx="18" cy="34" r="3" />
    </>
  ),
  lentil: (
    <>
      <path d="M30 6c-2 6-2 11 0 16m0-9l-5-4m5 9l5-4" />
      <ellipse cx="16" cy="34" rx="7" ry="3.4" {...soft} />
      <ellipse cx="28" cy="38" rx="7" ry="3.4" {...soft} />
      <ellipse cx="25" cy="30" rx="7" ry="3.4" {...soft} />
      <ellipse cx="36" cy="31" rx="6" ry="3" {...soft} />
    </>
  ),
  raya: (
    <>
      <path d="M24 44V14" />
      <path d="M24 30c3-1 7-1 10 2M24 24c-3-1-7 0-10 3" />
      <g {...soft}>
        <path d="M24 10l-2.6-3.4L24 3l2.6 3.6z" />
        <path d="M24 10l3.6-2.4L31 10l-3.4 2.4z" />
        <path d="M24 10l-3.6-2.4L17 10l3.4 2.4z" />
        <path d="M24 10l2.6 3.4L24 17l-2.6-3.6z" />
      </g>
      <path d="M34 32l3-9M14 27l-3-8" />
    </>
  ),
  "gobhi-sarson": (
    <>
      <path d="M24 40V12" />
      <g {...soft}>
        <path d="M24 9l-2.4-3L24 3l2.4 3z" />
        <path d="M24 9l3.2-2.2L30 9l-3 2.2z" />
        <path d="M24 9l-3.2-2.2L18 9l3 2.2z" />
      </g>
      <path d="M24 40c-8 0-15-4-17-11 7-2 14 1 17 7" {...soft} />
      <path d="M24 40c8 0 15-4 17-11-7-2-14 1-17 7" {...soft} />
    </>
  ),
  berseem: (
    <>
      <path d="M24 44V22" />
      <path d="M24 32c-3 0-9-1-11-6 3-3 9-1 11 6z" {...soft} />
      <path d="M24 32c3 0 9-1 11-6-3-3-9-1-11 6z" {...soft} />
      <path d="M24 30c-2-3-2-8 0-11 2 3 2 8 0 11z" {...soft} />
      <circle cx="24" cy="12" r="6" />
      <path d="M21 10.5h0M24 9h0M27 10.5h0M22.5 13.5h0M25.5 13.5h0" strokeWidth="2.4" />
    </>
  ),
  oats: (
    <>
      <path d="M24 44V8" />
      <path d="M24 14c-4 1-7 4-8 8M24 20c4 1 7 4 8 8M24 26c-4 1-6 4-7 8" />
      <ellipse cx="15.5" cy="24" rx="2" ry="3.4" {...soft} />
      <ellipse cx="32.5" cy="30" rx="2" ry="3.4" {...soft} />
      <ellipse cx="16.6" cy="36" rx="2" ry="3.4" {...soft} />
      <ellipse cx="24" cy="6" rx="2" ry="3" {...soft} />
    </>
  ),
  paddy: (
    <>
      <path d="M18 44c0-12 4-22 14-30" />
      <path d="M32 14c4 4 6 10 5 17" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx={34 + i * 0.6}
          cy={17 + i * 3}
          rx="1.8"
          ry="3"
          transform={`rotate(-15 ${34 + i * 0.6} ${17 + i * 3})`}
          {...soft}
        />
      ))}
      <path d="M22 36c-5-2-9-6-10-11M20 42c5-4 10-5 14-4" />
    </>
  ),
  basmati: (
    <>
      <path d="M18 44c0-12 4-22 14-30" />
      <path d="M32 14c4 4 6 10 5 17" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={34.5 + i * 0.6}
          cy={18 + i * 3.4}
          rx="1.4"
          ry="3.6"
          transform={`rotate(-12 ${34.5 + i * 0.6} ${18 + i * 3.4})`}
          {...soft}
        />
      ))}
      <path d="M8 14c2-2 2-4 0-6m5 6c2-2 2-4 0-6m5 6c2-2 2-4 0-6" />
    </>
  ),
  maize: (
    <>
      <path d="M24 8c5 0 8 6 8 15s-3 17-8 17-8-8-8-17 3-15 8-15z" {...soft} />
      <path d="M20 14h8M18.5 20h11M18 26h12M18.5 32h11" />
      <path d="M24 40c-6 2-11 0-14-5 4-6 8-9 10-11M24 40c6 2 11 0 14-5-4-6-8-9-10-11" />
      <path d="M24 8c0-2 1-4 3-5" />
    </>
  ),
  cotton: (
    <>
      <path d="M24 44V32" />
      <path d="M16 31l8 3 8-3" />
      <circle cx="18" cy="24" r="6" {...soft} />
      <circle cx="30" cy="24" r="6" {...soft} />
      <circle cx="24" cy="16" r="6.5" {...soft} />
      <path d="M14 31c-3-2-4-5-3-8m23 8c3-2 4-5 3-8" />
    </>
  ),
  moong: (
    <>
      <path d="M24 6v12" />
      <path d="M24 18c-6 2-10 8-11 22" />
      <path d="M24 18c0 7 0 14 1 22" />
      <path d="M24 18c6 2 10 8 11 22" />
      <circle cx="13" cy="42" r="1.6" {...soft} />
      <circle cx="25" cy="42" r="1.6" {...soft} />
      <circle cx="35" cy="42" r="1.6" {...soft} />
      <path d="M24 10c-3-3-7-3-9-1 3 3 6 3 9 1zM24 10c3-3 7-3 9-1-3 3-6 3-9 1z" {...soft} />
    </>
  ),
  mash: (
    <>
      <path d="M24 6v10" />
      <path d="M24 16c-5 3-8 10-8 24M24 16c5 3 8 10 8 24" />
      <path d="M16 22l-2-1M16 27l-2-1M16 32l-2-1M32 22l2-1M32 27l2-1M32 32l2-1" />
      <ellipse cx="16" cy="42" rx="2" ry="1.4" fill="currentColor" />
      <ellipse cx="32" cy="42" rx="2" ry="1.4" fill="currentColor" />
      <path d="M24 9c-3-3-7-3-9-1 3 3 6 3 9 1zM24 9c3-3 7-3 9-1-3 3-6 3-9 1z" {...soft} />
    </>
  ),
  groundnut: (
    <>
      <path d="M17 10c5-4 13-2 14 5 1 4-2 6-1 9 2 4 5 6 4 12-1 7-10 9-15 5-4-3-3-8-3-11 0-2-3-4-4-8-1-5 1-9 5-12z" {...soft} />
      <path d="M20 14l2 2M26 12l1 3M18 22h3M27 21l2 2M22 31l1 3M28 33l2 1M19 36l2 1" />
    </>
  ),
  sorghum: (
    <>
      <path d="M24 44V20" />
      <path d="M24 34c-5-1-9-4-11-9M24 28c5-1 9-4 11-9" />
      <ellipse cx="24" cy="12" rx="6" ry="8.5" {...soft} />
      <path d="M21 8h0M24 6.5h0M27 8h0M20.5 12h0M24 11h0M27.5 12h0M21 16h0M24 15.5h0M27 16h0" strokeWidth="2.6" />
    </>
  ),
  bajra: (
    <>
      <path d="M24 44V26" />
      <path d="M24 36c-5-1-9-4-10-9M24 32c5-1 9-4 10-9" />
      <rect x="20.5" y="4" width="7" height="22" rx="3.5" {...soft} />
      <path d="M20.5 9h7M20.5 14h7M20.5 19h7" />
    </>
  ),
  sugarcane: (
    <>
      <path d="M18 44V8M28 44V12" />
      <path d="M15.5 18h5M15.5 28h5M15.5 38h5M25.5 22h5M25.5 32h5" />
      <path d="M18 8c-4-2-7-2-10 0M18 8c4-3 9-4 13-2M28 12c3-3 7-4 11-2" />
    </>
  ),
  kinnow: (
    <>
      <circle cx="23" cy="27" r="14" {...soft} />
      <path d="M23 13c1-3 3-5 6-6" />
      <path d="M26 10c3-4 9-5 12-3-2 4-7 6-12 3z" {...soft} />
      <path d="M17 24h0M28 22h0M20 33h0M29 31h0M23 28h0" strokeWidth="2.4" />
    </>
  ),
  guava: (
    <>
      <path d="M24 9c8 0 14 7 14 17 0 9-6 14-14 14s-14-5-14-14c0-10 6-17 14-17z" {...soft} />
      <path d="M21 40l3 3 3-3" />
      <path d="M24 9c0-2 1-4 3-5" />
      <path d="M27 6c3-3 8-3 10 0-3 3-7 3-10 0z" {...soft} />
    </>
  ),
  mango: (
    <>
      <path d="M17 13c8-4 19 1 20 13 1 9-6 16-15 16-7 0-12-5-11-12 1-5 4-6 4-10 0-3-1-5 2-7z" {...soft} />
      <path d="M19 12c0-3 1-5 3-7" />
      <path d="M22 6c4-3 10-2 13 1-4 3-9 3-13-1z" {...soft} />
    </>
  ),
  pear: (
    <>
      <path d="M24 10c4 0 6 3 6 7 0 3 2 4 4 8 3 7-2 16-10 16s-13-9-10-16c2-4 4-5 4-8 0-4 2-7 6-7z" {...soft} />
      <path d="M24 10c0-3 1-5 3-6" />
      <path d="M26 7c3-3 8-2 10 1-4 2-7 2-10-1z" {...soft} />
    </>
  ),
  litchi: (
    <>
      <path d="M24 4v10M24 14l-8 6M24 14l8 4M24 14v6" />
      <circle cx="15" cy="27" r="7" {...soft} />
      <circle cx="31" cy="25" r="7" {...soft} />
      <circle cx="23" cy="36" r="7" {...soft} />
      <path d="M13 25l2 2M17 28l-2 2M29 23l2 2M33 26l-2 2M21 34l2 2M25 37l-2 2" />
    </>
  ),
  ber: (
    <>
      <path d="M6 14c10-2 22 2 34 12" />
      <path d="M14 12l-2-4M24 14l1-4M33 19l3-3" />
      <ellipse cx="15" cy="22" rx="4.4" ry="5.6" {...soft} />
      <ellipse cx="27" cy="27" rx="4.4" ry="5.6" {...soft} />
      <ellipse cx="36" cy="35" rx="4" ry="5" {...soft} />
      <path d="M15 16.6v-2M27 21.6v-3M36 30v-3" />
    </>
  ),
  potato: (
    <>
      <path d="M10 24c0-9 8-14 16-13 9 1 13 7 12 14-1 9-9 13-17 12-7-1-11-6-11-13z" {...soft} />
      <path d="M18 20c1 0 1 1 0 1M28 18c1 0 1 1 0 1M24 28c1 0 1 1 0 1M32 28c1 0 1 1 0 1M16 30c1 0 1 1 0 1" strokeWidth="2.2" />
    </>
  ),
  tomato: (
    <>
      <path d="M24 14c10 0 16 6 16 14s-7 14-16 14S8 36 8 28s6-14 16-14z" {...soft} />
      <path d="M24 14l-4-4M24 14l4-4M24 14l-7 1M24 14l7 1M24 14V7" />
      <path d="M15 24c1-3 3-4 5-5" />
    </>
  ),
  onion: (
    <>
      <path d="M24 16c9 4 14 10 14 17 0 6-6 9-14 9s-14-3-14-9c0-7 5-13 14-17z" {...soft} />
      <path d="M24 16c-4 6-6 13-5 26M24 16c4 6 6 13 5 26" />
      <path d="M24 16V8M24 10c-3-3-4-6-3-8M24 10c3-3 6-4 9-3" />
      <path d="M21 42l-2 3M24 42v3M27 42l2 3" />
    </>
  ),
  peas: (
    <>
      <path d="M8 30c4-10 16-17 32-16-2 13-14 22-28 21" {...soft} />
      <path d="M12 35c-2-1-4-3-4-5" />
      <circle cx="18" cy="27" r="3" />
      <circle cx="25" cy="23.5" r="3" />
      <circle cx="32" cy="20" r="3" />
      <path d="M40 14c1-3 3-5 5-6" />
    </>
  ),
  cauliflower: (
    <>
      <path d="M12 26c-3 0-4-4-1-6 0-4 4-6 7-4 2-4 8-4 10 0 3-2 8 0 8 4 3 2 2 6-1 6" {...soft} />
      <path d="M18 22c1-1 2-1 3 0M26 20c1-1 2-1 3 0M22 25c1-1 2-1 3 0" />
      <path d="M8 26c4 12 12 16 16 16s12-4 16-16c-6 4-10 4-16 4S14 30 8 26z" />
      <path d="M24 30v12" />
    </>
  ),
  chilli: (
    <>
      <path d="M30 12c-2 0-4 2-4 4-2 10-8 19-17 23 13 3 24-6 25-21 0-3-2-6-4-6z" {...soft} />
      <path d="M30 12c0-3 1-6 4-7" />
      <path d="M27 15c2-1 5-1 7 1" />
    </>
  ),
  cucurbits: (
    <>
      <path d="M24 16c-9 0-15 6-15 14s6 12 15 12 15-4 15-12-6-14-15-14z" {...soft} />
      <path d="M24 16c-5 4-6 18 0 26M24 16c5 4 6 18 0 26M15 19c-3 6-3 16 1 21M33 19c3 6 3 16-1 21" />
      <path d="M24 16v-4c0-2 2-4 4-4M28 8c3 0 4 3 2 4s-3-1-1-2" />
    </>
  ),
  mushroom: (
    <>
      <path d="M8 24c0-9 7-15 16-15s16 6 16 15c0 2-2 3-4 3H12c-2 0-4-1-4-3z" {...soft} />
      <path d="M18 27c0 6-1 11-2 15h16c-1-4-2-9-2-15" />
      <circle cx="18" cy="17" r="1.6" />
      <circle cx="28" cy="14" r="1.6" />
      <circle cx="31" cy="21" r="1.2" />
    </>
  ),
  beekeeping: (
    <>
      <path d="M8 18l6-4 6 4v7l-6 4-6-4z" {...soft} />
      <path d="M20 25l6-4 6 4v7l-6 4-6-4z" {...soft} />
      <path d="M8 32l6-4 6 4v7l-6 4-6-4z" />
      <ellipse cx="35" cy="13" rx="5" ry="3.6" {...soft} />
      <path d="M33 10v6M36 9.6v6.8" />
      <path d="M33 10c-1-4-5-5-6-3M37 10c1-4 5-5 6-3" />
    </>
  ),
  floriculture: (
    <>
      <path d="M24 44V28" />
      <path d="M24 38c-4 0-8-2-9-6 4-1 8 1 9 6zM24 34c4 0 8-2 9-6-4-1-8 1-9 6z" {...soft} />
      <circle cx="24" cy="17" r="11" {...soft} />
      <circle cx="24" cy="17" r="6.5" />
      <circle cx="24" cy="17" r="2.4" />
      <path d="M24 6v3M24 25v3M13 17h3M32 17h3M16 9l2 2M30 23l2 2M32 9l-2 2M16 25l2-2" />
    </>
  ),
  agroforestry: (
    <>
      <path d="M18 44V30" />
      <path d="M18 4c-5 6-7 14-7 20 0 4 3 6 7 6s7-2 7-6c0-6-2-14-7-20z" {...soft} />
      <path d="M18 14v10M18 18l-3-3M18 22l3-3" />
      <path d="M28 44v-6c0-2 1-4 3-5M36 44v-6c0-2 1-4 3-5M32 44v-8" />
      <path d="M6 44h38" />
    </>
  ),
  "medicinal-plants": (
    <>
      <path d="M12 44h24l-3-10H15z" {...soft} />
      <path d="M24 34V14" />
      <path d="M24 24c-6 0-10-4-10-10 6 0 10 4 10 10zM24 20c6 0 10-4 10-10-6 0-10 4-10 10z" {...soft} />
      <path d="M24 14c-1-4 0-7 2-9" />
      <path d="M38 8v6M35 11h6" />
    </>
  ),
};

export function CropIcon({
  name,
  className,
  title,
  strokeWidth = 1.7,
}: {
  name: string;
  className?: string;
  title?: string;
  strokeWidth?: number;
}) {
  const icon = icons[name] ?? icons.wheat;
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {icon}
    </svg>
  );
}

export const cropIconNames = Object.keys(icons);
