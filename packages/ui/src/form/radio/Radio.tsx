import { Dot } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import formStyles from "../Form.module.css";
import type { InputProps } from "../types";
import styles from "./Radio.module.css";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export function Radio({ label, ...rest }: Props) {
  return (
    <label className={styles.radioLabel}>
      <span className={formStyles.labelText}>{label}</span>
      <input type="radio" {...rest} />
      <span className={styles.radio}>
        <Dot />
      </span>
    </label>
  );
}
