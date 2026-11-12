export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://scioart.co.in").replace(/\/$/, "");

export const SITE_NAME = "SciOArt";

export const CONTACT_EMAIL = "hello@scioart.co.in";

/**
 * The site's colour palette, defined in app/globals.css:
 * "phulkari" (maroon, gold, magenta), "truck" (navy, turquoise, pink, yellow)
 * or "sarson" (indigo and mustard yellow).
 */
export const PALETTE: "phulkari" | "truck" | "sarson" = "phulkari";
