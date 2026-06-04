import type { InputHTMLAttributes } from "react";
import { Dot } from "../Icons/Dot";
import styles from "./Form.module.css";
import type { InputProps } from "./types";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Radio({ label, ...rest }: Props) {
  return (
    <label className={styles.radioLabel}>
      <span className={styles.labelText}>{label}</span>
      <input type="radio" {...rest} />
      <span className={styles.radio}>
        <Dot />
      </span>
    </label>
  );
}
