import type { Product } from "@repo/services/commerce/commerce-types";
import type {
  ItemAvailability,
  Product as ProductSchema,
  WithContext,
} from "schema-dts";

function getAvailabilitySchemaUrl(status: string): ItemAvailability {
  const statusMap: Record<string, ItemAvailability> = {
    "In Stock": "https://schema.org/InStock",
    "Low Stock": "https://schema.org/LimitedAvailability",
    "Out of Stock": "https://schema.org/OutOfStock",
  };
  return statusMap[status] ?? "https://schema.org/InStock";
}

export function generateProductJsonLd(
  product: Product,
  url: string,
): WithContext<ProductSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    url,
    sku: product.sku,
    ...(product.meta.barcode && { gtin: product.meta.barcode }),
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    weight: {
      "@type": "QuantitativeValue",
      value: product.weight,
      unitCode: "GRM",
    },
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "USD",
      availability: getAvailabilitySchemaUrl(product.availabilityStatus),
      itemCondition: "https://schema.org/NewCondition",
      ...(product.returnPolicy && {
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          name: product.returnPolicy,
        },
      }),
      ...(product.shippingInformation && {
        shippingDetails: {
          "@type": "OfferShippingDetails",
          description: product.shippingInformation,
        },
      }),
    },
    ...(product.reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviews.length,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    review: product.reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
      },
      author: {
        "@type": "Person",
        name: review.reviewerName,
      },
      datePublished: review.date,
      reviewBody: review.comment,
    })),
  };
}
