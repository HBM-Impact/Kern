"use client";

import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { type DetailsHTMLAttributes, useState } from "react";
import { border, colors, ease, radius, size } from "./tokens.stylex";
import { Prose } from "./typography/Prose";

type Props = {
  title: string;
} & DetailsHTMLAttributes<HTMLDetailsElement>;

const styles = stylex.create({
  details: {
    display: "grid",
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radius[2],
    paddingInline: size[3],
    // `[open]` was an attribute selector; `:open` is the pseudo-class form,
    // which StyleX can express.
    gap: { ":open": size[2] },
    "::details-content": {
      height: 0,
      overflow: "hidden",
      transition: "height 0.3s, content-visibility 0.3s",
      transitionBehavior: "allow-discrete",
    },
  },
  detailsOpen: {
    "::details-content": {
      height: "auto",
      paddingBottom: size[3],
    },
  },
  summary: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    backgroundColor: "transparent",
    borderStyle: "none",
    justifyContent: "space-between",
    minHeight: "2.5rem",
    gap: size[2],
    listStyle: "none",
  },
  icon: {
    height: size[3],
    width: size[3],
    flexShrink: 0,
    transition: `transform 0.3s ${ease.inOut3}`,
  },
  // `.details[open] > .summary > svg` reached through two combinators. The open
  // state is tracked here instead so the icon styles itself.
  iconOpen: {
    transform: "rotate(180deg)",
  },
  content: {
    display: "grid",
    gap: size[3],
  },
});

export function Accordion({ title, children, ...rest }: Props) {
  const [open, setOpen] = useState(Boolean(rest.open));

  return (
    <details
      {...stylex.props(styles.details, open && styles.detailsOpen)}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      {...rest}
    >
      <summary {...stylex.props(styles.summary)}>
        <Prose>{title}</Prose>
        <ChevronDown {...stylex.props(styles.icon, open && styles.iconOpen)} />
      </summary>
      <div {...stylex.props(styles.content)}>{children}</div>
    </details>
  );
}
