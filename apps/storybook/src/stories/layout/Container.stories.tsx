import { Container } from "@repo/ui/container";
import { Typography } from "@repo/ui/typography";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Container",
  component: Container,
  args: {
    children: <Typography>Content inside a container.</Typography>,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsSection: Story = {
  args: { as: "section" },
};
