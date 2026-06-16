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
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["business", "technology", "productivity"],
    lang: "en",
  };
}
