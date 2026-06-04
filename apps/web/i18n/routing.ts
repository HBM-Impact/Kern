import { defineRouting } from "next-intl/routing";

export const routingConfig = {
  locales: ["en"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
  },
} as const;

export const routing = defineRouting(routingConfig);
