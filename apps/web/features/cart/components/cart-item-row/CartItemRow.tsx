"use client";

import type { Product } from "@repo/services/commerce/commerce-types";
import { Button } from "@repo/ui/buttons";
import { colors, size } from "@repo/ui/tokens.stylex";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import { useCart } from "@/features/cart/cart-context";
import { AddToCart } from "@/features/cart/components/AddToCart";
import { createProductSlug } from "@/lib/slug/create-product-slug";
import { BareLink } from "@/primitives/link/BareLink";
import { rowStyles } from "./styles";

type Props = {
  productId: number;
  quantity: number;
  product: Product;
};

const styles = stylex.create({
  thumb: {
    width: "7rem",
    objectFit: "contain",
    padding: size[1],
  },
  titleLink: {
    textDecoration: "none",
    color: { default: "inherit", ":hover": colors.accent },
  },
});

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
    <li {...stylex.props(rowStyles.row)}>
      <BareLink href={href} {...stylex.props(rowStyles.imageLink)}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={96}
          height={72}
          {...stylex.props(styles.thumb)}
          sizes="96px"
        />
      </BareLink>
      <div {...stylex.props(rowStyles.body)}>
        <Prose as="span" variant="label" uppercase>
          {product.category}
        </Prose>
        <Prose as="h3" variant="body" truncate>
          <BareLink href={href} {...stylex.props(styles.titleLink)}>
            {product.title}
          </BareLink>
        </Prose>
        <Prose as="span" variant="body">
          ${product.price.toFixed(2)}
        </Prose>
      </div>
      <div {...stylex.props(rowStyles.actions)}>
        <AddToCart productId={productId} />
        <div {...stylex.props(rowStyles.subtotalRow)}>
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
