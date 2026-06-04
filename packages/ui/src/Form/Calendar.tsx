import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import styles from "./Form.module.css";
import type { InputProps } from "./types";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Calendar({ label, className, ...rest }: Props) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <input
        type="date"
        id={rest.name}
        className={clsx(styles.control, styles.calendar, className)}
        defaultValue={new Date().toISOString().split("T")[0]}
        {...rest}
      />
    </label>
  );
}
