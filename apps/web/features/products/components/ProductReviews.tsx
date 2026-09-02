import type { Product } from "@repo/services/commerce/commerce-types";
import { colors, radius, size } from "@repo/ui/tokens.stylex";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";

type Props = { reviews: Product["reviews"] };

const styles = stylex.create({
  reviews: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
  },
  review: {
    display: "flex",
    flexDirection: "column",
    gap: size[1],
    padding: size[3],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.borderMuted,
    borderRadius: radius[2],
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export function ProductReviews({ reviews }: Props) {
  if (reviews.length === 0) return null;

  return (
    <section {...stylex.props(styles.reviews)}>
      <Display as="h2" variant="display4">
        Reviews
      </Display>
      {reviews.map((review) => (
        <article
          key={`${review.date}-${review.reviewerName}`}
          {...stylex.props(styles.review)}
        >
          <div {...stylex.props(styles.header)}>
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
