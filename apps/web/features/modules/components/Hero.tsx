import { colors, radius, size } from "@repo/ui/tokens.stylex";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { stegaClean } from "next-sanity";
import type { ModuleOf } from "@/features/modules/types";
import { LinkButton } from "@/primitives/link/LinkButton";

type Props = ModuleOf<"heroModule">;

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

export function Hero({ heading, subheading, cta }: Props) {
  // An href carries no visible text, so the edit metadata would corrupt it.
  const route = stegaClean(cta?.route);

  return (
    <section {...stylex.props(styles.section)}>
      <Display as="h1" variant="display1">
        {heading}
      </Display>
      {subheading ? (
        <div {...stylex.props(styles.subtitle)}>
          <Prose as="p" variant="body" muted>
            {subheading}
          </Prose>
        </div>
      ) : null}
      {route ? (
        <LinkButton href={route} icon={<ArrowRight size={16} />}>
          {cta?.label}
        </LinkButton>
      ) : null}
    </section>
  );
}
