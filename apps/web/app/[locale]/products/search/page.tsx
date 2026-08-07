import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchSection } from "@/features/products/components/search-section";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

export const metadata = {
  title: "Search Products",
  description: "Find products by name, brand, or description.",
} satisfies Metadata;

export default function SearchPage() {
  return (
    <Container as="section">
      <Breadcrumbs
        items={[{ href: "/products", label: "Products" }, { label: "Search" }]}
      />
      <PageHeader
        title="Search"
        description="Find products by name, brand, or description."
      />
      <Suspense>
        <SearchSection />
      </Suspense>
    </Container>
  );
}
