import { Link } from "@repo/ui/link";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Link",
  component: Link,
  args: {
    children: "Visit our homepage",
    href: "#",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const External: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "Open in new tab",
  },
};
