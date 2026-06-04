import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { getProductById } from "@repo/services/commerce/products/get-product-by-id";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ProductDetailsPage } from "@/features/products/pages/product-details-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById({ id });
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string; id: string }>;
}) {
  const { locale, slug, id } = await params;
  setRequestLocale(locale as Locale);

  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) notFound();

  const [product, { products: categoryProducts }] = await Promise.all([
    getProductById({ id }),
    getProductByCategory({ category: slug, skip: 0, limit: 12 }),
  ]);

  if (!product) notFound();

  const relatedProducts = categoryProducts.filter((p) => p.id !== numId);

  return (
    <ProductDetailsPage product={product} relatedProducts={relatedProducts} />
  );
}
