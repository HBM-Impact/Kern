import type { JSX } from "hono/jsx";
import { getButtonStyle } from "@/ui/Button/styles.ts";
import type { ButtonProps } from "@/ui/Button/types.ts";
import { Typography } from "@/ui/Typography.tsx";

type Props = ButtonProps & JSX.IntrinsicElements["a"];

export function LinkButton({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  ...rest
}: Props) {
  const fallbackTitle = typeof children === "string" ? children : undefined;
  return (
    <Typography
      as="a"
      variant="body"
      title={fallbackTitle}
      class={getButtonStyle({ iconPosition, fill })}
      {...rest}
    >
      {children}
      {icon ? icon : null}
    </Typography>
  );
}
