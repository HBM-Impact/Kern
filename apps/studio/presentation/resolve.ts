import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

// next-intl prefixes every route with a locale segment. `en` is the only one
// in apps/web/i18n/routing.ts today; add a lookup here when a second locale
// lands.
const locale = "en";

// Mirrors HOME_SLUG in apps/web/lib/sanity/queries.ts — the studio cannot
// import from the web app.
const homeSlug = "home";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    siteSettings: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Home", href: `/${locale}` }] }),
    }),
    routeMeta: defineLocations({
      select: { title: "title", route: "route" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ?? "Untitled",
            href: `/${locale}${doc?.route}`,
          },
        ],
      }),
    }),
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ?? "Untitled",
            href:
              doc?.slug === homeSlug ? `/${locale}` : `/${locale}/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
};
