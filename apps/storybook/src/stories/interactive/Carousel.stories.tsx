import { Carousel } from "@repo/ui/carousel";
import type { Meta, StoryObj } from "@storybook/react";

function Card({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 200,
        height: 120,
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </div>
  );
}

const meta = {
  title: "Interactive/Carousel",
  component: Carousel,
  args: {
    title: "Featured Products",
    description: "Scroll to explore",
    children: Array.from({ length: 6 }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static demo array, order never changes
      <Card key={i} label={`Item ${i + 1}`} />
    )),
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoDescription: Story = {
  args: { description: undefined },
};
