import { Button } from "@repo/ui/buttons";
import { Dialog } from "@repo/ui/dialog";
import { Typography } from "@repo/ui/typography";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

function DialogDemo({
  type,
  title,
}: {
  type?: "center" | "aside";
  title: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Open dialog</Button>
      <Dialog ref={ref} type={type} title={title}>
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
