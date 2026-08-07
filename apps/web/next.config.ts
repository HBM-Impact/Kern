import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { routing } from "./i18n/routing";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
    // Prerendering every product hammers the commerce API hard enough to trip
    // its rate limiter. One worker, two pages at a time, retry the stragglers.
    staticGenerationMinPagesPerWorker: 500,
    staticGenerationMaxConcurrency: 2,
    staticGenerationRetryCount: 3,
  },
  images: {
    qualities: [75],
    remotePatterns: [{ protocol: "https", hostname: "cdn.dummyjson.com" }],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
    imageSizes: [64, 96, 128, 256],
  },
  // Replaces a middleware invocation on every request. Locale comes from the
  // route segment (see i18n/request.ts), so the only thing negotiation ever did
  // was redirect "/" — which a static routing rule does for free.
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${routing.defaultLocale}`,
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles so it wins over the prerendered page at the same URL.
      beforeFiles: [
        {
          source: "/:path*",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/api/markdown/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              '</sitemap.xml>; rel="sitemap", </.well-known/api-catalog>; rel="api-catalog"',
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
