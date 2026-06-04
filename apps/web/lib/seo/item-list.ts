import type { ItemList, WithContext } from "schema-dts";

type ItemListItem = {
  name: string;
  url: string;
  image?: string;
};

export function generateItemListJsonLd(
  items: ItemListItem[],
): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
      ...(item.image && { image: item.image }),
    })),
  };
}
