# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev           # run all apps in dev mode (Turborepo)
bun build         # build all apps
bun lint          # biome check across all packages (via turbo)
bun format        # biome format --write .
bun check         # biome check . (lint + format check)
bun check-types   # tsc --noEmit across all packages
```

Run a single app:
```bash
cd apps/web && bun dev
```

## Package Manager

Always use `bun`. Never `npm`, `pnpm`, or `yarn`.

## Architecture

Turborepo monorepo:

- `apps/web` — Next.js 16 app (App Router, React 19)
- `packages/ui` — shared React components, consumed as `@repo/ui`
- `packages/typescript-config` — shared `tsconfig` bases (`base.json`, `nextjs.json`, `react-library.json`)

`packages/ui` exports directly from source (`"./button": "./src/button.tsx"`) — no build step. Import as `@repo/ui/button`, not from a barrel.

## Linting & Formatting

Biome 2.x handles both. Config in `biome.json` at root with `next` and `react` domains enabled.

A PostToolUse hook auto-runs `biome check --write --unsafe` on any file Claude edits — no need to manually format after edits.

## TypeScript Conventions

- `strict: true` + `noUncheckedIndexedAccess: true` everywhere
- Prefer `unknown` over `any`
- Use `satisfies` over `as` for type assertions
- Derive types from values (`typeof`, `[number]`, utility types) — don't duplicate
- Model impossible states with discriminated unions + exhaustive `never` checks
- `as const` for config objects and constant arrays
- Validate external/API data with Zod at runtime boundaries
- No `enum` — use `as const` unions instead

## React / Next.js Conventions

- No `useCallback`, `useMemo`, or `React.memo` — React Compiler handles memoization
- No barrel files — import directly from source file
- One component per file
- No boolean props to customize behavior — use composition or variants
- Use ternary (`condition ? <A /> : <B />`) not `&&` for conditional JSX
- No `forwardRef` in React 19 — refs are plain props
- Independent async operations use `Promise.all`, never sequential `await`
- Never pass `className` as a prop to custom components

## Custom Commands

- `/review` — reviews changed files against Next.js/React best practices and project conventions
- `/performance-review` — checks changed files for data locality, parallelism, caching, and N+1 patterns
