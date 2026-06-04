type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} satisfies Record<BreakpointKey, number>;

type Sizes = Partial<Record<BreakpointKey, string>> & { default: string };

export function createImageSizes({
  default: fallback,
  ...breakpoints
}: Sizes): string {
  const conditions = (Object.entries(breakpoints) as [BreakpointKey, string][])
    .sort(([a], [b]) => breakpointValues[a] - breakpointValues[b])
    .map(([key, size]) => `(max-width: ${breakpointValues[key]}px) ${size}`);

  return [...conditions, fallback].join(", ");
}
