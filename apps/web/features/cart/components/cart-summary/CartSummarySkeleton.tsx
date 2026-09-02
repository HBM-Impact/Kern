import { Skeleton } from "@repo/ui/skeleton";
import { size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { summaryStyles } from "./styles";

export function CartSummarySkeleton() {
  return (
    <aside {...stylex.props(summaryStyles.summary)}>
      <Skeleton variant="display4" width={size[13]} />
      <dl {...stylex.props(summaryStyles.details)}>
        <div {...stylex.props(summaryStyles.detailRow)}>
          <Skeleton variant="body" width={size[8]} />
          <Skeleton variant="body" width={size[6]} />
        </div>
        <div {...stylex.props(summaryStyles.detailRow)}>
          <Skeleton variant="body" width={size[9]} />
          <Skeleton variant="body" width={size[8]} />
        </div>
      </dl>
      <div {...stylex.props(summaryStyles.totalRow)}>
        <Skeleton variant="display4" width={size[8]} />
        <Skeleton variant="display4" width={size[10]} />
      </div>
      <Skeleton variant="button" width="100%" />
    </aside>
  );
}
