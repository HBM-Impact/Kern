import { Container } from "@repo/ui/container";
import { CartView } from "@/features/cart/components/CartView";
import { RouteHead, routeMetadata } from "@/shell/RouteHead";

export const generateMetadata = () => routeMetadata("/cart");

export default function CartPage() {
  return (
    <Container as="section">
      <RouteHead route="/cart" />
      <CartView />
    </Container>
  );
}
