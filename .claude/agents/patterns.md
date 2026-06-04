# Patterns

## Code Style

- Early returns to reduce nesting
- No `useCallback`, `useMemo`, or `React.memo` — React Compiler handles memoization
- No barrel files (`index.ts`) — import directly from source

## Colors

- Never hardcode color values — always use CSS variables from `globals.css`

## Components

- One component per file
- No boolean props to customize behavior — use composition or variants instead
- No `className` prop on custom components
- Use ternary (`condition ? <A /> : <B />`) not `&&` for conditional JSX
- No `forwardRef` in React 19 — refs are plain props
- Explicit `type="button"` on all `<button>` elements

## Data Fetching

- Independent async operations: `Promise.all`, never sequential `await`
- No N+1 patterns in Server Components

## TypeScript

See `.claude/skills/typescript.md` for full patterns. Key rules:

- `satisfies` over `as` for type assertions
- Discriminated unions for impossible states with exhaustive `never` checks
- Derive types from values — no duplication
- `as const` for config objects and constant arrays
- Zod for runtime validation of external/API data
- No `enum` — use `as const` unions
