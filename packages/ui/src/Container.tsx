import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { size } from "./tokens.stylex";

type Props<T extends ElementType = "div"> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "className">;

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
  },
});

export function Container<T extends ElementType = "div">({
  as,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag {...stylex.props(styles.container)} {...rest}>
      {children}
    </Tag>
  );
}
