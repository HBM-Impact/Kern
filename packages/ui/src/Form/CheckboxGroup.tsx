import type { FieldsetHTMLAttributes } from "react";
import { Checkbox } from "./Checkbox";
import styles from "./Form.module.css";
import type { InputProps } from "./types";

type Props = {
  name: string;
  options: Parameters<typeof Checkbox>["0"][];
} & InputProps &
  FieldsetHTMLAttributes<HTMLFieldSetElement>;

export function CheckboxGroup({ label, name, options, ...rest }: Props) {
  return (
    <fieldset className={styles.group} {...rest}>
      <legend className={styles.labelText}>{label}</legend>
      {options.map((option) => (
        <Checkbox key={String(option.value)} name={name} {...option} />
      ))}
    </fieldset>
  );
}
