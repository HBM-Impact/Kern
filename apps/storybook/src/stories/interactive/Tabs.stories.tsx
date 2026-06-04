import { Tabs } from "@repo/ui/tabs";
import { Typography } from "@repo/ui/typography";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Tabs",
  component: Tabs,
  args: {
    tabs: [
      {
        label: "Overview",
        content: <Typography>Product overview content goes here.</Typography>,
      },
      {
        label: "Specifications",
        content: <Typography>Technical specifications go here.</Typography>,
      },
      {
        label: "Reviews",
        content: <Typography>Customer reviews go here.</Typography>,
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
