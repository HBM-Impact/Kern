# CLAUDE.md

## Philosophy

Consistency, strong types, less is more. Match existing patterns exactly — same file structure, same naming, same abstractions. No new patterns without reason. No duplicate types. No code that doesn't need to exist.

## Commands

```bash
pnpm dev           # all apps (Turborepo)
pnpm build         # build all
pnpm lint          # biome check (via turbo)
pnpm format        # biome check --write --unsafe (format + sort imports)
pnpm check         # lint + format check
pnpm check-types   # tsc --noEmit all packages
cd apps/web && pnpm dev  # single app
```

## Package Manager

`pnpm` only. Never bun, npm, or yarn.

## Architecture

Turborepo monorepo:

- `apps/web` — Next.js 16, App Router, React 19, React Compiler enabled
- `packages/ui` — shared React components as `@repo/ui`
- `packages/services` — commerce API client as `@repo/services`
- `packages/utils` — shared utilities as `@repo/utils`
- `packages/typescript-config` — shared tsconfig bases

All packages export from source, no build step. Import by specific path, never from a barrel:

- `@repo/ui/buttons` → `packages/ui/src/buttons/index.ts` (dirs are kebab-case)
- `@repo/services/commerce/products/get-products` → individual service file
- `@repo/utils/weak-key` → `packages/utils/src/weak-key.ts`

`apps/web` uses `next-intl` for i18n. App Router routes live under `app/[locale]/`. Config in `i18n/` (routing, navigation, request).

## Linting & Formatting

Biome 2.x. PostToolUse hook auto-runs `biome check --write --unsafe` on edited files.

## TypeScript

- `strict: true` + `noUncheckedIndexedAccess: true`
- `unknown` over `any`; `satisfies` over `as`
- Derive types from values — don't duplicate
- Discriminated unions + exhaustive `never` checks
- `as const` for configs and constant arrays
- Zod at runtime boundaries
- No `enum` — use `as const` unions

## Skills

- `/review` — Next.js/React best practices review
- `/performance-review` — data locality, parallelism, caching, N+1 patterns
