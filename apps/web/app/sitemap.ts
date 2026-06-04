import { getCategories } from "@repo/services/commerce/categories/get-categories";
import type { ProductResponse } from "@repo/services/commerce/commerce-types";
import { getProducts } from "@repo/services/commerce/products/get-products";
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/seo/get-base-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const pageSize = 100;

  const [categories, firstPage] = await Promise.all([
    getCategories(),
    getProducts({ skip: 0, limit: pageSize }),
  ]);

  const remainingPageCount = Math.ceil((firstPage.total - pageSize) / pageSize);
  const remainingPages =
    remainingPageCount > 0
      ? await Promise.all(
          Array.from({ length: remainingPageCount }, (_, i) =>
            getProducts({ skip: (i + 1) * pageSize, limit: pageSize }).then(
              (r: ProductResponse) => r.products,
            ),
          ),
        )
      : [];

  const allProducts = [...firstPage.products, ...remainingPages.flat()];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      changeFrequency: "weekly",
      priority: 1.0,
    });

    entries.push({
      url: `${baseUrl}/${locale}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const category of categories) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${category.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const product of allProducts) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${product.category}/${product.id}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
