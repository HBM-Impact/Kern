import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { FavoritesView } from "@/features/favorites/components/favorites-view/FavoritesView";
import { getRouteMeta } from "@/lib/sanity/route-meta";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getRouteMeta("/favorites");

  return { title: meta?.title, description: meta?.description };
}

export default async function FavoritesPage() {
  const meta = await getRouteMeta("/favorites");

  return (
    <Container as="section">
      <Breadcrumbs items={[{ label: meta?.title ?? "" }]} />
      <PageHeader
        title={meta?.title ?? ""}
        description={meta?.description ?? undefined}
      />
      <FavoritesView />
    </Container>
  );
}
