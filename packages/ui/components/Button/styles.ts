import { css, cx } from "hono/css";
import type { ButtonProps } from "@/ui/Button/types.ts";

export function getButtonStyle({ fill, iconPosition }: Pick<ButtonProps, "fill" | "iconPosition">) {
  const args = [baseStyle];
  if (iconPosition === "left") args.push(flexReverseStyle);
  if (fill) args.push(fillStyle);

  return cx(...args);
}

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding-inline: var(--size-3);
  cursor: pointer;
  width: fit-content;
  background-color: var(--color-bg);
  color: var(--color-text);
  border-width: var(--border-size-1);
  border-style: solid;
  border-color: var(--color-border);
  border-radius: var(--radius-2);
  transition:
    background-color 0.15s ease-out,
    border-color 0.15s ease-out;
  gap: var(--size-2);
  flex-shrink: 0;
  font-size: var(--font-size-1);

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

const flexReverseStyle = css`
  flex-direction: row-reverse;
`;

const fillStyle = css`
  width: 100%;
`;
