import { Container } from "@repo/ui/container";
import { Display } from "@repo/ui/display";
import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart.",
};

export default function CartPage() {
  return (
    <Container as="section">
      <Display as="h1" variant="display2">
        Cart
      </Display>
      <CartView />
    </Container>
  );
}
