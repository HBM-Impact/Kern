import { css, cx } from "hono/css";
import type { JSX } from "hono/jsx";
import { formControlStyle } from "@/ui/Form/styles.ts";
import type { InputProps } from "@/ui/Form/types.ts";
import { Typography } from "@/ui/Typography.tsx";

type Props = InputProps & JSX.IntrinsicElements["input"];

export function Input({ label, ...rest }: Props) {
  return (
    <label class={labelStyle}>
      <Typography variant="body">{label}</Typography>
      <Typography as="input" className={cx(formControlStyle, inputStyle)} {...rest} />
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
`;

const inputStyle = css`
  height: 2.5rem;
  padding-inline: var(--size-3);
  font-size: var(--font-size-1);

  &::placeholder {
    color: var(--color-text-muted);
    opacity: 0.7;
  }
`;
