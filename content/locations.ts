/**
 * Locations: country → state → district. California is listed as
 * "coming soon" until its content layer is added.
 */
import { l, type Location } from "./schema";

const d = (slug: string, en: string, pa: string): Location => ({
  slug,
  kind: "district",
  name: l(en, pa),
  parent: "punjab",
  comingSoon: false,
});

export const locations: Location[] = [
  { slug: "india", kind: "country", name: l("India", "ਭਾਰਤ"), parent: null, comingSoon: false },
  { slug: "punjab", kind: "state", name: l("Punjab", "ਪੰਜਾਬ"), parent: "india", comingSoon: false },
  d("amritsar", "Amritsar", "ਅੰਮ੍ਰਿਤਸਰ"),
  d("barnala", "Barnala", "ਬਰਨਾਲਾ"),
  d("bathinda", "Bathinda", "ਬਠਿੰਡਾ"),
  d("faridkot", "Faridkot", "ਫ਼ਰੀਦਕੋਟ"),
  d("fatehgarh-sahib", "Fatehgarh Sahib", "ਫ਼ਤਹਿਗੜ੍ਹ ਸਾਹਿਬ"),
  d("fazilka", "Fazilka", "ਫ਼ਾਜ਼ਿਲਕਾ"),
  d("ferozepur", "Ferozepur", "ਫ਼ਿਰੋਜ਼ਪੁਰ"),
  d("gurdaspur", "Gurdaspur", "ਗੁਰਦਾਸਪੁਰ"),
  d("hoshiarpur", "Hoshiarpur", "ਹੁਸ਼ਿਆਰਪੁਰ"),
  d("jalandhar", "Jalandhar", "ਜਲੰਧਰ"),
  d("kapurthala", "Kapurthala", "ਕਪੂਰਥਲਾ"),
  d("ludhiana", "Ludhiana", "ਲੁਧਿਆਣਾ"),
  d("malerkotla", "Malerkotla", "ਮਲੇਰਕੋਟਲਾ"),
  d("mansa", "Mansa", "ਮਾਨਸਾ"),
  d("moga", "Moga", "ਮੋਗਾ"),
  d("pathankot", "Pathankot", "ਪਠਾਨਕੋਟ"),
  d("patiala", "Patiala", "ਪਟਿਆਲਾ"),
  d("rupnagar", "Rupnagar", "ਰੂਪਨਗਰ"),
  d("sas-nagar", "SAS Nagar (Mohali)", "ਐੱਸ.ਏ.ਐੱਸ. ਨਗਰ (ਮੋਹਾਲੀ)"),
  d("sangrur", "Sangrur", "ਸੰਗਰੂਰ"),
  d("sbs-nagar", "SBS Nagar (Nawanshahr)", "ਐੱਸ.ਬੀ.ਐੱਸ. ਨਗਰ (ਨਵਾਂਸ਼ਹਿਰ)"),
  d("sri-muktsar-sahib", "Sri Muktsar Sahib", "ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ"),
  d("tarn-taran", "Tarn Taran", "ਤਰਨ ਤਾਰਨ"),
  { slug: "usa", kind: "country", name: l("United States", "ਅਮਰੀਕਾ"), parent: null, comingSoon: true },
  { slug: "california", kind: "state", name: l("California", "ਕੈਲੀਫ਼ੋਰਨੀਆ"), parent: "usa", comingSoon: true },
];
