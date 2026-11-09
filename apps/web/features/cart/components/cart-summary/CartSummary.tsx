import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { type CartLine, cartTotals } from "@/features/cart/cart";
import { LinkButton } from "@/primitives/link/LinkButton";
import { summaryStyles } from "./styles";

type Props = { lines: CartLine[] };

export function CartSummary({ lines }: Props) {
  const { items: totalItems, subtotal } = cartTotals(lines);

  return (
    <aside {...stylex.props(summaryStyles.summary)}>
      <Display as="h2" variant="display4">
        Order Summary
      </Display>
      <dl {...stylex.props(summaryStyles.details)}>
        <div {...stylex.props(summaryStyles.detailRow)}>
          <Prose as="dt" variant="body">
            Items
          </Prose>
          <Prose as="dd" variant="body" {...stylex.props(summaryStyles.value)}>
            {totalItems}
          </Prose>
        </div>
        <div {...stylex.props(summaryStyles.detailRow)}>
          <Prose as="dt" variant="body">
            Subtotal
          </Prose>
          <Prose as="dd" variant="body" {...stylex.props(summaryStyles.value)}>
            ${subtotal.toFixed(2)}
          </Prose>
        </div>
      </dl>
      <div {...stylex.props(summaryStyles.totalRow)}>
        <Display as="span" variant="display4">
          Total
        </Display>
        <Display as="span" variant="display4">
          ${subtotal.toFixed(2)}
        </Display>
      </div>
      <LinkButton fill href="/products">
        Continue Shopping
      </LinkButton>
    </aside>
  );
}
