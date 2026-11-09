import { RadioGroup } from "@repo/ui/form/radio-group";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/RadioGroup",
  component: RadioGroup,
  args: {
    label: "Shipping method",
    name: "shipping",
    options: [
      { label: "Standard (3–5 days)", value: "standard" },
      { label: "Express (1–2 days)", value: "express" },
      { label: "Overnight", value: "overnight" },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
