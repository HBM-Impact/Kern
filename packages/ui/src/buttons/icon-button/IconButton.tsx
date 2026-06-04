import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  className?: string;
};

export function IconButton({ icon, className, ...rest }: Props) {
  return (
    <button
      type={rest.type ?? "button"}
      className={clsx(styles.iconButton, className)}
      {...rest}
    >
      {icon}
    </button>
  );
}
