Review current code changes for performance issues.

## Instructions

### Step 1: Identify Changed Files

Run `git diff --name-only HEAD` and `git diff --cached --name-only`. Combine, deduplicate. Filter to `.ts`, `.tsx`, `.js`, `.jsx` only.

If none found, tell user and stop.

### Step 2: Check Each File

For each file, read contents and check against these principles:

**Data Locality**
- State, handlers, queries colocated with the component that uses them
- Related API calls in the same query file — no scattered dependencies
- API responses normalized into flat `Record<id, T>` maps — no deeply nested structures

**Parallelism & Bulk Operations**
- Never `await` sequentially when requests are independent — use `Promise.all`
- Multiple `useSuspenseQuery` calls in same component to trigger parallel requests
- No N+1 patterns in server components or loaders

**Work Ahead of Time**
- Routes prefetched with `<Link prefetch>` where appropriate
- Queries prefetched with `queryClient.prefetchQuery` in server components
- SSG (`generateStaticParams`) / ISR (`revalidate`) for non-per-request content

**Caching**
- Appropriate `staleTime` set in TanStack Query for stable data
- `next.revalidate` / `next.tags` used for fetch cache control
- `useMemo` only for genuinely expensive derivations — React Compiler handles most memoization

**Data Structures**
- `Map` / `Set` for O(1) lookups instead of `Array.find` / `Array.includes` in hot paths
- Flat arrays of data over arrays of IDs requiring secondary lookups

**Unnecessary Work**
- No transformations that can be deferred to render time
- No optimization without profiling evidence

### Step 3: Report Findings

For each file with issues:

```
## `path/to/file.tsx`
- **principle**: Issue description
  > Problematic code snippet
  Fix: What to do instead
```

Skip files with no findings.

### Step 4: Summary

- Total files reviewed
- Total issues found
- Top 2 most impactful fixes
