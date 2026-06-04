import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./types";

type Props = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
  };

export function Button({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  disabled = false,
  className,
  ...rest
}: Props) {
  const fallbackLabel = typeof children === "string" ? children : undefined;
  return (
    <button
      type={rest.type ?? "button"}
      className={clsx(
        styles.base,
        iconPosition === "left" && styles.reverse,
        fill && styles.fill,
        className,
      )}
      disabled={disabled}
      aria-label={rest["aria-label"] ?? fallbackLabel}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
}
