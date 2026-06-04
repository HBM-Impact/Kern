import { css, cx } from "hono/css";
import type { JSX } from "hono/jsx";
import { formControlStyle } from "@/ui/Form/styles.ts";
import type { InputProps } from "@/ui/Form/types.ts";
import { Typography } from "@/ui/Typography.tsx";

type Props = InputProps & JSX.IntrinsicElements["input"];

export function Calendar({ label, ...rest }: Props) {
  return (
    <label class={labelStyle}>
      <Typography>{label}</Typography>
      <Typography
        id={rest.name}
        type="date"
        as="input"
        className={cx(formControlStyle, calendarStyle)}
        {...rest}
        defaultValue={new Date().toISOString().split("T")[0]}
      />
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
`;

const calendarStyle = css`
  height: 2.5rem;
  padding-inline: var(--size-3);
  cursor: pointer;

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    width: var(--size-3);
    height: var(--size-3);
    bottom: var(--size-3);
    right: var(--size-2);
    cursor: pointer;
  }
`;
