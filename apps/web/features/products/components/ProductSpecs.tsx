import type { Product } from "@repo/services/commerce/commerce-types";
import { colors, size } from "@repo/ui/tokens.stylex";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";

type Props = { product: Product };

const styles = stylex.create({
  specs: {
    display: "flex",
    flexDirection: "column",
    gap: size[1],
    paddingBlock: size[3],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.borderMuted,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.borderMuted,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: size[2],
  },
});

export function ProductSpecs({ product }: Props) {
  return (
    <dl {...stylex.props(styles.specs)}>
      <SpecRow label="Rating" value={`${product.rating.toFixed(1)} ★`} />
      <SpecRow
        label="Stock"
        value={`${product.stock} (${product.availabilityStatus})`}
      />
      {product.brand ? <SpecRow label="Brand" value={product.brand} /> : null}
      <SpecRow label="SKU" value={product.sku} />
      <SpecRow label="Weight" value={`${product.weight}g`} />
      <SpecRow
        label="Dimensions"
        value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
      />
      <SpecRow label="Warranty" value={product.warrantyInformation} />
      <SpecRow label="Shipping" value={product.shippingInformation} />
      <SpecRow label="Return Policy" value={product.returnPolicy} />
      <SpecRow label="Min. Order" value={`${product.minimumOrderQuantity}`} />
    </dl>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div {...stylex.props(styles.row)}>
      <dt>
        <Prose as="span" variant="label">
          {label}
        </Prose>
      </dt>
      <dd>
        <Prose as="span" variant="body">
          {value}
        </Prose>
      </dd>
    </div>
  );
}
