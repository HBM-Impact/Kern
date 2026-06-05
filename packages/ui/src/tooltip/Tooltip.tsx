import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";

type Props = {
  content: string;
  position?: "top" | "bottom";
  children?: ReactNode;
};

export function Tooltip({ content, position = "top", children }: Props) {
  return (
    <span
      className={clsx(styles.tooltip, position === "bottom" && styles.bottom)}
      data-tooltip={content}
    >
      {children}
    </span>
  );
}
