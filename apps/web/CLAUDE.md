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
| `ExternalLink` from `@/primitives/link` | External links (non-`IntlLink`, plain `<a>` with UI styles) |

Never import `Link` from `@repo/ui/link`, `LinkButton` from `@repo/ui/buttons`, `IntlLink` from `@/i18n/navigation`, or `Link` from `next/link` directly. The primitives wrap these with locale-aware routing — bypassing them breaks i18n. Prefetch is left at Next's default: every route is prerendered, so prefetches are cheap CDN hits.

Exceptions: raw `<a>` for anchor-only navigation (e.g. skip links), `router.push()` for programmatic navigation after form submission.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
