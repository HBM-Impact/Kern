import type { FieldsetHTMLAttributes } from "react";
import styles from "../Form.module.css";
import { Radio } from "../radio";
import type { InputProps } from "../types";

type Props = {
  name: string;
  options: Parameters<typeof Radio>["0"][];
} & InputProps &
  FieldsetHTMLAttributes<HTMLFieldSetElement>;

export function RadioGroup({ label, name, options, ...rest }: Props) {
  return (
    <fieldset className={styles.group} {...rest}>
      <legend className={styles.labelText}>{label}</legend>
      {options.map((option) => (
        <Radio key={String(option.value)} name={name} {...option} />
      ))}
    </fieldset>
  );
}
