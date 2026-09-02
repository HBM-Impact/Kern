import type { Product } from "@repo/services/commerce/commerce-types";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { LinkButton } from "@/primitives/link/LinkButton";
import { summaryStyles } from "./styles";

type CartItemWithProduct = {
  productId: number;
  quantity: number;
  product: Product;
};

type Props = {
  items: CartItemWithProduct[];
};

export function CartSummary({ items }: Props) {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

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
