import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SearchForm } from "@/features/products/components/search-form";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";
import { SearchResults } from "./_components/SearchResults";

export const metadata = {
  title: "Search Products",
  description: "Find products by name, brand, or description.",
} satisfies Metadata;

export default async function SearchPage({
  params,
  searchParams,
}: PageProps<"/[locale]/products/search">) {
  const { locale } = await params;
  const { q, sort } = await searchParams;
  setRequestLocale(locale as Locale);

  const query = typeof q === "string" ? q : undefined;
  const sortStr = typeof sort === "string" ? sort : undefined;

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
      <SearchForm q={query} />
      {query ? <SearchResults q={query} sort={sortStr} /> : null}
    </Container>
  );
}
