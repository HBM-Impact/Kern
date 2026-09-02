import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { getProducts } from "@repo/services/commerce/products/get-products";
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { client } from "@/lib/sanity/client";
import { PAGE_SLUGS_QUERY } from "@/lib/sanity/queries";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { createProductSlug } from "@/lib/slug/create-product-slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // PAGE_SLUGS_QUERY leaves out the home page, which is listed on its own
  // below as the index.
  const [categories, { products }, slugs] = await Promise.all([
    getCategories(),
    getProducts({ skip: 0, limit: 0 }),
    client.fetch(PAGE_SLUGS_QUERY),
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
    ...slugs
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({
        url: `${baseUrl}/${locale}/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
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
