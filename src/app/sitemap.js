// src/app/sitemap.js
export default function sitemap() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://asifistiaque.dev";

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
