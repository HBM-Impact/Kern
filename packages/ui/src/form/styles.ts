import * as stylex from "@stylexjs/stylex";
import { border, colors, font, radius, size } from "../tokens.stylex";

/** Style atoms shared by every form control. */
export const formStyles = stylex.create({
  label: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: size[2],
  },
  labelText: {
    fontFamily: font.sans,
    fontSize: font.size1,
    fontWeight: 400,
    lineHeight: font.lineheight3,
  },
  control: {
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: {
      default: colors.border,
      ":hover": colors.textMuted,
      ":focus-visible": colors.accent,
    },
    borderRadius: radius[2],
    backgroundColor: "transparent",
    outline: "none",
    transition: "border-color 0.15s ease-out",
    fontFamily: font.sans,
    boxShadow: { ":focus-visible": "none" },
  },
  group: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: size[2],
    borderStyle: "none",
  },
});
