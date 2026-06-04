import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { getProductById } from "@repo/services/commerce/products/get-product-by-id";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { parseProductSlug } from "@/lib/slug/parseProductSlug";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { ProductDetails } from "./_components/ProductDetails";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]/[id]">): Promise<Metadata> {
  const { id } = await params;
  const numId = parseProductSlug(id);
  if (!numId) return {};
  const product = await getProductById({ id: String(numId) });
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[category]/[id]">) {
  const { locale, category, id } = await params;
  setRequestLocale(locale as Locale);

  const numId = parseProductSlug(id);
  if (!numId || numId <= 0) notFound();

  const [product, { products: categoryProducts }] = await Promise.all([
    getProductById({ id: String(numId) }),
    getProductByCategory({ category, skip: 0, limit: 12 }),
  ]);

  if (!product) notFound();

  const relatedProducts = categoryProducts.filter((p) => p.id !== numId);

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/products", label: "Products" },
          {
            href: {
              pathname: "/products/[category]",
              params: { category },
            },
            label: category,
          },
          { label: product.title },
        ]}
      />
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </>
  );
}
