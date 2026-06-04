import { Button } from "@repo/ui/buttons";
import { Dialog, useDialogStore } from "@repo/ui/dialog";
import { Typography } from "@repo/ui/typography";
import type { Meta, StoryObj } from "@storybook/react";

function DialogDemo({
  type,
  title,
}: {
  type?: "center" | "aside";
  title: string;
}) {
  const dialog = useDialogStore({ onClose: () => console.log("I closed it")});
  return (
    <>
      <Button onClick={dialog.open}>Open dialog</Button>
      <Dialog store={dialog} type={type} title={title}>
        <Typography>
          This is the dialog content. Press Escape or click outside to close.
        </Typography>
      </Dialog>
    </>
  );
}

const meta = {
  title: "Interactive/Dialog",
  component: DialogDemo,
  args: {
    title: "Example dialog",
    type: "center",
  },
} satisfies Meta<typeof DialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Center: Story = {
  args: { type: "center" },
};

export const Aside: Story = {
  args: { type: "aside" },
};
