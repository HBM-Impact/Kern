import { Checkbox } from "@repo/ui/form/checkbox";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
  args: {
    label: "Accept terms",
    name: "terms",
    value: "accepted",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
