import * as stylex from "@stylexjs/stylex";
import type { ButtonHTMLAttributes } from "react";
import { Spinner } from "../Spinner";
import { buttonStyles } from "./styles";
import type { ButtonProps } from "./types";

type Props = ButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    isLoading?: boolean;
  };

export function Button({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  isLoading = false,
  disabled,
  ...rest
}: Props) {
  const fallbackLabel = typeof children === "string" ? children : undefined;
  return (
    <button
      type={rest.type ?? "button"}
      {...stylex.props(
        buttonStyles.base,
        iconPosition === "left" && buttonStyles.reverse,
        fill && buttonStyles.fill,
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
