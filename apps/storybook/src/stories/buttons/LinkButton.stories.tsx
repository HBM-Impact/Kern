import { LinkButton } from "@repo/ui/buttons";
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";

const meta = {
  title: "Buttons/LinkButton",
  component: LinkButton,
  args: {
    children: "Go somewhere",
    href: "#",
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fill: Story = {
  args: { fill: true },
};

export const WithIcon: Story = {
  args: {
    icon: <ArrowRight size={16} />,
    children: "Learn more",
  },
};
