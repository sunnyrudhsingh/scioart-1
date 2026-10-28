/** Site sections, in navigation order. Labels are message keys in the "nav" namespace. */
export const primaryNav = [
  { href: "/crops", key: "crops" },
  { href: "/topics", key: "topics" },
  { href: "/calendar", key: "calendarShort" },
  { href: "/learn", key: "learn" },
  { href: "/extension", key: "extensionShort" },
  { href: "/advisories", key: "advisoriesShort" },
] as const;

export const moreNav = [
  { href: "/resources", key: "resources" },
  { href: "/ask", key: "ask" },
  { href: "/about", key: "about" },
] as const;

export const mobileMoreNav = [
  { href: "/topics", key: "topics" },
  { href: "/extension", key: "extension" },
  { href: "/advisories", key: "advisories" },
  { href: "/resources", key: "resources" },
  { href: "/ask", key: "ask" },
  { href: "/about", key: "about" },
  { href: "/search", key: "search" },
] as const;

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
