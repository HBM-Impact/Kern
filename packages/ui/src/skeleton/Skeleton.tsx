import clsx from "clsx";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import styles from "./Skeleton.module.css";

type Props = {
  shape?: "rect" | "circle";
  variant?:
    | "body"
    | "label"
    | "display1"
    | "display2"
    | "display3"
    | "display4"
    | "button";
  width?: CSSProperties["width"];
  lines?: number;
} & ComponentPropsWithoutRef<"div">;

export function Skeleton({
  shape = "rect",
  variant,
  width,
  lines,
  className,
  style,
  ...rest
}: Props) {
  const inlineStyle: CSSProperties = {
    ...(width !== undefined && { width }),
    ...(lines !== undefined && {
      height: `calc(${lines} * var(--skeleton-line-height))`,
    }),
    ...style,
  };

  return (
    <div
      className={clsx(
        styles.base,
        shape === "circle" && styles.circle,
        variant && styles[variant],
        className,
      )}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      {...rest}
    />
  );
}
