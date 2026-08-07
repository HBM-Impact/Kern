import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";
import { CATEGORY_PAGE_SIZE } from "@/features/products/sort-map";
import { routingConfig } from "@/i18n/routing";
import { generateCollectionPageJsonLd } from "@/lib/seo/collection-page";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { createProductSlug } from "@/lib/slug/create-product-slug";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";
import { ProductCatalog } from "./_components/ProductCatalog";

export async function generateStaticParams() {
  const categories = await getCategories();
  return routingConfig.locales.flatMap((locale) =>
    categories.map((c) => ({ locale, category: c.slug })),
  );
}

async function getCategoryName(id: string) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === id)?.name ?? id;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const name = await getCategoryName(category);
  return {
    title: name,
    description: `Browse all products in the ${name} category.`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/[locale]/products/[category]">) {
  const { category } = await params;
  const baseUrl = getBaseUrl();
  const [locale, name, initialPage] = await Promise.all([
    getLocale(),
    getCategoryName(category),
    getProductByCategory({ category, skip: 0, limit: CATEGORY_PAGE_SIZE }),
  ]);

  return (
    <Container as="section">
      <Breadcrumbs
        items={[{ href: "/products", label: "Products" }, { label: name }]}
      />
      <JsonLdScript
        data={generateCollectionPageJsonLd({
          name,
          description: `Browse all products in the ${name} category.`,
          url: `${baseUrl}/${locale}/products/${category}`,
          products: initialPage.products.map((product) => ({
            name: product.title,
            url: `${baseUrl}/${locale}/products/${category}/${createProductSlug(product.id, product.title)}`,
            image: product.thumbnail,
          })),
        })}
      />
      <PageHeader
        title={name}
        description={`Browse all products in the ${name} category.`}
      />
      <Suspense>
        <ProductCatalog category={category} initialPage={initialPage} />
      </Suspense>
    </Container>
  );
}
