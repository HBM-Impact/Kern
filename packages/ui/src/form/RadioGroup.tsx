import * as stylex from "@stylexjs/stylex";
import type { FieldsetHTMLAttributes } from "react";
import { Radio } from "./Radio";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = {
  name: string;
  options: Parameters<typeof Radio>["0"][];
} & InputProps &
  FieldsetHTMLAttributes<HTMLFieldSetElement>;

export function RadioGroup({ label, name, options, ...rest }: Props) {
  return (
    <fieldset {...stylex.props(formStyles.group)} {...rest}>
      <legend {...stylex.props(formStyles.labelText)}>{label}</legend>
      {options.map((option) => (
        <Radio key={String(option.value)} name={name} {...option} />
      ))}
    </fieldset>
  );
}
