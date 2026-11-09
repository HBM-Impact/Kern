import { Container } from "@repo/ui/container";
import { FavoritesView } from "@/features/favorites/components/favorites-view/FavoritesView";
import { RouteHead, routeMetadata } from "@/shell/RouteHead";

export const generateMetadata = () => routeMetadata("/favorites");

export default function FavoritesPage() {
  return (
    <Container as="section">
      <RouteHead route="/favorites" />
      <FavoritesView />
    </Container>
  );
}
