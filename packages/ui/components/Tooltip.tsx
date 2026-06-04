import { css, cx } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{
  content: string;
  position?: "top" | "bottom";
  className?: Promise<string>;
}>;

export function Tooltip({ content, position = "top", children, className }: Props) {
  return (
    <span
      class={cx(tooltipStyle, position === "bottom" && bottomStyle, className)}
      data-tooltip={content}
    >
      {children}
    </span>
  );
}

const tooltipStyle = css`
  display: inline-flex;
  anchor-name: --tooltip-anchor;
  anchor-scope: --tooltip-anchor;

  &::after {
    content: attr(data-tooltip);
    position: fixed;
    position-anchor: --tooltip-anchor;
    bottom: anchor(top);
    justify-self: anchor-center;
    margin-bottom: var(--size-1);
    padding: var(--size-1) var(--size-2);
    font-size: var(--font-size-0);
    color: var(--color-text);
    background: var(--color-bg-elevated);
    border-radius: var(--radius-2);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s var(--ease-3);
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
  }
`;

const bottomStyle = css`
  &::after {
    bottom: auto;
    top: anchor(bottom);
    margin-bottom: 0;
    margin-top: var(--size-1);
  }
`;
