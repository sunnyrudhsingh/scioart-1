/**
 * Advisories & updates. All four entries are SAMPLES.
 * An advisory is shown as active while today is between issuedOn and
 * validUntil; after that it moves to the archive automatically.
 * districts: [] means it applies to the whole of Punjab.
 */
import { l, type Advisory } from "./schema";

export const advisories: Advisory[] = [
  {
    slug: "sample-wheat-pest-alert",
    type: "alert",
    title: l("Sample alert: scout wheat fields for pests this week", "ਨਮੂਨਾ ਚੇਤਾਵਨੀ: ਇਸ ਹਫ਼ਤੇ ਕਣਕ ਦੇ ਖੇਤਾਂ ਵਿੱਚ ਕੀੜਿਆਂ ਦਾ ਸਰਵੇਖਣ ਕਰੋ"),
    summary: l(
      "This is how an urgent pest or disease alert will look. Real alerts are issued by PAU experts.",
      "ਜ਼ਰੂਰੀ ਕੀਟ ਜਾਂ ਬਿਮਾਰੀ ਚੇਤਾਵਨੀ ਇਸ ਤਰ੍ਹਾਂ ਦਿਸੇਗੀ। ਅਸਲ ਚੇਤਾਵਨੀਆਂ PAU ਦੇ ਮਾਹਿਰ ਜਾਰੀ ਕਰਦੇ ਹਨ।",
    ),
    body: [
      l(
        "Sample text — the alert details, affected areas and what to do will appear here.",
        "ਨਮੂਨਾ ਲਿਖਤ — ਚੇਤਾਵਨੀ ਦਾ ਵੇਰਵਾ, ਪ੍ਰਭਾਵਿਤ ਇਲਾਕੇ ਅਤੇ ਕੀ ਕਰਨਾ ਹੈ, ਇੱਥੇ ਆਵੇਗਾ।",
      ),
      l("Always follow the Package of Practices and read product labels.", "ਹਮੇਸ਼ਾ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ ਅਤੇ ਦਵਾਈਆਂ ਦੇ ਲੇਬਲ ਪੜ੍ਹੋ।"),
    ],
    crops: ["wheat"],
    districts: [],
    issuedOn: "2026-10-20",
    validUntil: "2027-01-31",
    urgent: true,
    sample: true,
  },
  {
    slug: "sample-rabi-seasonal-advisory",
    type: "seasonal",
    title: l("Sample seasonal advisory for rabi sowing", "ਹਾੜ੍ਹੀ ਦੀ ਬਿਜਾਈ ਲਈ ਨਮੂਨਾ ਮੌਸਮੀ ਸਲਾਹ"),
    summary: l(
      "Seasonal advisories collect the most important tasks for the coming weeks.",
      "ਮੌਸਮੀ ਸਲਾਹਾਂ ਵਿੱਚ ਆਉਣ ਵਾਲੇ ਹਫ਼ਤਿਆਂ ਦੇ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਕੰਮ ਇਕੱਠੇ ਦਿੱਤੇ ਜਾਂਦੇ ਹਨ।",
    ),
    body: [l("Sample text — the seasonal advisory will be added by the PAU team.", "ਨਮੂਨਾ ਲਿਖਤ — ਮੌਸਮੀ ਸਲਾਹ PAU ਟੀਮ ਵੱਲੋਂ ਜੋੜੀ ਜਾਵੇਗੀ।")],
    crops: ["wheat", "barley", "chickpea", "raya"],
    districts: [],
    issuedOn: "2026-10-01",
    validUntil: "2026-12-31",
    urgent: false,
    sample: true,
  },
  {
    slug: "sample-kisan-mela",
    type: "event",
    title: l("Kisan Mela (sample event)", "ਕਿਸਾਨ ਮੇਲਾ (ਨਮੂਨਾ ਸਮਾਗਮ)"),
    summary: l(
      "Event listings show the date, place and what to expect. Dates will be announced by PAU.",
      "ਸਮਾਗਮਾਂ ਵਿੱਚ ਤਾਰੀਖ਼, ਥਾਂ ਅਤੇ ਕੀ ਹੋਵੇਗਾ, ਦੱਸਿਆ ਜਾਂਦਾ ਹੈ। ਤਾਰੀਖ਼ਾਂ PAU ਵੱਲੋਂ ਐਲਾਨੀਆਂ ਜਾਣਗੀਆਂ।",
    ),
    body: [l("Sample text — date, venue and programme to be added.", "ਨਮੂਨਾ ਲਿਖਤ — ਤਾਰੀਖ਼, ਥਾਂ ਅਤੇ ਪ੍ਰੋਗਰਾਮ ਜੋੜਿਆ ਜਾਣਾ ਹੈ।")],
    crops: [],
    districts: ["ludhiana"],
    issuedOn: "2026-10-10",
    validUntil: "2027-03-31",
    urgent: false,
    sample: true,
  },
  {
    slug: "sample-kharif-2026-advisory",
    type: "seasonal",
    title: l("Sample advisory from last season", "ਪਿਛਲੇ ਸੀਜ਼ਨ ਦੀ ਨਮੂਨਾ ਸਲਾਹ"),
    summary: l("Expired advisories move to the archive automatically.", "ਮਿਆਦ ਪੁੱਗੀਆਂ ਸਲਾਹਾਂ ਆਪਣੇ-ਆਪ ਪੁਰਾਲੇਖ ਵਿੱਚ ਚਲੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।"),
    body: [l("Sample text for an archived advisory.", "ਪੁਰਾਲੇਖ ਵਾਲੀ ਸਲਾਹ ਲਈ ਨਮੂਨਾ ਲਿਖਤ।")],
    crops: ["paddy"],
    districts: [],
    issuedOn: "2026-06-01",
    validUntil: "2026-08-31",
    urgent: false,
    sample: true,
  },
];
