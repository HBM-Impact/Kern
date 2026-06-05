import clsx from "clsx";
import type { CSSProperties, ElementType } from "react";
import shared from "../shared.module.css";
import type { TypographyBaseProps } from "../types";
import styles from "./Display.module.css";

type Props<T extends ElementType = "h2"> = TypographyBaseProps<T> & {
  variant?: "display1" | "display2" | "display3" | "display4";
};

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
      className={clsx(
        shared.base,
        styles.base,
        variant === "display1" && styles.display1,
        variant === "display2" && styles.display2,
        variant === "display3" && styles.display3,
        variant === "display4" && styles.display4,
        uppercase && shared.uppercase,
        truncate && shared.truncate,
        muted && shared.muted,
        noWrap && shared.noWrap,
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
