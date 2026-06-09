import clsx from "clsx";
import type { PropsWithChildren } from "react";
import styles from "./Tooltip.module.css";

type Props = PropsWithChildren<{
  content: string;
  position?: "top" | "bottom";
}>;

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
