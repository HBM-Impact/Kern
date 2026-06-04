import { css, cx } from "hono/css";
import type { JSX } from "hono/jsx";
import type { ButtonProps } from "@/ui/Button/types.ts";

type Props = Pick<ButtonProps, "icon"> &
  JSX.IntrinsicElements["button"] & {
    className?: Promise<string>;
  };

export function IconButton({ icon, className, ...rest }: Props) {
  return (
    <button type={rest.type || "button"} class={cx(buttonStyle, className)} {...rest}>
      {icon}
    </button>
  );
}

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  background-color: var(--color-bg);
  color: var(--color-text);
  border-width: var(--border-size-1);
  border-style: solid;
  border-color: var(--color-border);
  border-radius: var(--radius-2);
  transition:
    background-color 0.15s ease-out,
    border-color 0.15s ease-out;
  flex-shrink: 0;

  &:hover {
    background-color: var(--color-hover-bg);
    border-color: var(--color-text-muted);
  }

  &:active {
    background-color: var(--color-active-bg);
  }

  & > svg {
    height: var(--size-3);
    width: var(--size-3);
  }
`;
