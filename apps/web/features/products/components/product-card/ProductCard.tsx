import type { Product } from "@repo/services/commerce/commerce-types";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import { AddToCart } from "@/features/cart/components/AddToCart";
import { AddToFavorite } from "@/features/favorites/components/AddToFavorite";
import { createProductSlug } from "@/lib/slug/create-product-slug";
import { BareLink } from "@/primitives/link/BareLink";
import { cardStyles } from "./styles";

type Props = Pick<
  Product,
  | "id"
  | "title"
  | "description"
  | "price"
  | "discountPercentage"
  | "category"
  | "images"
> & {
  priority?: boolean;
};

export function ProductCard({
  id,
  title,
  description,
  price,
  discountPercentage,
  category,
  images,
  priority,
}: Props) {
  const href = {
    pathname: "/products/[category]/[id]" as const,
    params: { category, id: createProductSlug(id, title) },
  };

  return (
    <article {...stylex.props(cardStyles.card)}>
      <div {...stylex.props(cardStyles.imageLink)}>
        <BareLink href={href}>
          <Image
            src={images[0] ?? "/fallback.png"}
            alt={title}
            width={600}
            height={450}
            {...stylex.props(cardStyles.image)}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </BareLink>
        {discountPercentage > 0 ? (
          <span
            {...stylex.props(cardStyles.badge)}
            role="img"
            aria-label={`${discountPercentage.toFixed(0)}% discount`}
          >
            -{discountPercentage.toFixed(0)}%
          </span>
        ) : null}
        <div {...stylex.props(cardStyles.favoriteBtn)}>
          <AddToFavorite productId={id} />
        </div>
      </div>
      <div {...stylex.props(cardStyles.body)}>
        <Prose as="span" variant="label" uppercase>
          {category}
        </Prose>
        <Prose as="h2" variant="body" truncate>
          <BareLink href={href} {...stylex.props(cardStyles.titleLink)}>
            {title}
          </BareLink>
        </Prose>
        <Prose as="p" variant="label" muted lines={2}>
          {description}
        </Prose>
        <div {...stylex.props(cardStyles.meta)}>
          <Prose as="span" variant="body">
            ${price.toFixed(2)}
          </Prose>
          <AddToCart productId={id} />
        </div>
      </div>
    </article>
  );
}
