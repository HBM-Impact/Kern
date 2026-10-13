---
name: stylex
description: StyleX styling rules for this repo — design tokens from @repo/ui/tokens.stylex, stylex.props conditionals, longhand-only properties, the globals.css reset layer, and the Babel/PostCSS wiring shared by web and Storybook. Use when writing or reviewing any component style, adding a token, debugging a rule that compiled to nothing, or touching styles.ts, globals.css, babel.config.js, postcss.config.cjs, or stylex-options.cjs.
---

# StyleX

The only styling system here. No CSS Modules, no Tailwind, no `clsx`, no inline `className` strings.

## Writing styles

`stylex.props()` takes conditionals directly — that is the `clsx` replacement.

```tsx
const styles = stylex.create({
  base: { color: colors.text },
  active: { color: colors.accent },
});

<div {...stylex.props(styles.base, isActive && styles.active)} />
```

Pseudo-classes and media queries are values, not separate rules:

```ts
backgroundColor: { default: colors.bg, ":hover": colors.hoverBg, ":active": colors.activeBg },
opacity: { ":disabled": 0.5 },
```

## Tokens

Always from `@repo/ui/tokens.stylex`, never a raw color or a re-export.

- `colors` — `stylex.defineVars`, so each token carries its own `@media (prefers-color-scheme: dark)` value. Never write a dark-mode query in a component; pick the right semantic token (`bg`, `bgMuted`, `bgElevated`, `text`, `textMuted`, `accent`, `border`, `borderMuted`, `hoverBg`, `activeBg`).
- `size`, `radius`, `border`, `font`, `ease` — `stylex.defineConsts` wrapping open-props. Inlined at build time, zero runtime cost.

Dark mode belongs in `tokens.stylex.ts`. A new pair of light/dark values means a new token there, not a media query at the call site.

## Longhands only

`propertyValidationMode: "throw"` is set in both Babel configs, so a shorthand fails the build instead of silently dropping the rule.

- `backgroundColor`, not `background`. Gradients go in `backgroundImage`.
- `borderWidth` / `borderStyle` / `borderColor`, not `border`.
- `paddingInline`, `marginBlock` — logical longhands are fine.

## No combinators

StyleX cannot express descendant, child, or sibling selectors. Style only the elements a component renders itself. Reaching into a child means passing a prop or a variant instead — never an escape-hatch stylesheet.

## File layout

- Component files are PascalCase (`Button.tsx`).
- A stylesheet shared by a component and its skeleton, or by sibling components, goes in a kebab-case folder as `styles.ts` (`buttons/styles.ts`, `form/styles.ts`).
- One-off styles live in the component file.

## Globals

`packages/ui/src/globals.css` imports only the open-props groups actually used, then declares `@layer resets` *before* `@stylex;`. That order is load-bearing: unlayered rules beat every layered rule regardless of specificity, so a reset outside the layer would override every component style.

## Build wiring

- `apps/web`: `babel.config.js` + `postcss.config.cjs`
- `apps/storybook`: `stylex-options.cjs` + an inline Babel plugin in `.storybook/main.ts`

`rootDir` must match across both or generated class names will not line up between the app and Storybook.

## Debugging

A style that had no effect is almost always a shorthand (build should have thrown — check `propertyValidationMode`), a combinator StyleX silently cannot express, or an unlayered global reset winning over a layered component rule.
