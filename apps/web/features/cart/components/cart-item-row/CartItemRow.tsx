"use client";

import type { Product } from "@repo/services/commerce/commerce-types";
import { Button } from "@repo/ui/buttons";
import { Prose } from "@repo/ui/typography/prose";
import { useCart } from "@/features/cart/cart-context";
import { AddToCart } from "@/features/cart/components/add-to-cart";
import { createProductSlug } from "@/lib/slug/create-product-slug";
import { BareLink } from "@/primitives/link/BareLink";
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
      <BareLink href={href} className={styles.imageLink}>
        <OptimizedImage
          src={product.thumbnail}
          alt={product.title}
          width={96}
          height={72}
          className={styles.thumb}
          sizes="96px"
        />
      </BareLink>
      <div className={styles.body}>
        <Prose as="span" variant="label" uppercase>
          {product.category}
        </Prose>
        <Prose as="h3" variant="body" truncate>
          <BareLink href={href} className={styles.titleLink}>
            {product.title}
          </BareLink>
        </Prose>
        <Prose as="span" variant="body">
          ${product.price.toFixed(2)}
        </Prose>
      </div>
      <div className={styles.actions}>
        <AddToCart productId={productId} />
        <div className={styles.subtotalRow}>
          <Prose as="span" variant="body" noWrap bold>
            ${(product.price * quantity).toFixed(2)}
          </Prose>
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
