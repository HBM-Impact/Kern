import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { FavoritesView } from "@/features/favorites/components/favorites-view";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved products.",
};

export default function FavoritesPage() {
  return (
    <Container as="section">
      <Breadcrumbs items={[{ label: "Favorites" }]} />
      <PageHeader title="Favorites" description="Your saved products." />
      <FavoritesView />
    </Container>
  );
}
