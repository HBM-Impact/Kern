import type { BreadcrumbList, WithContext } from "schema-dts";

type BreadcrumbItem = {
  name: string;
  url?: string;
};

export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}
