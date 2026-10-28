/** Date maths for the crop calendar (all in local dates, ISO YYYY-MM-DD). */

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function toISO(d: Date): string {
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/** Week number since sowing (week 0 = sowing week). Negative = before sowing. */
export function weekSinceSowing(sowingISO: string, today = new Date()): number {
  const days = daysBetween(parseISO(sowingISO), new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  return Math.floor(days / 7);
}

export function addDays(iso: string, days: number) {
  const d = parseISO(iso);
  d.setDate(d.getDate() + days);
  return toISO(d);
}
