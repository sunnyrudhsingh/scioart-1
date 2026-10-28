/** localStorage helpers that never throw (private mode, blocked storage, etc.). */
export function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStore(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export const KEYS = {
  district: "scioart-district",
  theme: "scioart-theme",
  recent: "scioart-recent-searches",
  weekCrop: "scioart-week-crop",
  sowing: "scioart-sowing-date",
  dismissed: "scioart-dismissed-alerts",
} as const;
