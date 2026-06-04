import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import formStyles from "../Form.module.css";
import type { InputProps } from "../types";
import styles from "./Input.module.css";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, className, ...rest }: Props) {
  return (
    <label className={formStyles.label}>
      <span className={formStyles.labelText}>{label}</span>
      <input
        className={clsx(formStyles.control, styles.input, className)}
        {...rest}
      />
    </label>
  );
}
