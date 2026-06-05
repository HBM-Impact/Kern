import clsx from "clsx";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
} from "react";
import styles from "./Display.module.css";

type Props<T extends ElementType = "h2"> = {
  as?: T;
  variant?: "display1" | "display2" | "display3" | "display4";
  uppercase?: boolean;
  truncate?: boolean;
  lines?: number;
  muted?: boolean;
  noWrap?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "className">;

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
        styles.base,
        variant === "display1" && styles.display1,
        variant === "display2" && styles.display2,
        variant === "display3" && styles.display3,
        variant === "display4" && styles.display4,
        uppercase && styles.uppercase,
        truncate && styles.truncate,
        muted && styles.muted,
        noWrap && styles.noWrap,
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
