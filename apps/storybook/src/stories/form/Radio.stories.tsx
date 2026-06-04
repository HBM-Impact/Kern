import { Radio } from "@repo/ui/form/radio";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Radio",
  component: Radio,
  args: {
    label: "Option A",
    name: "choice",
    value: "a",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
