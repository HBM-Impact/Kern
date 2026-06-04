import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Display.module.css";

type Props<T extends ElementType = "h2"> = {
  as?: T;
  variant?: "display1" | "display2" | "display3" | "display4";
  uppercase?: boolean;
} & ComponentPropsWithoutRef<T>;

export function Display<T extends ElementType = "h2">({
  as,
  variant = "display2",
  uppercase = false,
  className,
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
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
