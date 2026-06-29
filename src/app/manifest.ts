import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucky Block Rush Calculator",
    short_name: "Lucky Block ",
    description: "Tool-first Roblox hub for Lucky Block Rush with codes, calculators, and strategy pages.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1108",
    theme_color: "#11160a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/app-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
