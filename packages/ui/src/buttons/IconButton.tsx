import * as stylex from "@stylexjs/stylex";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "../Spinner";
import { border, colors, radius } from "../tokens.stylex";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  icon: ReactNode;
  isLoading?: boolean;
  variant?: "default" | "accent";
};

const styles = stylex.create({
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5rem",
    width: "2.5rem",
    color: colors.text,
    borderWidth: border[1],
    borderStyle: "solid",
    borderRadius: radius[2],
    transition: "background-color 0.15s ease-out, border-color 0.15s ease-out",
    flexShrink: 0,
    cursor: { default: "pointer", ":disabled": "not-allowed" },
    backgroundColor: {
      default: colors.bg,
      ":hover": colors.hoverBg,
      ":active": colors.activeBg,
    },
    borderColor: { default: colors.border, ":hover": colors.textMuted },
    opacity: { ":disabled": 0.5 },
  },
  // Callers used to reach in with `.active button`, which StyleX cannot do.
  // The state is a variant on the component instead.
  accent: {
    color: colors.accent,
    borderColor: colors.accent,
  },
});

export function IconButton({
  icon,
  isLoading = false,
  variant = "default",
  disabled,
  ...rest
}: Props) {
  return (
    <button
      type={rest.type ?? "button"}
      {...stylex.props(
        styles.iconButton,
        variant === "accent" && styles.accent,
      )}
      {...rest}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? <Spinner /> : icon}
    </button>
  );
}
