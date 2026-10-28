import { routing } from "@/i18n/routing";
import { buildSearchIndex } from "@/lib/search-index";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Static JSON index for the in-browser search (loaded only on the search page). */
export async function GET(_req: Request, { params }: RouteContext<"/search-index/[locale]">) {
  const { locale } = await params;
  return Response.json(buildSearchIndex(locale), {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
