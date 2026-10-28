/**
 * Leaflets and research summaries. All entries are SAMPLES.
 * (The PoP edition archive is generated from content/editions.ts.)
 */
import { l, type Resource } from "./schema";

export const resources: Resource[] = [
  {
    slug: "sample-wheat-leaflet",
    type: "leaflet",
    title: l("Wheat at a glance (sample leaflet)", "ਕਣਕ ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ (ਨਮੂਨਾ ਪਰਚਾ)"),
    description: l("A two-page summary to print for farmer meetings.", "ਕਿਸਾਨ ਮਿਲਣੀਆਂ ਲਈ ਛਾਪਣ ਵਾਸਤੇ ਦੋ ਪੰਨਿਆਂ ਦਾ ਸਾਰ।"),
    year: 2026,
    crops: ["wheat"],
    topics: [],
    file: "/samples/sample-wheat-leaflet.pdf",
    link: "",
    sample: true,
  },
  {
    slug: "sample-safe-spraying-leaflet",
    type: "leaflet",
    title: l("Safe spraying (sample leaflet)", "ਸੁਰੱਖਿਅਤ ਛਿੜਕਾਅ (ਨਮੂਨਾ ਪਰਚਾ)"),
    description: l("Protective clothing, labels and clean-up, in pictures.", "ਬਚਾਅ ਵਾਲੇ ਕੱਪੜੇ, ਲੇਬਲ ਅਤੇ ਸਫ਼ਾਈ, ਤਸਵੀਰਾਂ ਰਾਹੀਂ।"),
    year: 2026,
    crops: [],
    topics: ["safe-chemical-use", "ipm"],
    file: "/samples/sample-safe-spraying-leaflet.pdf",
    link: "",
    sample: true,
  },
  {
    slug: "sample-edutainment-research",
    type: "research",
    title: l("Sample summary: edutainment tools and farmers' knowledge", "ਨਮੂਨਾ ਸਾਰ: ਸਿੱਖਿਆ-ਮਨੋਰੰਜਨ ਸਾਧਨ ਅਤੇ ਕਿਸਾਨਾਂ ਦੀ ਜਾਣਕਾਰੀ"),
    description: l(
      "Sample abstract — a plain-language summary of the study, its methods and what it found will appear here.",
      "ਨਮੂਨਾ ਸਾਰ — ਅਧਿਐਨ, ਇਸ ਦੇ ਤਰੀਕਿਆਂ ਅਤੇ ਨਤੀਜਿਆਂ ਦਾ ਸੌਖੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਾਰ ਇੱਥੇ ਆਵੇਗਾ।",
    ),
    year: 2026,
    authors: l("Authors — to be added", "ਲੇਖਕ — ਜੋੜੇ ਜਾਣੇ ਹਨ"),
    crops: [],
    topics: ["ipm"],
    file: "",
    link: "",
    sample: true,
  },
  {
    slug: "sample-residue-research",
    type: "research",
    title: l("Sample summary: managing paddy straw on farms", "ਨਮੂਨਾ ਸਾਰ: ਖੇਤਾਂ ਵਿੱਚ ਝੋਨੇ ਦੀ ਪਰਾਲੀ ਦਾ ਪ੍ਰਬੰਧ"),
    description: l(
      "Sample abstract — a plain-language research summary will appear here.",
      "ਨਮੂਨਾ ਸਾਰ — ਖੋਜ ਦਾ ਸੌਖੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਾਰ ਇੱਥੇ ਆਵੇਗਾ।",
    ),
    year: 2025,
    authors: l("Authors — to be added", "ਲੇਖਕ — ਜੋੜੇ ਜਾਣੇ ਹਨ"),
    crops: ["paddy", "wheat"],
    topics: ["residue-management"],
    file: "",
    link: "",
    sample: true,
  },
];
