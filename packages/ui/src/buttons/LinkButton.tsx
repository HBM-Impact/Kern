import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./types";

type Props<T extends ElementType = "a"> = ButtonProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "isLoading">;

export function LinkButton<T extends ElementType = "a">({
  as,
  fill = false,
  icon,
  iconPosition = "right",
  children,
  ...rest
}: Props<T>) {
  const Component = (as ?? "a") as ElementType;
  return (
    <Component
      className={clsx(
        styles.base,
        iconPosition === "left" && styles.reverse,
        fill && styles.fill,
      )}
      {...rest}
    >
      {children}
      {icon ?? null}
    </Component>
  );
}
