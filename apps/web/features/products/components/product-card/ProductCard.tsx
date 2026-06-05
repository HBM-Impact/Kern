import type { Product } from "@repo/services/commerce/commerce-types";
import { Prose } from "@repo/ui/typography/prose";
import { AddToCart } from "@/features/cart/components/add-to-cart";
import { AddToFavorite } from "@/features/favorites/components/add-to-favorite";
import { IntlLink } from "@/i18n/navigation";
import { createProductSlug } from "@/lib/slug/create-product-slug";
import { OptimizedImage } from "@/primitives/optimized-image";
import styles from "./ProductCard.module.css";

type Props = Pick<
  Product,
  | "id"
  | "title"
  | "description"
  | "price"
  | "discountPercentage"
  | "category"
  | "images"
> & {
  priority?: boolean;
};

export function ProductCard({
  id,
  title,
  description,
  price,
  discountPercentage,
  category,
  images,
  priority,
}: Props) {
  const href = {
    pathname: "/products/[category]/[id]" as const,
    params: { category, id: createProductSlug(id, title) },
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageLink}>
        <IntlLink href={href}>
          <OptimizedImage
            src={images[0] ?? "/fallback.png"}
            alt={title}
            width={600}
            height={450}
            className={styles.image}
            priority={priority}
            breakpointSizes={{ sm: "50vw", lg: "33vw", default: "25vw" }}
          />
        </IntlLink>
        {discountPercentage > 0 ? (
          <span
            className={styles.badge}
            role="img"
            aria-label={`${discountPercentage.toFixed(0)}% discount`}
          >
            -{discountPercentage.toFixed(0)}%
          </span>
        ) : null}
        <div className={styles.favoriteBtn}>
          <AddToFavorite productId={id} />
        </div>
      </div>
      <div className={styles.body}>
        <Prose as="span" variant="label" uppercase>
          {category}
        </Prose>
        <Prose as="h2" variant="body" truncate>
          <IntlLink href={href} className={styles.titleLink}>
            {title}
          </IntlLink>
        </Prose>
        <Prose as="p" variant="label" muted lines={2}>
          {description}
        </Prose>
        <div className={styles.meta}>
          <Prose as="span" variant="body">
            ${price.toFixed(2)}
          </Prose>
          <AddToCart productId={id} />
        </div>
      </div>
    </article>
  );
}
