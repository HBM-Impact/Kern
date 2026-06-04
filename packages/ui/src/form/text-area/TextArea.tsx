import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";
import formStyles from "../Form.module.css";
import type { InputProps } from "../types";
import styles from "./TextArea.module.css";

type Props = InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ label, className, ...rest }: Props) {
  return (
    <label className={formStyles.label}>
      <span className={formStyles.labelText}>{label}</span>
      <textarea
        className={clsx(formStyles.control, styles.textarea, className)}
        {...rest}
      />
    </label>
  );
}
