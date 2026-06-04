import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";
import styles from "./Form.module.css";
import type { InputProps } from "./types";

type Props = InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ label, className, ...rest }: Props) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <textarea
        className={clsx(styles.control, styles.textarea, className)}
        {...rest}
      />
    </label>
  );
}
