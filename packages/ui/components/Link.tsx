import { css } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";
import { Typography } from "@/ui/Typography.tsx";

type Props = PropsWithChildren<JSX.IntrinsicElements["a"]>;

export function Link({ children, ...rest }: Props) {
  const fallbackTitle = typeof children === "string" ? children : undefined;
  return (
    <Typography as="a" title={fallbackTitle} class={baseStyle} {...rest}>
      {children}
    </Typography>
  );
}

const baseStyle = css`
  color: inherit;
  position: relative;
  text-decoration: none;
  width: fit-content;
  padding-block: var(--size-2);
  transition: color 0.3s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: currentColor;
    opacity: 0.5;
    transition: width 0.3s ease-out;
  }

  &:hover {
    color: var(--color-accent);
  }

  &:hover::after {
    width: 100%;
  }
`;
