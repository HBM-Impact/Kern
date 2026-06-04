import { Container } from "@repo/ui/container";
import { Display } from "@repo/ui/display";
import type { Metadata } from "next";
import { FavoritesView } from "@/features/favorites/components/favorites-view";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved products.",
};

export default function FavoritesPage() {
  return (
    <Container as="section">
      <Display as="h1" variant="display2">
        Favorites
      </Display>
      <FavoritesView />
    </Container>
  );
}
