import {
  getProductByCategory,
  getProductById,
  getProducts,
} from "@repo/services/commerce/products/cached";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";
import { parseProductId, productHref } from "@/features/products/route";
import { getPathname } from "@/i18n/navigation";
import { routingConfig } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { generateProductJsonLd } from "@/lib/seo/product";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { ProductDetails } from "./_components/ProductDetails";

export async function generateStaticParams() {
  const { products } = await getProducts({ skip: 0, limit: 0 });
  return routingConfig.locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      ...productHref(product).params,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]/[id]">): Promise<Metadata> {
  const [{ id }, locale] = await Promise.all([params, getLocale()]);
  const numId = parseProductId(id);
  if (!numId) return {};
  const product = await getProductById({ id: String(numId) });
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    // The bare-id URL (/products/x/1) renders too, so point both at the slug form.
    alternates: {
      canonical: getPathname({ href: productHref(product), locale }),
    },
  };
}

// params is URL data: reading it outside Suspense ties the shared App Shell
// to one URL and breaks instant navigation under partialPrefetching.
export default function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[category]/[id]">) {
  return (
    <Suspense>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

async function ProductDetailContent({
  params,
}: Pick<PageProps<"/[locale]/products/[category]/[id]">, "params">) {
  const { category, id } = await params;
  const numId = parseProductId(id);
  if (!numId) notFound();

  const [locale, product, { products: categoryProducts }] = await Promise.all([
    getLocale(),
    getProductById({ id: String(numId) }),
    getProductByCategory({ category, skip: 0, limit: 12 }),
  ]);

  if (!product) notFound();

  const productUrl = absoluteUrl({ href: productHref(product), locale });
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
