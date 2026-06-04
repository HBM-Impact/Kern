import { defineRouting } from "next-intl/routing";

export const routingConfig = {
  locales: ["en"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/cart": "/cart",
    "/favorites": "/favorites",
    "/products": "/products",
    "/products/search": "/products/search",
    "/products/[category]": "/products/[category]",
    "/products/[category]/[id]": "/products/[category]/[id]",
  },
} as const;

export const routing = defineRouting(routingConfig);
