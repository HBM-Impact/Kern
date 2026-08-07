import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { getProducts } from "@repo/services/commerce/products/get-products";
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { createProductSlug } from "@/lib/slug/create-product-slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const [categories, { products }] = await Promise.all([
    getCategories(),
    getProducts({ skip: 0, limit: 0 }),
  ]);

  return routing.locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${locale}/products`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...categories.map((category) => ({
      url: `${baseUrl}/${locale}/products/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      // Must match the slug form used by every internal link, or the two URLs
      // become duplicate content.
      url: `${baseUrl}/${locale}/products/${product.category}/${createProductSlug(product.id, product.title)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);
}
