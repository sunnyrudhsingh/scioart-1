/**
 * Crops and allied occupations, grouped by season and sub-group.
 * Add a new crop by adding one entry here (and, optionally, an icon key
 * that exists in components/illustrations/CropIcon.tsx).
 */
import { l, type Crop, type L } from "./schema";

type Seed = {
  slug: string;
  name: L;
  season: Crop["season"];
  group: string;
  description: L;
  topics?: string[];
};

const seeds: Seed[] = [
  // ── Rabi ─────────────────────────────────────────────
  {
    slug: "wheat",
    name: l("Wheat", "ਕਣਕ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-cereals",
    description: l(
      "Punjab's main winter cereal and the backbone of the rabi season.",
      "ਪੰਜਾਬ ਦੀ ਮੁੱਖ ਸਰਦ ਰੁੱਤ ਦੀ ਅਨਾਜ ਫ਼ਸਲ ਅਤੇ ਹਾੜ੍ਹੀ ਦੀ ਰੀੜ੍ਹ।",
    ),
    topics: ["ipm", "residue-management", "soil-health", "water-conservation", "safe-chemical-use", "mechanisation", "seed-production"],
  },
  {
    slug: "barley",
    name: l("Barley", "ਜੌਂ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-cereals",
    description: l("A hardy winter cereal for grain, malt and fodder.", "ਦਾਣੇ, ਮਾਲਟ ਅਤੇ ਚਾਰੇ ਲਈ ਸਖ਼ਤ-ਜਾਨ ਸਰਦ ਰੁੱਤ ਦੀ ਅਨਾਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "chickpea",
    name: l("Chickpea", "ਛੋਲੇ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-pulses",
    description: l("A winter pulse that also enriches the soil.", "ਸਰਦ ਰੁੱਤ ਦੀ ਦਾਲ, ਜੋ ਜ਼ਮੀਨ ਦੀ ਤਾਕਤ ਵੀ ਵਧਾਉਂਦੀ ਹੈ।"),
  },
  {
    slug: "lentil",
    name: l("Lentil", "ਮਸਰ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-pulses",
    description: l("A short winter pulse suited to crop diversification.", "ਫ਼ਸਲੀ ਵਿਭਿੰਨਤਾ ਲਈ ਢੁੱਕਵੀਂ ਸਰਦ ਰੁੱਤ ਦੀ ਦਾਲ।"),
  },
  {
    slug: "raya",
    name: l("Raya / Mustard", "ਰਾਇਆ / ਸਰ੍ਹੋਂ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-oilseeds",
    description: l("The yellow-flowered oilseed of Punjab's winter fields.", "ਪੰਜਾਬ ਦੇ ਸਰਦ ਖੇਤਾਂ ਦੀ ਪੀਲੇ ਫੁੱਲਾਂ ਵਾਲੀ ਤੇਲ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "gobhi-sarson",
    name: l("Gobhi Sarson", "ਗੋਭੀ ਸਰ੍ਹੋਂ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-oilseeds",
    description: l("A rapeseed oilseed crop grown in winter.", "ਸਰਦੀਆਂ ਵਿੱਚ ਉਗਾਈ ਜਾਂਦੀ ਤੇਲ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "berseem",
    name: l("Berseem", "ਬਰਸੀਮ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-fodder",
    description: l("Winter green fodder that can be cut many times.", "ਸਰਦੀਆਂ ਦਾ ਹਰਾ ਚਾਰਾ, ਜਿਸ ਦੀਆਂ ਕਈ ਕਟਾਈਆਂ ਹੁੰਦੀਆਂ ਹਨ।"),
  },
  {
    slug: "oats",
    name: l("Oats", "ਜਵੀ"), // pa: needs expert review
    season: "rabi",
    group: "rabi-fodder",
    description: l("A winter fodder crop for green feed and silage.", "ਹਰੇ ਚਾਰੇ ਅਤੇ ਅਚਾਰ ਲਈ ਸਰਦ ਰੁੱਤ ਦੀ ਫ਼ਸਲ।"),
  },

  // ── Kharif ───────────────────────────────────────────
  {
    slug: "paddy",
    name: l("Paddy", "ਝੋਨਾ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-cereals",
    description: l(
      "Punjab's main monsoon crop, where saving water matters most.",
      "ਪੰਜਾਬ ਦੀ ਮੁੱਖ ਸਾਉਣੀ ਫ਼ਸਲ, ਜਿੱਥੇ ਪਾਣੀ ਦੀ ਬੱਚਤ ਸਭ ਤੋਂ ਅਹਿਮ ਹੈ।",
    ),
    topics: ["water-conservation", "residue-management", "ipm"],
  },
  {
    slug: "basmati",
    name: l("Basmati", "ਬਾਸਮਤੀ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-cereals",
    description: l("Aromatic rice grown for quality markets and export.", "ਵਧੀਆ ਮੰਡੀ ਅਤੇ ਨਿਰਯਾਤ ਲਈ ਖ਼ੁਸ਼ਬੂਦਾਰ ਚੌਲ।"),
  },
  {
    slug: "maize",
    name: l("Maize", "ਮੱਕੀ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-cereals",
    description: l("A versatile cereal for grain, fodder and diversification.", "ਦਾਣੇ, ਚਾਰੇ ਅਤੇ ਫ਼ਸਲੀ ਵਿਭਿੰਨਤਾ ਲਈ ਬਹੁਪੱਖੀ ਫ਼ਸਲ।"),
    topics: ["diversification"],
  },
  {
    slug: "cotton",
    name: l("Cotton", "ਨਰਮਾ / ਕਪਾਹ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-fibre",
    description: l("The fibre crop of south-west Punjab.", "ਦੱਖਣ-ਪੱਛਮੀ ਪੰਜਾਬ ਦੀ ਰੇਸ਼ੇ ਵਾਲੀ ਫ਼ਸਲ।"),
    topics: ["ipm", "safe-chemical-use"],
  },
  {
    slug: "moong",
    name: l("Moong", "ਮੂੰਗੀ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-pulses",
    description: l("A short-duration pulse that fits between main crops.", "ਮੁੱਖ ਫ਼ਸਲਾਂ ਦੇ ਵਿਚਕਾਰ ਫ਼ਿੱਟ ਹੋਣ ਵਾਲੀ ਘੱਟ ਸਮੇਂ ਦੀ ਦਾਲ।"),
  },
  {
    slug: "mash",
    name: l("Mash", "ਮਾਂਹ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-pulses",
    description: l("A monsoon pulse also known as urd.", "ਸਾਉਣੀ ਦੀ ਦਾਲ, ਜਿਸ ਨੂੰ ਉੜਦ ਵੀ ਕਹਿੰਦੇ ਹਨ।"),
  },
  {
    slug: "groundnut",
    name: l("Groundnut", "ਮੂੰਗਫਲੀ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-oilseeds",
    description: l("A monsoon oilseed for light soils.", "ਹਲਕੀਆਂ ਜ਼ਮੀਨਾਂ ਲਈ ਸਾਉਣੀ ਦੀ ਤੇਲ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "sorghum",
    name: l("Sorghum", "ਚਰ੍ਹੀ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-fodder",
    description: l("Summer fodder for green feed.", "ਹਰੇ ਚਾਰੇ ਲਈ ਗਰਮੀਆਂ ਦੀ ਫ਼ਸਲ।"),
  },
  {
    slug: "bajra",
    name: l("Bajra", "ਬਾਜਰਾ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-fodder",
    description: l("Pearl millet for fodder and grain in dry areas.", "ਖ਼ੁਸ਼ਕ ਇਲਾਕਿਆਂ ਵਿੱਚ ਚਾਰੇ ਅਤੇ ਦਾਣੇ ਲਈ ਫ਼ਸਲ।"),
  },
  {
    slug: "sugarcane",
    name: l("Sugarcane", "ਗੰਨਾ"), // pa: needs expert review
    season: "kharif",
    group: "kharif-cash",
    description: l("A long-duration cash crop for sugar and gur.", "ਖੰਡ ਅਤੇ ਗੁੜ ਲਈ ਲੰਮੇ ਸਮੇਂ ਦੀ ਨਕਦੀ ਫ਼ਸਲ।"),
  },

  // ── Fruits ───────────────────────────────────────────
  {
    slug: "kinnow",
    name: l("Kinnow", "ਕਿੰਨੂ"), // pa: needs expert review
    season: "fruit",
    group: "fruits",
    description: l("Punjab's best-known citrus fruit.", "ਪੰਜਾਬ ਦਾ ਸਭ ਤੋਂ ਮਸ਼ਹੂਰ ਨਿੰਬੂ ਜਾਤੀ ਦਾ ਫਲ।"),
  },
  {
    slug: "guava",
    name: l("Guava", "ਅਮਰੂਦ"), // pa: needs expert review
    season: "fruit",
    group: "fruits",
    description: l("A hardy fruit tree that gives two crops a year.", "ਸਖ਼ਤ-ਜਾਨ ਫਲਦਾਰ ਬੂਟਾ, ਜੋ ਸਾਲ ਵਿੱਚ ਦੋ ਵਾਰ ਫਲ ਦਿੰਦਾ ਹੈ।"),
  },
  {
    slug: "mango",
    name: l("Mango", "ਅੰਬ"), // pa: needs expert review
    season: "fruit",
    group: "fruits",
    description: l("Grown mainly in the sub-mountain districts.", "ਮੁੱਖ ਤੌਰ 'ਤੇ ਕੰਢੀ ਦੇ ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਉਗਾਇਆ ਜਾਂਦਾ ਹੈ।"),
  },
  {
    slug: "pear",
    name: l("Pear", "ਨਾਸ਼ਪਾਤੀ"), // pa: needs expert review
    season: "fruit",
    group: "fruits",
    description: l("A deciduous fruit for central and northern Punjab.", "ਕੇਂਦਰੀ ਅਤੇ ਉੱਤਰੀ ਪੰਜਾਬ ਲਈ ਪੱਤਝੜੀ ਫਲਦਾਰ ਬੂਟਾ।"),
  },
  {
    slug: "litchi",
    name: l("Litchi", "ਲੀਚੀ"), // pa: needs expert review
    season: "fruit",
    group: "fruits",
    description: l("A summer fruit for the sub-mountain belt.", "ਕੰਢੀ ਇਲਾਕੇ ਲਈ ਗਰਮੀਆਂ ਦਾ ਫਲ।"),
  },
  {
    slug: "ber",
    name: l("Ber", "ਬੇਰ"), // pa: needs expert review
    season: "fruit",
    group: "fruits",
    description: l("A drought-hardy fruit for dry areas.", "ਖ਼ੁਸ਼ਕ ਇਲਾਕਿਆਂ ਲਈ ਸੋਕਾ ਸਹਿਣ ਵਾਲਾ ਫਲ।"),
  },

  // ── Vegetables ───────────────────────────────────────
  {
    slug: "potato",
    name: l("Potato", "ਆਲੂ"), // pa: needs expert review
    season: "vegetable",
    group: "vegetables",
    description: l("A major winter vegetable and seed crop in Punjab.", "ਪੰਜਾਬ ਦੀ ਪ੍ਰਮੁੱਖ ਸਰਦ ਰੁੱਤ ਦੀ ਸਬਜ਼ੀ ਅਤੇ ਬੀਜ ਫ਼ਸਲ।"),
  },
  {
    slug: "tomato",
    name: l("Tomato", "ਟਮਾਟਰ"), // pa: needs expert review
    season: "vegetable",
    group: "vegetables",
    description: l("Grown in open fields and protected structures.", "ਖੁੱਲ੍ਹੇ ਖੇਤਾਂ ਅਤੇ ਢਕੇ ਢਾਂਚਿਆਂ ਵਿੱਚ ਉਗਾਇਆ ਜਾਂਦਾ ਹੈ।"),
  },
  {
    slug: "onion",
    name: l("Onion", "ਪਿਆਜ਼"), // pa: needs expert review
    season: "vegetable",
    group: "vegetables",
    description: l("A bulb crop for fresh market and storage.", "ਤਾਜ਼ੀ ਮੰਡੀ ਅਤੇ ਭੰਡਾਰਨ ਲਈ ਗੰਢ ਵਾਲੀ ਫ਼ਸਲ।"),
  },
  {
    slug: "peas",
    name: l("Peas", "ਮਟਰ"), // pa: needs expert review
    season: "vegetable",
    group: "vegetables",
    description: l("A winter vegetable that also feeds the soil.", "ਸਰਦੀਆਂ ਦੀ ਸਬਜ਼ੀ, ਜੋ ਜ਼ਮੀਨ ਨੂੰ ਵੀ ਤਾਕਤ ਦਿੰਦੀ ਹੈ।"),
  },
  {
    slug: "cauliflower",
    name: l("Cauliflower", "ਫੁੱਲ ਗੋਭੀ"), // pa: needs expert review
    season: "vegetable",
    group: "vegetables",
    description: l("A cool-season vegetable with early and late types.", "ਅਗੇਤੀਆਂ ਅਤੇ ਪਿਛੇਤੀਆਂ ਕਿਸਮਾਂ ਵਾਲੀ ਠੰਢੀ ਰੁੱਤ ਦੀ ਸਬਜ਼ੀ।"),
  },
  {
    slug: "chilli",
    name: l("Chilli", "ਮਿਰਚ"), // pa: needs expert review
    season: "vegetable",
    group: "vegetables",
    description: l("Grown for green and dry red chillies.", "ਹਰੀਆਂ ਅਤੇ ਸੁੱਕੀਆਂ ਲਾਲ ਮਿਰਚਾਂ ਲਈ ਉਗਾਈ ਜਾਂਦੀ ਹੈ।"),
  },
  {
    slug: "cucurbits",
    name: l("Cucurbits", "ਕੱਦੂ ਜਾਤੀ ਦੀਆਂ ਸਬਜ਼ੀਆਂ"), // pa: needs expert review
    season: "vegetable",
    group: "vegetables",
    description: l("Gourds, pumpkins, melons and cucumbers.", "ਘੀਆ, ਕੱਦੂ, ਖਰਬੂਜ਼ੇ ਅਤੇ ਖੀਰੇ।"),
  },

  // ── Allied & subsidiary ──────────────────────────────
  {
    slug: "mushroom",
    name: l("Mushroom", "ਖੁੰਬਾਂ"), // pa: needs expert review
    season: "allied",
    group: "allied",
    description: l("Indoor crop grown on compost or straw, all year round.", "ਖਾਦ ਜਾਂ ਪਰਾਲੀ 'ਤੇ ਘਰ ਅੰਦਰ ਉਗਾਈ ਜਾਣ ਵਾਲੀ ਸਾਰਾ ਸਾਲ ਦੀ ਫ਼ਸਲ।"),
    topics: ["residue-management", "value-addition"],
  },
  {
    slug: "beekeeping",
    name: l("Beekeeping", "ਮਧੂ-ਮੱਖੀ ਪਾਲਣ"), // pa: needs expert review
    season: "allied",
    group: "allied",
    description: l("Honey and pollination income from bee colonies.", "ਮਧੂ-ਮੱਖੀ ਕਟੁੰਬਾਂ ਤੋਂ ਸ਼ਹਿਦ ਅਤੇ ਪਰਾਗਣ ਦੀ ਆਮਦਨ।"),
    topics: ["value-addition"],
  },
  {
    slug: "floriculture",
    name: l("Floriculture", "ਫੁੱਲਾਂ ਦੀ ਖੇਤੀ"), // pa: needs expert review
    season: "allied",
    group: "allied",
    description: l("Growing flowers for markets, events and seed.", "ਮੰਡੀ, ਸਮਾਗਮਾਂ ਅਤੇ ਬੀਜ ਲਈ ਫੁੱਲਾਂ ਦੀ ਖੇਤੀ।"),
    topics: ["diversification", "value-addition"],
  },
  {
    slug: "agroforestry",
    name: l("Agroforestry", "ਖੇਤੀ-ਜੰਗਲਾਤ"), // pa: needs expert review
    season: "allied",
    group: "allied",
    description: l("Trees on farm boundaries and fields, alongside crops.", "ਫ਼ਸਲਾਂ ਦੇ ਨਾਲ ਖੇਤਾਂ ਅਤੇ ਵੱਟਾਂ 'ਤੇ ਰੁੱਖ।"),
    topics: ["climate-smart", "diversification"],
  },
  {
    slug: "medicinal-plants",
    name: l("Medicinal plants", "ਦਵਾਈਆਂ ਵਾਲੇ ਪੌਦੇ"), // pa: needs expert review
    season: "allied",
    group: "allied",
    description: l("Herbs and medicinal crops for specialised markets.", "ਖ਼ਾਸ ਮੰਡੀਆਂ ਲਈ ਜੜ੍ਹੀ-ਬੂਟੀਆਂ ਅਤੇ ਦਵਾਈਆਂ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ।"),
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
  topics: s.topics ?? [],
}));
