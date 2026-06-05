import { Tabs } from "@repo/ui/tabs";
import { Prose } from "@repo/ui/typography/prose";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Tabs",
  component: Tabs,
  args: {
    tabs: [
      {
        label: "Overview",
        content: <Prose>Product overview content goes here.</Prose>,
      },
      {
        label: "Specifications",
        content: <Prose>Technical specifications go here.</Prose>,
      },
      {
        label: "Reviews",
        content: <Prose>Customer reviews go here.</Prose>,
      },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultTabTwo: Story = {
  args: { defaultTab: 1 },
};
