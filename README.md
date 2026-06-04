# Kern

Modern e-commerce storefront built with Next.js 16 and React 19 in a Turborepo monorepo.

Features product catalog, shopping cart, favorites, multi-language support, SEO schema, sitemap, and robots.txt — all statically typed with strict TypeScript.

## Apps & Packages

| Package | Description |
|---|---|
| `apps/web` | Next.js 16 storefront (App Router, React 19, i18n) |
| `@repo/services` | Commerce API client (products, categories) |
| `@repo/ui` | Shared React component library |
| `@repo/utils` | Shared utilities |
| `@repo/typescript-config` | Shared `tsconfig.json` bases |

## Getting Started

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```sh
pnpm dev          # start all apps (Turborepo)
pnpm build        # build all apps
pnpm check-types  # TypeScript across all packages
pnpm lint         # Biome lint (via turbo)
pnpm format       # Biome format --write
pnpm check        # Biome lint + format check
```

## Requirements

- Node.js ≥ 24
- pnpm 11

## Stack

- [Next.js 16](https://nextjs.org) — App Router, React Server Components
- [React 19](https://react.dev) — React Compiler enabled
- [next-intl](https://next-intl.dev) — i18n routing and translations
- [TanStack Query](https://tanstack.com/query) — server state management
- [Turborepo](https://turborepo.dev) — monorepo task orchestration
- [Biome](https://biomejs.dev) — linting and formatting
- [TypeScript](https://www.typescriptlang.org) — strict mode, `noUncheckedIndexedAccess`
