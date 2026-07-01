// src/app/robots.js
export default function robots() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://asifistiaque.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
