import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import SiteNav from "./components/SiteNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://explorer233.com"),
  title: "Explorer 233 — We Are Here",
  description: "An original African science-fiction universe. Monthly dispatches, a world to explore, and a story that keeps arriving.",
  openGraph: {
    title: "Explorer 233 — We Are Here",
    description: "In 2047 dozens of nearby stars sent the same three words. Ghana answered. Read Dispatch One.",
    images: [{ url: "/explorer.png", width: 1200, height: 630, alt: "Explorer 233 — An African science-fiction universe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explorer 233 — We Are Here",
    description: "In 2047 dozens of nearby stars sent the same three words. Ghana answered. Read Dispatch One.",
    images: ["/explorer.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
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
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
