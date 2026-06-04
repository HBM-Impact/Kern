import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

type OwnProps = {
  as?: ElementType;
  children?: ReactNode;
};

type Props = OwnProps & Omit<ComponentPropsWithoutRef<"div">, keyof OwnProps>;

export function Container({
  as: Element = "div",
  className,
  children,
  ...rest
}: Props) {
  return (
    <Element className={clsx(styles.container, className)} {...rest}>
      {children}
    </Element>
  );
}
