import { css, cx } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";

type Props<T extends keyof JSX.IntrinsicElements> = PropsWithChildren<{
  uppercase?: boolean;
  as?: T;
  className?: Promise<string>;
  variant?: "body" | "label";
}> &
  JSX.IntrinsicElements[T];

export function Typography<T extends keyof JSX.IntrinsicElements>({
  uppercase = false,
  as,
  variant,
  className,
  children,
  ...rest
}: Props<T>) {
  const Element = as ?? "p";

  return (
    <Element class={getVariantStyle(variant, className, uppercase)} {...rest}>
      {children}
    </Element>
  );
}

function getVariantStyle(
  variant: Props<keyof JSX.IntrinsicElements>["variant"],
  className: Props<keyof JSX.IntrinsicElements>["className"],
  uppercase: Props<keyof JSX.IntrinsicElements>["uppercase"],
) {
  const args = [baseStyle];

  if (uppercase) args.push(uppercaseStyle);

  switch (variant) {
    case "body":
      args.push(bodyStyle);
      break;
    case "label":
      args.push(labelStyle);
      break;
    default:
      args.push(bodyStyle);
  }
  if (className) args.push(className);
  return cx(...args);
}

const baseStyle = css`
  font-family: var(--font-sans);
`;

const bodyStyle = css`
  font-size: var(--font-size-1);
  font-weight: 400;
  line-height: var(--font-lineheight-3);
`;

const labelStyle = css`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: var(--font-lineheight-2);
`;

const uppercaseStyle = css`
  text-transform: uppercase;
`;
