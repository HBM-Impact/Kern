import { Input } from "@repo/ui/form/input";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Input",
  component: Input,
  args: {
    label: "Email",
    name: "email",
    placeholder: "you@example.com",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "hello@example.com" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
