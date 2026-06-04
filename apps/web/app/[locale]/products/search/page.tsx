import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/features/layout/page-header";
import { SearchForm } from "@/features/products/components/search-form";
import { SearchResults } from "./_components/search-results";

export const metadata = {
  title: "Search Products",
  description: "Find products by name, brand, or description.",
} satisfies Metadata;

export default async function SearchRoute({
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
      <PageHeader
        title="Search"
        description="Find products by name, brand, or description."
      />
      <SearchForm q={query} />
      {query ? <SearchResults q={query} sort={sortStr} /> : null}
    </Container>
  );
}
