import { Calendar } from "@repo/ui/form/calendar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Calendar",
  component: Calendar,
  args: {
    label: "Delivery date",
    name: "delivery",
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
