import * as stylex from "@stylexjs/stylex";
import type { PropsWithChildren } from "react";
import { colors, ease, font, radius, size } from "./tokens.stylex";

type Props = PropsWithChildren<{
  content: string;
  position?: "top" | "bottom";
}>;

const styles = stylex.create({
  tooltip: {
    display: "inline-flex",
    anchorName: "--tooltip-anchor",
    anchorScope: "--tooltip-anchor",
    "::after": {
      content: "attr(data-tooltip)",
      position: "fixed",
      positionAnchor: "--tooltip-anchor",
      bottom: "anchor(top)",
      justifySelf: "anchor-center",
      marginBottom: size[1],
      paddingBlock: size[1],
      paddingInline: size[2],
      fontSize: font.size0,
      color: colors.text,
      backgroundColor: colors.bgElevated,
      borderRadius: radius[2],
      whiteSpace: "nowrap",
      pointerEvents: "none",
      transition: `opacity 0.2s ${ease[3]}`,
      opacity: { default: 0, ":hover": 1, ":focus-visible": 1 },
    },
  },
  bottom: {
    "::after": {
      bottom: "auto",
      top: "anchor(bottom)",
      marginBottom: 0,
      marginTop: size[1],
    },
  },
});

export function Tooltip({ content, position = "top", children }: Props) {
  return (
    <span
      {...stylex.props(styles.tooltip, position === "bottom" && styles.bottom)}
      data-tooltip={content}
    >
      {children}
    </span>
  );
}
