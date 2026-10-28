/**
 * Bilingual glossary of farm terms. Punjabi terms and definitions are
 * first drafts and need review by a subject expert.
 */
import { l, type GlossaryTerm } from "./schema";

const g = (slug: string, en: string, pa: string, defEn: string, defPa: string): GlossaryTerm => ({
  slug,
  en,
  pa,
  definition: l(defEn, defPa),
});

export const glossary: GlossaryTerm[] = [
  g(
    "rabi",
    "Rabi",
    "ਹਾੜ੍ਹੀ",
    "Crops sown in autumn and harvested in spring, such as wheat.",
    "ਪਤਝੜ ਵਿੱਚ ਬੀਜੀਆਂ ਅਤੇ ਬਸੰਤ ਵਿੱਚ ਵੱਢੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ, ਜਿਵੇਂ ਕਣਕ।",
  ),
  g(
    "kharif",
    "Kharif",
    "ਸਾਉਣੀ",
    "Crops sown at the start of the monsoon and harvested in autumn, such as paddy.",
    "ਮਾਨਸੂਨ ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਬੀਜੀਆਂ ਅਤੇ ਪਤਝੜ ਵਿੱਚ ਵੱਢੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ, ਜਿਵੇਂ ਝੋਨਾ।",
  ),
  g(
    "package-of-practices",
    "Package of Practices",
    "ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ",
    "PAU's yearly book of recommended practices for each crop.",
    "ਹਰ ਫ਼ਸਲ ਲਈ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੇ ਤਰੀਕਿਆਂ ਦੀ PAU ਦੀ ਸਾਲਾਨਾ ਕਿਤਾਬ।",
  ),
  g(
    "ipm",
    "Integrated Pest Management",
    "ਸੰਯੁਕਤ ਕੀਟ ਪ੍ਰਬੰਧ",
    "Combining methods to keep pests below damaging levels, using pesticides only when needed.",
    "ਕਈ ਤਰੀਕੇ ਮਿਲਾ ਕੇ ਕੀੜਿਆਂ ਨੂੰ ਨੁਕਸਾਨ ਦੇ ਪੱਧਰ ਤੋਂ ਹੇਠਾਂ ਰੱਖਣਾ, ਕੀਟਨਾਸ਼ਕ ਸਿਰਫ਼ ਲੋੜ ਪੈਣ 'ਤੇ।",
  ),
  g(
    "economic-threshold",
    "Economic threshold",
    "ਆਰਥਿਕ ਕਗਾਰ",
    "The pest level at which control becomes worth its cost.",
    "ਕੀੜਿਆਂ ਦਾ ਉਹ ਪੱਧਰ ਜਿਸ 'ਤੇ ਰੋਕਥਾਮ ਦਾ ਖ਼ਰਚਾ ਜਾਇਜ਼ ਹੋ ਜਾਂਦਾ ਹੈ।",
  ),
  g("herbicide", "Herbicide", "ਨਦੀਨਨਾਸ਼ਕ", "A chemical used to control weeds.", "ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ ਲਈ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਰਸਾਇਣ।"),
  g("insecticide", "Insecticide", "ਕੀਟਨਾਸ਼ਕ", "A chemical used to control insect pests.", "ਕੀੜਿਆਂ ਦੀ ਰੋਕਥਾਮ ਲਈ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਰਸਾਇਣ।"),
  g(
    "fungicide",
    "Fungicide",
    "ਉੱਲੀਨਾਸ਼ਕ",
    "A chemical used to control fungal diseases.",
    "ਉੱਲੀ ਵਾਲੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਰੋਕਥਾਮ ਲਈ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਰਸਾਇਣ।",
  ),
  g("seed-rate", "Seed rate", "ਬੀਜ ਦੀ ਮਾਤਰਾ", "The amount of seed sown per acre.", "ਪ੍ਰਤੀ ਏਕੜ ਬੀਜੇ ਜਾਣ ਵਾਲੇ ਬੀਜ ਦੀ ਮਾਤਰਾ।"),
  g(
    "seed-treatment",
    "Seed treatment",
    "ਬੀਜ ਦੀ ਸੋਧ",
    "Treating seed before sowing to protect it from pests and diseases.",
    "ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਬੀਜ ਨੂੰ ਕੀੜਿਆਂ ਅਤੇ ਬਿਮਾਰੀਆਂ ਤੋਂ ਬਚਾਉਣ ਲਈ ਸੋਧਣਾ।",
  ),
  g(
    "tillering",
    "Tillering",
    "ਬੂਝਾ ਮਾਰਨਾ",
    "The stage when a cereal plant produces side shoots.",
    "ਉਹ ਅਵਸਥਾ ਜਦੋਂ ਅਨਾਜ ਵਾਲਾ ਬੂਟਾ ਨਵੀਆਂ ਸ਼ਾਖਾਵਾਂ ਕੱਢਦਾ ਹੈ।",
  ),
  g("irrigation", "Irrigation", "ਸਿੰਚਾਈ", "Supplying water to crops.", "ਫ਼ਸਲਾਂ ਨੂੰ ਪਾਣੀ ਦੇਣਾ।"),
  g(
    "drip-irrigation",
    "Drip irrigation",
    "ਤੁਪਕਾ ਸਿੰਚਾਈ",
    "Watering plants drop by drop at the roots through pipes.",
    "ਪਾਈਪਾਂ ਰਾਹੀਂ ਬੂਟਿਆਂ ਦੀਆਂ ਜੜ੍ਹਾਂ ਵਿੱਚ ਬੂੰਦ-ਬੂੰਦ ਪਾਣੀ ਦੇਣਾ।",
  ),
  g(
    "laser-levelling",
    "Laser land levelling",
    "ਲੇਜ਼ਰ ਕਰਾਹਾ",
    "Levelling a field precisely with a laser-guided scraper.",
    "ਲੇਜ਼ਰ ਨਾਲ ਚੱਲਣ ਵਾਲੇ ਕਰਾਹੇ ਨਾਲ ਖੇਤ ਨੂੰ ਬਿਲਕੁਲ ਪੱਧਰਾ ਕਰਨਾ।",
  ),
  g(
    "dsr",
    "Direct seeded rice",
    "ਝੋਨੇ ਦੀ ਸਿੱਧੀ ਬਿਜਾਈ",
    "Sowing paddy seed directly in the field instead of transplanting.",
    "ਪਨੀਰੀ ਲਾਉਣ ਦੀ ਥਾਂ ਝੋਨੇ ਦਾ ਬੀਜ ਸਿੱਧਾ ਖੇਤ ਵਿੱਚ ਬੀਜਣਾ।",
  ),
  g("crop-residue", "Crop residue", "ਫ਼ਸਲੀ ਰਹਿੰਦ-ਖੂੰਹਦ", "Straw and stubble left after harvest.", "ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਬਚੀ ਪਰਾਲੀ ਅਤੇ ਨਾੜ।"),
  g(
    "soil-testing",
    "Soil testing",
    "ਮਿੱਟੀ ਦੀ ਪਰਖ",
    "Laboratory testing of soil to find its nutrient status.",
    "ਮਿੱਟੀ ਵਿੱਚ ਖ਼ੁਰਾਕੀ ਤੱਤਾਂ ਦਾ ਪਤਾ ਲਾਉਣ ਲਈ ਪ੍ਰਯੋਗਸ਼ਾਲਾ ਵਿੱਚ ਪਰਖ।",
  ),
  g("organic-carbon", "Organic carbon", "ਜੈਵਿਕ ਕਾਰਬਨ", "A measure of organic matter in the soil.", "ਮਿੱਟੀ ਵਿੱਚ ਜੈਵਿਕ ਮਾਦੇ ਦਾ ਮਾਪ।"),
  g("nitrogen", "Nitrogen", "ਨਾਈਟ੍ਰੋਜਨ", "A major plant nutrient for leaf and stem growth.", "ਪੱਤਿਆਂ ਅਤੇ ਤਣੇ ਦੇ ਵਾਧੇ ਲਈ ਮੁੱਖ ਖ਼ੁਰਾਕੀ ਤੱਤ।"),
  g("urea", "Urea", "ਯੂਰੀਆ", "A common fertiliser that supplies nitrogen.", "ਨਾਈਟ੍ਰੋਜਨ ਦੇਣ ਵਾਲੀ ਆਮ ਖਾਦ।"),
  g(
    "mulching",
    "Mulching",
    "ਮਲਚਿੰਗ",
    "Covering the soil surface to save moisture and suppress weeds.",
    "ਨਮੀ ਬਚਾਉਣ ਅਤੇ ਨਦੀਨ ਰੋਕਣ ਲਈ ਮਿੱਟੀ ਨੂੰ ਢਕਣਾ।",
  ),
  g(
    "crop-rotation",
    "Crop rotation",
    "ਫ਼ਸਲੀ ਚੱਕਰ",
    "Growing different crops in sequence on the same field.",
    "ਇੱਕੋ ਖੇਤ ਵਿੱਚ ਵਾਰੀ-ਵਾਰੀ ਵੱਖ-ਵੱਖ ਫ਼ਸਲਾਂ ਉਗਾਉਣਾ।",
  ),
  g(
    "certified-seed",
    "Certified seed",
    "ਪ੍ਰਮਾਣਿਤ ਬੀਜ",
    "Seed tested and certified for purity and germination.",
    "ਸ਼ੁੱਧਤਾ ਅਤੇ ਜੰਮ ਲਈ ਪਰਖਿਆ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਬੀਜ।",
  ),
  g("harvesting", "Harvesting", "ਵਾਢੀ", "Cutting and collecting a mature crop.", "ਪੱਕੀ ਫ਼ਸਲ ਨੂੰ ਵੱਢਣਾ ਅਤੇ ਇਕੱਠਾ ਕਰਨਾ।"),
  g("threshing", "Threshing", "ਗਹਾਈ", "Separating grain from the straw and chaff.", "ਦਾਣਿਆਂ ਨੂੰ ਤੂੜੀ ਅਤੇ ਛਿਲਕੇ ਤੋਂ ਵੱਖ ਕਰਨਾ।"),
];
