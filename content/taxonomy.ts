/**
 * The SciOArt taxonomy: seasons, crop groups and the library sections
 * (categories).
 *
 * All Punjabi names here are first drafts and need review by a
 * Punjabi-speaking subject expert before launch.
 */
import { l, type Category, type CropGroup, type Season } from "./schema";

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

/**
 * The library sections, in the order they appear on the home page and in
 * the menu. Each id is the section's web address (scioart.co.in/en/<id>).
 */
export const categories: Category[] = [
  {
    id: "culture",
    name: l("Culture & heritage", "ਸਭਿਆਚਾਰ ਤੇ ਵਿਰਸਾ"), // pa: needs expert review
    short: l("Folk arts, festivals and farm traditions of Punjab", "ਪੰਜਾਬ ਦੀਆਂ ਲੋਕ ਕਲਾਵਾਂ, ਤਿਉਹਾਰ ਤੇ ਖੇਤੀ ਰਵਾਇਤਾਂ"), // pa: needs expert review
    action: "watch",
  },
  {
    id: "documentaries",
    name: l("Documentaries", "ਦਸਤਾਵੇਜ਼ੀ ਫ਼ਿਲਮਾਂ"), // pa: needs expert review
    short: l("True stories from Punjab's fields and labs", "ਪੰਜਾਬ ਦੇ ਖੇਤਾਂ ਤੇ ਪ੍ਰਯੋਗਸ਼ਾਲਾਵਾਂ ਦੀਆਂ ਸੱਚੀਆਂ ਕਹਾਣੀਆਂ"), // pa: needs expert review
    action: "watch",
  },
  {
    id: "live",
    name: l("Live", "ਲਾਈਵ"), // pa: needs expert review
    short: l("Our live programs, and recordings of past ones", "ਸਾਡੇ ਲਾਈਵ ਪ੍ਰੋਗਰਾਮ ਤੇ ਪਿਛਲੇ ਪ੍ਰੋਗਰਾਮਾਂ ਦੀਆਂ ਰਿਕਾਰਡਿੰਗਾਂ"), // pa: needs expert review
    action: "watch",
  },
  {
    id: "jingles",
    name: l("Jingles", "ਜਿੰਗਲ"), // pa: needs expert review
    short: l("Short, catchy messages to sing along", "ਛੋਟੇ ਤੇ ਯਾਦ ਰਹਿਣ ਵਾਲੇ ਸੁਨੇਹੇ"), // pa: needs expert review
    action: "listen",
  },
  {
    id: "scientific-songs",
    name: l("Scientific songs", "ਵਿਗਿਆਨਕ ਗੀਤ"), // pa: needs expert review
    short: l("Farm science set to music", "ਸੰਗੀਤ ਵਿੱਚ ਖੇਤੀ ਵਿਗਿਆਨ"), // pa: needs expert review
    action: "listen",
  },
  {
    id: "theatre",
    name: l("Theatre", "ਰੰਗਮੰਚ"), // pa: needs expert review
    short: l("Plays and street plays (nukkad natak)", "ਨਾਟਕ ਤੇ ਨੁੱਕੜ ਨਾਟਕ"), // pa: needs expert review
    action: "watch",
  },
  {
    id: "short-films",
    name: l("Short films", "ਲਘੂ ਫ਼ਿਲਮਾਂ"), // pa: needs expert review
    short: l("Small films with a big message", "ਛੋਟੀਆਂ ਫ਼ਿਲਮਾਂ, ਵੱਡਾ ਸੁਨੇਹਾ"), // pa: needs expert review
    action: "watch",
  },
  {
    id: "podcasts",
    name: l("Podcasts & radio talks", "ਪੌਡਕਾਸਟ ਤੇ ਰੇਡੀਓ ਵਾਰਤਾਵਾਂ"), // pa: needs expert review
    short: l("Conversations to listen to anywhere", "ਕਿਤੇ ਵੀ ਸੁਣਨ ਲਈ ਗੱਲਬਾਤ"), // pa: needs expert review
    action: "listen",
  },
  {
    id: "games",
    name: l("Games", "ਖੇਡਾਂ"), // pa: needs expert review
    short: l("Board and card games to print and play", "ਛਾਪ ਕੇ ਖੇਡਣ ਵਾਲੀਆਂ ਬੋਰਡ ਤੇ ਤਾਸ਼ ਖੇਡਾਂ"), // pa: needs expert review
    action: "play",
  },
  {
    id: "e-modules",
    name: l("E-modules", "ਈ-ਮਾਡਿਊਲ"), // pa: needs expert review
    short: l("Short lessons with a quiz at the end", "ਅੰਤ ਵਿੱਚ ਕੁਇਜ਼ ਵਾਲੇ ਛੋਟੇ ਪਾਠ"), // pa: needs expert review
    action: "learn",
  },
  {
    id: "e-books",
    name: l("E-books", "ਈ-ਕਿਤਾਬਾਂ"), // pa: needs expert review
    short: l("Books to read on your phone or download", "ਫ਼ੋਨ 'ਤੇ ਪੜ੍ਹਨ ਜਾਂ ਡਾਊਨਲੋਡ ਕਰਨ ਲਈ ਕਿਤਾਬਾਂ"), // pa: needs expert review
    action: "read",
  },
  {
    id: "posters-comics",
    name: l("Posters & comics", "ਪੋਸਟਰ ਤੇ ਕਾਮਿਕਸ"), // pa: needs expert review
    short: l("Pictures that tell the story at a glance", "ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ ਗੱਲ ਦੱਸਦੀਆਂ ਤਸਵੀਰਾਂ"), // pa: needs expert review
    action: "read",
  },
];
