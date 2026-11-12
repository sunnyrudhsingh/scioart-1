/** Site sections, in navigation order. Labels are message keys in the "nav" namespace. */
export const primaryNav = [
  { href: "/library", key: "library" },
  { href: "/live", key: "live" },
  { href: "/crops", key: "crops" },
  { href: "/topics", key: "topics" },
] as const;

export const moreNav = [
  { href: "/resources", key: "resources" },
  { href: "/about", key: "about" },
] as const;

/** A library section, passed in from the server with its label already translated. */
export type SectionLink = { href: string; label: string };

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
