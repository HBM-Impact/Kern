import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { CategoryList } from "@/features/products/components/CategoryList";
import { getRouteMeta } from "@/lib/sanity/route-meta";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { generateItemListJsonLd } from "@/lib/seo/item-list";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { Link } from "@/primitives/link/Link";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getRouteMeta("/products");

  return { title: meta?.title, description: meta?.description };
}

export default async function ProductsPage() {
  const baseUrl = getBaseUrl();
  const [locale, categories, meta] = await Promise.all([
    getLocale(),
    getCategories(),
    getRouteMeta("/products"),
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
        <Breadcrumbs items={[{ label: meta?.title ?? "" }]} />
        <PageHeader
          title={meta?.title ?? ""}
          description={meta?.description ?? undefined}
        />
        <Link href="/products/search">Search products →</Link>
        <CategoryList categories={categories} />
      </Container>
    </>
  );
}
