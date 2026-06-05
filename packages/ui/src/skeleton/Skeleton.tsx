import clsx from "clsx";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import styles from "./Skeleton.module.css";


type Props = {
  shape?: "rect" | "circle";
  variant?: | "body"
  | "label"
  | "display1"
  | "display2"
  | "display3"
  | "display4"
  | "button";
  width?: CSSProperties["width"];
} & ComponentPropsWithoutRef<"div">;

export function Skeleton({
  shape = "rect",
  variant,
  width,
  className,
  style,
  ...rest
}: Props) {
  return (
    <div
      className={clsx(
        styles.base,
        shape === "circle" && styles.circle,
        variant && styles[variant],
        className,
      )}
      style={width !== undefined ? { width, ...style } : style}
      {...rest}
    />
  );
}
