# Architecture

## Directory Structure

```
apps/web/                    # Next.js 16 app (App Router, React 19)
  app/                       # Routes — layouts, pages, loading, error boundaries
  public/                    # Static assets
packages/ui/                 # Shared React components → @repo/ui
packages/typescript-config/  # Shared tsconfig bases (base, nextjs, react-library)
```

## Key Conventions

- `@repo/ui` exports directly from source — no build step (`"./button": "./src/button.tsx"`)
- Import as `@repo/ui/button`, never from a barrel
- Server Components by default; add `"use client"` only for hooks, forms, or interactivity
- Biome (not ESLint/Prettier) handles linting and formatting — auto-applied via PostToolUse hook
- TypeScript strict mode + `noUncheckedIndexedAccess` everywhere
