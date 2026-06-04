import { Button } from "@repo/ui/buttons";
import { Tooltip } from "@repo/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Tooltip",
  component: Tooltip,
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
  decorators: [
    (Story) => (
      <div
        style={{ padding: "4rem", display: "flex", justifyContent: "center" }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: { position: "top" },
};

export const Bottom: Story = {
  args: { position: "bottom" },
};
