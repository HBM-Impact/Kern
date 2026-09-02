import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchSection } from "@/features/products/components/SearchSection";
import { getRouteMeta } from "@/lib/sanity/route-meta";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getRouteMeta("/products/search");

  return { title: meta?.title, description: meta?.description };
}

export default async function SearchPage() {
  // The ancestor crumb reads its own route so no label stays hardcoded here.
  const [meta, parent] = await Promise.all([
    getRouteMeta("/products/search"),
    getRouteMeta("/products"),
  ]);

  return (
    <Container as="section">
      <Breadcrumbs
        items={[
          { href: "/products", label: parent?.title ?? "" },
          { label: meta?.title ?? "" },
        ]}
      />
      <PageHeader
        title={meta?.title ?? ""}
        description={meta?.description ?? undefined}
      />
      <Suspense>
        <SearchSection />
      </Suspense>
    </Container>
  );
}
