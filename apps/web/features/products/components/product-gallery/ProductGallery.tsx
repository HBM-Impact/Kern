"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
        <img
          src={images[activeIndex]}
          alt={title}
          className={styles.mainImage}
          fetchPriority="high"
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
                className={
                  index === activeIndex
                    ? `${styles.thumbButton} ${styles.active}`
                    : styles.thumbButton
                }
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={index === activeIndex ? true : undefined}
              >
                <img
                  src={image}
                  alt=""
                  className={styles.thumb}
                  loading="lazy"
                />
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}
