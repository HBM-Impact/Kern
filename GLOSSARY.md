# Glossary

Names for the modules that own a concept. Use these terms in code, commits and reviews.

- **Product route** — `apps/web/features/products/route.ts`. The one URL form for a product page (`/products/{category}/{id}-{slug}`): `productHref(product)` builds it, `parseProductId(segment)` reads it back. Every link, canonical, JSON-LD and sitemap entry derives from it.
- **Absolute URL** — `apps/web/lib/seo/absolute-url.ts`. `absoluteUrl({ href, locale })`: base URL + next-intl `getPathname`. The only way to build a fully-qualified URL.
- **Commerce catalog** — `packages/services/src/commerce`. Plain fetchers (`products/get-*.ts`, `categories/get-categories.ts`) for React Query; `*/cached.ts` holds the one server cache policy (`"use cache"; cacheLife("days")`). Server code imports `cached`. A missing product is `null`, not a thrown error.
- **Content operation** — `apps/web/lib/sanity/content.ts`. `getPage`, `getPageSlugs`, `getSiteSettings`, `getRouteMeta`. Each picks its fetch path (live and draft-aware, or published on a 5-minute timer) and its stega policy. Pages never import the client, `cachedSanity`, queries or `stegaClean`.
- **Logic field** — a CMS string that drives behaviour (href, API param, metadata) rather than being displayed. `getPage` returns logic fields stega-cleaned; display text keeps edit metadata.
- **Route head** — `apps/web/shell/RouteHead.tsx`. For pages whose copy lives in a `routeMeta` document: `routeMetadata(route)` for `generateMetadata`, `<RouteHead route>` for breadcrumbs + h1, `routeCrumb(route)` for an ancestor crumb labelled from its own route meta.
- **Product listing** — `apps/web/features/products/components/ProductListing.tsx`. A sortable, paginated product grid: owns the `sort` URL param (`useSort` in `sort-map.ts`), `PRODUCT_PAGE_SIZE`, paging and the prerendered first-page handoff. Category and search pages only supply the query.
