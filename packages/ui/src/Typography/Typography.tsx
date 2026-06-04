import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./Typography.module.css";

type OwnProps = {
  as?: ElementType;
  variant?: "body" | "label";
  uppercase?: boolean;
  children?: ReactNode;
};

type Props = OwnProps & Omit<ComponentPropsWithoutRef<"p">, keyof OwnProps>;

export function Typography({
  as: Element = "p",
  variant = "body",
  uppercase = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Element
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
    </Element>
  );
}
