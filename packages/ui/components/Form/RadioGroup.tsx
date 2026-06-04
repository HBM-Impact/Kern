import { css } from "hono/css";
import type { JSX } from "hono/jsx";
import { Radio } from "@/ui/Form/Radio.tsx";
import type { InputProps } from "@/ui/Form/types.ts";
import { Typography } from "@/ui/Typography.tsx";

type Props = {
  name: string;
  options: Parameters<typeof Radio>["0"][];
} & InputProps &
  JSX.IntrinsicElements["fieldset"];

export function RadioGroup({ label, name, options, ...rest }: Props) {
  return (
    <fieldset class={radioGroupStyles} {...rest}>
      <Typography as="legend">{label}</Typography>
      {options.map((option) => (
        <Radio key={String(option.value)} name={name} {...option} />
      ))}
    </fieldset>
  );
}

const radioGroupStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  border: none;
`;
