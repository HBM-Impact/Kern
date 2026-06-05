import { Prose } from "@repo/ui/typography/prose";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Typography/Prose",
  component: Prose,
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: { variant: "body" },
};

export const Label: Story = {
  args: { variant: "label" },
};

export const Uppercase: Story = {
  args: { uppercase: true },
};
