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
- `apps/storybook` — Storybook 10 + Vite for UI component development
- `packages/ui` — shared React components as `@repo/ui`
- `packages/services` — commerce API client as `@repo/services`
- `packages/utils` — shared utilities as `@repo/utils`
- `packages/typescript-config` — shared tsconfig bases

All packages export from source, no build step. Import by specific path, never from a barrel:

- `@repo/ui/buttons` → `packages/ui/src/buttons/index.ts` (dirs are kebab-case)
- `@repo/ui/spinner` → `packages/ui/src/Spinner.tsx` (specifiers stay kebab-case; files are PascalCase, mapped explicitly in `packages/ui/package.json` exports)
- `@repo/ui/tokens.stylex` → design tokens; must be imported from this exact path, never re-exported
- `@repo/services/commerce/products/get-products` → individual service file
- `@repo/utils/weak-key` → `packages/utils/src/weak-key.ts`
- `@repo/utils/time` → `packages/utils/src/time.ts` (unit conversion helpers: `secondsToMs`, `minutesToMs`, etc.)

`apps/web` uses `next-intl` for i18n. App Router routes live under `app/[locale]/`. Config in `i18n/` (routing, navigation, request).

Key dependencies: `@tanstack/react-query` (server/client data fetching), `@tanstack/react-form`, `nuqs` (URL state), `usehooks-ts`, `ky` (HTTP client).

## Styling

StyleX. No CSS Modules, no `clsx` — `stylex.props()` takes conditionals directly:

```tsx
const styles = stylex.create({ base: { color: colors.text }, active: { color: colors.accent } });
<div {...stylex.props(styles.base, isActive && styles.active)} />
```

- Tokens come from `@repo/ui/tokens.stylex`: `colors` (StyleX vars, carry the dark-mode media query), and `size`/`radius`/`border`/`font`/`ease` (compile-time consts wrapping open-props).
- Component files are PascalCase; a shared stylesheet for a component and its skeleton goes in a kebab-case folder named for the component, as `styles.ts`.
- Use longhands: `backgroundColor`, not `background`. StyleX refuses to compile some shorthands, and `propertyValidationMode: "throw"` is set in both Babel configs so it fails the build instead of dropping the rule silently. Gradients go in `backgroundImage`.
- StyleX cannot express descendant, child, or sibling combinators. Style only elements the component itself renders — if a rule needs to reach into a child, pass a prop or a variant instead.
- Global resets live in `packages/ui/src/globals.css` inside `@layer resets`, declared before `@stylex;`. That order matters: unlayered rules beat every layered rule regardless of specificity.
- Build wiring: `apps/web/babel.config.js` + `postcss.config.cjs`; Storybook uses `stylex-options.cjs` plus an inline Babel plugin in `.storybook/main.ts`. `rootDir` must match across both or class names will not line up.

## Linting & Formatting

Biome 2.x. Hooks queue edited files on PostToolUse, then run `biome check --write --unsafe` on Stop.

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
