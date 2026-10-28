/**
 * Extension kits: one ready-to-run training package per agronomic operation.
 * Every kit uses the same seven-part template. These three are SAMPLES with
 * placeholder PDFs in /public/samples/kits.
 */
import { l, type Kit, type KitFile } from "./schema";

const files = (slug: string): KitFile[] => [
  { kind: "facilitator-guide", title: l("Facilitator guide", "ਸੰਚਾਲਕ ਗਾਈਡ"), path: `/samples/kits/${slug}/facilitator-guide.pdf` },
  { kind: "slides", title: l("Slides", "ਸਲਾਈਡਾਂ"), path: `/samples/kits/${slug}/slides.pdf` },
  { kind: "leaflet", title: l("Farmer leaflet", "ਕਿਸਾਨ ਪਰਚਾ"), path: `/samples/kits/${slug}/leaflet.pdf` },
  { kind: "activity", title: l("Group activity", "ਟੋਲੀ ਗਤੀਵਿਧੀ"), path: `/samples/kits/${slug}/activity.pdf` },
  { kind: "pre-test", title: l("Pre-test", "ਪਹਿਲਾਂ ਦਾ ਟੈਸਟ"), path: `/samples/kits/${slug}/pre-test.pdf` },
  { kind: "post-test", title: l("Post-test", "ਬਾਅਦ ਦਾ ਟੈਸਟ"), path: `/samples/kits/${slug}/post-test.pdf` },
  { kind: "feedback-form", title: l("Feedback form", "ਫ਼ੀਡਬੈਕ ਫ਼ਾਰਮ"), path: `/samples/kits/${slug}/feedback-form.pdf` },
];

export const kits: Kit[] = [
  {
    slug: "wheat-weed-management",
    crop: "wheat",
    operation: "weeds",
    topics: ["ipm", "safe-chemical-use"],
    title: l("Wheat — Weed management", "ਕਣਕ — ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ"),
    summary: l(
      "A 90-minute session to help farmers identify wheat weeds and choose the right control at the right time.",
      "ਕਿਸਾਨਾਂ ਨੂੰ ਕਣਕ ਦੇ ਨਦੀਨ ਪਛਾਣਨ ਅਤੇ ਸਹੀ ਸਮੇਂ 'ਤੇ ਸਹੀ ਰੋਕਥਾਮ ਚੁਣਨ ਵਿੱਚ ਮਦਦ ਲਈ 90 ਮਿੰਟ ਦਾ ਸੈਸ਼ਨ।",
    ),
    objectives: [
      l("Identify the main weed groups in wheat.", "ਕਣਕ ਦੇ ਮੁੱਖ ਨਦੀਨ ਸਮੂਹਾਂ ਦੀ ਪਛਾਣ ਕਰਨਾ।"),
      l("Explain the right time for weed control.", "ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ ਦਾ ਸਹੀ ਸਮਾਂ ਸਮਝਾਉਣਾ।"),
      l("Practise safe handling of herbicides.", "ਨਦੀਨਨਾਸ਼ਕਾਂ ਦੀ ਸੁਰੱਖਿਅਤ ਵਰਤੋਂ ਦਾ ਅਭਿਆਸ ਕਰਨਾ।"),
    ],
    audience: ["extension-workers", "farmers"],
    duration: l("90 minutes", "90 ਮਿੰਟ"),
    files: files("wheat-weed-management"),
    activity: "weed-watch-cards",
    sample: true,
  },
  {
    slug: "wheat-insect-pests",
    crop: "wheat",
    operation: "insect-pests",
    topics: ["ipm", "safe-chemical-use"],
    title: l("Wheat — Insect pests", "ਕਣਕ — ਕੀੜੇ-ਮਕੌੜੇ"),
    summary: l(
      "A field-school style session on scouting, thresholds and natural enemies in wheat.",
      "ਕਣਕ ਵਿੱਚ ਸਰਵੇਖਣ, ਆਰਥਿਕ ਕਗਾਰ ਅਤੇ ਮਿੱਤਰ ਕੀੜਿਆਂ ਬਾਰੇ ਖੇਤ-ਸਕੂਲ ਵਰਗਾ ਸੈਸ਼ਨ।",
    ),
    objectives: [
      l("Scout a field using a simple walking pattern.", "ਸੌਖੇ ਤਰੀਕੇ ਨਾਲ ਖੇਤ ਦਾ ਸਰਵੇਖਣ ਕਰਨਾ।"),
      l("Tell friendly insects from pests.", "ਮਿੱਤਰ ਅਤੇ ਦੁਸ਼ਮਣ ਕੀੜਿਆਂ ਵਿੱਚ ਫ਼ਰਕ ਕਰਨਾ।"),
      l("Decide when spraying is justified.", "ਇਹ ਤੈਅ ਕਰਨਾ ਕਿ ਛਿੜਕਾਅ ਕਦੋਂ ਜ਼ਰੂਰੀ ਹੈ।"),
    ],
    audience: ["extension-workers", "farmers", "students"],
    duration: l("2 hours", "2 ਘੰਟੇ"),
    files: files("wheat-insect-pests"),
    activity: "ipm-snakes-and-ladders",
    sample: true,
  },
  {
    slug: "wheat-diseases",
    crop: "wheat",
    operation: "diseases",
    topics: ["ipm"],
    title: l("Wheat — Diseases", "ਕਣਕ — ਬਿਮਾਰੀਆਂ"),
    summary: l(
      "A session on spotting disease symptoms early and knowing whom to ask.",
      "ਬਿਮਾਰੀਆਂ ਦੀਆਂ ਨਿਸ਼ਾਨੀਆਂ ਛੇਤੀ ਪਛਾਣਨ ਅਤੇ ਕਿਸ ਤੋਂ ਸਲਾਹ ਲੈਣੀ ਹੈ, ਇਸ ਬਾਰੇ ਸੈਸ਼ਨ।",
    ),
    objectives: [
      l("Recognise early disease symptoms.", "ਬਿਮਾਰੀਆਂ ਦੀਆਂ ਸ਼ੁਰੂਆਤੀ ਨਿਸ਼ਾਨੀਆਂ ਪਛਾਣਨਾ।"),
      l("Collect a good photo and sample for experts.", "ਮਾਹਿਰਾਂ ਲਈ ਚੰਗੀ ਫ਼ੋਟੋ ਅਤੇ ਨਮੂਨਾ ਲੈਣਾ।"),
      l("Follow recommended management steps.", "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੇ ਰੋਕਥਾਮ ਦੇ ਕਦਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰਨਾ।"),
    ],
    audience: ["extension-workers", "farmers"],
    duration: l("90 minutes", "90 ਮਿੰਟ"),
    files: files("wheat-diseases"),
    activity: "ipm-basics-module",
    sample: true,
  },
];
