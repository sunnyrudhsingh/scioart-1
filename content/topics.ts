/**
 * Cross-cutting topics. Each topic page gathers related operation pages,
 * learning items, kits, advisories and resources from every crop.
 * Overviews are SAMPLE text and must be replaced with reviewed content.
 */
import { l, type Topic } from "./schema";

const sample = l(
  "Sample overview — the reviewed introduction to this topic will be added here.",
  "ਨਮੂਨਾ ਜਾਣ-ਪਛਾਣ — ਇਸ ਵਿਸ਼ੇ ਦੀ ਸਮੀਖਿਆ ਕੀਤੀ ਜਾਣ-ਪਛਾਣ ਇੱਥੇ ਜੋੜੀ ਜਾਵੇਗੀ।",
);

export const topics: Topic[] = [
  {
    slug: "soil-health",
    icon: "soil-health",
    name: l("Soil health and testing", "ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਪਰਖ"), // pa: needs expert review
    short: l("Know your soil before you feed it.", "ਖਾਦ ਪਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੀ ਮਿੱਟੀ ਨੂੰ ਜਾਣੋ।"),
    overview: [sample],
    links: [
      { crop: "wheat", operation: "nutrients" },
      { crop: "wheat", operation: "land-preparation" },
    ],
  },
  {
    slug: "water-conservation",
    icon: "water-conservation",
    name: l("Water conservation", "ਪਾਣੀ ਦੀ ਸੰਭਾਲ"), // pa: needs expert review
    short: l("Grow more with every drop of groundwater.", "ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਦੀ ਹਰ ਬੂੰਦ ਨਾਲ ਵੱਧ ਉਪਜ।"),
    overview: [sample],
    links: [
      { crop: "wheat", operation: "irrigation" },
      { crop: "paddy", operation: "irrigation" },
    ],
  },
  {
    slug: "ipm",
    icon: "ipm",
    name: l("Integrated Pest Management (IPM)", "ਸੰਯੁਕਤ ਕੀਟ ਪ੍ਰਬੰਧ"), // pa: needs expert review
    short: l("Watch, decide, then act — spray only when needed.", "ਦੇਖੋ, ਸੋਚੋ, ਫਿਰ ਕਰੋ — ਛਿੜਕਾਅ ਸਿਰਫ਼ ਲੋੜ ਪੈਣ 'ਤੇ।"),
    overview: [sample],
    links: [
      { crop: "wheat", operation: "insect-pests" },
      { crop: "wheat", operation: "diseases" },
      { crop: "wheat", operation: "weeds" },
      { crop: "cotton", operation: "insect-pests" },
    ],
  },
  {
    slug: "residue-management",
    icon: "residue-management",
    name: l("Crop residue management", "ਫ਼ਸਲੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਦਾ ਪ੍ਰਬੰਧ"), // pa: needs expert review
    short: l("Turn straw into soil, not smoke.", "ਪਰਾਲੀ ਨੂੰ ਧੂੰਆਂ ਨਹੀਂ, ਮਿੱਟੀ ਬਣਾਓ।"),
    overview: [sample],
    links: [
      { crop: "wheat", operation: "land-preparation" },
      { crop: "wheat", operation: "harvest-storage" },
      { crop: "wheat", operation: "machinery" },
      { crop: "paddy", operation: "harvest-storage" },
    ],
  },
  {
    slug: "climate-smart",
    icon: "climate-smart",
    name: l("Climate-smart agriculture", "ਜਲਵਾਯੂ-ਅਨੁਕੂਲ ਖੇਤੀ"), // pa: needs expert review
    short: l("Farming that holds up in hotter, less certain seasons.", "ਗਰਮ ਅਤੇ ਅਨਿਸ਼ਚਿਤ ਮੌਸਮਾਂ ਵਿੱਚ ਟਿਕਣ ਵਾਲੀ ਖੇਤੀ।"),
    overview: [sample],
    links: [
      { crop: "wheat", operation: "varieties" },
      { crop: "wheat", operation: "irrigation" },
    ],
  },
  {
    slug: "diversification",
    icon: "diversification",
    name: l("Crop diversification", "ਫ਼ਸਲੀ ਵਿਭਿੰਨਤਾ"), // pa: needs expert review
    short: l("More crops, steadier income, healthier soil.", "ਵੱਧ ਫ਼ਸਲਾਂ, ਪੱਕੀ ਆਮਦਨ, ਸਿਹਤਮੰਦ ਮਿੱਟੀ।"),
    overview: [sample],
    links: [
      { crop: "maize", operation: "varieties" },
      { crop: "moong", operation: "varieties" },
    ],
  },
  {
    slug: "organic-natural",
    icon: "organic-natural",
    name: l("Organic and natural farming", "ਜੈਵਿਕ ਅਤੇ ਕੁਦਰਤੀ ਖੇਤੀ"), // pa: needs expert review
    short: l("Growing with fewer bought-in chemicals.", "ਬਾਜ਼ਾਰੀ ਰਸਾਇਣਾਂ ਦੀ ਘੱਟ ਵਰਤੋਂ ਨਾਲ ਖੇਤੀ।"),
    overview: [sample],
    links: [{ crop: "wheat", operation: "nutrients" }],
  },
  {
    slug: "safe-chemical-use",
    icon: "safe-chemical-use",
    name: l("Safe use of pesticides and fertilisers", "ਕੀਟਨਾਸ਼ਕਾਂ ਅਤੇ ਖਾਦਾਂ ਦੀ ਸੁਰੱਖਿਅਤ ਵਰਤੋਂ"), // pa: needs expert review
    short: l("The right product, the right dose, the right protection.", "ਸਹੀ ਦਵਾਈ, ਸਹੀ ਮਾਤਰਾ, ਸਹੀ ਬਚਾਅ।"),
    overview: [sample],
    links: [
      { crop: "wheat", operation: "weeds" },
      { crop: "wheat", operation: "insect-pests" },
    ],
  },
  {
    slug: "mechanisation",
    icon: "mechanisation",
    name: l("Farm mechanisation", "ਖੇਤੀ ਮਸ਼ੀਨੀਕਰਨ"), // pa: needs expert review
    short: l("Machines that save time, labour and fuel.", "ਸਮਾਂ, ਮਜ਼ਦੂਰੀ ਅਤੇ ਤੇਲ ਬਚਾਉਣ ਵਾਲੀਆਂ ਮਸ਼ੀਨਾਂ।"),
    overview: [sample],
    links: [{ crop: "wheat", operation: "machinery" }],
  },
  {
    slug: "value-addition",
    icon: "value-addition",
    name: l("Value addition and agri-business", "ਮੁੱਲ ਵਾਧਾ ਅਤੇ ਖੇਤੀ ਕਾਰੋਬਾਰ"), // pa: needs expert review
    short: l("Earn more by processing and selling smartly.", "ਪ੍ਰੋਸੈਸਿੰਗ ਅਤੇ ਸਿਆਣੇ ਮੰਡੀਕਰਨ ਨਾਲ ਵੱਧ ਕਮਾਈ।"),
    overview: [sample],
    links: [
      { crop: "mushroom", operation: "marketing" },
      { crop: "beekeeping", operation: "marketing" },
    ],
  },
  {
    slug: "seed-production",
    icon: "seed-production",
    name: l("Seed production", "ਬੀਜ ਉਤਪਾਦਨ"), // pa: needs expert review
    short: l("Good seed is half the crop.", "ਚੰਗਾ ਬੀਜ ਅੱਧੀ ਫ਼ਸਲ ਹੈ।"),
    overview: [sample],
    links: [
      { crop: "wheat", operation: "varieties" },
      { crop: "wheat", operation: "seed-sowing" },
    ],
  },
];
