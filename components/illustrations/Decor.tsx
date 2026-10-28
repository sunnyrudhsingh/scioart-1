/** Decorative original illustrations: a self-drawing wheat stalk, a scarecrow, leaf sprigs, soil layers. */

export function WheatStalkLine({ className }: { className?: string }) {
  // A tall wheat stalk drawn as one continuous line; it draws itself as it
  // scrolls into view (see .draw-path in globals.css).
  return (
    <svg viewBox="0 0 120 520" className={className} aria-hidden="true" fill="none">
      <path
        className="draw-path"
        style={{ ["--len" as string]: 1400 }}
        d="M60 515 C 58 420, 64 330, 60 230
           M60 380 C 40 360, 26 330, 22 300
           M60 300 C 80 280, 92 254, 96 226
           M60 230 c -10 -6 -14 -16 -12 -26 c 10 4 14 14 12 26
           M60 230 c 10 -8 14 -18 12 -28 c -10 4 -14 14 -12 28
           M60 204 c -10 -6 -14 -16 -12 -26 c 10 4 14 14 12 26
           M60 204 c 10 -8 14 -18 12 -28 c -10 4 -14 14 -12 28
           M60 178 c -10 -6 -14 -16 -12 -26 c 10 4 14 14 12 26
           M60 178 c 10 -8 14 -18 12 -28 c -10 4 -14 14 -12 28
           M60 152 c -9 -6 -12 -15 -10 -24 c 9 4 12 13 10 24
           M60 152 c 9 -7 12 -16 10 -25 c -9 4 -12 13 -10 25
           M60 128 c 0 -10 0 -18 0 -24
           M50 150 L 34 104 M70 148 L 88 102 M52 124 L 42 88 M68 122 L 80 86 M60 104 L 60 66"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Scarecrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 260" className={className} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 236 C 60 222, 180 222, 240 236 V260 H0 Z" fill="var(--hl-field-top)" />
      <g className="sway-slow" style={{ transformOrigin: "120px 250px" }}>
        <path d="M120 250 V70" stroke="var(--soil)" strokeWidth="6" />
        <path d="M50 110 H190" stroke="var(--soil)" strokeWidth="6" />
        {/* shirt */}
        <path d="M78 104 h84 l-10 70 h-64 z" fill="var(--sky)" stroke="var(--ink)" strokeOpacity=".5" strokeWidth="2" />
        <path d="M120 104 v70" stroke="var(--ink)" strokeOpacity=".3" strokeWidth="2" />
        {/* straw hands */}
        <path
          d="M52 104 l-10 -6 M52 110 l-12 2 M52 116 l-10 8 M188 104 l10 -6 M188 110 l12 2 M188 116 l10 8"
          stroke="var(--wheat-gold)"
          strokeWidth="3"
        />
        {/* head */}
        <circle cx="120" cy="74" r="22" fill="#f3e2b6" stroke="var(--ink)" strokeOpacity=".5" strokeWidth="2" />
        <circle cx="112" cy="72" r="2.6" fill="var(--ink)" />
        <circle cx="128" cy="72" r="2.6" fill="var(--ink)" />
        <path d="M112 84 q8 5 16 0" stroke="var(--ink)" strokeWidth="2" />
        {/* turban-style hat */}
        <path d="M96 62 q24 -26 48 0 q-24 -8 -48 0z" fill="var(--wheat-gold)" stroke="var(--ink)" strokeOpacity=".5" strokeWidth="2" />
      </g>
      <g className="drift" style={{ animationDuration: "26s" }}>
        <path className="flap" d="M10 40 q7 -7 14 0 q7 -7 14 0" stroke="var(--hl-bird)" strokeWidth="2.4" />
      </g>
    </svg>
  );
}

export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M4 34 C 24 30, 46 20, 76 6" />
      <path d="M24 29 c -2 -8 2 -14 8 -16 c 2 8 -2 14 -8 16z" fill="currentColor" fillOpacity=".15" />
      <path d="M40 22 c 6 4 14 4 18 -2 c -6 -4 -14 -4 -18 2z" fill="currentColor" fillOpacity=".15" />
      <path d="M54 15 c -1 -7 3 -12 9 -13 c 1 7 -3 12 -9 13z" fill="currentColor" fillOpacity=".15" />
    </svg>
  );
}

export function SoilLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 10 C 80 4, 160 16, 240 8 S 360 6, 400 12 V40 H0 Z" fill="var(--soil)" opacity=".18" />
      <path d="M0 22 C 100 16, 200 28, 300 20 S 380 18, 400 24 V40 H0 Z" fill="var(--soil)" opacity=".22" />
    </svg>
  );
}
