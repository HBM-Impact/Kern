import { colors, ease, font, radius, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

/** Shared by ProductCard and its skeleton. */
export const cardStyles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: radius[2],
    overflow: "hidden",
    transition: `border-color 0.2s ${ease.inOut3}`,
    color: "inherit",
    borderColor: { default: colors.borderMuted, ":hover": colors.accent },
  },
  imageLink: {
    display: "block",
    position: "relative",
  },
  image: {
    maxHeight: "250px",
    width: "100%",
    objectFit: "contain",
    backgroundColor: colors.bgMuted,
    padding: size[2],
  },
  favoriteBtn: {
    position: "absolute",
    top: size[2],
    right: size[2],
  },
  badge: {
    position: "absolute",
    top: size[2],
    left: size[2],
    backgroundColor: colors.text,
    color: colors.bg,
    fontSize: font.size0,
    fontWeight: font.weight7,
    lineHeight: 1,
    paddingBlock: size[1],
    paddingInline: size[2],
    borderRadius: radius[2],
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: size[2],
    padding: size[3],
  },
  titleLink: {
    textDecoration: "none",
    color: { default: "inherit", ":hover": colors.accent },
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
