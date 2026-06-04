import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Typography.module.css";

type Props<T extends ElementType = "p"> = {
  as?: T;
  variant?: "body" | "label";
  uppercase?: boolean;
} & ComponentPropsWithoutRef<T>;

export function Typography<T extends ElementType = "p">({
  as,
  variant = "body",
  uppercase = false,
  className,
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
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
