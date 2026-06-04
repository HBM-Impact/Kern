Review all changed files against the Next.js and React best practices defined in this project.

## Instructions

Follow these steps exactly:

### Step 1: Identify Changed Files

Run `git diff --name-only HEAD` for unstaged changes and `git diff --cached --name-only` for staged changes. Combine both lists, deduplicating. If there are no changes against HEAD, compare against the `main` branch using `git diff --name-only main...HEAD`.

Only review files matching: `.ts`, `.tsx`, `.js`, `.jsx`.

If no reviewable files are found, tell the user and stop.

### Step 2: Load Best Practice Rules

Read the following rule sources in full:

1. **Project Patterns** — `.claude/agents/patterns.md`
2. **Project Architecture** — `.claude/agents/architecture.md`
3. **Performance Principles** — `.claude/commands/performance-review.md` (Step 2 rules only)
4. **TypeScript Patterns** — `.claude/skills/typescript.md`

### Step 3: Review Each File

For each changed file:

1. Read the file contents
2. Check it against **all applicable rules** from the loaded sources
3. Categorize each finding by severity:
   - **Critical** — Violations of CRITICAL-priority rules (waterfalls, bundle issues, security)
   - **Warning** — Violations of HIGH/MEDIUM-priority rules (server perf, re-renders, composition)
   - **Suggestion** — Violations of LOW-priority rules or project convention mismatches

### Step 4: Present the Review

For each file with findings, output:

```
## `path/to/file.tsx`

### Critical
- **rule-name**: Description of the issue
  > Show the problematic code snippet (keep it short)
  Recommendation: What to do instead

### Warning
- ...

### Suggestion
- ...
```

If a file has no findings, skip it (don't list clean files).

### Step 5: Summary

After all files, provide a summary:

- Total files reviewed
- Counts by severity (critical / warning / suggestion)
- Top 3 most impactful changes to make

## Key Rules to Prioritize

These are the highest-impact checks — always evaluate these first:

**Async & Data Fetching:**
- `async-parallel` — Independent promises must use Promise.all(), never sequential await
- `async-defer-await` — Don't await too early
- `bundle-barrel-imports` — Import directly, avoid barrel files
- `bundle-dynamic-imports` — Use next/dynamic for heavy client components
- `server-cache-react` — Use React.cache() for request dedup in Server Components
- `server-serialization` — Minimize data passed to client components

**React & Composition:**
- `rendering-conditional-render` — Use ternary, not && for conditional JSX
- `architecture-avoid-boolean-props` — No booleans to customize behavior
- `architecture-compound-components` — Use compound component pattern for complex UIs
- `react19-no-forwardref` — No forwardRef in React 19
- `rerender-derived-state-no-effect` — Derive state during render, not in effects

**Project Conventions:**
- No `useCallback`, `useMemo`, or `React.memo` (React Compiler handles this)
- No barrel files — import directly from source
- One component per file
- Never hardcode colors — use CSS variables
- Never pass `className` as a prop to custom components
