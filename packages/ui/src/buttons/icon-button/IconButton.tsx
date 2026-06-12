import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "../../spinner/Spinner";
import styles from "./IconButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  isLoading?: boolean;
};

export function IconButton({
  icon,
  isLoading = false,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      type={rest.type ?? "button"}
      className={styles.iconButton}
      {...rest}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? <Spinner /> : icon}
    </button>
  );
}
