import type { Product } from "@repo/services/commerce/commerce-types";
import { Typography } from "@repo/ui/typography";
import { OptimizedImage } from "@/components/optimized-image";
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
          <OptimizedImage
            src={images[0] ?? "/fallback.png"}
            alt={title}
            width={600}
            height={450}
            className={styles.image}
            priority={priority}
            breakpointSizes={{ sm: "50vw", lg: "33vw", default: "25vw" }}
          />
        </a>
        {discountPercentage > 0 ? (
          <span
            className={styles.badge}
            role="img"
            aria-label={`${discountPercentage.toFixed(0)}% discount`}
          >
            -{discountPercentage.toFixed(0)}%
          </span>
        ) : null}
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
