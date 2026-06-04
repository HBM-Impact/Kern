import { css } from "hono/css";
import type { JSX } from "hono/jsx";
import { Checkbox } from "@/ui/Form/Checkbox.tsx";
import type { InputProps } from "@/ui/Form/types.ts";
import { Typography } from "@/ui/Typography.tsx";

type Props = {
  name: string;
  options: Parameters<typeof Checkbox>["0"][];
} & InputProps &
  JSX.IntrinsicElements["fieldset"];

export function CheckboxGroup({ label, name, options, ...rest }: Props) {
  return (
    <fieldset class={checkboxGroupStyles} {...rest}>
      <Typography as="legend">{label}</Typography>
      {options.map((option) => (
        <Checkbox key={String(option.value)} name={name} {...option} />
      ))}
    </fieldset>
  );
}

const checkboxGroupStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  border: none;
`;
