import { css, cx } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";

type Props<T extends keyof JSX.IntrinsicElements> = PropsWithChildren<{
  as?: T;
  className?: Promise<string>;
}> &
  JSX.IntrinsicElements[T];

export function Container<T extends keyof JSX.IntrinsicElements>({
  as,
  children,
  className,
  ...rest
}: Props<T>) {
  const Element = as ?? "div";

  return (
    <Element class={cx(className, containerStyle)} {...rest}>
      {children}
    </Element>
  );
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;
