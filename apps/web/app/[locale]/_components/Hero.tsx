import { colors, radius, size } from "@repo/ui/tokens.stylex";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/primitives/link/LinkButton";

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: size[4],
    paddingBlock: size[10],
    paddingInline: size[5],
    backgroundColor: colors.bgMuted,
    borderRadius: radius[2],
  },
  subtitle: {
    maxWidth: "40ch",
  },
});

export function Hero() {
  return (
    <section {...stylex.props(styles.section)}>
      <Display as="h1" variant="display1">
        Quality products, delivered fast
      </Display>
      <div {...stylex.props(styles.subtitle)}>
        <Prose as="p" variant="body" muted>
          Browse our curated collection of electronics, fashion, and more.
        </Prose>
      </div>
      <LinkButton href="/products" icon={<ArrowRight size={16} />}>
        Browse Products
      </LinkButton>
    </section>
  );
}
