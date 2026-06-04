import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { Container } from "@repo/ui/container";
import { Link } from "@repo/ui/link";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/features/layout/page-header";
import { CategoryList } from "@/features/products/components/category-list";

export const metadata = {
  title: "Products",
  description: "Browse products by category or search for something specific.",
} satisfies Metadata;

export default async function ProductsPage({
  params,
}: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const categories = await getCategories();

  return (
    <Container as="article">
      <PageHeader
        title="Products"
        description="Browse products by category or search for something specific."
      />
      <Link href="/products/search">Search products →</Link>
      <CategoryList categories={categories} />
    </Container>
  );
}
