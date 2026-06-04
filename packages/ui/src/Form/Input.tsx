import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import styles from "./Form.module.css";
import type { InputProps } from "./types";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, className, ...rest }: Props) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <input
        className={clsx(styles.control, styles.input, className)}
        {...rest}
      />
    </label>
  );
}
