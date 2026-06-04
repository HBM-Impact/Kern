import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Container.module.css";

type Props<T extends ElementType = "div"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={clsx(styles.container, className)} {...rest}>
      {children}
    </Tag>
  );
}
