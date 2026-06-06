# React / Next.js

- No `useCallback`, `useMemo`, `React.memo` — React Compiler handles it
- No barrel files; one component per file
- No boolean props — use composition or variants
- Ternary not `&&` for conditional JSX
- No `forwardRef` — refs are plain props in React 19
- `Promise.all` for independent async ops
- Never pass `className` to custom components

# Links

Only three link sources allowed:

| Import | Use for |
|---|---|
| `Link` from `@/primitives/link` | Internal navigation links (with UI styles) |
| `LinkButton` from `@/primitives/link` | Internal navigation styled as button |
| `BareLink` from `@/primitives/link` | Internal navigation without UI styles (image wrappers, custom-styled anchors) |

Never import `Link` from `@repo/ui/link`, `LinkButton` from `@repo/ui/buttons`, `IntlLink` from `@/i18n/navigation`, or `Link` from `next/link` directly. The primitives wrap these with `prefetch={false}` and locale-aware routing — bypassing them breaks i18n.

Exceptions: raw `<a>` for anchor-only navigation (e.g. skip links), `router.push()` for programmatic navigation after form submission.
