import { Select } from "@repo/ui/form/select";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Select",
  component: Select,
  args: {
    label: "Country",
    name: "country",
    options: [
      { value: "us", label: "United States" },
      { value: "gb", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StringOptions: Story = {
  args: {
    label: "Size",
    name: "size",
    options: ["XS", "S", "M", "L", "XL"],
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
