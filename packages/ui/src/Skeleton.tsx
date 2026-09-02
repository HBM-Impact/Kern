import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { colors, radius } from "./tokens.stylex";

type Variant =
  | "body"
  | "label"
  | "display1"
  | "display2"
  | "display3"
  | "display4"
  | "button";

type Props = {
  shape?: "rect" | "circle" | "square";
  variant?: Variant;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  lines?: number;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * Each variant's height matches the line box of the typography it stands in
 * for. Was a `--skeleton-line-height` custom property per variant class.
 */
const LINE_HEIGHT: Record<Variant, string> = {
  body: "calc(var(--font-size-1) * var(--font-lineheight-3))",
  label: "calc(0.875rem * var(--font-lineheight-2))",
  display1: "calc(var(--font-size-6) * var(--font-lineheight-0))",
  display2: "calc(var(--font-size-5) * var(--font-lineheight-0))",
  display3: "calc(var(--font-size-4) * var(--font-lineheight-1))",
  display4: "calc(var(--font-size-3) * var(--font-lineheight-1))",
  button: "2.5rem",
};

const shimmer = stylex.keyframes({
  "0%": { backgroundPosition: "200% 0" },
  "100%": { backgroundPosition: "-200% 0" },
});

const styles = stylex.create({
  base: {
    backgroundImage: `linear-gradient(90deg, ${colors.bgElevated} 25%, ${colors.bgMuted} 50%, ${colors.bgElevated} 75%)`,
    backgroundSize: "200% 100%",
    borderRadius: radius[2],
    animationName: shimmer,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDuration: {
      default: "1.5s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
  },
  circle: {
    borderRadius: radius.round,
  },
  // Square corners, for placeholders that sit flush against a clipped edge.
  square: {
    borderRadius: 0,
  },
  box: (height: Props["height"], width: Props["width"]) => ({
    height: height ?? null,
    width: width ?? null,
  }),
});

export function Skeleton({
  shape = "rect",
  variant,
  width,
  height,
  lines,
  ...rest
}: Props) {
  const line = variant ? LINE_HEIGHT[variant] : null;
  const lineHeight = line && lines ? `calc(${lines} * ${line})` : line;

  return (
    <div
      {...stylex.props(
        styles.base,
        shape === "circle" && styles.circle,
        shape === "square" && styles.square,
        styles.box(height ?? lineHeight ?? undefined, width),
      )}
      {...rest}
    />
  );
}
