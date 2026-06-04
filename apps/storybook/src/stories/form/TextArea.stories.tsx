import { TextArea } from "@repo/ui/form/text-area";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/TextArea",
  component: TextArea,
  args: {
    label: "Message",
    name: "message",
    placeholder: "Write something...",
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Hello, world!" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
