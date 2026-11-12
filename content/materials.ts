/**
 * The SciOArt library: films, songs, jingles, plays, games, e-modules,
 * e-books and more, made by the SciOArt team. Each entry is one item.
 *
 * All entries here are SAMPLES. Files in /public/samples are placeholders
 * (silent audio, one-page PDFs) and SAMPLE_VIDEO_ID marks a missing
 * YouTube video. See CONTENT_GUIDE.md for how to add a real item.
 */
import { l, type Material } from "./schema";

export const materials: Material[] = [
  // ── culture ──
  {
    slug: "teeyan-in-the-village",
    category: "culture",
    title: l("Sample: Teeyan in the village", "ਨਮੂਨਾ: ਪਿੰਡ ਵਿੱਚ ਤੀਆਂ"),
    // pa: needs expert review
    description: l(
      "A sample film showing how a cultural program will appear: songs, giddha and the season's farm life.",
      "ਨਮੂਨਾ ਫ਼ਿਲਮ, ਜੋ ਦਿਖਾਉਂਦੀ ਹੈ ਕਿ ਸਭਿਆਚਾਰਕ ਪ੍ਰੋਗਰਾਮ ਕਿਵੇਂ ਦਿਸੇਗਾ: ਗੀਤ, ਗਿੱਧਾ ਅਤੇ ਰੁੱਤ ਦੀ ਖੇਤੀ ਜ਼ਿੰਦਗੀ।",
    ),
    crops: [],
    topics: [],
    languages: ["pa"],
    // PLACEHOLDER: replace SAMPLE_VIDEO_ID with the real 11-character YouTube ID.
    media: { youtubeId: "SAMPLE_VIDEO_ID" },
    duration: l("12 minutes", "12 ਮਿੰਟ"),
    date: "2026-08-10",
    featured: true,
    sample: true,
  },
  {
    slug: "boliyan-of-the-harvest",
    category: "culture",
    title: l("Sample: boliyan of the harvest", "ਨਮੂਨਾ: ਵਾਢੀ ਦੀਆਂ ਬੋਲੀਆਂ"),
    // pa: needs expert review
    description: l(
      "A sample recording page for folk boliyan sung at harvest time.",
      "ਵਾਢੀ ਵੇਲੇ ਗਾਈਆਂ ਜਾਂਦੀਆਂ ਲੋਕ ਬੋਲੀਆਂ ਦੀ ਰਿਕਾਰਡਿੰਗ ਲਈ ਨਮੂਨਾ ਪੰਨਾ।",
    ),
    crops: ["wheat"],
    topics: [],
    languages: ["pa"],
    media: { audio: "/samples/sample-boliyan.mp3" },
    duration: l("4 minutes", "4 ਮਿੰਟ"),
    date: "2026-04-14",
    featured: false,
    sample: true,
  },
  // ── documentaries ──
  {
    slug: "groundwater-story",
    category: "documentaries",
    title: l("Sample documentary: the story of Punjab's groundwater", "ਨਮੂਨਾ ਦਸਤਾਵੇਜ਼ੀ: ਪੰਜਾਬ ਦੇ ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਦੀ ਕਹਾਣੀ"),
    // pa: needs expert review
    description: l(
      "Shows the layout for a documentary. The real film will replace this sample.",
      "ਦਸਤਾਵੇਜ਼ੀ ਫ਼ਿਲਮ ਦਾ ਖ਼ਾਕਾ। ਅਸਲ ਫ਼ਿਲਮ ਇਸ ਨਮੂਨੇ ਦੀ ਥਾਂ ਲਵੇਗੀ।",
    ),
    crops: ["paddy", "wheat"],
    topics: ["water-conservation"],
    languages: ["pa", "en"],
    // PLACEHOLDER: replace SAMPLE_VIDEO_ID with the real 11-character YouTube ID.
    media: { youtubeId: "SAMPLE_VIDEO_ID" },
    credits: [
      { role: l("Director", "ਨਿਰਦੇਸ਼ਕ"), name: l("To be added", "ਜੋੜਿਆ ਜਾਣਾ ਹੈ") },
      { role: l("Produced at", "ਨਿਰਮਾਣ"), name: l("Punjab Agricultural University, Ludhiana", "ਪੰਜਾਬ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ, ਲੁਧਿਆਣਾ") },
    ],
    duration: l("18 minutes", "18 ਮਿੰਟ"),
    date: "2026-09-15",
    featured: true,
    sample: true,
  },
  // ── live ──
  {
    slug: "kisan-mela-live-rabi-2026",
    category: "live",
    title: l("Sample live program: songs and stories from the Kisan Mela", "ਨਮੂਨਾ ਲਾਈਵ ਪ੍ਰੋਗਰਾਮ: ਕਿਸਾਨ ਮੇਲੇ ਤੋਂ ਗੀਤ ਤੇ ਕਹਾਣੀਆਂ"),
    // pa: needs expert review
    description: l(
      "An upcoming live program, shown here as a sample. The date and link are placeholders.",
      "ਆਉਣ ਵਾਲਾ ਲਾਈਵ ਪ੍ਰੋਗਰਾਮ, ਇੱਥੇ ਨਮੂਨੇ ਵਜੋਂ। ਤਾਰੀਖ਼ ਤੇ ਲਿੰਕ ਨਮੂਨੇ ਹਨ।",
    ),
    crops: [],
    topics: [],
    languages: ["pa"],
    media: {},
    // PLACEHOLDER: set the real date, time and YouTube/Facebook link of the live program.
    live: { startsAt: "2026-12-05T11:00:00+05:30", durationMinutes: 90, platform: "youtube", url: "" },
    duration: l("90 minutes", "90 ਮਿੰਟ"),
    date: "2026-12-05",
    featured: true,
    sample: true,
  },
  {
    slug: "live-straw-theatre-oct-2026",
    category: "live",
    title: l("Sample recording: a live street play on straw", "ਨਮੂਨਾ ਰਿਕਾਰਡਿੰਗ: ਪਰਾਲੀ ਬਾਰੇ ਲਾਈਵ ਨੁੱਕੜ ਨਾਟਕ"),
    // pa: needs expert review
    description: l(
      "A past live program. After a live ends, its recording is shown here.",
      "ਪਿਛਲਾ ਲਾਈਵ ਪ੍ਰੋਗਰਾਮ। ਲਾਈਵ ਖ਼ਤਮ ਹੋਣ ਤੋਂ ਬਾਅਦ ਉਸ ਦੀ ਰਿਕਾਰਡਿੰਗ ਇੱਥੇ ਦਿਸਦੀ ਹੈ।",
    ),
    crops: ["paddy"],
    topics: ["residue-management"],
    languages: ["pa"],
    // PLACEHOLDER: replace SAMPLE_VIDEO_ID with the real 11-character YouTube ID.
    media: { youtubeId: "SAMPLE_VIDEO_ID" },
    live: { startsAt: "2026-10-24T17:00:00+05:30", durationMinutes: 60, platform: "facebook", url: "" },
    duration: l("60 minutes", "60 ਮਿੰਟ"),
    date: "2026-10-24",
    featured: false,
    sample: true,
  },
  // ── jingles ──
  {
    slug: "straw-is-gold-jingle",
    category: "jingles",
    title: l("Straw is gold", "ਪਰਾਲੀ ਸੋਨਾ"),
    description: l("A 30-second jingle against burning crop residue.", "ਪਰਾਲੀ ਸਾੜਨ ਵਿਰੁੱਧ 30 ਸਕਿੰਟ ਦਾ ਜਿੰਗਲ।"),
    crops: ["wheat", "paddy"],
    topics: ["residue-management"],
    languages: ["pa"],
    media: { audio: "/samples/sample-straw-is-gold.mp3" },
    lyrics: l(
      "Straw is gold, don't let it burn —\nmix it in, and the soil will return!\n\n(Sample lyrics.)",
      "ਪਰਾਲੀ ਸੋਨਾ, ਅੱਗ ਨਾ ਲਾਓ,\nਮਿੱਟੀ ਵਿੱਚ ਰਲਾਓ, ਧਰਤੀ ਬਚਾਓ!\n\n(ਨਮੂਨਾ ਬੋਲ।)",
    ),
    duration: l("30 seconds", "30 ਸਕਿੰਟ"),
    date: "2026-10-01",
    featured: true,
    sample: true,
  },
  {
    slug: "save-water-jingle",
    category: "jingles",
    title: l("Sample: every drop jingle", "ਨਮੂਨਾ: ਹਰ ਬੂੰਦ ਜਿੰਗਲ"),
    description: l("A 20-second sample jingle about saving water.", "ਪਾਣੀ ਬਚਾਉਣ ਬਾਰੇ 20 ਸਕਿੰਟ ਦਾ ਨਮੂਨਾ ਜਿੰਗਲ।"), // pa: needs expert review
    crops: [],
    topics: ["water-conservation"],
    languages: ["pa"],
    media: { audio: "/samples/sample-every-drop-jingle.mp3" },
    lyrics: l("(Sample — the jingle's words will be added here.)", "(ਨਮੂਨਾ — ਜਿੰਗਲ ਦੇ ਬੋਲ ਇੱਥੇ ਜੋੜੇ ਜਾਣਗੇ।)"),
    duration: l("20 seconds", "20 ਸਕਿੰਟ"),
    date: "2026-07-01",
    featured: false,
    sample: true,
  },
  // ── scientific-songs ──
  {
    slug: "song-of-the-soil",
    category: "scientific-songs",
    title: l("Song of the soil", "ਮਿੱਟੀ ਦਾ ਗੀਤ"),
    description: l("A folk-style song about testing and feeding the soil.", "ਮਿੱਟੀ ਦੀ ਪਰਖ ਅਤੇ ਖ਼ੁਰਾਕ ਬਾਰੇ ਲੋਕ-ਰੰਗ ਵਾਲਾ ਗੀਤ।"),
    crops: ["wheat"],
    topics: ["soil-health"],
    languages: ["pa", "en"],
    media: { audio: "/samples/sample-song-of-the-soil.mp3" },
    lyrics: l(
      "Under the plough the old earth sleeps,\nalive with the life that it quietly keeps.\nTest it, then feed it, give back what you take —\nthe soil remembers each choice that we make.\n\n(Sample lyrics — the final song will replace these.)",
      "ਹਲ ਦੇ ਹੇਠਾਂ ਸੁੱਤੀ ਧਰਤੀ, ਅੰਦਰ ਜੀਵਨ ਪਲਦਾ ਏ,\nਪਰਖ ਕਰਾ ਕੇ ਖ਼ੁਰਾਕ ਪਾਈਏ, ਤਾਂ ਹੀ ਖੇਤ ਸੰਭਲਦਾ ਏ।\nਜੋ ਲਈਏ ਉਹ ਮੋੜ ਦੇਈਏ, ਮਿੱਟੀ ਸਭ ਕੁਝ ਯਾਦ ਰੱਖੇ,\nਸਾਡੀ ਹਰ ਇੱਕ ਚੋਣ ਦਾ ਫਲ, ਅਗਲੀ ਪੀੜ੍ਹੀ ਚੱਖੇ।\n\n(ਨਮੂਨਾ ਬੋਲ — ਅੰਤਿਮ ਗੀਤ ਇਨ੍ਹਾਂ ਦੀ ਥਾਂ ਲਵੇਗਾ।)",
    ),
    duration: l("3 minutes", "3 ਮਿੰਟ"),
    date: "2026-10-01",
    featured: true,
    sample: true,
  },
  {
    slug: "every-drop-counts-song",
    category: "scientific-songs",
    title: l("Every drop counts", "ਹਰ ਬੂੰਦ ਕੀਮਤੀ"),
    description: l("A song about saving groundwater in Punjab.", "ਪੰਜਾਬ ਦੇ ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਨੂੰ ਬਚਾਉਣ ਬਾਰੇ ਗੀਤ।"),
    crops: ["wheat", "paddy"],
    topics: ["water-conservation"],
    languages: ["pa", "en"],
    media: { audio: "/samples/sample-every-drop-counts.mp3" },
    lyrics: l(
      "Every drop that falls on the field\nis a promise of tomorrow's yield.\nWater the crop when the crop needs a drink,\nsave the rest — it runs deeper than you think.\n\n(Sample lyrics — the final song will replace these.)",
      "ਖੇਤ ਵਿੱਚ ਡਿੱਗੀ ਹਰ ਇੱਕ ਬੂੰਦ,\nਕੱਲ੍ਹ ਦੇ ਝਾੜ ਦਾ ਵਾਅਦਾ ਏ।\nਲੋੜ ਪਵੇ ਤਾਂ ਪਾਣੀ ਲਾਈਏ,\nਬੱਚਤ ਵਿੱਚ ਹੀ ਫ਼ਾਇਦਾ ਏ।\n\n(ਨਮੂਨਾ ਬੋਲ — ਅੰਤਿਮ ਗੀਤ ਇਨ੍ਹਾਂ ਦੀ ਥਾਂ ਲਵੇਗਾ।)",
    ),
    duration: l("3 minutes", "3 ਮਿੰਟ"),
    date: "2026-10-01",
    featured: false,
    sample: true,
  },
  // ── theatre ──
  {
    slug: "smoke-over-the-village-natak",
    category: "theatre",
    title: l("Sample play: smoke over the village", "ਨਮੂਨਾ ਨਾਟਕ: ਪਿੰਡ ਉੱਤੇ ਧੂੰਆਂ"),
    // pa: needs expert review
    description: l(
      "The layout for a recorded nukkad natak. The real recording will replace this sample.",
      "ਰਿਕਾਰਡ ਕੀਤੇ ਨੁੱਕੜ ਨਾਟਕ ਦਾ ਖ਼ਾਕਾ। ਅਸਲ ਰਿਕਾਰਡਿੰਗ ਇਸ ਨਮੂਨੇ ਦੀ ਥਾਂ ਲਵੇਗੀ।",
    ),
    crops: ["paddy"],
    topics: ["residue-management"],
    languages: ["pa"],
    // PLACEHOLDER: replace SAMPLE_VIDEO_ID with the real 11-character YouTube ID.
    media: { youtubeId: "SAMPLE_VIDEO_ID" },
    credits: [
      { role: l("Written by", "ਲੇਖਕ"), name: l("To be added", "ਜੋੜਿਆ ਜਾਣਾ ਹੈ") },
      { role: l("Performed by", "ਪੇਸ਼ਕਾਰੀ"), name: l("To be added", "ਜੋੜਿਆ ਜਾਣਾ ਹੈ") },
    ],
    duration: l("15 minutes", "15 ਮਿੰਟ"),
    date: "2026-10-05",
    featured: true,
    sample: true,
  },
  // ── short-films ──
  {
    slug: "the-new-seed-short-film",
    category: "short-films",
    title: l("Sample short film: the new seed", "ਨਮੂਨਾ ਲਘੂ ਫ਼ਿਲਮ: ਨਵਾਂ ਬੀਜ"),
    // pa: needs expert review
    description: l(
      "The layout for a short film. The real film will replace this sample.",
      "ਲਘੂ ਫ਼ਿਲਮ ਦਾ ਖ਼ਾਕਾ। ਅਸਲ ਫ਼ਿਲਮ ਇਸ ਨਮੂਨੇ ਦੀ ਥਾਂ ਲਵੇਗੀ।",
    ),
    crops: ["wheat"],
    topics: ["seed-production"],
    languages: ["pa"],
    // PLACEHOLDER: replace SAMPLE_VIDEO_ID with the real 11-character YouTube ID.
    media: { youtubeId: "SAMPLE_VIDEO_ID" },
    duration: l("8 minutes", "8 ਮਿੰਟ"),
    date: "2026-09-01",
    featured: false,
    sample: true,
  },
  // ── podcasts ──
  {
    slug: "kheti-gal-baat-episode-1",
    category: "podcasts",
    title: l("Kheti Gal-baat, episode 1", "ਖੇਤੀ ਗੱਲ-ਬਾਤ, ਕੜੀ 1"),
    description: l(
      "A sample podcast episode: conversations with experts and farmers.",
      "ਨਮੂਨਾ ਪੌਡਕਾਸਟ ਕੜੀ: ਮਾਹਿਰਾਂ ਅਤੇ ਕਿਸਾਨਾਂ ਨਾਲ ਗੱਲਬਾਤ।",
    ),
    crops: ["wheat"],
    topics: ["climate-smart"],
    languages: ["pa"],
    media: { audio: "/samples/sample-kheti-gal-baat-1.mp3" },
    duration: l("20 minutes", "20 ਮਿੰਟ"),
    date: "2026-10-01",
    featured: false,
    sample: true,
  },
  // ── games ──
  {
    slug: "ipm-snakes-and-ladders",
    category: "games",
    title: l("IPM Snakes and Ladders", "ਕੀਟ ਪ੍ਰਬੰਧ ਸੱਪ-ਪੌੜੀ"),
    description: l(
      "A printable board game: good pest-management choices are ladders, risky ones are snakes.",
      "ਛਾਪਣਯੋਗ ਬੋਰਡ ਖੇਡ: ਕੀਟ ਪ੍ਰਬੰਧ ਦੇ ਸਹੀ ਫ਼ੈਸਲੇ ਪੌੜੀਆਂ ਹਨ, ਗ਼ਲਤ ਫ਼ੈਸਲੇ ਸੱਪ।",
    ),
    crops: ["wheat", "cotton"],
    topics: ["ipm"],
    languages: ["en", "pa"],
    media: { pdf: "/samples/sample-ipm-snakes-and-ladders.pdf" },
    rules: [
      l("Print the board and the question cards on thick paper.", "ਬੋਰਡ ਅਤੇ ਸਵਾਲ ਕਾਰਡ ਮੋਟੇ ਕਾਗ਼ਜ਼ 'ਤੇ ਛਾਪੋ।"),
      l("Play in teams of 2 to 4 players with one dice.", "2 ਤੋਂ 4 ਖਿਡਾਰੀਆਂ ਦੀਆਂ ਟੀਮਾਂ ਬਣਾ ਕੇ ਇੱਕ ਪਾਸੇ ਨਾਲ ਖੇਡੋ।"),
      l("Landing on a ladder means reading out the good practice and climbing.", "ਪੌੜੀ 'ਤੇ ਪਹੁੰਚਣ 'ਤੇ ਚੰਗਾ ਅਭਿਆਸ ਪੜ੍ਹ ਕੇ ਉੱਪਰ ਚੜ੍ਹੋ।"),
      l("Landing on a snake means reading out the risky practice and sliding down.", "ਸੱਪ 'ਤੇ ਪਹੁੰਚਣ 'ਤੇ ਗ਼ਲਤ ਅਭਿਆਸ ਪੜ੍ਹ ਕੇ ਹੇਠਾਂ ਆਓ।"),
      l("The facilitator leads a short discussion after every game.", "ਹਰ ਖੇਡ ਤੋਂ ਬਾਅਦ ਸੰਚਾਲਕ ਛੋਟੀ ਚਰਚਾ ਕਰਵਾਉਂਦਾ ਹੈ।"),
    ],
    duration: l("30 minutes", "30 ਮਿੰਟ"),
    date: "2026-10-01",
    featured: true,
    sample: true,
  },
  {
    slug: "weed-watch-cards",
    category: "games",
    title: l("Weed Watch card game", "ਨਦੀਨ ਪਛਾਣ ਤਾਸ਼ ਖੇਡ"),
    description: l(
      "Match weed pictures to their names and the right time to act.",
      "ਨਦੀਨਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਨੂੰ ਉਨ੍ਹਾਂ ਦੇ ਨਾਂ ਅਤੇ ਰੋਕਥਾਮ ਦੇ ਸਹੀ ਸਮੇਂ ਨਾਲ ਮਿਲਾਓ।",
    ),
    crops: ["wheat"],
    topics: ["ipm", "safe-chemical-use"],
    languages: ["en", "pa"],
    media: { pdf: "/samples/sample-weed-watch-cards.pdf" },
    rules: [
      l("Print and cut out the cards.", "ਕਾਰਡ ਛਾਪੋ ਅਤੇ ਕੱਟ ਲਓ।"),
      l("Shuffle and place them face down.", "ਫੈਂਟ ਕੇ ਮੂਧੇ ਰੱਖੋ।"),
      l("Turn two cards at a time and keep matching pairs.", "ਇੱਕ ਵਾਰ ਦੋ ਕਾਰਡ ਪਲਟੋ ਅਤੇ ਮਿਲਦੇ ਜੋੜੇ ਰੱਖੋ।"),
      l("The player with the most pairs explains one weed to the group.", "ਸਭ ਤੋਂ ਵੱਧ ਜੋੜਿਆਂ ਵਾਲਾ ਖਿਡਾਰੀ ਟੋਲੀ ਨੂੰ ਇੱਕ ਨਦੀਨ ਬਾਰੇ ਦੱਸਦਾ ਹੈ।"),
    ],
    duration: l("20 minutes", "20 ਮਿੰਟ"),
    date: "2026-10-01",
    featured: false,
    sample: true,
  },
  // ── e-modules ──
  {
    slug: "ipm-basics-module",
    category: "e-modules",
    title: l("IPM basics in five steps", "ਪੰਜ ਕਦਮਾਂ ਵਿੱਚ ਸੰਯੁਕਤ ਕੀਟ ਪ੍ਰਬੰਧ"),
    description: l(
      "A short lesson on integrated pest management, with a five-question quiz.",
      "ਸੰਯੁਕਤ ਕੀਟ ਪ੍ਰਬੰਧ ਬਾਰੇ ਛੋਟਾ ਪਾਠ, ਪੰਜ ਸਵਾਲਾਂ ਦੀ ਕੁਇਜ਼ ਸਮੇਤ।",
    ),
    crops: ["wheat", "cotton"],
    topics: ["ipm", "safe-chemical-use"],
    languages: ["en", "pa"],
    media: {},
    lesson: [
      {
        title: l("What IPM means", "ਸੰਯੁਕਤ ਕੀਟ ਪ੍ਰਬੰਧ ਕੀ ਹੈ"),
        body: l(
          "Integrated Pest Management combines several methods — good crop care, natural enemies and, only when needed, pesticides — to keep pests below damaging levels.",
          "ਸੰਯੁਕਤ ਕੀਟ ਪ੍ਰਬੰਧ ਵਿੱਚ ਕਈ ਤਰੀਕੇ ਮਿਲਾਏ ਜਾਂਦੇ ਹਨ — ਫ਼ਸਲ ਦੀ ਚੰਗੀ ਦੇਖਭਾਲ, ਮਿੱਤਰ ਕੀੜੇ, ਅਤੇ ਸਿਰਫ਼ ਲੋੜ ਪੈਣ 'ਤੇ ਕੀਟਨਾਸ਼ਕ — ਤਾਂ ਜੋ ਕੀੜੇ ਨੁਕਸਾਨ ਦੇ ਪੱਧਰ ਤੋਂ ਹੇਠਾਂ ਰਹਿਣ।",
        ),
      },
      {
        title: l("Scout your field", "ਖੇਤ ਦਾ ਸਰਵੇਖਣ ਕਰੋ"),
        body: l(
          "Walk through your field regularly and look at plants in different spots, not just at the edges.",
          "ਆਪਣੇ ਖੇਤ ਵਿੱਚ ਲਗਾਤਾਰ ਗੇੜਾ ਲਾਓ ਅਤੇ ਸਿਰਫ਼ ਕਿਨਾਰਿਆਂ ਦੀ ਥਾਂ ਵੱਖ-ਵੱਖ ਥਾਵਾਂ ਤੋਂ ਬੂਟੇ ਦੇਖੋ।",
        ),
      },
      {
        title: l("Know friends from foes", "ਮਿੱਤਰ ਅਤੇ ਦੁਸ਼ਮਣ ਕੀੜੇ ਪਛਾਣੋ"),
        body: l(
          "Not every insect is a pest. Ladybird beetles and spiders eat pests and help your crop.",
          "ਹਰ ਕੀੜਾ ਦੁਸ਼ਮਣ ਨਹੀਂ ਹੁੰਦਾ। ਲੇਡੀਬਰਡ ਭੂੰਡੀਆਂ ਅਤੇ ਮੱਕੜੀਆਂ ਨੁਕਸਾਨਦੇਹ ਕੀੜੇ ਖਾ ਕੇ ਫ਼ਸਲ ਦੀ ਮਦਦ ਕਰਦੀਆਂ ਹਨ।",
        ),
      },
      {
        title: l("Decide with the threshold", "ਆਰਥਿਕ ਕਗਾਰ ਦੇਖ ਕੇ ਫ਼ੈਸਲਾ ਕਰੋ"),
        body: l(
          "Act only when pest numbers cross the economic threshold given in the Package of Practices.",
          "ਰੋਕਥਾਮ ਉਦੋਂ ਹੀ ਕਰੋ ਜਦੋਂ ਕੀੜਿਆਂ ਦੀ ਗਿਣਤੀ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਵਿੱਚ ਦੱਸੀ ਆਰਥਿਕ ਕਗਾਰ ਪਾਰ ਕਰ ਜਾਵੇ।",
        ),
      },
      {
        title: l("Spray safely", "ਸੁਰੱਖਿਅਤ ਛਿੜਕਾਅ ਕਰੋ"),
        body: l(
          "If you must spray, use only the recommended product and dose, read the label, and wear protective clothing.",
          "ਜੇ ਛਿੜਕਾਅ ਜ਼ਰੂਰੀ ਹੋਵੇ, ਤਾਂ ਸਿਰਫ਼ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਦਵਾਈ ਅਤੇ ਮਾਤਰਾ ਵਰਤੋ, ਲੇਬਲ ਪੜ੍ਹੋ, ਅਤੇ ਬਚਾਅ ਵਾਲੇ ਕੱਪੜੇ ਪਾਓ।",
        ),
      },
    ],
    quiz: [
      {
        question: l("What does IPM stand for?", "IPM ਦਾ ਪੂਰਾ ਰੂਪ ਕੀ ਹੈ?"),
        options: [
          l("Integrated Pest Management", "ਸੰਯੁਕਤ ਕੀਟ ਪ੍ਰਬੰਧ (Integrated Pest Management)"),
          l("Insect Poison Mixture", "ਕੀੜੇ ਮਾਰ ਮਿਸ਼ਰਣ"),
          l("Irrigation Planning Method", "ਸਿੰਚਾਈ ਯੋਜਨਾ ਢੰਗ"),
        ],
        answer: 0,
        explain: l("IPM means combining methods to manage pests.", "IPM ਦਾ ਅਰਥ ਹੈ ਕੀੜਿਆਂ ਦੇ ਪ੍ਰਬੰਧ ਲਈ ਕਈ ਤਰੀਕੇ ਮਿਲਾਉਣਾ।"),
      },
      {
        question: l("Where should you look when scouting a field?", "ਖੇਤ ਦਾ ਸਰਵੇਖਣ ਕਰਦੇ ਸਮੇਂ ਕਿੱਥੇ ਦੇਖਣਾ ਚਾਹੀਦਾ ਹੈ?"),
        options: [
          l("Only at the field edge", "ਸਿਰਫ਼ ਖੇਤ ਦੇ ਕਿਨਾਰੇ"),
          l("At different spots across the field", "ਖੇਤ ਦੀਆਂ ਵੱਖ-ਵੱਖ ਥਾਵਾਂ 'ਤੇ"),
          l("Nowhere, spray anyway", "ਕਿਤੇ ਨਹੀਂ, ਛਿੜਕਾਅ ਕਰ ਦਿਓ"),
        ],
        answer: 1,
        explain: l("Pests are uneven; check several spots.", "ਕੀੜੇ ਹਰ ਥਾਂ ਇੱਕੋ ਜਿਹੇ ਨਹੀਂ ਹੁੰਦੇ; ਕਈ ਥਾਵਾਂ ਦੇਖੋ।"),
      },
      {
        question: l("Which of these is a friendly insect?", "ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਮਿੱਤਰ ਕੀੜਾ ਕਿਹੜਾ ਹੈ?"),
        options: [l("Ladybird beetle", "ਲੇਡੀਬਰਡ ਭੂੰਡੀ"), l("Aphid", "ਚੇਪਾ"), l("Termite", "ਸਿਉਂਕ")],
        answer: 0,
        explain: l("Ladybird beetles eat aphids and other soft pests.", "ਲੇਡੀਬਰਡ ਭੂੰਡੀਆਂ ਚੇਪਾ ਅਤੇ ਹੋਰ ਨਰਮ ਕੀੜੇ ਖਾਂਦੀਆਂ ਹਨ।"),
      },
      {
        question: l("When should you spray for an insect pest?", "ਕੀੜੇ ਲਈ ਛਿੜਕਾਅ ਕਦੋਂ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?"),
        options: [
          l("Every week, just in case", "ਹਰ ਹਫ਼ਤੇ, ਸਾਵਧਾਨੀ ਵਜੋਂ"),
          l("When it crosses the economic threshold", "ਜਦੋਂ ਇਹ ਆਰਥਿਕ ਕਗਾਰ ਪਾਰ ਕਰ ਜਾਵੇ"),
          l("When the neighbour sprays", "ਜਦੋਂ ਗੁਆਂਢੀ ਛਿੜਕਾਅ ਕਰੇ"),
        ],
        answer: 1,
        explain: l(
          "Spraying below the threshold wastes money and kills friendly insects.",
          "ਕਗਾਰ ਤੋਂ ਪਹਿਲਾਂ ਛਿੜਕਾਅ ਪੈਸੇ ਦੀ ਬਰਬਾਦੀ ਹੈ ਅਤੇ ਮਿੱਤਰ ਕੀੜੇ ਵੀ ਮਾਰਦਾ ਹੈ।",
        ),
      },
      {
        question: l("What should you read before spraying?", "ਛਿੜਕਾਅ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਪੜ੍ਹਨਾ ਚਾਹੀਦਾ ਹੈ?"),
        options: [l("The product label", "ਦਵਾਈ ਦਾ ਲੇਬਲ"), l("The bill", "ਬਿੱਲ"), l("Nothing", "ਕੁਝ ਨਹੀਂ")],
        answer: 0,
        explain: l("The label tells you the dose, safety and waiting period.", "ਲੇਬਲ ਮਾਤਰਾ, ਸੁਰੱਖਿਆ ਅਤੇ ਉਡੀਕ ਦਾ ਸਮਾਂ ਦੱਸਦਾ ਹੈ।"),
      },
    ],
    duration: l("10 minutes", "10 ਮਿੰਟ"),
    date: "2026-10-01",
    featured: true,
    sample: true,
  },
  // ── e-books ──
  {
    slug: "stories-from-the-fields-ebook",
    category: "e-books",
    title: l("Sample e-book: stories from the fields", "ਨਮੂਨਾ ਈ-ਕਿਤਾਬ: ਖੇਤਾਂ ਦੀਆਂ ਕਹਾਣੀਆਂ"),
    // pa: needs expert review
    description: l(
      "The layout for an e-book you can read on your phone or download. The real book will replace this sample.",
      "ਫ਼ੋਨ 'ਤੇ ਪੜ੍ਹਨ ਜਾਂ ਡਾਊਨਲੋਡ ਕਰਨ ਵਾਲੀ ਈ-ਕਿਤਾਬ ਦਾ ਖ਼ਾਕਾ। ਅਸਲ ਕਿਤਾਬ ਇਸ ਨਮੂਨੇ ਦੀ ਥਾਂ ਲਵੇਗੀ।",
    ),
    crops: [],
    topics: [],
    languages: ["pa", "en"],
    media: { pdf: "/samples/sample-ebook.pdf" },
    credits: [{ role: l("Author", "ਲੇਖਕ"), name: l("To be added", "ਜੋੜਿਆ ਜਾਣਾ ਹੈ") }],
    duration: l("40 pages", "40 ਪੰਨੇ"),
    date: "2026-06-01",
    featured: true,
    sample: true,
  },
  // ── posters-comics ──
  {
    slug: "friendly-insects-comic",
    category: "posters-comics",
    title: l("Sample comic: the friendly insects", "ਨਮੂਨਾ ਕਾਮਿਕ: ਮਿੱਤਰ ਕੀੜੇ"),
    // pa: needs expert review
    description: l(
      "The layout for a comic or poster. The real artwork will replace this sample.",
      "ਕਾਮਿਕ ਜਾਂ ਪੋਸਟਰ ਦਾ ਖ਼ਾਕਾ। ਅਸਲ ਚਿੱਤਰ ਇਸ ਨਮੂਨੇ ਦੀ ਥਾਂ ਲੈਣਗੇ।",
    ),
    crops: ["cotton"],
    topics: ["ipm"],
    languages: ["pa"],
    media: { pdf: "/samples/sample-comic.pdf" },
    duration: l("8 pages", "8 ਪੰਨੇ"),
    date: "2026-05-20",
    featured: false,
    sample: true,
  },
];
