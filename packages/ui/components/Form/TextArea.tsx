import { css, cx } from "hono/css";
import type { JSX } from "hono/jsx";
import { formControlStyle } from "@/ui/Form/styles.ts";
import type { InputProps } from "@/ui/Form/types.ts";
import { Typography } from "@/ui/Typography.tsx";

type Props = InputProps & JSX.IntrinsicElements["textarea"];

export function TextArea({ label, ...rest }: Props) {
  return (
    <label class={labelStyle}>
      <Typography>{label}</Typography>
      <Typography as="textarea" className={cx(formControlStyle, textareaStyle)} {...rest} />
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
`;

const textareaStyle = css`
  height: var(--size-11);
  padding: var(--size-3);
  resize: none;
  font-size: var(--font-size-1);

  &::placeholder {
    color: var(--color-text-muted);
    opacity: 0.7;
  }
`;
