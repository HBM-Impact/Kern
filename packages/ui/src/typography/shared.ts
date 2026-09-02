import * as stylex from "@stylexjs/stylex";
import { colors, font } from "../tokens.stylex";

/** Style atoms every typography component shares. */
export const shared = stylex.create({
  base: {
    fontFamily: font.sans,
    margin: 0,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  truncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  muted: {
    color: colors.textMuted,
  },
  noWrap: {
    whiteSpace: "nowrap",
  },
  // Was an inline `style` object with a `CSSProperties` cast — a dynamic style
  // keeps the line clamp in the same place as every other rule.
  lines: (lines: number) => ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }),
});
