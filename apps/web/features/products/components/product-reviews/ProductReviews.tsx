import type { Product } from "@repo/services/commerce/commerce-types";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
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
            <Prose as="span" variant="body">
              {review.reviewerName}
            </Prose>
            <Prose
              as="span"
              variant="label"
              aria-label={`Rating: ${review.rating} out of 5`}
            >
              {review.rating} ★
            </Prose>
          </div>
          <Prose>{review.comment}</Prose>
        </article>
      ))}
    </section>
  );
}
