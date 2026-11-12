/**
 * Research summaries about the work behind SciOArt. All entries are SAMPLES.
 */
import { l, type Resource } from "./schema";

export const resources: Resource[] = [
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
