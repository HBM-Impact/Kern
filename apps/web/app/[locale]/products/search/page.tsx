import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { SearchSection } from "@/features/products/components/search-section";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

export const metadata = {
  title: "Search Products",
  description: "Find products by name, brand, or description.",
} satisfies Metadata;

export default async function SearchPage({
  params,
}: PageProps<"/[locale]/products/search">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <Container as="section">
      <Breadcrumbs
        locale={locale}
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
