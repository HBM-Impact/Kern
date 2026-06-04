import { Accordion } from "@repo/ui/accordion";
import { Typography } from "@repo/ui/typography";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Accordion",
  component: Accordion,
  args: {
    title: "What is your return policy?",
    children: (
      <Typography>
        We offer a 30-day return policy on all items in original condition.
      </Typography>
    ),
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { open: true },
};
