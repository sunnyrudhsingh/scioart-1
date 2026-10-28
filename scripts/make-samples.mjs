// Generates the SAMPLE placeholder files in /public/samples:
// one-page PDFs for games, leaflets and kit files, and short silent MP3s.
// Run: node scripts/make-samples.mjs   (MP3s need ffmpeg installed)
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const out = path.join(process.cwd(), "public", "samples");

function pdf(title, lines) {
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  const body = [
    "BT /F2 22 Tf 72 740 Td (" + esc(title) + ") Tj ET",
    "BT /F1 12 Tf 72 712 Td (SAMPLE FILE - to be replaced with the final material.) Tj ET",
    ...lines.map((l, i) => `BT /F1 12 Tf 72 ${680 - i * 20} Td (${esc(l)}) Tj ET`),
    "0.12 0.37 0.23 RG 3 w 72 760 m 540 760 l S",
    "BT /F1 10 Tf 72 60 Td (SciOArt - scioart.co.in) Tj ET",
  ].join("\n");
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(body)} >>\nstream\n${body}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  let s = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(s));
    s += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(s);
  s += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  s += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
  s += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return s;
}

function write(rel, content) {
  const file = path.join(out, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log("wrote", path.relative(process.cwd(), file));
}

write(
  "sample-ipm-snakes-and-ladders.pdf",
  pdf("IPM Snakes and Ladders", ["Board, question cards and rules will go here.", "Print on A3 for groups, A4 for small teams."]),
);
write("sample-weed-watch-cards.pdf", pdf("Weed Watch card game", ["Card sheets to print and cut will go here."]));
write("sample-wheat-leaflet.pdf", pdf("Wheat at a glance", ["Two-page leaflet based on the PAU Package of Practices."]));
write("sample-safe-spraying-leaflet.pdf", pdf("Safe spraying", ["Protective clothing, labels and clean-up, in pictures."]));

const kits = {
  "wheat-weed-management": "Wheat - Weed management",
  "wheat-insect-pests": "Wheat - Insect pests",
  "wheat-diseases": "Wheat - Diseases",
};
const parts = {
  "facilitator-guide": "Facilitator guide",
  slides: "Slides",
  leaflet: "Farmer leaflet",
  activity: "Group activity",
  "pre-test": "Pre-test",
  "post-test": "Post-test",
  "feedback-form": "Feedback form",
};
for (const [slug, title] of Object.entries(kits)) {
  for (const [part, name] of Object.entries(parts)) {
    write(`kits/${slug}/${part}.pdf`, pdf(`${title}: ${name}`, ["Extension kit file - content to be added by the PAU team."]));
  }
}

// Silent placeholder audio (3 seconds). Requires ffmpeg.
const audio = ["sample-song-of-the-soil", "sample-every-drop-counts", "sample-straw-is-gold", "sample-kheti-gal-baat-1"];
for (const name of audio) {
  const file = path.join(out, `${name}.mp3`);
  if (existsSync(file)) continue;
  try {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono", "-t", "3", "-b:a", "32k", file]);
    console.log("wrote", path.relative(process.cwd(), file));
  } catch {
    console.warn("ffmpeg not found: skipped", name);
  }
}
