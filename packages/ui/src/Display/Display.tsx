import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./Display.module.css";

type OwnProps = {
  as?: ElementType;
  variant?: "display1" | "display2" | "display3" | "display4";
  uppercase?: boolean;
  children?: ReactNode;
};

type Props = OwnProps & Omit<ComponentPropsWithoutRef<"h2">, keyof OwnProps>;

export function Display({
  as: Element = "h2",
  variant = "display2",
  uppercase = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Element
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
    </Element>
  );
}
