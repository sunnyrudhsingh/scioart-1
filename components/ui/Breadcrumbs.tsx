import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/site";

export type Crumb = { href?: string; label: string };

/** Breadcrumbs with matching BreadcrumbList structured data. */
export async function Breadcrumbs({ items, locale }: { items: Crumb[]; locale: string }) {
  const t = await getTranslations("common");
  const all: Crumb[] = [{ href: "/", label: t("home") }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}/${locale}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label={t("breadcrumb")} className="no-print pt-4">
      <ol className="t-small flex flex-wrap items-center gap-x-1 gap-y-1 text-muted">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-4 shrink-0 opacity-60 rtl:rotate-180" aria-hidden="true" />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="inline-flex min-h-8 items-center rounded hover:text-primary hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-text">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
