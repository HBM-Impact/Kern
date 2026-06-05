import clsx from "clsx";
import type { CSSProperties, ElementType } from "react";
import shared from "../shared.module.css";
import type { TypographyBaseProps } from "../types";
import styles from "./Prose.module.css";

type Props<T extends ElementType = "p"> = TypographyBaseProps<T> & {
  variant?: "body" | "label";
  bold?: boolean;
};

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
      className={clsx(
        shared.base,
        variant === "body" && styles.body,
        variant === "label" && styles.label,
        uppercase && shared.uppercase,
        truncate && shared.truncate,
        muted && shared.muted,
        noWrap && shared.noWrap,
        bold && styles.bold,
      )}
      style={
        lines
          ? ({
              display: "-webkit-box",
              WebkitLineClamp: lines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            } as CSSProperties)
          : undefined
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
