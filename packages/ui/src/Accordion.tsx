"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { type ReactNode, useState } from "react";
import { border, colors, ease, radius, size } from "./tokens.stylex";
import { Prose } from "./typography/Prose";

type Props = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

const styles = stylex.create({
  root: {
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radius[2],
    paddingInline: size[3],
  },
  trigger: {
    display: "flex",
    width: "100%",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "2.5rem",
    gap: size[2],
    padding: 0,
    backgroundColor: "transparent",
    borderStyle: "none",
    color: "inherit",
    textAlign: "start",
  },
  icon: {
    height: size[3],
    width: size[3],
    flexShrink: 0,
    transition: `transform 0.3s ${ease.inOut3}`,
  },
  iconOpen: {
    transform: "rotate(180deg)",
  },
  // Base UI measures the content into this variable so height can animate.
  panel: {
    height: "var(--collapsible-panel-height)",
    overflow: "hidden",
    transition: "height 0.3s",
  },
  panelHidden: {
    height: 0,
  },
  content: {
    display: "grid",
    gap: size[3],
    paddingBottom: size[3],
  },
});

export function Accordion({ title, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      {...stylex.props(styles.root)}
    >
      <Collapsible.Trigger {...stylex.props(styles.trigger)}>
        <Prose as="span">{title}</Prose>
        <ChevronDown {...stylex.props(styles.icon, open && styles.iconOpen)} />
      </Collapsible.Trigger>
      <Collapsible.Panel
        className={({ transitionStatus: t }) =>
          stylex.props(
            styles.panel,
            (t === "starting" || t === "ending") && styles.panelHidden,
          ).className
        }
      >
        <div {...stylex.props(styles.content)}>{children}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
