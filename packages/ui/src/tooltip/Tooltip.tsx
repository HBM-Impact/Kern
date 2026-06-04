import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";

type Props = {
  content: string;
  position?: "top" | "bottom";
  className?: string;
  children?: ReactNode;
};

export function Tooltip({
  content,
  position = "top",
  className,
  children,
}: Props) {
  return (
    <span
      className={clsx(
        styles.tooltip,
        position === "bottom" && styles.bottom,
        className,
      )}
      data-tooltip={content}
    >
      {children}
    </span>
  );
}
