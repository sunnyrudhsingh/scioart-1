/**
 * Original illustration: a Punjab farm at sunrise.
 * Layers (back to front): sun, far tree line with a tubewell kotha,
 * a mustard band, the young wheat field, and golden wheat in front.
 * Each layer carries data-depth so HeroParallax can move it on scroll.
 */

// Small deterministic random generator so the drawing is identical on every render.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// A rotated ellipse as two arcs, so all grains of an ear fit in one path.
function ellipse(cx: number, cy: number, rx: number, ry: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  const dx = rx * Math.cos(a);
  const dy = rx * Math.sin(a);
  const p1 = `${(cx + dx).toFixed(2)} ${(cy + dy).toFixed(2)}`;
  const p2 = `${(cx - dx).toFixed(2)} ${(cy - dy).toFixed(2)}`;
  return `M${p1}A${rx} ${ry} ${deg} 0 1 ${p2}A${rx} ${ry} ${deg} 0 1 ${p1}Z`;
}

const EAR_GRAINS = Array.from({ length: 7 })
  .map((_, i) => ellipse(-3.6, -i * 8, 3.4, 5.2, -24) + ellipse(3.6, -3 - i * 8, 3.4, 5.2, 24))
  .join("");
const EAR_AWNS = "M-4 -50L-11 -66M4 -52L10 -68M0 -55L0 -72M-4 -34L-13 -46M4 -36L13 -48";

const FRONT = (() => {
  const r = rng(7);
  const stalks: { x: number; h: number; s: number; tilt: number; delay: number; tone: number }[] = [];
  for (let x = -20; x < 1640; x += 30 + r() * 26) {
    stalks.push({
      x,
      h: 150 + r() * 120,
      s: 1.25 + r() * 0.6,
      tilt: -8 + r() * 16,
      delay: -r() * 6,
      tone: r(),
    });
  }
  return stalks;
})();

const BACK = (() => {
  const r = rng(31);
  const stalks: { x: number; h: number; s: number; tilt: number; delay: number }[] = [];
  for (let x = 0; x < 1620; x += 27 + r() * 20) {
    stalks.push({ x, h: 70 + r() * 50, s: 0.7 + r() * 0.3, tilt: -6 + r() * 12, delay: -r() * 8 });
  }
  return stalks;
})();

const FLOWERS = (() => {
  const r = rng(99);
  const pts: { x: number; y: number; rr: number }[] = [];
  for (let i = 0; i < 120; i++) pts.push({ x: r() * 1600, y: 628 + r() * 46, rr: 1.6 + r() * 2.4 });
  return pts;
})();

export function HeroLandscape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="hl-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff4c9" />
          <stop offset="0.55" stopColor="#f6cf5a" />
          <stop offset="1" stopColor="#f2b53a" />
        </radialGradient>
        <radialGradient id="hl-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffe08a" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hl-field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--hl-field-top)" }} />
          <stop offset="1" style={{ stopColor: "var(--hl-field-bottom)" }} />
        </linearGradient>
        <linearGradient id="hl-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--hl-front-top)" }} />
          <stop offset="1" style={{ stopColor: "var(--hl-front-bottom)" }} />
        </linearGradient>
        {/* One wheat ear, reused for every stalk: two paths keep it cheap to paint */}
        <symbol id="hl-ear" viewBox="-14 -76 28 82" overflow="visible">
          <path d={EAR_GRAINS} fill="currentColor" />
          <path d={EAR_AWNS} stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" fill="none" />
        </symbol>
      </defs>

      {/* Sun */}
      <g data-depth="0.06">
        <circle cx="985" cy="470" r="230" fill="url(#hl-glow)" className="sun-glow" />
        <circle cx="985" cy="470" r="86" fill="url(#hl-sun)" />
      </g>

      {/* Birds */}
      <g className="drift" style={{ animationDelay: "-12s" }}>
        <g stroke="var(--hl-bird)" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path className="flap" d="M0 230 q9 -9 18 0 q9 -9 18 0" />
          <path className="flap" style={{ animationDelay: "-0.3s" }} d="M48 210 q7 -7 14 0 q7 -7 14 0" />
          <path className="flap" style={{ animationDelay: "-0.6s" }} d="M30 262 q6 -6 12 0 q6 -6 12 0" />
        </g>
      </g>

      {/* Far tree line, kotha and tubewell */}
      <g data-depth="0.12" fill="var(--hl-far)">
        <path d="M0 640 V598 q40 -34 82 -6 q30 -38 74 -8 q26 -22 58 2 q34 -40 82 -6 q22 -18 52 4 q40 -30 86 2 L440 640 Z" />
        <path d="M560 640 V606 q24 -20 50 0 q30 -44 76 -8 q20 -10 40 4 L736 640 Z" />
        {/* tubewell kotha */}
        <rect x="604" y="586" width="64" height="42" rx="2" />
        <path d="M596 590 L636 566 L676 590 Z" />
        <rect x="676" y="604" width="8" height="24" />
        <path d="M684 612 h26 v5 h-26 z" />
        <path d="M1100 640 V602 q36 -36 80 -4 q28 -30 70 0 q38 -42 88 -4 q26 -18 56 6 q30 -32 72 -2 q30 -20 64 4 q28 -18 70 2 V640 Z" />
        {/* a tall tahli tree */}
        <path d="M1316 640 V560 h6 V640 Z" />
        <circle cx="1319" cy="548" r="34" />
        <circle cx="1296" cy="566" r="22" />
        <circle cx="1344" cy="568" r="24" />
      </g>

      {/* Mustard band */}
      <g data-depth="0.2">
        <path d="M0 628 C 220 612, 420 640, 640 624 S 1080 608, 1300 626 S 1560 630, 1600 622 V 690 H 0 Z" fill="var(--hl-mustard)" />
        <g fill="var(--hl-mustard-dot)">
          {FLOWERS.map((f, i) => (
            <circle key={i} cx={f.x.toFixed(1)} cy={f.y.toFixed(1)} r={f.rr.toFixed(1)} />
          ))}
        </g>
      </g>

      {/* Young wheat field with converging furrows */}
      <g data-depth="0.3">
        <path d="M0 672 C 300 660, 700 676, 1000 666 S 1450 660, 1600 668 V 900 H 0 Z" fill="url(#hl-field)" />
        <g stroke="var(--hl-furrow)" strokeWidth="1.6" fill="none" opacity="0.3">
          {Array.from({ length: 15 }).map((_, i) => {
            const bx = -600 + i * 200;
            return <path key={i} d={`M${bx} 900 L ${800 + (bx - 800) * 0.12} 672`} />;
          })}
        </g>
        <g style={{ color: "var(--hl-back-ear)" }}>
          {BACK.map((s, i) => (
            <g key={i} transform={`translate(${s.x.toFixed(1)} 760) rotate(${s.tilt.toFixed(1)})`}>
              <g className="sway-slow" style={{ animationDelay: `${s.delay.toFixed(2)}s` }}>
                <path d={`M0 0 Q 2 ${-s.h / 2} 0 ${-s.h}`} stroke="var(--hl-back-stem)" strokeWidth="2" fill="none" />
                <g transform={`translate(0 ${(-s.h).toFixed(1)}) scale(${s.s.toFixed(2)})`}>
                  <use href="#hl-ear" x="-14" y="-76" width="28" height="82" />
                </g>
              </g>
            </g>
          ))}
        </g>
      </g>

      {/* Golden wheat in front */}
      <g data-depth="0.5">
        <path d="M0 820 C 260 790, 520 812, 800 798 S 1300 786, 1600 806 V 900 H 0 Z" fill="url(#hl-front)" />
        {FRONT.map((s, i) => (
          <g key={i} transform={`translate(${s.x.toFixed(1)} 905) rotate(${s.tilt.toFixed(1)})`}>
            <g
              className="sway"
              style={{ animationDelay: `${s.delay.toFixed(2)}s`, color: s.tone > 0.5 ? "var(--hl-ear)" : "var(--hl-ear-2)" }}
            >
              <path
                d={`M0 0 Q ${(s.tilt / 2).toFixed(1)} ${(-s.h / 2).toFixed(1)} 0 ${(-s.h).toFixed(1)}`}
                stroke="var(--hl-stem)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M0 ${(-s.h * 0.45).toFixed(1)} q -16 -10 -26 -34`}
                stroke="var(--hl-stem)"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
              />
              <g transform={`translate(0 ${(-s.h).toFixed(1)}) scale(${s.s.toFixed(2)})`}>
                <use href="#hl-ear" x="-14" y="-76" width="28" height="82" />
              </g>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
