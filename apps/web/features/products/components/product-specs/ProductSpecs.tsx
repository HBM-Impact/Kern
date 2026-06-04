import type { Product } from "@repo/services/commerce/commerce-types";
import { Typography } from "@repo/ui/typography";
import styles from "./ProductSpecs.module.css";

type Props = { product: Product };

export function ProductSpecs({ product }: Props) {
  return (
    <dl className={styles.specs}>
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
    <div className={styles.row}>
      <dt>
        <Typography as="span" variant="label">
          {label}
        </Typography>
      </dt>
      <dd>
        <Typography as="span" variant="body">
          {value}
        </Typography>
      </dd>
    </div>
  );
}
