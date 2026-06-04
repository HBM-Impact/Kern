import { IconButton } from "@repo/ui/buttons/icon-button";
import type { Meta, StoryObj } from "@storybook/react";
import { Heart } from "lucide-react";

const meta = {
  title: "Buttons/IconButton",
  component: IconButton,
  args: {
    icon: <Heart size={16} />,
    "aria-label": "Favorite",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
