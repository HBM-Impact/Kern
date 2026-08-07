"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import styles from "./ProductGallery.module.css";

type Props = { images: string[]; title: string };

export function ProductGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  function prev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  return (
    <figure className={styles.gallery}>
      <div className={styles.mainWrapper}>
        <Image
          src={images[activeIndex] ?? "/fallback.png"}
          alt={title}
          width={800}
          height={800}
          className={styles.mainImage}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {images.length > 1 ? (
          <>
            <div className={styles.prevButton}>
              <IconButton
                onClick={prev}
                icon={<ArrowLeft />}
                aria-label="Previous image"
              />
            </div>
            <div className={styles.nextButton}>
              <IconButton
                onClick={next}
                icon={<ArrowRight />}
                aria-label="Next image"
              />
            </div>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <ol className={styles.thumbnails}>
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                className={clsx(
                  styles.thumbButton,
                  index === activeIndex && styles.active,
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
                  className={styles.thumb}
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
