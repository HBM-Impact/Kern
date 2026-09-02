import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/CartView";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart.",
};

export default function CartPage() {
  return (
    <Container as="section">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <PageHeader title="Cart" description="Your shopping cart." />
      <CartView />
    </Container>
  );
}
