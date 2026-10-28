// Renders the PNG app icons from the SVG logo mark (uses Playwright's Chromium).
// Run: node scripts/make-icons.mjs
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const svg = readFileSync(path.join(root, "public", "icon.svg"), "utf8");
const dir = path.join(root, "public", "icons");
mkdirSync(dir, { recursive: true });

const page = (size, padding, bg) => `<!doctype html><html><body style="margin:0">
<div style="width:${size}px;height:${size}px;background:${bg};display:grid;place-items:center">
<div style="width:${size - padding * 2}px;height:${size - padding * 2}px">${svg.replace("<svg ", '<svg width="100%" height="100%" ')}</div></div></body></html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const tab = await ctx.newPage();
for (const [name, size, padding, bg] of [
  ["icon-192.png", 192, 0, "transparent"],
  ["icon-512.png", 512, 0, "transparent"],
  ["icon-maskable-512.png", 512, 72, "#fbf7ef"],
  ["apple-touch-icon.png", 180, 14, "#fbf7ef"],
]) {
  await tab.setViewportSize({ width: size, height: size });
  await tab.setContent(page(size, padding, bg));
  await tab.screenshot({ path: path.join(dir, name), omitBackground: bg === "transparent" });
  console.log("wrote", name);
}
await browser.close();
