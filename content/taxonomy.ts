/**
 * The SciOArt taxonomy: seasons, crop groups, agronomic operations,
 * topics, learning formats, advisory and resource types, audiences.
 *
 * All Punjabi names here are first drafts and need review by a
 * Punjabi-speaking subject expert before launch.
 */
import { l, type Audience, type AdvisoryType, type CropGroup, type FormatId, type L, type Operation, type Season } from "./schema";

export const seasons: Season[] = [
  {
    id: "rabi",
    name: l("Rabi", "ਹਾੜ੍ਹੀ"), // pa: needs expert review
    description: l(
      "Winter crops, sown in autumn and harvested in spring.",
      "ਸਰਦੀਆਂ ਦੀਆਂ ਫ਼ਸਲਾਂ, ਜੋ ਪਤਝੜ ਵਿੱਚ ਬੀਜੀਆਂ ਅਤੇ ਬਸੰਤ ਵਿੱਚ ਵੱਢੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    ),
  },
  {
    id: "kharif",
    name: l("Kharif", "ਸਾਉਣੀ"), // pa: needs expert review
    description: l(
      "Monsoon crops, sown in early summer and harvested in autumn.",
      "ਮਾਨਸੂਨ ਦੀਆਂ ਫ਼ਸਲਾਂ, ਜੋ ਗਰਮੀਆਂ ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਬੀਜੀਆਂ ਅਤੇ ਪਤਝੜ ਵਿੱਚ ਵੱਢੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    ),
  },
  {
    id: "fruit",
    name: l("Fruits", "ਫਲ"), // pa: needs expert review
    description: l("Orchards and fruit plants grown across Punjab.", "ਪੰਜਾਬ ਵਿੱਚ ਲਗਾਏ ਜਾਂਦੇ ਬਾਗ਼ ਅਤੇ ਫਲਦਾਰ ਬੂਟੇ।"),
  },
  {
    id: "vegetable",
    name: l("Vegetables", "ਸਬਜ਼ੀਆਂ"), // pa: needs expert review
    description: l("Vegetable crops for home gardens and markets.", "ਘਰੇਲੂ ਬਗੀਚੀ ਅਤੇ ਮੰਡੀ ਲਈ ਸਬਜ਼ੀਆਂ ਦੀਆਂ ਫ਼ਸਲਾਂ।"),
  },
  {
    id: "allied",
    name: l("Allied & subsidiary", "ਸਹਾਇਕ ਧੰਦੇ"), // pa: needs expert review
    description: l("Farm enterprises that add income alongside crops.", "ਫ਼ਸਲਾਂ ਦੇ ਨਾਲ ਵਾਧੂ ਆਮਦਨ ਦੇਣ ਵਾਲੇ ਖੇਤੀ ਧੰਦੇ।"),
  },
];

export const cropGroups: CropGroup[] = [
  { id: "rabi-cereals", season: "rabi", name: l("Cereals", "ਅਨਾਜ") }, // pa: needs expert review
  { id: "rabi-pulses", season: "rabi", name: l("Pulses", "ਦਾਲਾਂ") }, // pa: needs expert review
  { id: "rabi-oilseeds", season: "rabi", name: l("Oilseeds", "ਤੇਲ ਬੀਜ") }, // pa: needs expert review
  { id: "rabi-fodder", season: "rabi", name: l("Fodder", "ਚਾਰਾ") }, // pa: needs expert review
  { id: "kharif-cereals", season: "kharif", name: l("Cereals", "ਅਨਾਜ") }, // pa: needs expert review
  { id: "kharif-fibre", season: "kharif", name: l("Fibre", "ਰੇਸ਼ੇ ਵਾਲੀਆਂ") }, // pa: needs expert review
  { id: "kharif-pulses", season: "kharif", name: l("Pulses", "ਦਾਲਾਂ") }, // pa: needs expert review
  { id: "kharif-oilseeds", season: "kharif", name: l("Oilseeds", "ਤੇਲ ਬੀਜ") }, // pa: needs expert review
  { id: "kharif-fodder", season: "kharif", name: l("Fodder", "ਚਾਰਾ") }, // pa: needs expert review
  { id: "kharif-cash", season: "kharif", name: l("Cash crops", "ਨਕਦੀ ਫ਼ਸਲਾਂ") }, // pa: needs expert review
  { id: "fruits", season: "fruit", name: l("Fruits", "ਫਲ") }, // pa: needs expert review
  { id: "vegetables", season: "vegetable", name: l("Vegetables", "ਸਬਜ਼ੀਆਂ") }, // pa: needs expert review
  { id: "allied", season: "allied", name: l("Allied & subsidiary", "ਸਹਾਇਕ ਧੰਦੇ") }, // pa: needs expert review
];

/** The ten agronomic operations used for every field and horticultural crop, in order. */
export const coreOperations: Operation[] = [
  { slug: "varieties", name: l("Varieties", "ਕਿਸਮਾਂ"), short: l("Which variety to grow", "ਕਿਹੜੀ ਕਿਸਮ ਬੀਜੀਏ"), icon: "varieties" }, // pa: needs expert review
  {
    slug: "land-preparation",
    name: l("Land preparation", "ਜ਼ਮੀਨ ਦੀ ਤਿਆਰੀ"),
    short: l("Getting the field ready", "ਖੇਤ ਤਿਆਰ ਕਰਨਾ"),
    icon: "land-preparation",
  }, // pa: needs expert review
  {
    slug: "seed-sowing",
    name: l("Seed and sowing", "ਬੀਜ ਅਤੇ ਬਿਜਾਈ"),
    short: l("Seed rate, treatment and sowing", "ਬੀਜ ਦੀ ਮਾਤਰਾ, ਸੋਧ ਅਤੇ ਬਿਜਾਈ"),
    icon: "seed-sowing",
  }, // pa: needs expert review
  {
    slug: "irrigation",
    name: l("Irrigation", "ਸਿੰਚਾਈ"),
    short: l("When and how much to water", "ਕਦੋਂ ਅਤੇ ਕਿੰਨਾ ਪਾਣੀ ਦੇਈਏ"),
    icon: "irrigation",
  }, // pa: needs expert review
  {
    slug: "nutrients",
    name: l("Nutrient management", "ਖ਼ੁਰਾਕੀ ਤੱਤਾਂ ਦਾ ਪ੍ਰਬੰਧ"),
    short: l("Fertilisers and manures", "ਖਾਦਾਂ ਅਤੇ ਰੂੜੀ"),
    icon: "nutrients",
  }, // pa: needs expert review
  {
    slug: "weeds",
    name: l("Weed management", "ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ"),
    short: l("Keeping weeds in check", "ਨਦੀਨਾਂ ਨੂੰ ਕਾਬੂ ਰੱਖਣਾ"),
    icon: "weeds",
  }, // pa: needs expert review
  {
    slug: "insect-pests",
    name: l("Insect pests", "ਕੀੜੇ-ਮਕੌੜੇ"),
    short: l("Spotting and managing pests", "ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ ਅਤੇ ਰੋਕਥਾਮ"),
    icon: "insect-pests",
  }, // pa: needs expert review
  {
    slug: "diseases",
    name: l("Diseases", "ਬਿਮਾਰੀਆਂ"),
    short: l("Spotting and managing diseases", "ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ ਅਤੇ ਰੋਕਥਾਮ"),
    icon: "diseases",
  }, // pa: needs expert review
  {
    slug: "harvest-storage",
    name: l("Harvesting and storage", "ਵਾਢੀ ਅਤੇ ਸਾਂਭ-ਸੰਭਾਲ"),
    short: l("Harvest, threshing and storage", "ਵਾਢੀ, ਗਹਾਈ ਅਤੇ ਭੰਡਾਰਨ"),
    icon: "harvest-storage",
  }, // pa: needs expert review
  {
    slug: "machinery",
    name: l("Farm machinery", "ਖੇਤੀ ਮਸ਼ੀਨਰੀ"),
    short: l("Machines for this crop", "ਇਸ ਫ਼ਸਲ ਲਈ ਮਸ਼ੀਨਾਂ"),
    icon: "machinery",
  }, // pa: needs expert review
];

/** Extra operations used by allied occupations (data-driven per crop). */
export const alliedOperations: Operation[] = [
  {
    slug: "substrate",
    name: l("Compost and substrate", "ਖਾਦ ਅਤੇ ਮਾਧਿਅਮ"),
    short: l("Preparing the growing medium", "ਉਗਾਉਣ ਲਈ ਮਾਧਿਅਮ ਤਿਆਰ ਕਰਨਾ"),
    icon: "nutrients",
  }, // pa: needs expert review
  {
    slug: "spawning",
    name: l("Spawning", "ਬੀਜਾਈ (ਸਪਾਨਿੰਗ)"),
    short: l("Adding spawn to the substrate", "ਮਾਧਿਅਮ ਵਿੱਚ ਬੀਜ ਪਾਉਣਾ"),
    icon: "seed-sowing",
  }, // pa: needs expert review
  { slug: "crop-care", name: l("Crop care", "ਫ਼ਸਲ ਦੀ ਦੇਖਭਾਲ"), short: l("Day-to-day care", "ਰੋਜ਼ਾਨਾ ਦੇਖਭਾਲ"), icon: "crop-care" }, // pa: needs expert review
  {
    slug: "colony-management",
    name: l("Colony management", "ਕਟੁੰਬ ਪ੍ਰਬੰਧ"),
    short: l("Keeping colonies strong", "ਕਟੁੰਬਾਂ ਨੂੰ ਤਕੜਾ ਰੱਖਣਾ"),
    icon: "crop-care",
  }, // pa: needs expert review
  {
    slug: "seasonal-care",
    name: l("Seasonal management", "ਮੌਸਮੀ ਪ੍ਰਬੰਧ"),
    short: l("Care through the year", "ਸਾਰਾ ਸਾਲ ਦੇਖਭਾਲ"),
    icon: "irrigation",
  }, // pa: needs expert review
  {
    slug: "pests-diseases",
    name: l("Pests and diseases", "ਕੀੜੇ ਅਤੇ ਬਿਮਾਰੀਆਂ"),
    short: l("Protecting the enterprise", "ਧੰਦੇ ਦੀ ਸੁਰੱਖਿਆ"),
    icon: "insect-pests",
  }, // pa: needs expert review
  {
    slug: "nursery",
    name: l("Nursery and planting material", "ਨਰਸਰੀ ਅਤੇ ਬੂਟੇ"),
    short: l("Raising healthy plants", "ਸਿਹਤਮੰਦ ਬੂਟੇ ਤਿਆਰ ਕਰਨਾ"),
    icon: "seed-sowing",
  }, // pa: needs expert review
  {
    slug: "harvest",
    name: l("Harvest and processing", "ਤੁੜਾਈ ਅਤੇ ਪ੍ਰੋਸੈਸਿੰਗ"),
    short: l("Harvesting and first processing", "ਤੁੜਾਈ ਅਤੇ ਮੁੱਢਲੀ ਪ੍ਰੋਸੈਸਿੰਗ"),
    icon: "harvest-storage",
  }, // pa: needs expert review
  { slug: "marketing", name: l("Marketing", "ਮੰਡੀਕਰਨ"), short: l("Selling the produce", "ਉਪਜ ਵੇਚਣਾ"), icon: "marketing" }, // pa: needs expert review
];

export const allOperations: Operation[] = [...coreOperations, ...alliedOperations];

export const coreOperationSlugs = coreOperations.map((o) => o.slug);

export type FormatInfo = { id: FormatId; name: L; plural: L };

export const formats: FormatInfo[] = [
  { id: "game", name: l("Game", "ਖੇਡ"), plural: l("Games", "ਖੇਡਾਂ") },
  { id: "song", name: l("Song", "ਗੀਤ"), plural: l("Songs", "ਗੀਤ") },
  { id: "jingle", name: l("Jingle", "ਜਿੰਗਲ"), plural: l("Jingles", "ਜਿੰਗਲ") },
  { id: "video", name: l("Video", "ਵੀਡੀਓ"), plural: l("Videos", "ਵੀਡੀਓ") },
  { id: "emodule", name: l("E-module", "ਈ-ਮਾਡਿਊਲ"), plural: l("E-modules", "ਈ-ਮਾਡਿਊਲ") },
  { id: "quiz", name: l("Quiz", "ਕੁਇਜ਼"), plural: l("Quizzes", "ਕੁਇਜ਼") },
  { id: "story", name: l("Farmer story", "ਕਿਸਾਨ ਦੀ ਕਹਾਣੀ"), plural: l("Farmer stories", "ਕਿਸਾਨਾਂ ਦੀਆਂ ਕਹਾਣੀਆਂ") },
  { id: "podcast", name: l("Podcast", "ਪੌਡਕਾਸਟ"), plural: l("Podcasts", "ਪੌਡਕਾਸਟ") },
  { id: "play-film", name: l("Play or film", "ਨਾਟਕ ਜਾਂ ਫ਼ਿਲਮ"), plural: l("Plays & films", "ਨਾਟਕ ਅਤੇ ਫ਼ਿਲਮਾਂ") },
];

export const advisoryTypes: { id: AdvisoryType; name: L }[] = [
  { id: "seasonal", name: l("Seasonal advisory", "ਮੌਸਮੀ ਸਲਾਹ") },
  { id: "alert", name: l("Pest/disease alert", "ਕੀਟ/ਬਿਮਾਰੀ ਚੇਤਾਵਨੀ") },
  { id: "weather", name: l("Weather note", "ਮੌਸਮ ਸੂਚਨਾ") },
  { id: "variety", name: l("New variety", "ਨਵੀਂ ਕਿਸਮ") },
  { id: "event", name: l("Event", "ਸਮਾਗਮ") },
  { id: "news", name: l("News", "ਖ਼ਬਰਾਂ") },
];

export const resourceTypes: { id: "editions" | "leaflets" | "glossary" | "research"; name: L; description: L }[] = [
  {
    id: "editions",
    name: l("PoP edition archive", "ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਦਾ ਪੁਰਾਲੇਖ"),
    description: l("Every yearly edition of the Packages of Practices, from 2023.", "2023 ਤੋਂ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਦੀ ਹਰ ਸਾਲਾਨਾ ਕਿਤਾਬ।"),
  },
  {
    id: "leaflets",
    name: l("Leaflets", "ਪਰਚੇ"),
    description: l("Short printable leaflets for farmers.", "ਕਿਸਾਨਾਂ ਲਈ ਛੋਟੇ, ਛਾਪਣਯੋਗ ਪਰਚੇ।"),
  },
  {
    id: "glossary",
    name: l("Glossary", "ਸ਼ਬਦਾਵਲੀ"),
    description: l("Farm words in English and Punjabi, explained simply.", "ਖੇਤੀ ਦੇ ਸ਼ਬਦ ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਪੰਜਾਬੀ ਵਿੱਚ, ਸੌਖੇ ਢੰਗ ਨਾਲ।"),
  },
  {
    id: "research",
    name: l("Research summaries", "ਖੋਜ ਸਾਰ"),
    description: l("Short summaries of research, written for everyone.", "ਖੋਜ ਦੇ ਛੋਟੇ ਸਾਰ, ਹਰ ਕਿਸੇ ਦੀ ਸਮਝ ਲਈ।"),
  },
];

export const audiences: Audience[] = [
  {
    id: "farmers",
    name: l("Farmers", "ਕਿਸਾਨ"),
    singular: l("Farmer", "ਕਿਸਾਨ"),
    intro: l(
      "Practical guidance for your crop and district, this week's tasks, and answers from experts.",
      "ਤੁਹਾਡੀ ਫ਼ਸਲ ਅਤੇ ਜ਼ਿਲ੍ਹੇ ਲਈ ਅਮਲੀ ਸਲਾਹ, ਇਸ ਹਫ਼ਤੇ ਦੇ ਕੰਮ, ਅਤੇ ਮਾਹਿਰਾਂ ਦੇ ਜਵਾਬ।",
    ),
    icon: "farmer",
  },
  {
    id: "extension-workers",
    name: l("Extension workers", "ਪਸਾਰ ਕਾਮੇ"),
    singular: l("Extension worker", "ਪਸਾਰ ਕਾਮਾ"),
    intro: l(
      "Ready-to-run training kits, games and songs for farmer meetings, with tests to measure learning.",
      "ਕਿਸਾਨ ਮਿਲਣੀਆਂ ਲਈ ਤਿਆਰ ਸਿਖਲਾਈ ਕਿੱਟਾਂ, ਖੇਡਾਂ ਅਤੇ ਗੀਤ, ਸਿੱਖਣ ਨੂੰ ਮਾਪਣ ਲਈ ਟੈਸਟਾਂ ਸਮੇਤ।",
    ),
    icon: "extension",
  },
  {
    id: "students",
    name: l("Students", "ਵਿਦਿਆਰਥੀ"),
    singular: l("Student", "ਵਿਦਿਆਰਥੀ"),
    intro: l(
      "Crop-by-crop practices, e-modules with quizzes, and a bilingual glossary of farm terms.",
      "ਹਰ ਫ਼ਸਲ ਦੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ, ਕੁਇਜ਼ ਵਾਲੇ ਈ-ਮਾਡਿਊਲ, ਅਤੇ ਖੇਤੀ ਸ਼ਬਦਾਂ ਦੀ ਦੋ-ਭਾਸ਼ੀ ਸ਼ਬਦਾਵਲੀ।",
    ),
    icon: "student",
  },
  {
    id: "researchers",
    name: l("Researchers", "ਖੋਜਕਾਰ"),
    singular: l("Researcher", "ਖੋਜਕਾਰ"),
    intro: l(
      "Edition archives, research summaries and edutainment tools you can use in field studies.",
      "ਸਿਫ਼ਾਰਸ਼ਾਂ ਦਾ ਪੁਰਾਲੇਖ, ਖੋਜ ਸਾਰ, ਅਤੇ ਖੇਤ ਅਧਿਐਨਾਂ ਵਿੱਚ ਵਰਤਣਯੋਗ ਸਿੱਖਿਆ-ਮਨੋਰੰਜਨ ਸਾਧਨ।",
    ),
    icon: "researcher",
  },
];
