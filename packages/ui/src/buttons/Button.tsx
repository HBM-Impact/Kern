import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { Spinner } from "../spinner/Spinner";
import styles from "./Button.module.css";
import type { ButtonProps } from "./types";

type Props = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
  };

export function Button({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  isLoading = false,
  className,
  disabled,
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
      aria-label={rest["aria-label"] ?? fallbackLabel}
      {...rest}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
}
