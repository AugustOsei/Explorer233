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
};

export default nextConfig;
