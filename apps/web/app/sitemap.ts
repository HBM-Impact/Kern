import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { getProducts } from "@repo/services/commerce/products/get-products";
import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { productHref } from "@/features/products/route";
import { routing } from "@/i18n/routing";
import { client } from "@/lib/sanity/client";
import { PAGE_SLUGS_QUERY } from "@/lib/sanity/queries";
import { absoluteUrl } from "@/lib/seo/absolute-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");
  // PAGE_SLUGS_QUERY leaves out the home page, which is listed on its own
  // below as the index.
  const [categories, { products }, slugs] = await Promise.all([
    getCategories(),
    getProducts({ skip: 0, limit: 0 }),
    client.fetch(PAGE_SLUGS_QUERY),
  ]);

  return routing.locales.flatMap((locale) => [
    {
      url: absoluteUrl({ href: "/", locale }),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: absoluteUrl({ href: "/products", locale }),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...slugs
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({
        url: absoluteUrl({
          href: { pathname: "/[slug]", params: { slug } },
          locale,
        }),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ...categories.map((category) => ({
      url: absoluteUrl({
        href: {
          pathname: "/products/[category]",
          params: { category: category.slug },
        },
        locale,
      }),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl({ href: productHref(product), locale }),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);
}
