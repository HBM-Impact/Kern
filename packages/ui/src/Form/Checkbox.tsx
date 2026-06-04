import type { InputHTMLAttributes } from "react";
import { Check } from "../Icons/Check";
import styles from "./Form.module.css";
import type { InputProps } from "./types";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ name, label, value, defaultChecked }: Props) {
  return (
    <label className={styles.checkboxLabel}>
      <span className={styles.labelText}>{label}</span>
      <input
        defaultChecked={defaultChecked}
        value={value}
        type="checkbox"
        name={name}
      />
      <span className={styles.checkbox}>
        <Check />
      </span>
    </label>
  );
}
