import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Link.module.css";

type Props<T extends ElementType = "a"> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Link<T extends ElementType = "a">({ as, ...props }: Props<T>) {
  const Component = (as ?? "a") as ElementType;
  return <Component className={styles.link} {...props} />;
}
