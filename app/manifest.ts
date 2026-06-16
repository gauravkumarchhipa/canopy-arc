import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Canopy Arc — Digital Solutions",
    short_name: "Canopy Arc",
    description:
      "Enterprise-grade web, mobile, cloud, and AI solutions. Scalable, secure, and future-ready products.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050b18",
    theme_color: "#050b18",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "technology", "productivity"],
    lang: "en",
  };
}
