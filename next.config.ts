import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    // Store product shots come from the Colourfro Shopify CDN — same owner, and
    // it keeps product imagery in one place instead of forking copies into this
    // repo that go stale the moment the shop changes.
    remotePatterns: [
      { protocol: "https", hostname: "colourfro.com", pathname: "/cdn/shop/**" },
    ],
  },
  async headers() {
    return [
      {
        // Next serves everything in /public as `max-age=0, must-revalidate`.
        // For the 472-frame hero sequence that means every visit re-validates
        // 472 files before a single one can be drawn, so the scrub stutters
        // even for people who have already been here. The frames are content-
        // addressed by filename and only ever change as a whole new set, so
        // they can be cached permanently.
        source: "/hero-frames/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
