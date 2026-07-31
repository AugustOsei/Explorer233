import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import ScrollNav from "./components/ScrollNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://explorer233.com"),
  title: "Explorer 233 — Ghana. Space. Now.",
  description: "A private Ghanaian space agency. Are you ready to be an Explorer? Join the mission — going live August 3, 2026.",
  openGraph: {
    title: "Explorer 233 — Ghana. Space. Now.",
    description: "Are you curious? Are you ready to be an Explorer? Going live August 3, 2026.",
    images: [{ url: "/explorer.png", width: 1200, height: 630, alt: "Explorer 233 — A Private Ghanaian Space Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explorer 233 — Ghana. Space. Now.",
    description: "Are you curious? Are you ready to be an Explorer? Going live August 3, 2026.",
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
        <ScrollNav />
        {children}
      </body>
    </html>
  );
}
