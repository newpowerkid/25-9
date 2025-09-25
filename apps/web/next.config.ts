import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import "~/lib/env";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/api", "@repo/auth", "@repo/db"],

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  poweredByHeader: false,

  devIndicators: {
    position: "bottom-left",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          //{
            //key: "Content-Security-Policy",
            //value: "default-src 'self'; script-src 'self' 'unsafe-inline'",
          //},
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
