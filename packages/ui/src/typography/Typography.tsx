import clsx from "clsx";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
} from "react";
import styles from "./Typography.module.css";

type Props<T extends ElementType = "p"> = {
  as?: T;
  variant?: "body" | "label";
  uppercase?: boolean;
  truncate?: boolean;
  lines?: number;
  muted?: boolean;
  noWrap?: boolean;
  bold?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "className">;

export function Typography<T extends ElementType = "p">({
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
        styles.base,
        variant === "body" && styles.body,
        variant === "label" && styles.label,
        uppercase && styles.uppercase,
        truncate && styles.truncate,
        muted && styles.muted,
        noWrap && styles.noWrap,
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
