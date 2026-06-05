import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export function IconButton({ icon, ...rest }: Props) {
  return (
    <button
      type={rest.type ?? "button"}
      className={styles.iconButton}
      {...rest}
    >
      {icon}
    </button>
  );
}
