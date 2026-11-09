"use client";

import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { Radio } from "./Radio";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = {
  name: string;
  options: Parameters<typeof Radio>["0"][];
} & InputProps &
  Pick<
    BaseRadioGroup.Props<string>,
    "value" | "defaultValue" | "onValueChange" | "disabled"
  >;

export function RadioGroup({ label, options, ...rest }: Props) {
  const id = useId();

  return (
    <BaseRadioGroup
      aria-labelledby={id}
      {...rest}
      {...stylex.props(formStyles.group)}
    >
      <span id={id} {...stylex.props(formStyles.labelText)}>
        {label}
      </span>
      {options.map((option) => (
        <Radio key={option.value} {...option} />
      ))}
    </BaseRadioGroup>
  );
}
