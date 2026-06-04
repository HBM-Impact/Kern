import { css, cx } from "hono/css";
import type { JSX } from "hono/jsx";
import { formControlStyle } from "@/ui/Form/styles.ts";
import type { InputProps } from "@/ui/Form/types.ts";
import { ChevronDown } from "@/ui/Icons/Chevron/Down.tsx";
import { Typography } from "@/ui/Typography.tsx";

type SelectOption = string | { value: string; label: string };

type Props = {
  options: SelectOption[];
} & InputProps &
  JSX.IntrinsicElements["select"];

function getOptionValue(option: SelectOption) {
  return typeof option === "string" ? option : option.value;
}

function getOptionLabel(option: SelectOption) {
  return typeof option === "string" ? option : option.label;
}

export function Select({ options, label, name, ...rest }: Props) {
  return (
    <label class={labelStyle}>
      <Typography>{label}</Typography>
      <Typography
        as="select"
        id={name}
        name={name}
        className={cx(formControlStyle, selectStyle)}
        {...rest}
      >
        {options.map((option) => {
          const value = getOptionValue(option);
          const optionLabel = getOptionLabel(option);
          return (
            <option
              key={value}
              value={value}
              // biome-ignore lint/complexity/useLiteralKeys: index signature requires bracket notation
              selected={rest?.value === value || rest?.["defaultValue"] === value}
            >
              {optionLabel}
            </option>
          );
        })}
      </Typography>
      <ChevronDown />
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  & > svg {
    width: var(--size-3);
    height: var(--size-3);
    position: absolute;
    bottom: calc(2.5rem / 2 - var(--size-2));
    right: var(--size-3);
    cursor: pointer;
    pointer-events: none;
  }
`;

const selectStyle = css`
  height: 2.5rem;
  appearance: none;
  padding-left: var(--size-3);
  padding-right: calc(var(--size-3) * 2);
  cursor: pointer;
  font-size: var(--font-size-1);
`;
