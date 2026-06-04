import { Table } from "@repo/ui/table";
import type { Meta, StoryObj } from "@storybook/react";

type Product = {
  name: string;
  category: string;
  price: number;
  stock: number;
};

const data: Product[] = [
  { name: "Wireless Headphones", category: "Audio", price: 79.99, stock: 42 },
  { name: "Mechanical Keyboard", category: "Input", price: 129.99, stock: 18 },
  { name: "USB-C Hub", category: "Accessories", price: 49.99, stock: 76 },
  { name: "Webcam HD", category: "Video", price: 89.99, stock: 5 },
];

const columns = [
  { label: "Product", value: (row: Product) => row.name },
  { label: "Category", value: (row: Product) => row.category },
  {
    label: "Price",
    value: (row: Product) => `$${row.price.toFixed(2)}`,
  },
  { label: "Stock", value: (row: Product) => row.stock },
];

const meta = {
  title: "Interactive/Table",
  component: Table<Product>,
  args: { data, columns },
} satisfies Meta<typeof Table<Product>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { data: [] },
};
