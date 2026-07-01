// src/app/layout.js
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://asifistiaque.dev";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Asif Istiaque | Full-Stack Developer & Data Engineer",
    template: "%s | Asif Istiaque",
  },
  description:
    "Asif Istiaque is a Full-Stack Web Developer and Data Pipeline Engineer building high-performance web applications, scalable backend systems, and data-driven products that drive business growth.",
  keywords: [
    "Asif Istiaque",
    "Full Stack Developer",
    "Next.js Developer",
    "Data Engineer",
    "React Developer Portfolio",
    "Web Developer Bangladesh",
    "Firebase Developer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Asif Istiaque", url: SITE_URL }],
  creator: "Asif Istiaque",
  publisher: "Asif Istiaque",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Asif Istiaque | Full-Stack Developer & Data Engineer",
    description:
      "Building high-performance web apps & data pipelines that drive businesses. Explore projects, certifications, and get in touch.",
    siteName: "Asif Istiaque Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asif Istiaque — Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Istiaque | Full-Stack Developer & Data Engineer",
    description:
      "Building high-performance web apps & data pipelines that drive businesses.",
    images: ["/og-image.png"],
    creator: "@asifistiaque",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.json",
  category: "technology",
};

export const viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Asif Istiaque",
    url: SITE_URL,
    jobTitle: "Full-Stack Web Developer & Data Engineer",
    description:
      "Building high-performance web apps & data pipelines that drive businesses.",
    sameAs: [
      "https://github.com/",
      "https://linkedin.com/",
      "https://twitter.com/",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-slate-200 selection:bg-neon-green/30">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A2236",
              color: "#E2E8F0",
              border: "1px solid rgba(34,197,94,0.25)",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#22C55E", secondary: "#0F172A" } },
            error: { iconTheme: { primary: "#F97316", secondary: "#0F172A" } },
          }}
        />
        {children}
      </body>
    </html>
  );
}
