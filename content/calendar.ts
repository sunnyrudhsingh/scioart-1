/**
 * SAMPLE crop calendar for wheat (weeks counted from sowing).
 * The week ranges below only demonstrate the layout. Replace every task
 * and every week range with the timings in the official Package of Practices.
 */
import { l, type CalendarTask } from "./schema";

const note = l(
  "Sample task. The exact timing will come from the official Package of Practices.",
  "ਨਮੂਨਾ ਕੰਮ। ਸਹੀ ਸਮਾਂ ਅਧਿਕਾਰਤ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਤੋਂ ਲਿਆ ਜਾਵੇਗਾ।",
);

const t = (operation: string, weekStart: number, weekEnd: number, en: string, pa: string): CalendarTask => ({
  crop: "wheat",
  operation,
  weekStart,
  weekEnd,
  title: l(en, pa),
  description: note,
});

export const calendarTasks: CalendarTask[] = [
  t("land-preparation", 0, 0, "Prepare and level the field", "ਖੇਤ ਤਿਆਰ ਅਤੇ ਪੱਧਰਾ ਕਰੋ"),
  t("varieties", 0, 0, "Confirm your variety and certified seed", "ਆਪਣੀ ਕਿਸਮ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਬੀਜ ਪੱਕਾ ਕਰੋ"),
  t("seed-sowing", 0, 0, "Treat seed and sow", "ਬੀਜ ਸੋਧੋ ਅਤੇ ਬਿਜਾਈ ਕਰੋ"),
  t("weeds", 1, 2, "Check germination and early weeds", "ਜੰਮ ਅਤੇ ਸ਼ੁਰੂਆਤੀ ਨਦੀਨਾਂ ਦੀ ਜਾਂਚ ਕਰੋ"),
  t("irrigation", 3, 4, "First irrigation window", "ਪਹਿਲੇ ਪਾਣੀ ਦਾ ਸਮਾਂ"),
  t("nutrients", 3, 5, "Top-dressing of fertiliser", "ਖਾਦ ਦੀ ਉੱਪਰਲੀ ਪਾਈ"),
  t("weeds", 4, 6, "Weed control window", "ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ ਦਾ ਸਮਾਂ"),
  t("insect-pests", 6, 14, "Weekly pest scouting", "ਹਫ਼ਤਾਵਾਰੀ ਕੀੜਿਆਂ ਦਾ ਸਰਵੇਖਣ"),
  t("irrigation", 7, 16, "Later irrigations", "ਅਗਲੇ ਪਾਣੀ"),
  t("diseases", 8, 16, "Watch for disease symptoms", "ਬਿਮਾਰੀਆਂ ਦੀਆਂ ਨਿਸ਼ਾਨੀਆਂ 'ਤੇ ਨਜ਼ਰ ਰੱਖੋ"),
  t("machinery", 17, 19, "Service harvesting machinery", "ਵਾਢੀ ਦੀ ਮਸ਼ੀਨਰੀ ਦੀ ਸਰਵਿਸ ਕਰਵਾਓ"),
  t("harvest-storage", 18, 20, "Check signs of maturity", "ਪੱਕਣ ਦੀਆਂ ਨਿਸ਼ਾਨੀਆਂ ਦੇਖੋ"),
  t("harvest-storage", 20, 22, "Harvest, thresh and store", "ਵਾਢੀ, ਗਹਾਈ ਅਤੇ ਭੰਡਾਰਨ"),
];
