import type { CollectionPage, WithContext } from "schema-dts";

type CollectionPageProduct = {
  name: string;
  url: string;
  image?: string;
};

type CollectionPageParams = {
  name: string;
  description: string;
  url: string;
  products?: CollectionPageProduct[];
};

export function generateCollectionPageJsonLd(
  params: CollectionPageParams,
): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.products &&
      params.products.length > 0 && {
        mainEntity: {
          "@type": "ItemList",
          itemListElement: params.products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            item: product.url,
            ...(product.image && { image: product.image }),
          })),
        },
      }),
  };
}
