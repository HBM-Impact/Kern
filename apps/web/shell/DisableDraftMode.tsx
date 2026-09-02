"use client";

import { colors, radius, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useVisualEditingEnvironment } from "next-sanity/hooks";

const styles = stylex.create({
  link: {
    position: "fixed",
    insetBlockEnd: size[3],
    insetInlineEnd: size[3],
    paddingBlock: size[2],
    paddingInline: size[3],
    borderRadius: radius[2],
    backgroundColor: colors.bgMuted,
    color: colors.text,
  },
});

export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();

  // Inside the Presentation tool the Studio already owns the toggle.
  if (
    environment === "presentation-iframe" ||
    environment === "presentation-window"
  ) {
    return null;
  }

  return (
    <a {...stylex.props(styles.link)} href="/api/draft-mode/disable">
      Disable Draft Mode
    </a>
  );
}
