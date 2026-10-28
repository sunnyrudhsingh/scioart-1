/**
 * Package of Practices publications and their yearly editions.
 * To add a new year: add an edition, set isLatest: true on it and
 * isLatest: false on the previous one. Pages pick up the change.
 */
import { l, type Edition, type Publication } from "./schema";

const pau = l("Punjab Agricultural University, Ludhiana", "ਪੰਜਾਬ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ, ਲੁਧਿਆਣਾ");

export const publications: Publication[] = [
  {
    id: "rabi",
    title: l("Package of Practices for Crops of Punjab — Rabi", "ਪੰਜਾਬ ਦੀਆਂ ਫ਼ਸਲਾਂ ਲਈ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ — ਹਾੜ੍ਹੀ"),
    publisher: pau,
  },
  {
    id: "kharif",
    title: l("Package of Practices for Crops of Punjab — Kharif", "ਪੰਜਾਬ ਦੀਆਂ ਫ਼ਸਲਾਂ ਲਈ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ — ਸਾਉਣੀ"),
    publisher: pau,
  },
  { id: "fruits", title: l("Package of Practices for Cultivation of Fruits", "ਫਲਾਂ ਦੀ ਕਾਸ਼ਤ ਲਈ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ"), publisher: pau },
  {
    id: "vegetables",
    title: l("Package of Practices for Cultivation of Vegetables", "ਸਬਜ਼ੀਆਂ ਦੀ ਕਾਸ਼ਤ ਲਈ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ"),
    publisher: pau,
  },
  { id: "allied", title: l("Allied occupations — PAU recommendations", "ਸਹਾਇਕ ਧੰਦੇ — PAU ਦੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ"), publisher: pau },
];

const years = [2023, 2024, 2025, 2026];

const labelFor = (pub: string, year: number) => {
  if (pub === "rabi") return l(`Rabi ${year}–${String(year + 1).slice(2)}`, `ਹਾੜ੍ਹੀ ${year}–${String(year + 1).slice(2)}`);
  if (pub === "kharif") return l(`Kharif ${year}`, `ਸਾਉਣੀ ${year}`);
  return l(`${year} edition`, `${year} ਸੰਸਕਰਨ`);
};

export const editions: Edition[] = publications.flatMap((p) =>
  years.map((year) => ({
    id: `${p.id}-${year}`,
    publication: p.id,
    year,
    label: labelFor(p.id, year),
    isLatest: year === years[years.length - 1],
    // PDF links are added once PAU provides the files.
    file: "",
  })),
);
