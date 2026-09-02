import * as stylex from "@stylexjs/stylex";
import type { ElementType } from "react";
import { font } from "../tokens.stylex";
import { shared } from "./shared";
import type { TypographyBaseProps } from "./types";

type Props<T extends ElementType = "p"> = TypographyBaseProps<T> & {
  variant?: "body" | "label";
  bold?: boolean;
};

const styles = stylex.create({
  body: {
    fontSize: font.size1,
    fontWeight: 400,
    lineHeight: font.lineheight3,
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: font.lineheight2,
  },
  bold: {
    fontWeight: font.weight7,
  },
});

export function Prose<T extends ElementType = "p">({
  as,
  variant = "body",
  uppercase = false,
  truncate = false,
  lines,
  muted = false,
  noWrap = false,
  bold = false,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "p") as ElementType;
  return (
    <Tag
      {...stylex.props(
        shared.base,
        styles[variant],
        uppercase && shared.uppercase,
        truncate && shared.truncate,
        muted && shared.muted,
        noWrap && shared.noWrap,
        bold && styles.bold,
        lines ? shared.lines(lines) : null,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
