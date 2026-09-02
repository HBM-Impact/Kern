import { Skeleton } from "@repo/ui/skeleton";
import { size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { rowStyles } from "./styles";

const styles = stylex.create({
  // The thumbnail placeholder fills the cell, which the parent used to do via
  // `align-self: stretch` on the Skeleton's inline style.
  imageCell: {
    alignItems: "stretch",
  },
});

export function CartItemRowSkeleton() {
  return (
    <li {...stylex.props(rowStyles.row)}>
      <div {...stylex.props(rowStyles.imageLink, styles.imageCell)}>
        <Skeleton width="7rem" height="100%" />
      </div>
      <div {...stylex.props(rowStyles.body)}>
        <Skeleton variant="label" width={size[10]} />
        <Skeleton variant="body" width="75%" />
        <Skeleton variant="body" width={size[9]} />
      </div>
      <div {...stylex.props(rowStyles.actions)}>
        <Skeleton width="8rem" height="2.5rem" />
        <div {...stylex.props(rowStyles.subtotalRow)}>
          <Skeleton variant="body" width={size[9]} />
          <Skeleton variant="button" width={size[10]} />
        </div>
      </div>
    </li>
  );
}
