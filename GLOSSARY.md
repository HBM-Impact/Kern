# Glossary

Names for the modules that own a concept. Use these terms in code, commits and reviews.

- **Product route** — `apps/web/features/products/route.ts`. The one URL form for a product page (`/products/{category}/{id}-{slug}`): `productHref(product)` builds it, `parseProductId(segment)` reads it back. Every link, canonical, JSON-LD and sitemap entry derives from it.
- **Absolute URL** — `apps/web/lib/seo/absolute-url.ts`. `absoluteUrl({ href, locale })`: base URL + next-intl `getPathname`. The only way to build a fully-qualified URL.
