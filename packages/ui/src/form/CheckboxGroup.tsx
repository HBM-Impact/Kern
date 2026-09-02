import * as stylex from "@stylexjs/stylex";
import type { FieldsetHTMLAttributes } from "react";
import { Checkbox } from "./Checkbox";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = {
  name: string;
  options: Parameters<typeof Checkbox>["0"][];
} & InputProps &
  FieldsetHTMLAttributes<HTMLFieldSetElement>;

export function CheckboxGroup({ label, name, options, ...rest }: Props) {
  return (
    <fieldset {...stylex.props(formStyles.group)} {...rest}>
      <legend {...stylex.props(formStyles.labelText)}>{label}</legend>
      {options.map((option) => (
        <Checkbox key={String(option.value)} name={name} {...option} />
      ))}
    </fieldset>
  );
}
