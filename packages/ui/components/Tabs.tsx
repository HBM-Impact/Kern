import { css, cx } from "hono/css";
import type { Child } from "hono/jsx";
import { Typography } from "@/ui/Typography.tsx";
import { applyConditionalClassAlpine } from "@/utils/alpine/applyConditionalClassAlpine.ts";

type Props = {
  tabs: { label: string; content: Child }[];
  activeTab?: number;
};

export function Tabs({ tabs, activeTab = 0 }: Props) {
  return (
    <div
      class={tabsContainerStyle}
      x-data={`{ activeTab: ${activeTab}, setActiveTab(index) { this.activeTab = index } }`}
    >
      <ul class={tabsStyle}>
        {tabs.map((tab, index) => (
          <li
            class={cx(tabStyle, activeTab === index ? "active" : "")}
            key={tab.label}
            role="presentation"
            {...applyConditionalClassAlpine({
              className: "active",
              condition: `activeTab === ${index}`,
            })}
          >
            <button
              type="button"
              x-on:click={`setActiveTab(${index})`}
              role="tab"
              aria-controls={`tab-content-${index}`}
              aria-selected={activeTab === index ? "true" : "false"}
              x-bind:aria-selected={`(activeTab === ${index}).toString()`}
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
          class={cx(sectionStyle, activeTab === index ? "active" : "")}
          key={tab.label}
          id={`tab-content-${index}`}
          role="tabpanel"
          aria-labelledby={`tab-${index}`}
          {...applyConditionalClassAlpine({
            className: "active",
            condition: `activeTab === ${index}`,
          })}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

const tabsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;

const tabsStyle = css`
  display: flex;
  list-style: none;
  gap: var(--size-3);
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const tabStyle = css`
  transition: border-bottom-color 0.2s ease-out;
  border-bottom: 1px solid transparent;

  & > button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--size-2) 0;
    transition: color 0.15s ease-out;
  }

  & > button:hover {
    color: var(--color-text);
  }

  &:not(.active) > button {
    color: var(--color-text-muted);
  }

  &.active {
    border-bottom-color: var(--color-accent);
  }

  &:hover:not(.active) {
    border-bottom-color: var(--color-text-muted);
  }
`;

const sectionStyle = css`
  display: none;

  &.active {
    display: block;
  }
`;
