import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { buttonStyles } from "./styles";
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
      {...stylex.props(
        buttonStyles.base,
        iconPosition === "left" && buttonStyles.reverse,
        fill && buttonStyles.fill,
      )}
      {...rest}
    >
      {children}
      {icon ?? null}
    </Component>
  );
}
