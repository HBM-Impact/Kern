import { Container } from "@repo/ui/container";
import { Prose } from "@repo/ui/typography/prose";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Container",
  component: Container,
  args: {
    children: <Prose>Content inside a container.</Prose>,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsSection: Story = {
  args: { as: "section" },
};
