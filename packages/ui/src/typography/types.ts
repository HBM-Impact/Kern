import type { ComponentPropsWithoutRef, ElementType } from "react";

export type TypographyBaseProps<T extends ElementType> = {
  as?: T;
  uppercase?: boolean;
  truncate?: boolean;
  lines?: number;
  muted?: boolean;
  noWrap?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "className">;
