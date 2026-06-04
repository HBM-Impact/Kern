import { LinkButton } from "@repo/ui/buttons";
import { Display } from "@repo/ui/display";
import { Typography } from "@repo/ui/typography";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section}>
      <Display as="h1" variant="display1">
        Quality products, delivered fast
      </Display>
      <Typography as="p" variant="body" className={styles.subtitle}>
        Browse our curated collection of electronics, fashion, and more.
      </Typography>
      <LinkButton href="/products" icon={<ArrowRight />}>
        Browse Products
      </LinkButton>
    </section>
  );
}
