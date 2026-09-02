"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import { colors, ease, radius, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = { images: string[]; title: string };

const styles = stylex.create({
  gallery: {
    display: "flex",
    flexDirection: "column",
    gap: size[2],
  },
  mainWrapper: {
    position: "relative",
  },
  mainImage: {
    width: "100%",
    maxHeight: "650px",
    objectFit: "contain",
    borderRadius: radius[2],
    backgroundColor: colors.bgMuted,
    padding: size[2],
  },
  prevButton: {
    position: "absolute",
    top: "50%",
    translate: "0 -50%",
    left: size[2],
  },
  nextButton: {
    position: "absolute",
    top: "50%",
    translate: "0 -50%",
    right: size[2],
  },
  thumbnails: {
    display: "flex",
    gap: size[2],
    overflowX: "auto",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  thumbButton: {
    width: size[10],
    height: size[10],
    borderRadius: radius[2],
    borderWidth: "2px",
    borderStyle: "solid",
    backgroundColor: colors.bgMuted,
    padding: size[1],
    cursor: "pointer",
    transition: `border-color 0.2s ${ease[2]}`,
    borderColor: { default: "transparent", ":hover": colors.border },
  },
  // `&.active` was a compound-class selector; the active index is known here.
  thumbButtonActive: {
    borderColor: colors.border,
  },
  thumb: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },
});

export function ProductGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  function prev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  return (
    <figure {...stylex.props(styles.gallery)}>
      <div {...stylex.props(styles.mainWrapper)}>
        <Image
          src={images[activeIndex] ?? "/fallback.png"}
          alt={title}
          width={800}
          height={800}
          {...stylex.props(styles.mainImage)}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {images.length > 1 ? (
          <>
            <div {...stylex.props(styles.prevButton)}>
              <IconButton
                onClick={prev}
                icon={<ArrowLeft size={16} />}
                aria-label="Previous image"
              />
            </div>
            <div {...stylex.props(styles.nextButton)}>
              <IconButton
                onClick={next}
                icon={<ArrowRight size={16} />}
                aria-label="Next image"
              />
            </div>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <ol {...stylex.props(styles.thumbnails)}>
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                {...stylex.props(
                  styles.thumbButton,
                  index === activeIndex && styles.thumbButtonActive,
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={index === activeIndex ? true : undefined}
              >
                <Image
                  src={image}
                  alt=""
                  width={80}
                  height={80}
                  {...stylex.props(styles.thumb)}
                  loading="lazy"
                  sizes="80px"
                />
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}
