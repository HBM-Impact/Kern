import { type ReactNode, useId } from "react";
import { IconButton } from "../Button/IconButton";
import { Display } from "../Display/Display";
import { ArrowLeft } from "../Icons/Arrow/Left";
import { ArrowRight } from "../Icons/Arrow/Right";
import { Typography } from "../Typography/Typography";
import styles from "./Carousel.module.css";

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function Carousel({ children, title, description }: Props) {
  const rawId = useId().replace(/:/g, "");
  const listId = `carousel-${rawId}`;
  const items = Array.isArray(children) ? children : [children];

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
            {...{
              "x-on:click": `(() => { const el = document.getElementById('${listId}'); const item = el?.querySelector('li'); if (el && item) el.scrollBy({ left: -item.offsetWidth, behavior: 'smooth' }); })()`,
            }}
            icon={<ArrowLeft />}
            aria-label="Scroll left"
          />
          <IconButton
            {...{
              "x-on:click": `(() => { const el = document.getElementById('${listId}'); const item = el?.querySelector('li'); if (el && item) el.scrollBy({ left: item.offsetWidth, behavior: 'smooth' }); })()`,
            }}
            icon={<ArrowRight />}
            aria-label="Scroll right"
          />
        </div>
      </header>
      <ol id={listId} className={styles.list}>
        {items.map((child, index) => (
          <li key={index} className={styles.listItem}>
            {child}
          </li>
        ))}
      </ol>
    </section>
  );
}
