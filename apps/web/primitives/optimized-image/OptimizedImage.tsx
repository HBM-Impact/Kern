"use client";

import Image from "next/image";
import { type ComponentProps, useState } from "react";
import { createImageSizes } from "@/lib/create-image-sizes";

type Props = Omit<ComponentProps<typeof Image>, "sizes" | "quality"> & {
  breakpointSizes?: Parameters<typeof createImageSizes>[0];
  sizes?: string;
};

export function OptimizedImage({
  src,
  alt,
  breakpointSizes,
  sizes,
  ...rest
}: Props) {
  const [hasError, setHasError] = useState(false);
  return (
    <Image
      {...rest}
      src={hasError ? "/fallback.png" : src}
      onError={() => setHasError(true)}
      alt={alt}
      quality={75}
      sizes={breakpointSizes ? createImageSizes(breakpointSizes) : sizes}
    />
  );
}
