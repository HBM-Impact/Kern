import { css } from "hono/css";
import type { JSX } from "hono/jsx";
import { ChevronDown } from "@/ui/Icons/Chevron/Down.tsx";
import { Typography } from "@/ui/Typography.tsx";

type Props = {
  title: string;
} & JSX.IntrinsicElements["details"];

export function Accordion({ title, children }: Props) {
  return (
    <details class={detailsStyle}>
      <summary class={summaryStyle}>
        <Typography>{title}</Typography>
        <ChevronDown className={svgStyle} />
      </summary>
      <div class={contentStyle}>{children}</div>
    </details>
  );
}

const detailsStyle = css`
  display: grid;
  border: var(--border-size-1) solid var(--color-border);
  border-radius: var(--radius-2);
  padding-inline: var(--size-3);

  &::details-content {
    height: 0;
    overflow: hidden;
    transition:
      height 0.3s,
      content-visibility 0.3s;
    transition-behaviour: allow-discrete;
  }

  &[open] {
    gap: var(--size-2);

    & > summary > svg {
      transform: rotate(180deg);
    }

    &::details-content {
      height: auto;
      padding-bottom: var(--size-3);
    }
  }
`;

const summaryStyle = css`
  display: flex;
  cursor: pointer;
  align-items: center;
  background-color: transparent;
  border: none;
  justify-content: space-between;
  min-height: 2.5rem;
  gap: var(--size-2);

  &::-webkit-details-marker {
    display: none;
  }
`;

const svgStyle = css`
  height: var(--size-3);
  width: var(--size-3);
  transition: transform 0.3s var(--ease-in-out-3);
`;

const contentStyle = css`
  display: grid;
  gap: var(--size-3);
`;
