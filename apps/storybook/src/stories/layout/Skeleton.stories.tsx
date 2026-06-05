import { Skeleton } from "@repo/ui/skeleton";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Skeleton",
  component: Skeleton,
  args: {
    width: "200px",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    shape: "circle",
    width: "48px",
    style: { height: "48px" },
  },
};

export const Body: Story = {
  args: { variant: "body" },
};

export const Label: Story = {
  args: { variant: "label" },
};

export const Display1: Story = {
  args: { variant: "display1" },
};

export const Display2: Story = {
  args: { variant: "display2" },
};

export const Display3: Story = {
  args: { variant: "display3" },
};

export const Display4: Story = {
  args: { variant: "display4" },
};

export const Button: Story = {
  args: { variant: "button" },
};

export const CardComposition: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "240px",
      }}
    >
      <Skeleton style={{ width: "100%", aspectRatio: "4/3" }} />
      <Skeleton variant="display4" width="60%" />
      <Skeleton variant="body" width="100%" />
      <Skeleton variant="body" width="80%" />
      <Skeleton variant="button" width="100%" />
    </div>
  ),
};
