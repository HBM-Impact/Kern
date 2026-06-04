import type { JSX } from "hono/jsx";
import { getButtonStyle } from "@/ui/Button/styles.ts";
import type { ButtonProps } from "@/ui/Button/types.ts";
import { Typography } from "@/ui/Typography.tsx";

type Props = ButtonProps & JSX.IntrinsicElements["button"];

export function Button({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  disabled = false,
  ...rest
}: Props) {
  const fallbackLabel = typeof children === "string" ? children : undefined;
  return (
    <Typography
      as="button"
      variant="body"
      type={rest.type || "button"}
      className={getButtonStyle({ iconPosition, fill })}
      disabled={disabled}
      aria-label={fallbackLabel}
      {...rest}
    >
      {children}
      {icon}
    </Typography>
  );
}
