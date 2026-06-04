"use client";

import clsx from "clsx";
import { type ReactNode, useState } from "react";
import { Typography } from "../Typography/Typography";
import styles from "./Tabs.module.css";

type Props = {
  tabs: { label: string; content: ReactNode }[];
  defaultTab?: number;
};

export function Tabs({ tabs, defaultTab = 0 }: Props) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={styles.container}>
      <ul className={styles.tabs}>
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            className={clsx(styles.tab, activeTab === index && styles.active)}
            role="presentation"
          >
            <button
              type="button"
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-controls={`tab-content-${index}`}
              aria-selected={activeTab === index}
              id={`tab-${index}`}
            >
              <Typography as="span" variant="body">
                {tab.label}
              </Typography>
            </button>
          </li>
        ))}
      </ul>
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          className={clsx(styles.panel, activeTab === index && styles.active)}
          id={`tab-content-${index}`}
          role="tabpanel"
          aria-labelledby={`tab-${index}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
