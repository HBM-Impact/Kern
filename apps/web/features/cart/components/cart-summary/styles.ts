import { border, colors, radius, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

/** Shared by CartSummary and its skeleton. */
export const summaryStyles = stylex.create({
  summary: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
    padding: size[4],
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.borderMuted,
    borderRadius: radius[2],
    backgroundColor: colors.bgMuted,
    alignSelf: "start",
    position: "sticky",
    top: size[4],
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: size[2],
    margin: 0,
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  // Was `.detailRow > dd { margin: 0 }`; applied to the <dd> itself now.
  value: {
    margin: 0,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: size[3],
    borderTopWidth: border[1],
    borderTopStyle: "solid",
    borderTopColor: colors.border,
  },
});
