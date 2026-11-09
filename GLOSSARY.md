# Glossary

Names for the modules that own a concept. Use these terms in code, commits and reviews.

- **Product route** — `apps/web/features/products/route.ts`. The one URL form for a product page (`/products/{category}/{id}-{slug}`): `productHref(product)` builds it, `parseProductId(segment)` reads it back. Every link, canonical, JSON-LD and sitemap entry derives from it.
- **Absolute URL** — `apps/web/lib/seo/absolute-url.ts`. `absoluteUrl({ href, locale })`: base URL + next-intl `getPathname`. The only way to build a fully-qualified URL.
- **Commerce catalog** — `packages/services/src/commerce`. Plain fetchers (`products/get-*.ts`, `categories/get-categories.ts`) for React Query; `*/cached.ts` holds the one server cache policy (`"use cache"; cacheLife("days")`). Server code imports `cached`. A missing product is `null`, not a thrown error.
