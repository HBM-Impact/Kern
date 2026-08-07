import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/cart-view";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

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
