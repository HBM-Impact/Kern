# kern

Turborepo monorepo.

## Apps & Packages

- `apps/web` — [Next.js](https://nextjs.org/) app (App Router, React 19)
- `@repo/ui` — shared React component library consumed by `web`
- `@repo/typescript-config` — shared `tsconfig.json` bases

## Development

```sh
bun dev          # all apps
bun dev --filter=web  # single app
```

## Build & Checks

```sh
bun build        # build all apps
bun check-types  # TypeScript across all packages
bun lint         # Biome lint (via turbo)
bun format       # Biome format --write
bun check        # Biome lint + format check
```

## Tooling

- [Bun](https://bun.sh) — package manager
- [Turborepo](https://turborepo.dev) — task orchestration
- [Biome](https://biomejs.dev) — linting and formatting
- [TypeScript](https://www.typescriptlang.org/) — strict mode everywhere
