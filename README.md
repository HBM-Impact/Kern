# kern

Turborepo monorepo.

## Apps & Packages

- `apps/web` — [Next.js](https://nextjs.org/) app (App Router, React 19)
- `@repo/ui` — shared React component library consumed by `web`
- `@repo/typescript-config` — shared `tsconfig.json` bases

## Development

```sh
pnpm dev          # all apps
pnpm dev --filter=web  # single app
```

## Build & Checks

```sh
pnpm build        # build all apps
pnpm check-types  # TypeScript across all packages
pnpm lint         # Biome lint (via turbo)
pnpm format       # Biome format --write
pnpm check        # Biome lint + format check
```

## Tooling

- [pnpm](https://pnpm.io) — package manager
- [Turborepo](https://turborepo.dev) — task orchestration
- [Biome](https://biomejs.dev) — linting and formatting
- [TypeScript](https://www.typescriptlang.org/) — strict mode everywhere
