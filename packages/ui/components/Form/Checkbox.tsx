import { css } from "hono/css";
import type { JSX } from "hono/jsx";
import type { InputProps } from "@/ui/Form/types.ts";
import { Check } from "@/ui/Icons/Check.tsx";
import { Typography } from "@/ui/Typography.tsx";

type Props = InputProps & JSX.IntrinsicElements["input"];

export function Checkbox({ name, label, value, defaultChecked }: Props) {
  return (
    <label class={labelStyle}>
      <Typography>{label}</Typography>
      <input defaultChecked={defaultChecked} value={value} type="checkbox" name={name} />
      <span class={checkboxStyle}>
        <Check />
      </span>
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  gap: var(--size-2);
  cursor: pointer;
  height: var(--size-6);
  align-items: center;
  flex-direction: row-reverse;
  justify-content: flex-end;

  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & > input:checked ~ span {
    background-color: inherit;
    & > svg {
      opacity: 1;
    }
  }

  & > input:focus ~ span {
    outline: var(--border-size-3) auto -webkit-focus-ring-color;
  }
`;

const checkboxStyle = css`
  width: var(--size-3);
  height: var(--size-3);
  border-radius: var(--radius-2);
  background-color: transparent;
  border-width: var(--border-size-1);
  border-style: solid;
  border-color: var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s var(--ease-in-out-3);

  & > svg {
    opacity: 0;
    transition: opacity 0.3s var(--ease-in-out-3);
    width: 0.75rem;
    height: 0.75rem;
    color: var(--color-text);
  }
`;
