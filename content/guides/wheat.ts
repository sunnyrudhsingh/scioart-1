/**
 * SAMPLE operation guides for wheat.
 *
 * This file shows the STRUCTURE of a guide only. Every value marked "—"
 * and every "to be added" line must be replaced with the official text
 * from PAU's Package of Practices for Crops of Punjab (Rabi). Nothing in
 * this file is an agricultural recommendation.
 */
import { l, type Block, type L, type OperationGuide } from "../schema";

const dash = "—" as const;
const tba = (n: number) => l(`Variety ${n} — to be added`, `ਕਿਸਮ ${n} — ਜੋੜੀ ਜਾਣੀ ਹੈ`);

const blocks: Record<string, Block[]> = {
  varieties: [
    { type: "heading", id: "choosing", text: l("Choosing a variety", "ਕਿਸਮ ਦੀ ਚੋਣ") },
    {
      type: "paragraph",
      text: l(
        "Choose a variety recommended for your zone and your sowing time. The table will list every PAU-recommended wheat variety once the official text is added.",
        "ਆਪਣੇ ਇਲਾਕੇ ਅਤੇ ਬਿਜਾਈ ਦੇ ਸਮੇਂ ਲਈ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਕਿਸਮ ਚੁਣੋ। ਅਧਿਕਾਰਤ ਲਿਖਤ ਜੋੜਨ ਤੋਂ ਬਾਅਦ ਸਾਰਣੀ ਵਿੱਚ PAU ਵੱਲੋਂ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਕਣਕ ਦੀ ਹਰ ਕਿਸਮ ਦਿੱਤੀ ਜਾਵੇਗੀ।",
      ),
    },
    {
      type: "table",
      caption: l("Recommended varieties", "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀਆਂ ਕਿਸਮਾਂ"),
      columns: [
        l("Variety", "ਕਿਸਮ"),
        l("Sowing condition", "ਬਿਜਾਈ ਦੀ ਹਾਲਤ"),
        l("Maturity (days)", "ਪੱਕਣ ਦਾ ਸਮਾਂ (ਦਿਨ)"),
        l("Average yield (q/acre)", "ਔਸਤ ਝਾੜ (ਕੁਇੰਟਲ/ਏਕੜ)"),
      ],
      rows: [
        [tba(1), l("Timely sown, irrigated", "ਸਮੇਂ ਸਿਰ ਬਿਜਾਈ, ਸਿੰਜਾਈ ਹੇਠ"), dash, dash],
        [tba(2), l("Timely sown, irrigated", "ਸਮੇਂ ਸਿਰ ਬਿਜਾਈ, ਸਿੰਜਾਈ ਹੇਠ"), dash, dash],
        [tba(3), l("Late sown", "ਪਿਛੇਤੀ ਬਿਜਾਈ"), dash, dash],
        [tba(4), l("Rainfed", "ਬਰਾਨੀ"), dash, dash],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: l(
        "Buy certified seed from PAU or another trusted source, and keep the bill.",
        "ਪ੍ਰਮਾਣਿਤ ਬੀਜ PAU ਜਾਂ ਕਿਸੇ ਭਰੋਸੇਯੋਗ ਸਰੋਤ ਤੋਂ ਖ਼ਰੀਦੋ ਅਤੇ ਬਿੱਲ ਸੰਭਾਲ ਕੇ ਰੱਖੋ।",
      ),
    },
  ],

  "land-preparation": [
    { type: "heading", id: "preparing", text: l("Preparing the field", "ਖੇਤ ਦੀ ਤਿਆਰੀ") },
    {
      type: "paragraph",
      text: l(
        "A level, well-prepared field gives even germination and saves water. The official steps for wheat will appear below.",
        "ਪੱਧਰਾ ਅਤੇ ਚੰਗੀ ਤਰ੍ਹਾਂ ਤਿਆਰ ਖੇਤ ਇੱਕਸਾਰ ਜੰਮ ਦਿੰਦਾ ਹੈ ਅਤੇ ਪਾਣੀ ਬਚਾਉਂਦਾ ਹੈ। ਕਣਕ ਲਈ ਅਧਿਕਾਰਤ ਕਦਮ ਹੇਠਾਂ ਦਿੱਤੇ ਜਾਣਗੇ।",
      ),
    },
    {
      type: "steps",
      items: [
        l("Field levelling — details to be added", "ਖੇਤ ਨੂੰ ਪੱਧਰਾ ਕਰਨਾ — ਵੇਰਵਾ ਜੋੜਿਆ ਜਾਣਾ ਹੈ"),
        l("Number and type of ploughings — to be added", "ਵਾਹੀਆਂ ਦੀ ਗਿਣਤੀ ਅਤੇ ਕਿਸਮ — ਜੋੜੀ ਜਾਣੀ ਹੈ"),
        l("Handling paddy residue before sowing — to be added", "ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਝੋਨੇ ਦੀ ਪਰਾਲੀ ਦਾ ਪ੍ਰਬੰਧ — ਜੋੜਿਆ ਜਾਣਾ ਹੈ"),
      ],
    },
    {
      type: "callout",
      tone: "caution",
      text: l(
        "Do not burn crop residue. Burning harms soil health, human health and the air we share.",
        "ਫ਼ਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ ਅੱਗ ਨਾ ਲਗਾਓ। ਅੱਗ ਮਿੱਟੀ ਦੀ ਸਿਹਤ, ਮਨੁੱਖੀ ਸਿਹਤ ਅਤੇ ਸਾਡੀ ਹਵਾ ਲਈ ਨੁਕਸਾਨਦੇਹ ਹੈ।",
      ),
    },
    { type: "media", learn: "straw-is-gold-jingle" },
  ],

  "seed-sowing": [
    { type: "heading", id: "sowing-details", text: l("Sowing details", "ਬਿਜਾਈ ਦਾ ਵੇਰਵਾ") },
    {
      type: "table",
      caption: l("Seed and sowing at a glance", "ਬੀਜ ਅਤੇ ਬਿਜਾਈ ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ"),
      columns: [l("Item", "ਵੇਰਵਾ"), l("Recommendation", "ਸਿਫ਼ਾਰਸ਼")],
      rows: [
        [l("Sowing time", "ਬਿਜਾਈ ਦਾ ਸਮਾਂ"), dash],
        [l("Seed rate (kg per acre)", "ਬੀਜ ਦੀ ਮਾਤਰਾ (ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ)"), dash],
        [l("Row spacing (cm)", "ਕਤਾਰਾਂ ਦਾ ਫ਼ਾਸਲਾ (ਸੈਂਟੀਮੀਟਰ)"), dash],
        [l("Sowing depth (cm)", "ਬਿਜਾਈ ਦੀ ਡੂੰਘਾਈ (ਸੈਂਟੀਮੀਟਰ)"), dash],
        [l("Seed treatment", "ਬੀਜ ਦੀ ਸੋਧ"), dash],
      ],
    },
    { type: "heading", id: "methods", text: l("Sowing methods", "ਬਿਜਾਈ ਦੇ ਢੰਗ") },
    {
      type: "steps",
      items: [l("Method 1 — to be added", "ਢੰਗ 1 — ਜੋੜਿਆ ਜਾਣਾ ਹੈ"), l("Method 2 — to be added", "ਢੰਗ 2 — ਜੋੜਿਆ ਜਾਣਾ ਹੈ")],
    },
    {
      type: "callout",
      tone: "important",
      text: l(
        "Treat seed only with products listed in the official Package of Practices, and follow the label.",
        "ਬੀਜ ਦੀ ਸੋਧ ਸਿਰਫ਼ ਅਧਿਕਾਰਤ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਵਿੱਚ ਦੱਸੀਆਂ ਦਵਾਈਆਂ ਨਾਲ ਕਰੋ ਅਤੇ ਲੇਬਲ ਦੀ ਪਾਲਣਾ ਕਰੋ।",
      ),
    },
    { type: "media", learn: "wheat-sowing-video" },
  ],

  irrigation: [
    { type: "heading", id: "schedule", text: l("Irrigation schedule", "ਸਿੰਚਾਈ ਦਾ ਸਮਾਂ-ਸਾਰਣੀ") },
    {
      type: "paragraph",
      text: l(
        "Irrigate at the crop stages listed in the Package of Practices. The table will show each irrigation once the official text is added.",
        "ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਵਿੱਚ ਦੱਸੀਆਂ ਫ਼ਸਲ ਅਵਸਥਾਵਾਂ 'ਤੇ ਪਾਣੀ ਦਿਓ। ਅਧਿਕਾਰਤ ਲਿਖਤ ਜੋੜਨ ਤੋਂ ਬਾਅਦ ਸਾਰਣੀ ਵਿੱਚ ਹਰ ਪਾਣੀ ਦਾ ਵੇਰਵਾ ਆਵੇਗਾ।",
      ),
    },
    {
      type: "table",
      caption: l("Irrigations", "ਪਾਣੀ"),
      columns: [l("Irrigation", "ਪਾਣੀ"), l("Crop stage", "ਫ਼ਸਲ ਦੀ ਅਵਸਥਾ"), l("Days after sowing", "ਬਿਜਾਈ ਤੋਂ ਬਾਅਦ ਦਿਨ")],
      rows: [
        [l("1st", "ਪਹਿਲਾ"), dash, dash],
        [l("2nd", "ਦੂਜਾ"), dash, dash],
        [l("3rd", "ਤੀਜਾ"), dash, dash],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: l("Check the weather forecast before you irrigate.", "ਪਾਣੀ ਲਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ ਜ਼ਰੂਰ ਦੇਖੋ।"),
    },
    { type: "media", learn: "every-drop-counts-song" },
  ],

  nutrients: [
    { type: "heading", id: "doses", text: l("Fertiliser doses", "ਖਾਦਾਂ ਦੀ ਮਾਤਰਾ") },
    {
      type: "paragraph",
      text: l(
        "Base fertiliser doses on a soil test of your field. Official doses will be listed below.",
        "ਖਾਦਾਂ ਦੀ ਮਾਤਰਾ ਆਪਣੇ ਖੇਤ ਦੀ ਮਿੱਟੀ ਦੀ ਪਰਖ ਦੇ ਆਧਾਰ 'ਤੇ ਤੈਅ ਕਰੋ। ਅਧਿਕਾਰਤ ਮਾਤਰਾ ਹੇਠਾਂ ਦਿੱਤੀ ਜਾਵੇਗੀ।",
      ),
    },
    {
      type: "table",
      caption: l("Nutrients per acre", "ਪ੍ਰਤੀ ਏਕੜ ਖ਼ੁਰਾਕੀ ਤੱਤ"),
      columns: [l("Nutrient", "ਤੱਤ"), l("Dose per acre", "ਪ੍ਰਤੀ ਏਕੜ ਮਾਤਰਾ"), l("When to apply", "ਕਦੋਂ ਪਾਈਏ")],
      rows: [
        [l("Nitrogen (N)", "ਨਾਈਟ੍ਰੋਜਨ (N)"), dash, dash],
        [l("Phosphorus (P)", "ਫ਼ਾਸਫ਼ੋਰਸ (P)"), dash, dash],
        [l("Potassium (K)", "ਪੋਟਾਸ਼ੀਅਮ (K)"), dash, dash],
        [l("Zinc", "ਜ਼ਿੰਕ"), dash, dash],
      ],
    },
    {
      type: "callout",
      tone: "important",
      text: l("Get your soil tested before deciding fertiliser doses.", "ਖਾਦਾਂ ਦੀ ਮਾਤਰਾ ਤੈਅ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਪਰਖ ਕਰਵਾਓ।"),
    },
    { type: "media", learn: "song-of-the-soil" },
  ],

  weeds: [
    { type: "heading", id: "weed-control", text: l("Weed control", "ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ") },
    {
      type: "paragraph",
      text: l(
        "Identify the weeds in your field first, then choose the control measure. Official herbicide recommendations will appear in the table.",
        "ਪਹਿਲਾਂ ਆਪਣੇ ਖੇਤ ਦੇ ਨਦੀਨਾਂ ਦੀ ਪਛਾਣ ਕਰੋ, ਫਿਰ ਰੋਕਥਾਮ ਦਾ ਤਰੀਕਾ ਚੁਣੋ। ਅਧਿਕਾਰਤ ਨਦੀਨਨਾਸ਼ਕ ਸਿਫ਼ਾਰਸ਼ਾਂ ਸਾਰਣੀ ਵਿੱਚ ਦਿੱਤੀਆਂ ਜਾਣਗੀਆਂ।",
      ),
    },
    {
      type: "table",
      caption: l("Herbicides", "ਨਦੀਨਨਾਸ਼ਕ"),
      columns: [
        l("Weed type", "ਨਦੀਨ ਦੀ ਕਿਸਮ"),
        l("Herbicide", "ਨਦੀਨਨਾਸ਼ਕ"),
        l("Dose per acre", "ਪ੍ਰਤੀ ਏਕੜ ਮਾਤਰਾ"),
        l("Time of application", "ਛਿੜਕਾਅ ਦਾ ਸਮਾਂ"),
      ],
      rows: [
        [l("Narrow-leaf weeds", "ਘਾਹ ਵਾਲੇ ਨਦੀਨ"), dash, dash, dash],
        [l("Broad-leaf weeds", "ਚੌੜੇ ਪੱਤੇ ਵਾਲੇ ਨਦੀਨ"), dash, dash, dash],
      ],
    },
    {
      type: "callout",
      tone: "caution",
      text: l(
        "Read the label before spraying. Wear gloves and a mask, and keep children away.",
        "ਛਿੜਕਾਅ ਤੋਂ ਪਹਿਲਾਂ ਲੇਬਲ ਪੜ੍ਹੋ। ਦਸਤਾਨੇ ਅਤੇ ਮਾਸਕ ਪਾਓ, ਅਤੇ ਬੱਚਿਆਂ ਨੂੰ ਦੂਰ ਰੱਖੋ।",
      ),
    },
    { type: "media", learn: "weed-watch-cards" },
  ],

  "insect-pests": [
    { type: "heading", id: "pest-1", text: l("Pest 1 — to be added", "ਕੀੜਾ 1 — ਜੋੜਿਆ ਜਾਣਾ ਹੈ") },
    {
      type: "steps",
      items: [
        l("How to recognise it — to be added", "ਪਛਾਣ ਕਿਵੇਂ ਕਰੀਏ — ਜੋੜਿਆ ਜਾਣਾ ਹੈ"),
        l("When to act (economic threshold) — to be added", "ਕਦੋਂ ਰੋਕਥਾਮ ਕਰੀਏ (ਆਰਥਿਕ ਕਗਾਰ) — ਜੋੜਿਆ ਜਾਣਾ ਹੈ"),
        l("Control measures — to be added", "ਰੋਕਥਾਮ ਦੇ ਤਰੀਕੇ — ਜੋੜੇ ਜਾਣੇ ਹਨ"),
      ],
    },
    { type: "heading", id: "pest-2", text: l("Pest 2 — to be added", "ਕੀੜਾ 2 — ਜੋੜਿਆ ਜਾਣਾ ਹੈ") },
    {
      type: "steps",
      items: [
        l("How to recognise it — to be added", "ਪਛਾਣ ਕਿਵੇਂ ਕਰੀਏ — ਜੋੜਿਆ ਜਾਣਾ ਹੈ"),
        l("When to act (economic threshold) — to be added", "ਕਦੋਂ ਰੋਕਥਾਮ ਕਰੀਏ (ਆਰਥਿਕ ਕਗਾਰ) — ਜੋੜਿਆ ਜਾਣਾ ਹੈ"),
        l("Control measures — to be added", "ਰੋਕਥਾਮ ਦੇ ਤਰੀਕੇ — ਜੋੜੇ ਜਾਣੇ ਹਨ"),
      ],
    },
    {
      type: "callout",
      tone: "important",
      text: l(
        "Scout your field regularly and spray only when a pest crosses its economic threshold.",
        "ਖੇਤ ਦਾ ਲਗਾਤਾਰ ਸਰਵੇਖਣ ਕਰੋ ਅਤੇ ਛਿੜਕਾਅ ਉਦੋਂ ਹੀ ਕਰੋ ਜਦੋਂ ਕੀੜਾ ਆਰਥਿਕ ਕਗਾਰ ਪਾਰ ਕਰ ਜਾਵੇ।",
      ),
    },
    { type: "media", learn: "ipm-snakes-and-ladders" },
  ],

  diseases: [
    { type: "heading", id: "disease-1", text: l("Disease 1 — to be added", "ਬਿਮਾਰੀ 1 — ਜੋੜੀ ਜਾਣੀ ਹੈ") },
    {
      type: "steps",
      items: [l("Symptoms — to be added", "ਨਿਸ਼ਾਨੀਆਂ — ਜੋੜੀਆਂ ਜਾਣੀਆਂ ਹਨ"), l("Management — to be added", "ਰੋਕਥਾਮ — ਜੋੜੀ ਜਾਣੀ ਹੈ")],
    },
    { type: "heading", id: "disease-2", text: l("Disease 2 — to be added", "ਬਿਮਾਰੀ 2 — ਜੋੜੀ ਜਾਣੀ ਹੈ") },
    {
      type: "steps",
      items: [l("Symptoms — to be added", "ਨਿਸ਼ਾਨੀਆਂ — ਜੋੜੀਆਂ ਜਾਣੀਆਂ ਹਨ"), l("Management — to be added", "ਰੋਕਥਾਮ — ਜੋੜੀ ਜਾਣੀ ਹੈ")],
    },
    {
      type: "callout",
      tone: "tip",
      text: l(
        "If you see unusual symptoms, send a photo through Ask an Expert or contact your nearest KVK.",
        "ਜੇ ਕੋਈ ਅਣਜਾਣ ਨਿਸ਼ਾਨੀ ਦਿਸੇ, ਤਾਂ 'ਮਾਹਿਰ ਨੂੰ ਪੁੱਛੋ' ਰਾਹੀਂ ਫ਼ੋਟੋ ਭੇਜੋ ਜਾਂ ਨੇੜਲੇ ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
      ),
    },
  ],

  "harvest-storage": [
    { type: "heading", id: "harvest", text: l("Harvest", "ਵਾਢੀ") },
    {
      type: "steps",
      items: [
        l("Signs of maturity — to be added", "ਪੱਕਣ ਦੀਆਂ ਨਿਸ਼ਾਨੀਆਂ — ਜੋੜੀਆਂ ਜਾਣੀਆਂ ਹਨ"),
        l("Harvesting and threshing — to be added", "ਵਾਢੀ ਅਤੇ ਗਹਾਈ — ਜੋੜਿਆ ਜਾਣਾ ਹੈ"),
      ],
    },
    { type: "heading", id: "storage", text: l("Storage", "ਭੰਡਾਰਨ") },
    {
      type: "table",
      caption: l("Safe storage", "ਸੁਰੱਖਿਅਤ ਭੰਡਾਰਨ"),
      columns: [l("Item", "ਵੇਰਵਾ"), l("Recommendation", "ਸਿਫ਼ਾਰਸ਼")],
      rows: [
        [l("Grain moisture for storage (%)", "ਭੰਡਾਰਨ ਲਈ ਦਾਣਿਆਂ ਵਿੱਚ ਨਮੀ (%)"), dash],
        [l("Store preparation", "ਗੁਦਾਮ ਦੀ ਤਿਆਰੀ"), dash],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: l("Store grain only when it is dry, in a clean store.", "ਦਾਣੇ ਸਿਰਫ਼ ਸੁੱਕੇ ਹੋਣ 'ਤੇ ਹੀ ਸਾਫ਼ ਗੁਦਾਮ ਵਿੱਚ ਭੰਡਾਰ ਕਰੋ।"),
    },
  ],

  machinery: [
    { type: "heading", id: "machines", text: l("Machines for wheat", "ਕਣਕ ਲਈ ਮਸ਼ੀਨਾਂ") },
    {
      type: "table",
      caption: l("Recommended machinery", "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਮਸ਼ੀਨਰੀ"),
      columns: [l("Machine", "ਮਸ਼ੀਨ"), l("Used for", "ਵਰਤੋਂ"), l("Operation", "ਕਾਰਜ")],
      rows: [
        [l("Machine 1 — to be added", "ਮਸ਼ੀਨ 1 — ਜੋੜੀ ਜਾਣੀ ਹੈ"), l("Sowing", "ਬਿਜਾਈ"), dash],
        [l("Machine 2 — to be added", "ਮਸ਼ੀਨ 2 — ਜੋੜੀ ਜਾਣੀ ਹੈ"), l("Residue management", "ਪਰਾਲੀ ਪ੍ਰਬੰਧ"), dash],
        [l("Machine 3 — to be added", "ਮਸ਼ੀਨ 3 — ਜੋੜੀ ਜਾਣੀ ਹੈ"), l("Harvesting", "ਵਾਢੀ"), dash],
      ],
    },
    {
      type: "callout",
      tone: "caution",
      text: l(
        "Switch off the engine before clearing a blocked machine, and keep children away from running machines.",
        "ਫਸੀ ਮਸ਼ੀਨ ਸਾਫ਼ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇੰਜਣ ਬੰਦ ਕਰੋ, ਅਤੇ ਚੱਲਦੀਆਂ ਮਸ਼ੀਨਾਂ ਤੋਂ ਬੱਚਿਆਂ ਨੂੰ ਦੂਰ ਰੱਖੋ।",
      ),
    },
  ],
};

const topicsFor: Record<string, string[]> = {
  varieties: ["seed-production"],
  "land-preparation": ["residue-management", "soil-health"],
  "seed-sowing": ["seed-production"],
  irrigation: ["water-conservation"],
  nutrients: ["soil-health"],
  weeds: ["ipm", "safe-chemical-use"],
  "insect-pests": ["ipm", "safe-chemical-use"],
  diseases: ["ipm"],
  "harvest-storage": ["residue-management"],
  machinery: ["mechanisation", "residue-management"],
};

const ludhianaNote = l(
  "Sample district note for Ludhiana — local advice from the district will appear here.",
  "ਲੁਧਿਆਣਾ ਲਈ ਨਮੂਨਾ ਜ਼ਿਲ੍ਹਾ ਨੋਟ — ਜ਼ਿਲ੍ਹੇ ਦੀ ਸਥਾਨਕ ਸਲਾਹ ਇੱਥੇ ਆਵੇਗੀ।",
);

const reviewer = l("Name of PAU reviewer — to be added", "PAU ਸਮੀਖਿਅਕ ਦਾ ਨਾਂ — ਜੋੜਿਆ ਜਾਣਾ ਹੈ");

export const wheatGuides: OperationGuide[] = (["rabi-2026", "rabi-2025"] as const).flatMap((edition) =>
  Object.entries(blocks).map(([operation, b]) => ({
    crop: "wheat",
    operation,
    edition,
    blocks: b,
    districtNotes: (operation === "seed-sowing" || operation === "irrigation" ? { ludhiana: ludhianaNote } : {}) as Record<string, L>,
    topics: topicsFor[operation] ?? [],
    lastReviewed: edition === "rabi-2026" ? "2026-10-01" : "2025-10-01",
    reviewer,
    status: edition === "rabi-2026" ? ("published" as const) : ("archived" as const),
    sample: true,
  })),
);
