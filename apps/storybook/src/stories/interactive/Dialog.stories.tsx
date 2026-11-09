import { Button } from "@repo/ui/buttons";
import { Dialog } from "@repo/ui/dialog";
import { Prose } from "@repo/ui/typography/prose";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Dialog",
  component: Dialog,
  args: {
    title: "Example dialog",
    variant: "center",
    trigger: <Button>Open dialog</Button>,
    children: (
      <Prose>
        This is the dialog content. Press Escape or click outside to close.
      </Prose>
    ),
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Center: Story = {
  args: { variant: "center" },
};

export const Aside: Story = {
  args: { variant: "aside" },
};
