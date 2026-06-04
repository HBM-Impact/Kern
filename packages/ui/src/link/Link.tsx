import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Link.module.css";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};

export function Link({ children, className, ...rest }: Props) {
  const fallbackTitle = typeof children === "string" ? children : undefined;
  return (
    <a title={fallbackTitle} className={clsx(styles.link, className)} {...rest}>
      {children}
    </a>
  );
}
