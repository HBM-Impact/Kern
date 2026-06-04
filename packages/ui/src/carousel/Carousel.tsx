"use client";

import { weakKey } from "@repo/utils/weak-key";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { IconButton } from "../buttons/icon-button";
import { Display } from "../display/Display";
import { Typography } from "../typography";
import styles from "./Carousel.module.css";

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function Carousel({ children, title, description }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const items = Array.isArray(children) ? children : [children];

  function scroll(direction: "left" | "right") {
    const el = listRef.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    el.scrollBy({
      left: direction === "left" ? -item.offsetWidth : item.offsetWidth,
      behavior: "smooth",
    });
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <Display as="h3" variant="display3">
            {title}
          </Display>
          {description ? (
            <Typography as="p" variant="label">
              {description}
            </Typography>
          ) : null}
        </div>
        <div className={styles.buttonGroup}>
          <IconButton
            onClick={() => scroll("left")}
            icon={<ArrowLeft />}
            aria-label="Scroll left"
          />
          <IconButton
            onClick={() => scroll("right")}
            icon={<ArrowRight />}
            aria-label="Scroll right"
          />
        </div>
      </header>
      <ol ref={listRef} className={styles.list}>
        {items.map((child) => (
          <li
            key={
              typeof child === "object" && child !== null
                ? weakKey(child)
                : String(child)
            }
            className={styles.listItem}
          >
            {child}
          </li>
        ))}
      </ol>
    </section>
  );
}
