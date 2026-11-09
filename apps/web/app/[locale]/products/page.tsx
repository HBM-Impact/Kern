import { getCategories } from "@repo/services/commerce/categories/cached";
import { Container } from "@repo/ui/container";
import { getLocale } from "next-intl/server";
import { CategoryList } from "@/features/products/components/CategoryList";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { generateItemListJsonLd } from "@/lib/seo/item-list";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { Link } from "@/primitives/link/Link";
import { RouteHead, routeMetadata } from "@/shell/RouteHead";

export const generateMetadata = () => routeMetadata("/products");

export default async function ProductsPage() {
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
            url: absoluteUrl({
              href: {
                pathname: "/products/[category]",
                params: { category: category.slug },
              },
              locale,
            }),
          })),
        )}
      />
      <Container as="article">
        <RouteHead route="/products" />
        <Link href="/products/search">Search products →</Link>
        <CategoryList categories={categories} />
      </Container>
    </>
  );
}
