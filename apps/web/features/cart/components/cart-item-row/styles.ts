import { border, colors, ease, radius, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

/** Shared by CartItemRow and its skeleton so both keep the same geometry. */
export const rowStyles = stylex.create({
  row: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: size[3],
    borderWidth: border[1],
    borderStyle: "solid",
    borderRadius: radius[2],
    overflow: "hidden",
    transition: `border-color 0.2s ${ease.inOut3}`,
    borderColor: { default: colors.borderMuted, ":hover": colors.accent },
  },
  imageLink: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.bgMuted,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: size[1],
    minWidth: 0,
    paddingBlock: size[3],
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: size[2],
    paddingBlock: size[3],
    paddingInlineEnd: size[3],
  },
  subtotalRow: {
    display: "flex",
    alignItems: "center",
    gap: size[3],
  },
});
