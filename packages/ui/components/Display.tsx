import { css, cx } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";

type Props<T extends keyof JSX.IntrinsicElements> = PropsWithChildren<{
  uppercase?: boolean;
  as?: T;
  className?: Promise<string>;
  variant?: "display1" | "display2" | "display3" | "display4";
}> &
  JSX.IntrinsicElements[T];

export function Display<T extends keyof JSX.IntrinsicElements>({
  uppercase = false,
  as,
  variant,
  className,
  children,
  ...rest
}: Props<T>) {
  const Element = as ?? "h2";

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
    case "display1":
      args.push(h1Style);
      break;
    case "display2":
      args.push(h2Style);
      break;
    case "display3":
      args.push(h3Style);
      break;
    case "display4":
      args.push(h4Style);
      break;
    default:
      args.push(h2Style);
  }
  if (className) args.push(className);
  return cx(...args);
}

const baseStyle = css`
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: -0.025em;
`;

const h1Style = css`
  font-size: var(--font-size-6);
  line-height: var(--font-lineheight-0);
`;

const h2Style = css`
  font-size: var(--font-size-5);
  line-height: var(--font-lineheight-0);
`;

const h3Style = css`
  font-size: var(--font-size-4);
  line-height: var(--font-lineheight-1);
`;

const h4Style = css`
  font-size: var(--font-size-3);
  line-height: var(--font-lineheight-1);
`;

const uppercaseStyle = css`
  text-transform: uppercase;
`;
