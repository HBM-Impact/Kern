import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { CategoryList } from "@/features/products/components/CategoryList";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { generateItemListJsonLd } from "@/lib/seo/item-list";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { Link } from "@/primitives/link/Link";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

export const metadata = {
  title: "Products",
  description: "Browse products by category or search for something specific.",
} satisfies Metadata;

export default async function ProductsPage() {
  const baseUrl = getBaseUrl();
  const [locale, categories] = await Promise.all([
    getLocale(),
    getCategories(),
  ]);

  return (
    <>
      <JsonLdScript
        data={generateItemListJsonLd(
          categories.map((category) => ({
            name: category.name,
            url: `${baseUrl}/${locale}/products/${category.slug}`,
          })),
        )}
      />
      <Container as="article">
        <Breadcrumbs items={[{ label: "Products" }]} />
        <PageHeader
          title="Products"
          description="Browse products by category or search for something specific."
        />
        <Link href="/products/search">Search products →</Link>
        <CategoryList categories={categories} />
      </Container>
    </>
  );
}
