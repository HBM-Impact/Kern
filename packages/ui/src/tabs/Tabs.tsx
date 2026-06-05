"use client";

import clsx from "clsx";
import { type ReactNode, useId, useState } from "react";
import { Prose } from "../typography/prose";
import styles from "./Tabs.module.css";

type Props = {
  tabs: { label: string; content: ReactNode }[];
  defaultTab?: number;
};

export function Tabs({ tabs, defaultTab = 0 }: Props) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const id = useId();

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
          className={clsx(styles.panel, activeTab === index && styles.active)}
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
