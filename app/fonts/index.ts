import localFont from "next/font/local";

// All fonts are self-hosted (SIL Open Font License), so the site works
// without calling Google Fonts and text never shifts while fonts load.

export const fraunces = localFont({
  src: "./fraunces-latin-opsz.woff2",
  variable: "--font-fraunces",
  weight: "300 900",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const inter = localFont({
  src: "./inter-latin-wght.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const notoGurmukhi = localFont({
  src: "./noto-sans-gurmukhi-wght.woff2",
  variable: "--font-noto-gurmukhi",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
});

export const mukta = localFont({
  src: [
    { path: "./mukta-mahee-gurmukhi-500.woff2", weight: "500", style: "normal" },
    { path: "./mukta-mahee-gurmukhi-700.woff2", weight: "700", style: "normal" },
    { path: "./mukta-mahee-gurmukhi-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-mukta",
  display: "swap",
  preload: false,
  fallback: ["sans-serif"],
});

export const fontVariables = [fraunces.variable, inter.variable, notoGurmukhi.variable, mukta.variable].join(" ");
