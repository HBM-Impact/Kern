import * as stylex from "@stylexjs/stylex";
import { border, colors, font, radius, size } from "../tokens.stylex";

/** Shared by Button and LinkButton, which render the same visual. */
export const buttonStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5rem",
    paddingInline: size[3],
    cursor: { default: "pointer", ":disabled": "not-allowed" },
    width: "fit-content",
    color: colors.text,
    borderWidth: border[1],
    borderStyle: "solid",
    borderRadius: radius[2],
    transition: "background-color 0.15s ease-out, border-color 0.15s ease-out",
    gap: size[2],
    flexShrink: 0,
    fontFamily: font.sans,
    fontSize: font.size1,
    fontWeight: 400,
    textDecoration: "none",
    backgroundColor: {
      default: colors.bg,
      ":hover": colors.hoverBg,
      ":active": colors.activeBg,
    },
    borderColor: { default: colors.border, ":hover": colors.textMuted },
    opacity: { ":disabled": 0.5 },
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  fill: {
    width: "100%",
  },
});
