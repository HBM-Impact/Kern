# CLAUDE.md

## Commands

```bash
pnpm dev           # all apps (Turborepo)
pnpm build         # build all
pnpm lint          # biome check (via turbo)
pnpm format        # biome format --write .
pnpm check         # lint + format check
pnpm check-types   # tsc --noEmit all packages
cd apps/web && pnpm dev  # single app
```

## Package Manager

`pnpm` only. Never bun, npm, or yarn.

## Architecture

Turborepo monorepo:

- `apps/web` — Next.js 16, App Router, React 19
- `packages/ui` — shared components as `@repo/ui`
- `packages/typescript-config` — shared tsconfig bases

`packages/ui` exports from source, no build step. Import as `@repo/ui/button`, not from a barrel.

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

## React / Next.js

- No `useCallback`, `useMemo`, `React.memo` — React Compiler handles it
- No barrel files; one component per file
- No boolean props — use composition or variants
- Ternary not `&&` for conditional JSX
- No `forwardRef` — refs are plain props in React 19
- `Promise.all` for independent async ops
- Never pass `className` to custom components

## Skills

- `/review` — Next.js/React best practices review
- `/performance-review` — data locality, parallelism, caching, N+1 patterns
