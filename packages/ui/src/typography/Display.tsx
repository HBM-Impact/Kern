import * as stylex from "@stylexjs/stylex";
import type { ElementType } from "react";
import { font } from "../tokens.stylex";
import { shared } from "./shared";
import type { TypographyBaseProps } from "./types";

type Props<T extends ElementType = "h2"> = TypographyBaseProps<T> & {
  variant?: "display1" | "display2" | "display3" | "display4";
};

const styles = stylex.create({
  base: {
    fontWeight: 600,
    letterSpacing: "-0.025em",
  },
  display1: {
    fontSize: font.size6,
    lineHeight: font.lineheight0,
  },
  display2: {
    fontSize: font.size5,
    lineHeight: font.lineheight0,
  },
  display3: {
    fontSize: font.size4,
    lineHeight: font.lineheight1,
  },
  display4: {
    fontSize: font.size3,
    lineHeight: font.lineheight1,
  },
});

export function Display<T extends ElementType = "h2">({
  as,
  variant = "display2",
  uppercase = false,
  truncate = false,
  lines,
  muted = false,
  noWrap = false,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "h2") as ElementType;
  return (
    <Tag
      {...stylex.props(
        shared.base,
        styles.base,
        styles[variant],
        uppercase && shared.uppercase,
        truncate && shared.truncate,
        muted && shared.muted,
        noWrap && shared.noWrap,
        lines ? shared.lines(lines) : null,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
