import { Button } from "@repo/ui/buttons";
import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";

const meta = {
  title: "Buttons/Button",
  component: Button,
  args: {
    children: "Click me",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fill: Story = {
  args: { fill: true },
};

export const WithIconLeft: Story = {
  args: {
    icon: <Search size={16} />,
    iconPosition: "left",
    children: "Search",
  },
};

export const WithIconRight: Story = {
  args: {
    icon: <Search size={16} />,
    iconPosition: "right",
    children: "Search",
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
