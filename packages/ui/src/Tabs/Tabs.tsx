import clsx from "clsx";
import type { ReactNode } from "react";
import { Typography } from "../Typography/Typography";
import styles from "./Tabs.module.css";

type Props = {
  tabs: { label: string; content: ReactNode }[];
  activeTab?: number;
};

export function Tabs({ tabs, activeTab = 0 }: Props) {
  return (
    <div
      className={styles.container}
      x-data={`{ activeTab: ${activeTab}, setActiveTab(index) { this.activeTab = index } }`}
    >
      <ul className={styles.tabs}>
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            className={clsx(styles.tab, activeTab === index && styles.active)}
            role="presentation"
            {...{ ":class": `{ '${styles.active}': activeTab === ${index} }` }}
          >
            <button
              type="button"
              {...{ "x-on:click": `setActiveTab(${index})` }}
              role="tab"
              aria-controls={`tab-content-${index}`}
              aria-selected={activeTab === index}
              {...{
                "x-bind:aria-selected": `(activeTab === ${index}).toString()`,
              }}
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
          {...{ ":class": `{ '${styles.active}': activeTab === ${index} }` }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
