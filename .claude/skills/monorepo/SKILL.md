---
name: monorepo
description: Turborepo workspace conventions — where code goes across apps/web, apps/storybook, apps/studio and packages/ui, services, utils, typescript-config; the explicit exports map and kebab-case import specifiers; pnpm catalog dependency management with the 3-day age gate; and the pattern for adding a UI component or a commerce service. Use when adding a file, package, dependency, or export, when an import path fails to resolve, or when bumping versions.
---

# Monorepo

Turborepo + pnpm workspaces. Node >= 24, pnpm only — never npm, yarn, or bun.

```
apps/web         Next.js 16, App Router, React 19, React Compiler
apps/storybook   Storybook 10 + Vite
apps/studio      Sanity Studio (schema types, structure, presentation)
packages/ui      @repo/ui        shared components + design tokens
packages/services @repo/services commerce API client
packages/utils   @repo/utils     shared helpers (time, weak-key)
packages/typescript-config       shared tsconfig bases
```

## Imports

Every package exports from source — no build step. Import by specific path, never a barrel.

| Specifier | Resolves to |
|---|---|
| `@repo/ui/buttons` | `packages/ui/src/buttons/index.ts` |
| `@repo/ui/spinner` | `packages/ui/src/Spinner.tsx` |
| `@repo/ui/form/text-area` | `packages/ui/src/form/TextArea.tsx` |
| `@repo/ui/tokens.stylex` | design tokens — import from this exact path, never re-export |
| `@repo/services/commerce/products/get-products` | one service, one file |
| `@repo/utils/time` | `packages/utils/src/time.ts` |

Specifiers stay kebab-case while files stay PascalCase, so `packages/ui/package.json` carries an **explicit exports map** — one entry per component. Adding a component means adding its entry; a missing entry is the usual cause of an unresolved `@repo/ui/*` import.

Inside `apps/web`, use the `@/` alias (`@/lib/sanity/client`, `@/features/modules/types`).

## Where code goes in apps/web

```
app/[locale]/       routes (next-intl); co-located UI in _components/
shell/              layout chrome — Header, Footer, Providers, Breadcrumbs
primitives/         thin wrappers over lower-level libs (link/ — the only allowed link sources)
features/<name>/    feature logic + components/
lib/<domain>/       non-React domain code (sanity/, seo/, slug/)
i18n/               routing.ts, navigation.ts, request.ts
```

Promote to `packages/ui` only when a second app needs it. Something used by one route stays in that route's `_components/`.

## Adding a UI component

1. `packages/ui/src/Thing.tsx` (PascalCase), or a kebab-case folder with `styles.ts` if the sheet is shared.
2. Add `"./thing": "./src/Thing.tsx"` to the exports map.
3. Story in `apps/storybook` if it has visual variants.

See the `stylex` skill for the styling rules.

## Adding a commerce service

One exported async function per file under `packages/services/src/commerce/<domain>/<verb-noun>.ts`:

```ts
type Args = { signal?: AbortSignal; limit: number };

export async function getThings({ signal, limit }: Args) {
  return commerceClient
    .get("things", { signal, searchParams: { limit }, next: { revalidate: hoursToSeconds(24), tags: ["things"] } })
    .json<ThingResponse>();
}
```

Always a single `Args` object with optional `signal`, `ky` via the shared `commerceClient`, response type from `commerce-types.ts`, and a `next.revalidate` built from `@repo/utils/time` helpers plus cache `tags` (honoured by the client-side fetches). Services are shared with client components, so they can't carry `'use cache'` — server callers in `apps/web` wrap them in `'use cache'` + `cacheLife("days")` at the page or component.

## Dependencies

Every shared version lives in the `catalog:` block of `pnpm-workspace.yaml`; package.json files reference `"catalog:"`. Bump the catalog, not the individual packages.

`minimumReleaseAge: 4320` (3 days) blocks freshly published versions — a supply-chain guard that stays on. `minimumReleaseAgeExclude` waives it for `next` and `@next/*` only; do not extend that list without a reason worth writing down.

```bash
pnpm outdated -r              # what moved
pnpm update -r --latest       # rewrites the catalog + lockfile
pnpm check-types && pnpm build
```

Majors get bumped deliberately, one at a time — `@babel/core` is pinned to 7 because the StyleX plugin chain expects it.

## Commands

```bash
pnpm dev / build / lint / format / check / check-types   # all via turbo
cd apps/web && pnpm dev                                   # single app
```

Biome 2.x handles lint and format; hooks queue edited files on PostToolUse and run `biome check --write --unsafe` on Stop. Bumping Biome means bumping the `$schema` version in `biome.json` to match.
