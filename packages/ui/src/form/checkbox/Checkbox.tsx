import { Check } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import formStyles from "../Form.module.css";
import type { InputProps } from "../types";
import styles from "./Checkbox.module.css";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ name, label, value, defaultChecked }: Props) {
  return (
    <label className={styles.checkboxLabel}>
      <span className={formStyles.labelText}>{label}</span>
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
