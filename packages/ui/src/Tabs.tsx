"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
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
  list: {
    display: "flex",
    gap: size[3],
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tab: {
    backgroundColor: "transparent",
    borderStyle: "none",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: { default: "transparent", ":hover": colors.textMuted },
    cursor: "pointer",
    paddingBlock: size[2],
    paddingInline: 0,
    transition: "color 0.15s ease-out, border-bottom-color 0.2s ease-out",
    fontFamily: font.sans,
    fontSize: font.size1,
    fontWeight: 400,
    color: { default: colors.textMuted, ":hover": colors.text },
  },
  tabActive: {
    color: colors.text,
    borderBottomColor: colors.accent,
  },
});

export function Tabs({ tabs, defaultTab = 0 }: Props) {
  return (
    <BaseTabs.Root
      defaultValue={defaultTab}
      {...stylex.props(styles.container)}
    >
      <BaseTabs.List {...stylex.props(styles.list)}>
        {tabs.map((tab, index) => (
          <BaseTabs.Tab
            key={tab.label}
            value={index}
            className={({ active }) =>
              stylex.props(styles.tab, active && styles.tabActive).className
            }
          >
            <Prose as="span" variant="body">
              {tab.label}
            </Prose>
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {tabs.map((tab, index) => (
        <BaseTabs.Panel key={tab.label} value={index}>
          {tab.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
