import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { getProductById } from "@repo/services/commerce/products/get-product-by-id";
import { getProducts } from "@repo/services/commerce/products/get-products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { routingConfig } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { generateProductJsonLd } from "@/lib/seo/product";
import { createProductSlug } from "@/lib/slug/create-product-slug";
import { parseProductSlug } from "@/lib/slug/parse-product-slug";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { ProductDetails } from "./_components/ProductDetails";

export async function generateStaticParams() {
  const { products } = await getProducts({ skip: 0, limit: 0 });
  return routingConfig.locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      category: product.category,
      id: createProductSlug(product.id, product.title),
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]/[id]">): Promise<Metadata> {
  const { locale, category, id } = await params;
  const numId = parseProductSlug(id);
  if (!numId) return {};
  const product = await getProductById({ id: String(numId) });
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    // The bare-id URL (/products/x/1) renders too, so point both at the slug form.
    alternates: {
      canonical: `/${locale}/products/${category}/${createProductSlug(product.id, product.title)}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[category]/[id]">) {
  const { category, id } = await params;
  const numId = parseProductSlug(id);
  if (!numId || numId <= 0) notFound();

  const [locale, product, { products: categoryProducts }] = await Promise.all([
    getLocale(),
    getProductById({ id: String(numId) }),
    getProductByCategory({ category, skip: 0, limit: 12 }),
  ]);

  if (!product) notFound();

  const baseUrl = getBaseUrl();
  const productUrl = `${baseUrl}/${locale}/products/${category}/${id}`;
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
      <JsonLdScript data={generateProductJsonLd(product, productUrl)} />
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </>
  );
}
