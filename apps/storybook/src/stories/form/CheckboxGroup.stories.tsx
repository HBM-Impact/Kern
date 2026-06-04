import { CheckboxGroup } from "@repo/ui/form/checkbox-group";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/CheckboxGroup",
  component: CheckboxGroup,
  args: {
    label: "Interests",
    name: "interests",
    options: [
      { label: "Design", name: "interests", value: "design" },
      { label: "Engineering", name: "interests", value: "engineering" },
      { label: "Marketing", name: "interests", value: "marketing" },
    ],
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
