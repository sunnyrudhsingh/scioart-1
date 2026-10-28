/**
 * Crops and allied occupations, grouped by season and sub-group.
 * Add a new crop by adding one entry here (and, optionally, an icon key
 * that exists in components/illustrations/CropIcon.tsx).
 */
import { l, type Crop, type L } from "./schema";
import { coreOperationSlugs } from "./taxonomy";

const dash = l("—", "—");

/** Placeholder quick facts. Values are filled from the official PoP later. */
const facts = (): Crop["quickFacts"] => [
  { label: l("Sowing or planting window", "ਬਿਜਾਈ ਜਾਂ ਲੁਆਈ ਦਾ ਸਮਾਂ"), value: dash },
  { label: l("Crop duration", "ਫ਼ਸਲ ਦਾ ਸਮਾਂ"), value: dash },
  { label: l("Recommended varieties", "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀਆਂ ਕਿਸਮਾਂ"), value: dash },
  { label: l("Average yield", "ਔਸਤ ਝਾੜ"), value: dash },
];

type Seed = {
  slug: string;
  name: L;
  season: Crop["season"];
  group: string;
  description: L;
  publication: string;
  operations?: string[];
  topics?: string[];
};

const seeds: Seed[] = [
  // ── Rabi ─────────────────────────────────────────────
  {
    slug: "wheat",
    name: l("Wheat", "ਕਣਕ"),
    season: "rabi",
    group: "rabi-cereals",
    publication: "rabi", // pa: needs expert review
    description: l(
      "Punjab's main winter cereal and the backbone of the rabi season.",
      "ਪੰਜਾਬ ਦੀ ਮੁੱਖ ਸਰਦ ਰੁੱਤ ਦੀ ਅਨਾਜ ਫ਼ਸਲ ਅਤੇ ਹਾੜ੍ਹੀ ਦੀ ਰੀੜ੍ਹ।",
    ),
    topics: ["ipm", "residue-management", "soil-health", "water-conservation", "safe-chemical-use", "mechanisation", "seed-production"],
  },
  {
    slug: "barley",
    name: l("Barley", "ਜੌਂ"),
    season: "rabi",
    group: "rabi-cereals",
    publication: "rabi", // pa: needs expert review
    description: l("A hardy winter cereal for grain, malt and fodder.", "ਦਾਣੇ, ਮਾਲਟ ਅਤੇ ਚਾਰੇ ਲਈ ਸਖ਼ਤ-ਜਾਨ ਸਰਦ ਰੁੱਤ ਦੀ ਅਨਾਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "chickpea",
    name: l("Chickpea", "ਛੋਲੇ"),
    season: "rabi",
    group: "rabi-pulses",
    publication: "rabi", // pa: needs expert review
    description: l("A winter pulse that also enriches the soil.", "ਸਰਦ ਰੁੱਤ ਦੀ ਦਾਲ, ਜੋ ਜ਼ਮੀਨ ਦੀ ਤਾਕਤ ਵੀ ਵਧਾਉਂਦੀ ਹੈ।"),
  },
  {
    slug: "lentil",
    name: l("Lentil", "ਮਸਰ"),
    season: "rabi",
    group: "rabi-pulses",
    publication: "rabi", // pa: needs expert review
    description: l("A short winter pulse suited to crop diversification.", "ਫ਼ਸਲੀ ਵਿਭਿੰਨਤਾ ਲਈ ਢੁੱਕਵੀਂ ਸਰਦ ਰੁੱਤ ਦੀ ਦਾਲ।"),
  },
  {
    slug: "raya",
    name: l("Raya / Mustard", "ਰਾਇਆ / ਸਰ੍ਹੋਂ"),
    season: "rabi",
    group: "rabi-oilseeds",
    publication: "rabi", // pa: needs expert review
    description: l("The yellow-flowered oilseed of Punjab's winter fields.", "ਪੰਜਾਬ ਦੇ ਸਰਦ ਖੇਤਾਂ ਦੀ ਪੀਲੇ ਫੁੱਲਾਂ ਵਾਲੀ ਤੇਲ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "gobhi-sarson",
    name: l("Gobhi Sarson", "ਗੋਭੀ ਸਰ੍ਹੋਂ"),
    season: "rabi",
    group: "rabi-oilseeds",
    publication: "rabi", // pa: needs expert review
    description: l("A rapeseed oilseed crop grown in winter.", "ਸਰਦੀਆਂ ਵਿੱਚ ਉਗਾਈ ਜਾਂਦੀ ਤੇਲ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "berseem",
    name: l("Berseem", "ਬਰਸੀਮ"),
    season: "rabi",
    group: "rabi-fodder",
    publication: "rabi", // pa: needs expert review
    description: l("Winter green fodder that can be cut many times.", "ਸਰਦੀਆਂ ਦਾ ਹਰਾ ਚਾਰਾ, ਜਿਸ ਦੀਆਂ ਕਈ ਕਟਾਈਆਂ ਹੁੰਦੀਆਂ ਹਨ।"),
  },
  {
    slug: "oats",
    name: l("Oats", "ਜਵੀ"),
    season: "rabi",
    group: "rabi-fodder",
    publication: "rabi", // pa: needs expert review
    description: l("A winter fodder crop for green feed and silage.", "ਹਰੇ ਚਾਰੇ ਅਤੇ ਅਚਾਰ ਲਈ ਸਰਦ ਰੁੱਤ ਦੀ ਫ਼ਸਲ।"),
  },

  // ── Kharif ───────────────────────────────────────────
  {
    slug: "paddy",
    name: l("Paddy", "ਝੋਨਾ"),
    season: "kharif",
    group: "kharif-cereals",
    publication: "kharif", // pa: needs expert review
    description: l(
      "Punjab's main monsoon crop, where saving water matters most.",
      "ਪੰਜਾਬ ਦੀ ਮੁੱਖ ਸਾਉਣੀ ਫ਼ਸਲ, ਜਿੱਥੇ ਪਾਣੀ ਦੀ ਬੱਚਤ ਸਭ ਤੋਂ ਅਹਿਮ ਹੈ।",
    ),
    topics: ["water-conservation", "residue-management", "ipm"],
  },
  {
    slug: "basmati",
    name: l("Basmati", "ਬਾਸਮਤੀ"),
    season: "kharif",
    group: "kharif-cereals",
    publication: "kharif", // pa: needs expert review
    description: l("Aromatic rice grown for quality markets and export.", "ਵਧੀਆ ਮੰਡੀ ਅਤੇ ਨਿਰਯਾਤ ਲਈ ਖ਼ੁਸ਼ਬੂਦਾਰ ਚੌਲ।"),
  },
  {
    slug: "maize",
    name: l("Maize", "ਮੱਕੀ"),
    season: "kharif",
    group: "kharif-cereals",
    publication: "kharif", // pa: needs expert review
    description: l("A versatile cereal for grain, fodder and diversification.", "ਦਾਣੇ, ਚਾਰੇ ਅਤੇ ਫ਼ਸਲੀ ਵਿਭਿੰਨਤਾ ਲਈ ਬਹੁਪੱਖੀ ਫ਼ਸਲ।"),
    topics: ["diversification"],
  },
  {
    slug: "cotton",
    name: l("Cotton", "ਨਰਮਾ / ਕਪਾਹ"),
    season: "kharif",
    group: "kharif-fibre",
    publication: "kharif", // pa: needs expert review
    description: l("The fibre crop of south-west Punjab.", "ਦੱਖਣ-ਪੱਛਮੀ ਪੰਜਾਬ ਦੀ ਰੇਸ਼ੇ ਵਾਲੀ ਫ਼ਸਲ।"),
    topics: ["ipm", "safe-chemical-use"],
  },
  {
    slug: "moong",
    name: l("Moong", "ਮੂੰਗੀ"),
    season: "kharif",
    group: "kharif-pulses",
    publication: "kharif", // pa: needs expert review
    description: l("A short-duration pulse that fits between main crops.", "ਮੁੱਖ ਫ਼ਸਲਾਂ ਦੇ ਵਿਚਕਾਰ ਫ਼ਿੱਟ ਹੋਣ ਵਾਲੀ ਘੱਟ ਸਮੇਂ ਦੀ ਦਾਲ।"),
  },
  {
    slug: "mash",
    name: l("Mash", "ਮਾਂਹ"),
    season: "kharif",
    group: "kharif-pulses",
    publication: "kharif", // pa: needs expert review
    description: l("A monsoon pulse also known as urd.", "ਸਾਉਣੀ ਦੀ ਦਾਲ, ਜਿਸ ਨੂੰ ਉੜਦ ਵੀ ਕਹਿੰਦੇ ਹਨ।"),
  },
  {
    slug: "groundnut",
    name: l("Groundnut", "ਮੂੰਗਫਲੀ"),
    season: "kharif",
    group: "kharif-oilseeds",
    publication: "kharif", // pa: needs expert review
    description: l("A monsoon oilseed for light soils.", "ਹਲਕੀਆਂ ਜ਼ਮੀਨਾਂ ਲਈ ਸਾਉਣੀ ਦੀ ਤੇਲ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "sorghum",
    name: l("Sorghum", "ਚਰ੍ਹੀ"),
    season: "kharif",
    group: "kharif-fodder",
    publication: "kharif", // pa: needs expert review
    description: l("Summer fodder for green feed.", "ਹਰੇ ਚਾਰੇ ਲਈ ਗਰਮੀਆਂ ਦੀ ਫ਼ਸਲ।"),
  },
  {
    slug: "bajra",
    name: l("Bajra", "ਬਾਜਰਾ"),
    season: "kharif",
    group: "kharif-fodder",
    publication: "kharif", // pa: needs expert review
    description: l("Pearl millet for fodder and grain in dry areas.", "ਖ਼ੁਸ਼ਕ ਇਲਾਕਿਆਂ ਵਿੱਚ ਚਾਰੇ ਅਤੇ ਦਾਣੇ ਲਈ ਫ਼ਸਲ।"),
  },
  {
    slug: "sugarcane",
    name: l("Sugarcane", "ਗੰਨਾ"),
    season: "kharif",
    group: "kharif-cash",
    publication: "kharif", // pa: needs expert review
    description: l("A long-duration cash crop for sugar and gur.", "ਖੰਡ ਅਤੇ ਗੁੜ ਲਈ ਲੰਮੇ ਸਮੇਂ ਦੀ ਨਕਦੀ ਫ਼ਸਲ।"),
  },

  // ── Fruits ───────────────────────────────────────────
  {
    slug: "kinnow",
    name: l("Kinnow", "ਕਿੰਨੂ"),
    season: "fruit",
    group: "fruits",
    publication: "fruits", // pa: needs expert review
    description: l("Punjab's best-known citrus fruit.", "ਪੰਜਾਬ ਦਾ ਸਭ ਤੋਂ ਮਸ਼ਹੂਰ ਨਿੰਬੂ ਜਾਤੀ ਦਾ ਫਲ।"),
  },
  {
    slug: "guava",
    name: l("Guava", "ਅਮਰੂਦ"),
    season: "fruit",
    group: "fruits",
    publication: "fruits", // pa: needs expert review
    description: l("A hardy fruit tree that gives two crops a year.", "ਸਖ਼ਤ-ਜਾਨ ਫਲਦਾਰ ਬੂਟਾ, ਜੋ ਸਾਲ ਵਿੱਚ ਦੋ ਵਾਰ ਫਲ ਦਿੰਦਾ ਹੈ।"),
  },
  {
    slug: "mango",
    name: l("Mango", "ਅੰਬ"),
    season: "fruit",
    group: "fruits",
    publication: "fruits", // pa: needs expert review
    description: l("Grown mainly in the sub-mountain districts.", "ਮੁੱਖ ਤੌਰ 'ਤੇ ਕੰਢੀ ਦੇ ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਉਗਾਇਆ ਜਾਂਦਾ ਹੈ।"),
  },
  {
    slug: "pear",
    name: l("Pear", "ਨਾਸ਼ਪਾਤੀ"),
    season: "fruit",
    group: "fruits",
    publication: "fruits", // pa: needs expert review
    description: l("A deciduous fruit for central and northern Punjab.", "ਕੇਂਦਰੀ ਅਤੇ ਉੱਤਰੀ ਪੰਜਾਬ ਲਈ ਪੱਤਝੜੀ ਫਲਦਾਰ ਬੂਟਾ।"),
  },
  {
    slug: "litchi",
    name: l("Litchi", "ਲੀਚੀ"),
    season: "fruit",
    group: "fruits",
    publication: "fruits", // pa: needs expert review
    description: l("A summer fruit for the sub-mountain belt.", "ਕੰਢੀ ਇਲਾਕੇ ਲਈ ਗਰਮੀਆਂ ਦਾ ਫਲ।"),
  },
  {
    slug: "ber",
    name: l("Ber", "ਬੇਰ"),
    season: "fruit",
    group: "fruits",
    publication: "fruits", // pa: needs expert review
    description: l("A drought-hardy fruit for dry areas.", "ਖ਼ੁਸ਼ਕ ਇਲਾਕਿਆਂ ਲਈ ਸੋਕਾ ਸਹਿਣ ਵਾਲਾ ਫਲ।"),
  },

  // ── Vegetables ───────────────────────────────────────
  {
    slug: "potato",
    name: l("Potato", "ਆਲੂ"),
    season: "vegetable",
    group: "vegetables",
    publication: "vegetables", // pa: needs expert review
    description: l("A major winter vegetable and seed crop in Punjab.", "ਪੰਜਾਬ ਦੀ ਪ੍ਰਮੁੱਖ ਸਰਦ ਰੁੱਤ ਦੀ ਸਬਜ਼ੀ ਅਤੇ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "tomato",
    name: l("Tomato", "ਟਮਾਟਰ"),
    season: "vegetable",
    group: "vegetables",
    publication: "vegetables", // pa: needs expert review
    description: l("Grown in open fields and protected structures.", "ਖੁੱਲ੍ਹੇ ਖੇਤਾਂ ਅਤੇ ਢਕੇ ਢਾਂਚਿਆਂ ਵਿੱਚ ਉਗਾਇਆ ਜਾਂਦਾ ਹੈ।"),
  },
  {
    slug: "onion",
    name: l("Onion", "ਪਿਆਜ਼"),
    season: "vegetable",
    group: "vegetables",
    publication: "vegetables", // pa: needs expert review
    description: l("A bulb crop for fresh market and storage.", "ਤਾਜ਼ੀ ਮੰਡੀ ਅਤੇ ਭੰਡਾਰਨ ਲਈ ਗੰਢ ਵਾਲੀ ਫ਼ਸਲ।"),
  },
  {
    slug: "peas",
    name: l("Peas", "ਮਟਰ"),
    season: "vegetable",
    group: "vegetables",
    publication: "vegetables", // pa: needs expert review
    description: l("A winter vegetable that also feeds the soil.", "ਸਰਦੀਆਂ ਦੀ ਸਬਜ਼ੀ, ਜੋ ਜ਼ਮੀਨ ਨੂੰ ਵੀ ਤਾਕਤ ਦਿੰਦੀ ਹੈ।"),
  },
  {
    slug: "cauliflower",
    name: l("Cauliflower", "ਫੁੱਲ ਗੋਭੀ"),
    season: "vegetable",
    group: "vegetables",
    publication: "vegetables", // pa: needs expert review
    description: l("A cool-season vegetable with early and late types.", "ਅਗੇਤੀਆਂ ਅਤੇ ਪਿਛੇਤੀਆਂ ਕਿਸਮਾਂ ਵਾਲੀ ਠੰਢੀ ਰੁੱਤ ਦੀ ਸਬਜ਼ੀ।"),
  },
  {
    slug: "chilli",
    name: l("Chilli", "ਮਿਰਚ"),
    season: "vegetable",
    group: "vegetables",
    publication: "vegetables", // pa: needs expert review
    description: l("Grown for green and dry red chillies.", "ਹਰੀਆਂ ਅਤੇ ਸੁੱਕੀਆਂ ਲਾਲ ਮਿਰਚਾਂ ਲਈ ਉਗਾਈ ਜਾਂਦੀ ਹੈ।"),
  },
  {
    slug: "cucurbits",
    name: l("Cucurbits", "ਕੱਦੂ ਜਾਤੀ ਦੀਆਂ ਸਬਜ਼ੀਆਂ"),
    season: "vegetable",
    group: "vegetables",
    publication: "vegetables", // pa: needs expert review
    description: l("Gourds, pumpkins, melons and cucumbers.", "ਘੀਆ, ਕੱਦੂ, ਖਰਬੂਜ਼ੇ ਅਤੇ ਖੀਰੇ।"),
  },

  // ── Allied & subsidiary ──────────────────────────────
  {
    slug: "mushroom",
    name: l("Mushroom", "ਖੁੰਬਾਂ"),
    season: "allied",
    group: "allied",
    publication: "allied", // pa: needs expert review
    description: l("Indoor crop grown on compost or straw, all year round.", "ਖਾਦ ਜਾਂ ਪਰਾਲੀ 'ਤੇ ਘਰ ਅੰਦਰ ਉਗਾਈ ਜਾਣ ਵਾਲੀ ਸਾਰਾ ਸਾਲ ਦੀ ਫ਼ਸਲ।"),
    operations: ["varieties", "substrate", "spawning", "crop-care", "pests-diseases", "harvest", "marketing"],
    topics: ["residue-management", "value-addition"],
  },
  {
    slug: "beekeeping",
    name: l("Beekeeping", "ਮਧੂ-ਮੱਖੀ ਪਾਲਣ"),
    season: "allied",
    group: "allied",
    publication: "allied", // pa: needs expert review
    description: l("Honey and pollination income from bee colonies.", "ਮਧੂ-ਮੱਖੀ ਕਟੁੰਬਾਂ ਤੋਂ ਸ਼ਹਿਦ ਅਤੇ ਪਰਾਗਣ ਦੀ ਆਮਦਨ।"),
    operations: ["varieties", "colony-management", "seasonal-care", "pests-diseases", "harvest", "marketing"],
    topics: ["value-addition"],
  },
  {
    slug: "floriculture",
    name: l("Floriculture", "ਫੁੱਲਾਂ ਦੀ ਖੇਤੀ"),
    season: "allied",
    group: "allied",
    publication: "allied", // pa: needs expert review
    description: l("Growing flowers for markets, events and seed.", "ਮੰਡੀ, ਸਮਾਗਮਾਂ ਅਤੇ ਬੀਜ ਲਈ ਫੁੱਲਾਂ ਦੀ ਖੇਤੀ।"),
    operations: ["varieties", "nursery", "crop-care", "pests-diseases", "harvest", "marketing"],
    topics: ["diversification", "value-addition"],
  },
  {
    slug: "agroforestry",
    name: l("Agroforestry", "ਖੇਤੀ-ਜੰਗਲਾਤ"),
    season: "allied",
    group: "allied",
    publication: "allied", // pa: needs expert review
    description: l("Trees on farm boundaries and fields, alongside crops.", "ਫ਼ਸਲਾਂ ਦੇ ਨਾਲ ਖੇਤਾਂ ਅਤੇ ਵੱਟਾਂ 'ਤੇ ਰੁੱਖ।"),
    operations: ["varieties", "nursery", "crop-care", "pests-diseases", "harvest", "marketing"],
    topics: ["climate-smart", "diversification"],
  },
  {
    slug: "medicinal-plants",
    name: l("Medicinal plants", "ਦਵਾਈਆਂ ਵਾਲੇ ਪੌਦੇ"),
    season: "allied",
    group: "allied",
    publication: "allied", // pa: needs expert review
    description: l("Herbs and medicinal crops for specialised markets.", "ਖ਼ਾਸ ਮੰਡੀਆਂ ਲਈ ਜੜ੍ਹੀ-ਬੂਟੀਆਂ ਅਤੇ ਦਵਾਈਆਂ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ।"),
    operations: ["varieties", "nursery", "crop-care", "pests-diseases", "harvest", "marketing"],
    topics: ["diversification", "value-addition"],
  },
];

export const crops: Crop[] = seeds.map((s) => ({
  slug: s.slug,
  name: s.name,
  season: s.season,
  group: s.group,
  description: s.description,
  illustration: s.slug,
  image: `/images/crops/${s.slug}.jpg`,
  publication: s.publication,
  operations: s.operations ?? coreOperationSlugs,
  quickFacts: facts(),
  topics: s.topics ?? [],
}));
