import type { Product } from "@repo/services/commerce/commerce-types";
import { Typography } from "@repo/ui/typography";
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
  const href = `/products/${category}/${id}`;

  return (
    <article className={styles.card}>
      <div className={styles.imageLink}>
        <a href={href}>
          <img
            src={images[0]}
            alt={title}
            className={styles.image}
            loading={priority ? undefined : "lazy"}
            fetchPriority={priority ? "high" : undefined}
          />
        </a>
        {discountPercentage > 0 && (
          <span
            className={styles.badge}
            role="img"
            aria-label={`${discountPercentage.toFixed(0)}% discount`}
          >
            -{discountPercentage.toFixed(0)}%
          </span>
        )}
      </div>
      <div className={styles.body}>
        <Typography as="span" variant="label" uppercase>
          {category}
        </Typography>
        <Typography as="h2" variant="body" className={styles.title}>
          <a href={href}>{title}</a>
        </Typography>
        <Typography as="p" variant="label" className={styles.description}>
          {description}
        </Typography>
        <Typography as="span" variant="body">
          ${price.toFixed(2)}
        </Typography>
      </div>
    </article>
  );
}
