"use client";

import { weakKey } from "@repo/utils/weak-key";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type PropsWithChildren, useRef } from "react";
import { IconButton } from "./buttons/IconButton";
import { size } from "./tokens.stylex";
import { Display } from "./typography/Display";
import { Prose } from "./typography/Prose";

type Props = PropsWithChildren<{
  title: string;
  description?: string;
}>;

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonGroup: {
    display: "flex",
    gap: size[3],
  },
  list: {
    display: "flex",
    gap: size[3],
    listStyle: "none",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
  },
  listItem: {
    scrollSnapAlign: "start",
    flexShrink: 0,
  },
});

export function Carousel({ children, title, description }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const firstItemRef = useRef<HTMLLIElement>(null);
  const items = Array.isArray(children) ? children : [children];

  function scroll(direction: "left" | "right") {
    const el = listRef.current;
    const itemWidth = firstItemRef.current?.offsetWidth;
    if (!el || !itemWidth) return;
    el.scrollBy({
      left: direction === "left" ? -itemWidth : itemWidth,
      behavior: "smooth",
    });
  }

  return (
    <section {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.header)}>
        <div>
          <Display as="h3" variant="display3">
            {title}
          </Display>
          {description ? (
            <Prose as="p" variant="label">
              {description}
            </Prose>
          ) : null}
        </div>
        <div {...stylex.props(styles.buttonGroup)}>
          <IconButton
            onClick={() => scroll("left")}
            icon={<ArrowLeft size={16} />}
            aria-label="Scroll left"
          />
          <IconButton
            onClick={() => scroll("right")}
            icon={<ArrowRight size={16} />}
            aria-label="Scroll right"
          />
        </div>
      </header>
      <ol ref={listRef} {...stylex.props(styles.list)}>
        {items.map((child, index) => (
          <li
            ref={index === 0 ? firstItemRef : null}
            key={
              typeof child === "object" && child !== null
                ? weakKey(child)
                : String(child)
            }
            {...stylex.props(styles.listItem)}
          >
            {child}
          </li>
        ))}
      </ol>
    </section>
  );
}
