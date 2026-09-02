import * as stylex from "@stylexjs/stylex";

/**
 * Semantic colors. Kept as StyleX vars (not consts) so the dark-mode media
 * query lives in one place instead of being repeated at every call site.
 * Values still point at open-props greys — open-props stays the source of truth.
 */
export const colors = stylex.defineVars({
  bg: {
    default: "var(--gray-0)",
    "@media (prefers-color-scheme: dark)": "var(--gray-12)",
  },
  bgMuted: {
    default: "var(--gray-1)",
    "@media (prefers-color-scheme: dark)": "var(--gray-11)",
  },
  bgElevated: {
    default: "var(--gray-2)",
    "@media (prefers-color-scheme: dark)": "var(--gray-10)",
  },
  text: {
    default: "var(--gray-12)",
    "@media (prefers-color-scheme: dark)": "var(--gray-1)",
  },
  textMuted: {
    default: "var(--gray-7)",
    "@media (prefers-color-scheme: dark)": "var(--gray-6)",
  },
  accent: {
    default: "var(--gray-9)",
    "@media (prefers-color-scheme: dark)": "var(--gray-5)",
  },
  border: {
    default: "var(--gray-4)",
    "@media (prefers-color-scheme: dark)": "var(--gray-8)",
  },
  borderMuted: {
    default: "var(--gray-3)",
    "@media (prefers-color-scheme: dark)": "var(--gray-9)",
  },
  hoverBg: {
    default: "var(--gray-1)",
    "@media (prefers-color-scheme: dark)": "var(--gray-11)",
  },
  activeBg: {
    default: "var(--gray-2)",
    "@media (prefers-color-scheme: dark)": "var(--gray-10)",
  },
});

/**
 * Static open-props passthroughs. Consts inline at build time, so these cost
 * nothing at runtime and exist purely to make the scale typed and discoverable.
 */
export const size = stylex.defineConsts({
  1: "var(--size-1)",
  2: "var(--size-2)",
  3: "var(--size-3)",
  4: "var(--size-4)",
  5: "var(--size-5)",
  6: "var(--size-6)",
  7: "var(--size-7)",
  8: "var(--size-8)",
  9: "var(--size-9)",
  10: "var(--size-10)",
  11: "var(--size-11)",
  12: "var(--size-12)",
  13: "var(--size-13)",
  15: "var(--size-15)",
});

export const radius = stylex.defineConsts({
  2: "var(--radius-2)",
  round: "var(--radius-round)",
});

export const border = stylex.defineConsts({
  1: "var(--border-size-1)",
  3: "var(--border-size-3)",
});

export const font = stylex.defineConsts({
  sans: "var(--font-sans)",
  size0: "var(--font-size-0)",
  size1: "var(--font-size-1)",
  size3: "var(--font-size-3)",
  size4: "var(--font-size-4)",
  size5: "var(--font-size-5)",
  size6: "var(--font-size-6)",
  lineheight0: "var(--font-lineheight-0)",
  lineheight1: "var(--font-lineheight-1)",
  lineheight2: "var(--font-lineheight-2)",
  lineheight3: "var(--font-lineheight-3)",
  weight7: "var(--font-weight-7)",
});

export const ease = stylex.defineConsts({
  2: "var(--ease-2)",
  3: "var(--ease-3)",
  inOut3: "var(--ease-in-out-3)",
});
