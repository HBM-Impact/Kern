import { Display } from "@repo/ui/display";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Typography/Display",
  component: Display,
  args: {
    children: "Heading Text",
  },
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Uppercase: Story = {
  args: { variant: "display2", uppercase: true },
};
