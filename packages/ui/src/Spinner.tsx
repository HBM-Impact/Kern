import * as stylex from "@stylexjs/stylex";

const spin = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
});

const styles = stylex.create({
  spinner: {
    transformOrigin: "center",
    transformBox: "fill-box",
    animationName: spin,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDuration: {
      default: "0.75s",
      "@media (prefers-reduced-motion: reduce)": "2s",
    },
  },
});

export function Spinner() {
  return (
    <svg
      {...stylex.props(styles.spinner)}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="28 10"
      />
    </svg>
  );
}
