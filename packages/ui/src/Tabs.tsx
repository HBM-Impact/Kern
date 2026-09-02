"use client";

import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useId, useState } from "react";
import { colors, font, size } from "./tokens.stylex";
import { Prose } from "./typography/Prose";

type Props = {
  tabs: { label: string; content: ReactNode }[];
  defaultTab?: number;
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
  },
  tabs: {
    display: "flex",
    listStyle: "none",
    gap: size[3],
    overflowX: "auto",
    // Replaces `::-webkit-scrollbar { display: none }` — the standard property
    // covers the same browsers without a vendor pseudo-element.
    scrollbarWidth: "none",
  },
  tab: {
    transition: "border-bottom-color 0.2s ease-out",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: { default: "transparent", ":hover": colors.textMuted },
  },
  // `.tab.active` and `.tab:not(.active)` were compound-class selectors; the
  // active index is already known here, so they become conditional styles.
  tabActive: {
    borderBottomColor: colors.accent,
  },
  button: {
    backgroundColor: "transparent",
    borderStyle: "none",
    cursor: "pointer",
    paddingBlock: size[2],
    paddingInline: 0,
    transition: "color 0.15s ease-out",
    fontFamily: font.sans,
    fontSize: font.size1,
    fontWeight: 400,
    color: { default: colors.textMuted, ":hover": colors.text },
  },
  buttonActive: {
    color: colors.text,
  },
  panel: {
    display: "none",
  },
  panelActive: {
    display: "block",
  },
});

export function Tabs({ tabs, defaultTab = 0 }: Props) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const id = useId();

  return (
    <div {...stylex.props(styles.container)}>
      <ul {...stylex.props(styles.tabs)}>
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            {...stylex.props(
              styles.tab,
              activeTab === index && styles.tabActive,
            )}
            role="presentation"
          >
            <button
              {...stylex.props(
                styles.button,
                activeTab === index && styles.buttonActive,
              )}
              type="button"
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-controls={`${id}-panel-${index}`}
              aria-selected={activeTab === index}
              id={`${id}-tab-${index}`}
            >
              <Prose as="span" variant="body">
                {tab.label}
              </Prose>
            </button>
          </li>
        ))}
      </ul>
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          {...stylex.props(
            styles.panel,
            activeTab === index && styles.panelActive,
          )}
          id={`${id}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
