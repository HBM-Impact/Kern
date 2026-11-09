import type { Product } from "@repo/services/commerce/commerce-types";

// The one URL form for a product page: /products/{category}/{id}-{slug}.
// Links, canonical, JSON-LD and sitemap all derive from this, so they can't
// drift into duplicate-content variants.
export function productHref({
  id,
  title,
  category,
}: Pick<Product, "id" | "title" | "category">) {
  return {
    pathname: "/products/[category]/[id]" as const,
    params: { category, id: `${id}-${slugify(title)}` },
  };
}

// Accepts the slug form and the bare id. Null for anything without a
// positive leading id.
export function parseProductId(segment: string) {
  const id = Number(segment.match(/^\d+/)?.[0]);
  return id > 0 ? id : null;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
