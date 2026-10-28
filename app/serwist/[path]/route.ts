import { createSerwistRoute } from "@serwist/turbopack";

// Builds and serves the service worker at /serwist/sw.js (offline support).
export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
  swSrc: "app/sw.ts",
  useNativeEsbuild: true,
  // Downloads and photos are cached when someone opens them, not on the first
  // visit: kits and audio can be large, and many farmers are on mobile data.
  manifestTransforms: [
    async (entries) => ({
      manifest: entries.filter((e) => !/^public\/(samples|images|kits|audio)\//.test(e.url)),
      warnings: [],
    }),
  ],
  additionalPrecacheEntries: [
    { url: "/pa/offline", revision: "1" },
    { url: "/en/offline", revision: "1" },
  ],
});
