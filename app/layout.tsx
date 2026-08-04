import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import SiteNav from "./components/SiteNav";
import HashScrollFix from "./components/HashScrollFix";
import { SITE_DESCRIPTION, SITE_URL } from "../lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://explorer233.com"),
  title: "Explorer 233 — An African Science-Fiction Saga",
  description: SITE_DESCRIPTION,
  applicationName: "Explorer 233",
  authors: [{ name: "August Peekay", url: "/about" }],
  creator: "August Peekay",
  publisher: "Explorer 233",
  category: "entertainment",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Explorer 233 — An African Science-Fiction Saga",
    description: "Signals are reaching Earth. Explorer 233 was created in Ghana to find their senders. Read Dispatch One free.",
    images: [{ url: "/explorer.png", width: 1200, height: 630, alt: "Explorer 233 — An African science-fiction universe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explorer 233 — An African Science-Fiction Saga",
    description: "Signals are reaching Earth. Explorer 233 was created in Ghana to find their senders. Read Dispatch One free.",
    images: ["/explorer.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Explorer 233",
        alternateName: "Explorer 233 African science-fiction saga",
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Explorer 233",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-emblem.png`,
        },
        description: "An African science-fiction story franchise created in Ghana by August Peekay.",
        founder: { "@id": `${SITE_URL}/#august-peekay` },
        sameAs: [
          "https://www.instagram.com/explorer.233/",
          "https://www.tiktok.com/explorer233",
          "https://linkedin.com/company/explorer-233",
          "https://www.facebook.com/explorer233/",
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#august-peekay`,
        name: "August Peekay",
        url: `${SITE_URL}/about`,
        jobTitle: "Creator of Explorer 233",
        worksFor: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V1J9NQE6JH"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V1J9NQE6JH');
        `}</Script>
        <SmoothScroll />
        <HashScrollFix />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
