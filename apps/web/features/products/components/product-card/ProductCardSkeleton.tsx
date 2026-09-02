import { Skeleton } from "@repo/ui/skeleton";
import { size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { cardStyles } from "./styles";

export function ProductCardSkeleton() {
  return (
    <article {...stylex.props(cardStyles.card)}>
      <Skeleton shape="square" width="100%" height="250px" />
      <div {...stylex.props(cardStyles.body)}>
        <Skeleton variant="label" width={size[10]} />
        <Skeleton variant="body" width="75%" />
        <Skeleton variant="label" width="100%" lines={2} />
        <div {...stylex.props(cardStyles.meta)}>
          <Skeleton variant="body" width={size[9]} />
          <Skeleton variant="button" width={size[11]} />
        </div>
      </div>
    </article>
  );
}
