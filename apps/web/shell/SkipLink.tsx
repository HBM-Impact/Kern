import { colors, ease, radius, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  skipLink: {
    position: "absolute",
    left: size[3],
    paddingBlock: size[2],
    paddingInline: size[3],
    backgroundColor: colors.accent,
    color: colors.text,
    borderRadius: radius[2],
    fontWeight: 600,
    zIndex: 100,
    transition: `top 0.3s ${ease.inOut3}`,
    top: { default: "-100%", ":focus": size[3] },
  },
});

export function SkipLink() {
  return (
    <a href="#main-content" {...stylex.props(styles.skipLink)}>
      Skip to main content
    </a>
  );
}
