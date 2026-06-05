"use client";

import type { Product } from "@repo/services/commerce/commerce-types";
import { Button } from "@repo/ui/buttons";
import { Typography } from "@repo/ui/typography";
import { useCart } from "@/features/cart/cart-context";
import { AddToCart } from "@/features/cart/components/add-to-cart";
import { IntlLink } from "@/i18n/navigation";
import { createProductSlug } from "@/lib/slug/create-product-slug";
import { OptimizedImage } from "@/primitives/optimized-image";
import styles from "./CartItemRow.module.css";

type Props = {
  productId: number;
  quantity: number;
  product: Product;
};

export function CartItemRow({ productId, quantity, product }: Props) {
  const { remove } = useCart();
  const href = {
    pathname: "/products/[category]/[id]" as const,
    params: {
      category: product.category,
      id: createProductSlug(product.id, product.title),
    },
  };

  return (
    <li className={styles.row}>
      <IntlLink href={href} className={styles.imageLink}>
        <OptimizedImage
          src={product.thumbnail}
          alt={product.title}
          width={96}
          height={72}
          className={styles.thumb}
          sizes="96px"
        />
      </IntlLink>
      <div className={styles.body}>
        <Typography as="span" variant="label" uppercase>
          {product.category}
        </Typography>
        <Typography as="h3" variant="body" truncate>
          <IntlLink href={href} className={styles.titleLink}>
            {product.title}
          </IntlLink>
        </Typography>
        <Typography as="span" variant="body">
          ${product.price.toFixed(2)}
        </Typography>
      </div>
      <div className={styles.actions}>
        <AddToCart productId={productId} />
        <div className={styles.subtotalRow}>
          <Typography as="span" variant="body" noWrap bold>
            ${(product.price * quantity).toFixed(2)}
          </Typography>
          <Button
            aria-label={`Remove ${product.title}`}
            onClick={() => remove(productId)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
