import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CategoryList } from "@/features/products/components/category-list";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { generateItemListJsonLd } from "@/lib/seo/item-list";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { Link } from "@/primitives/link";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

export const metadata = {
  title: "Products",
  description: "Browse products by category or search for something specific.",
} satisfies Metadata;

export default async function ProductsPage({
  params,
}: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const baseUrl = getBaseUrl();
  const categories = await getCategories();

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
        <Breadcrumbs locale={locale} items={[{ label: "Products" }]} />
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
