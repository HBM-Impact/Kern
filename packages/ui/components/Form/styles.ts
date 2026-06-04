import { css } from "hono/css";

export const formControlStyle = css`
  border-width: var(--border-size-1);
  border-style: solid;
  border-color: var(--color-border);
  border-radius: var(--radius-2);
  background-color: transparent;
  outline: none;
  transition: border-color 0.15s ease-out;

  &:hover {
    border-color: var(--color-text-muted);
  }

  &:focus-visible {
    border-color: var(--color-accent);
    box-shadow: none;
  }
`;
