import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/CartView";
import { getRouteMeta } from "@/lib/sanity/route-meta";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getRouteMeta("/cart");

  return { title: meta?.title, description: meta?.description };
}

export default async function CartPage() {
  const meta = await getRouteMeta("/cart");

  return (
    <Container as="section">
      <Breadcrumbs items={[{ label: meta?.title ?? "" }]} />
      <PageHeader
        title={meta?.title ?? ""}
        description={meta?.description ?? undefined}
      />
      <CartView />
    </Container>
  );
}
