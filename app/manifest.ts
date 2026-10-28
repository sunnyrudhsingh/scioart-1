import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "SciOArt — ਖੇਤੀ ਗਿਆਨ / Farm knowledge",
    short_name: "SciOArt",
    description: "PAU-reviewed farm advice, games, songs and training kits in Punjabi and English.",
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
      { name: "ਫ਼ਸਲਾਂ / Crops", url: "/pa/crops" },
      { name: "ਫ਼ਸਲ ਕੈਲੰਡਰ / Calendar", url: "/pa/calendar" },
      { name: "ਮਾਹਿਰ ਨੂੰ ਪੁੱਛੋ / Ask an Expert", url: "/pa/ask" },
    ],
  };
}
