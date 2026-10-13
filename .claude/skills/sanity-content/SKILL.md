---
name: sanity-content
description: How this repo wires Sanity — Studio schema types in apps/studio, GROQ in lib/sanity/queries.ts, cachedSanity vs the plain client, TypeGen into sanity.types.ts, stega cleaning, draft mode, and the module union rendered by features/modules. Use when adding or changing a document type, module, GROQ query, or CMS-driven page, or when a Sanity value shows up with invisible edit metadata.
---

# Sanity content

Studio lives in `apps/studio`, consumption in `apps/web/lib/sanity` and `apps/web/features/modules`. Load the `sanity-best-practices` skill for general Sanity guidance; this covers the project-specific wiring.

## Studio

```
apps/studio/schema-types/
  documents/   page, route-meta, site-settings
  modules/     modules, hero-module, product-carousel-module
  objects/     block-content, external-link, nav-link
  index.ts     schemaTypes array — every new type gets registered here
structure.ts            desk structure
presentation/resolve.ts Presentation tool URL resolution
```

`apiVersion` in `lib/sanity/client.ts` is pinned to a date on purpose. Bumping it is a deliberate migration, not a routine update.

## Fetching

Two paths, chosen by whether the route needs draft previews:

- `cachedSanity` from `lib/sanity/live.ts` (`defineLive({ strict: true })`) — the `'use cache'` boundary, tagged for live updates. Used by CMS-driven pages. Strict means `perspective`/`stega` are always passed: resolve them with `getDynamicFetchOptions()` *outside* the cache (it reads `draftMode()`/`cookies()`), then spread them in.
- `client.fetch(...)` inside `'use cache'` + `cacheLife` — for routes that own their own URL and don't mount `<SanityLive />` (`route-meta.ts`, `site-settings.ts`), and uncached in `generateStaticParams`, where `client.withConfig({ useCdn: false })` avoids stale slugs.

`cacheComponents` is on and the root layout sets `ensureStatic = "navigation"`: any fetch outside `'use cache'` fails the build.

Queries all live in `lib/sanity/queries.ts`, written with `defineQuery` so TypeGen can pick them up. Never inline GROQ at a call site.

## Types

```bash
cd apps/studio && pnpm typegen   # sanity schemas extract --force && sanity typegen generate
```

Writes `apps/web/sanity.types.ts`. Never edit that file — change the schema or the query and regenerate. Import query result types from `@/sanity.types` (`PAGE_QUERY_RESULT`, `RouteMeta`, …) and derive from them rather than hand-writing shapes.

## Stega

`cachedSanity` with `stega: true` encodes edit metadata into every string. Anything used as more than display text — an href, a slug, an API param, a comparison — must go through `stegaClean` first. Pass `stega: false` for metadata fetches (`generateMetadata`). Types read through it are wrapped in `StegaBranded`, which is what `features/modules/types.ts` does.

## Modules

The module union is derived from the page query result, not declared by hand:

```ts
type Modules = NonNullable<NonNullable<StegaBranded<PAGE_QUERY_RESULT>>["modules"]>;
export type Module = Modules[number];
export type ModuleOf<T extends Module["_type"]> = Extract<Module, { _type: T }>;
```

`features/modules/components/Modules.tsx` switches on `_type` with an `unhandled(_module: never)` default, so a module added to the schema before the renderer knows about it renders nothing instead of crashing — and the `never` parameter turns the gap into a type error once the query is regenerated.

Adding a module: schema type in `apps/studio/schema-types/modules/` → register in `index.ts` and the `modules` array type → project its fields in `PAGE_QUERY` → `pnpm typegen` → component in `features/modules/components/` → `case` in `Modules.tsx`.

## Routing

The index and every CMS page share one catch-all route, `app/[locale]/(cms)/[[...slug]]/page.tsx`. No segment means `HOME_SLUG`; `PAGE_SLUGS_QUERY` excludes that slug and the route 404s on it, so the home page has exactly one URL. Nothing is nested, so any deeper path 404s there too.

Draft mode toggles through `app/api/draft-mode/enable|disable`, with `DisableDraftMode` in the shell.
