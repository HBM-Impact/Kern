import type { Product } from "@repo/services/commerce/commerce-types";
import { Display } from "@repo/ui/display";
import { Typography } from "@repo/ui/typography";
import styles from "./ProductReviews.module.css";

type Props = { reviews: Product["reviews"] };

export function ProductReviews({ reviews }: Props) {
  if (reviews.length === 0) return null;

  return (
    <section className={styles.reviews}>
      <Display as="h2" variant="display4">
        Reviews
      </Display>
      {reviews.map((review) => (
        <article
          key={`${review.date}-${review.reviewerName}`}
          className={styles.review}
        >
          <div className={styles.header}>
            <Typography as="span" variant="body">
              {review.reviewerName}
            </Typography>
            <Typography
              as="span"
              variant="label"
              aria-label={`Rating: ${review.rating} out of 5`}
            >
              {review.rating} ★
            </Typography>
          </div>
          <Typography>{review.comment}</Typography>
        </article>
      ))}
    </section>
  );
}
