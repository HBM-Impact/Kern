import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./types";

type Props = ButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children?: ReactNode;
  };

export function LinkButton({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  className,
  ...rest
}: Props) {
  const fallbackTitle = typeof children === "string" ? children : undefined;
  return (
    <a
      title={rest.title ?? fallbackTitle}
      className={clsx(
        styles.base,
        iconPosition === "left" && styles.reverse,
        fill && styles.fill,
        className,
      )}
      {...rest}
    >
      {children}
      {icon ?? null}
    </a>
  );
}
