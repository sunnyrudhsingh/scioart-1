import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Open Graph image: the page title in the brand style, in the page's language.
// Usage: /og?l=pa&t=<title>&k=<kind>

const fontDir = path.join(process.cwd(), "assets", "og-fonts");

// Satori draws glyphs in logical order without OpenType shaping, so the
// Gurmukhi sihari (ਿ), which is written before its consonant, would land
// after it. Move it in front of its consonant cluster so it reads correctly.
function orderGurmukhi(s: string) {
  return s.replace(/([\u0A15-\u0A39\u0A59-\u0A5E]\u0A3C?(?:\u0A4D[\u0A30\u0A35\u0A39])?)\u0A3F/g, "\u0A3F$1");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("l") === "en" ? "en" : "pa";
  const title = orderGurmukhi((searchParams.get("t") || "SciOArt").slice(0, 120));
  const kind = searchParams.get("k") || "default";

  const [fraunces, inter, mukta, muktaLatin] = await Promise.all([
    readFile(path.join(fontDir, "fraunces-latin-600-normal.woff")),
    readFile(path.join(fontDir, "inter-latin-500-normal.woff")),
    readFile(path.join(fontDir, "mukta-mahee-gurmukhi-700-normal.woff")),
    readFile(path.join(fontDir, "mukta-mahee-latin-700-normal.woff")),
  ]);

  const tagline =
    locale === "en" ? "Farm advice you can trust, in Punjabi and English" : orderGurmukhi("ਭਰੋਸੇਯੋਗ ਖੇਤੀ ਸਲਾਹ, ਪੰਜਾਬੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ");
  const accent = kind.startsWith("crop") ? "#e0a526" : kind === "learn" || kind.startsWith("learn") ? "#4fa36b" : "#f2c230";
  const titleFont = locale === "en" ? "Fraunces" : "Mukta";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #cfe5f1 0%, #f3ecdc 58%, #f8dcaa 100%)",
        padding: "64px 72px",
        position: "relative",
      }}
    >
      {/* sun */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 250,
          width: 190,
          height: 190,
          borderRadius: 999,
          background: "#f6cf5a",
          display: "flex",
        }}
      />
      {/* field bands */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 120, height: 34, background: "#f2c230", display: "flex" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 124, background: "#6fa85e", display: "flex" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 52, background: "#d9a43a", display: "flex" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 999,
            border: "7px solid #1f5e3b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 16, height: 22, borderRadius: "16px 0 16px 0", background: "#4fa36b", display: "flex" }} />
        </div>
        <div style={{ fontFamily: "Fraunces", fontSize: 40, color: "#1b1a17", display: "flex" }}>SciOArt</div>
        <div style={{ marginLeft: 14, width: 64, height: 8, borderRadius: 8, background: accent, display: "flex" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 780, marginBottom: 120 }}>
        <div
          style={{
            fontFamily: titleFont,
            fontSize: title.length > 40 ? 60 : title.length > 24 ? 72 : 82,
            lineHeight: locale === "en" ? 1.05 : 1.25,
            color: "#1b1a17",
            display: "flex",
          }}
        >
          {title}
        </div>
        <div style={{ fontFamily: locale === "en" ? "Inter" : "Mukta", fontSize: 30, color: "#3d3a31", display: "flex" }}>{tagline}</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
        { name: "Mukta", data: mukta, weight: 700, style: "normal" },
        { name: "Mukta", data: muktaLatin, weight: 700, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
