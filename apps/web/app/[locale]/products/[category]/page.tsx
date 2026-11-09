import { getCategories } from "@repo/services/commerce/categories/cached";
import { getProductByCategory } from "@repo/services/commerce/products/cached";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";
import { productHref } from "@/features/products/route";
import { CATEGORY_PAGE_SIZE } from "@/features/products/sort-map";
import { routingConfig } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { generateCollectionPageJsonLd } from "@/lib/seo/collection-page";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";
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

// params is URL data: reading it outside Suspense ties the shared App Shell
// to one URL and breaks instant navigation under partialPrefetching.
export default function CategoryPage({
  params,
}: PageProps<"/[locale]/products/[category]">) {
  return (
    <Suspense>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
}: Pick<PageProps<"/[locale]/products/[category]">, "params">) {
  const { category } = await params;
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
          url: absoluteUrl({
            href: { pathname: "/products/[category]", params: { category } },
            locale,
          }),
          products: initialPage.products.map((product) => ({
            name: product.title,
            url: absoluteUrl({ href: productHref(product), locale }),
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
