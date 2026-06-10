# Architecture

## Directory Structure

```
apps/web/                    # Next.js 16 app (App Router, React 19)
  app/                       # Routes — layouts, pages, loading, error boundaries
  app/[locale]/              # i18n routes (next-intl)
  i18n/                      # routing.ts, navigation.ts, request.ts
  public/                    # Static assets
apps/storybook/              # Storybook 10 + Vite
packages/ui/                 # Shared React components → @repo/ui
packages/services/           # Commerce API client → @repo/services
  src/commerce/              # products/, categories/, commerce-client.ts
packages/utils/              # Shared utilities → @repo/utils
  src/weak-key.ts            # WeakRef-based key helper
  src/time.ts                # Unit conversion helpers (secondsToMs, minutesToMs, etc.)
packages/typescript-config/  # Shared tsconfig bases (base, nextjs, react-library)
```

## Key Conventions

- All packages export from source — no build step (`"./*": "./src/*/index.ts"`)
- Import by specific path, never from a barrel: `@repo/ui/buttons`, `@repo/utils/time`
- Server Components by default; add `"use client"` only for hooks, forms, or interactivity
- Biome handles linting and formatting — queued on PostToolUse, applied on Stop
- TypeScript strict mode + `noUncheckedIndexedAccess` everywhere
- Key deps: `@tanstack/react-query`, `@tanstack/react-form`, `nuqs`, `usehooks-ts`, `ky`
