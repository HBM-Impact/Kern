import { css } from "hono/css";
import type { JSX } from "hono/jsx";
import type { InputProps } from "@/ui/Form/types.ts";
import { Dot } from "@/ui/Icons/Dot.tsx";
import { Typography } from "@/ui/Typography.tsx";

type Props = InputProps & JSX.IntrinsicElements["input"];

export function Radio({ label, ...rest }: Props) {
  return (
    <label class={labelStyles}>
      <Typography>{label}</Typography>
      <input type="radio" {...rest} />
      <span class={radioStyles}>
        <Dot />
      </span>
    </label>
  );
}

const labelStyles = css`
  position: relative;
  display: flex;
  gap: var(--size-2);
  cursor: pointer;
  height: var(--size-5);
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

const radioStyles = css`
  width: var(--size-3);
  height: var(--size-3);
  border-radius: var(--radius-round);
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
    width: var(--size-3);
    height: var(--size-3);
    fill: var(--color-text);
  }
`;
