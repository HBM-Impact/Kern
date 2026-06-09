import { ChevronDown } from "lucide-react";
import type { DetailsHTMLAttributes } from "react";
import { Prose } from "../typography/prose";
import styles from "./Accordion.module.css";

type Props = {
  title: string;
} & DetailsHTMLAttributes<HTMLDetailsElement>;

export function Accordion({ title, children, ...rest }: Props) {
  return (
    <details className={styles.details} {...rest}>
      <summary className={styles.summary}>
        <Prose>{title}</Prose>
        <ChevronDown className={styles.icon} />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
