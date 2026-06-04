import { ChevronDown } from "lucide-react";
import type { DetailsHTMLAttributes, ReactNode } from "react";
import { Typography } from "../typography";
import styles from "./Accordion.module.css";

type Props = {
  title: string;
  children?: ReactNode;
} & DetailsHTMLAttributes<HTMLDetailsElement>;

export function Accordion({ title, children, ...rest }: Props) {
  return (
    <details className={styles.details} {...rest}>
      <summary className={styles.summary}>
        <Typography>{title}</Typography>
        <ChevronDown className={styles.icon} />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
