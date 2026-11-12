import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "SciOArt — ਵਿਗਿਆਨ ਤੇ ਕਲਾ / Science and art",
    short_name: "SciOArt",
    description: "Films, songs, plays, games and books about farming in Punjab, in Punjabi and English.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbf7ef",
    theme_color: "#1f5e3b",
    lang: "pa",
    categories: ["education", "agriculture"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcuts: [
      { name: "ਲਾਇਬ੍ਰੇਰੀ / Library", url: "/pa/library" },
      { name: "ਲਾਈਵ / Live", url: "/pa/live" },
      { name: "ਫ਼ਸਲਾਂ / Crops", url: "/pa/crops" },
    ],
  };
}
