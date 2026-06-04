import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import formStyles from "../Form.module.css";
import type { InputProps } from "../types";
import styles from "./Calendar.module.css";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Calendar({ label, className, ...rest }: Props) {
  return (
    <label className={formStyles.label}>
      <span className={formStyles.labelText}>{label}</span>
      <input
        type="date"
        id={rest.name}
        className={clsx(formStyles.control, styles.calendar, className)}
        defaultValue={new Date().toISOString().split("T")[0]}
        {...rest}
      />
    </label>
  );
}
