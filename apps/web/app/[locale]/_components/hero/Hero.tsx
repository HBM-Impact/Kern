import { LinkButton } from "@repo/ui/buttons";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section}>
      <Display as="h1" variant="display1">
        Quality products, delivered fast
      </Display>
      <div className={styles.subtitle}>
        <Prose as="p" variant="body" muted>
          Browse our curated collection of electronics, fashion, and more.
        </Prose>
      </div>
      <LinkButton href="/products" icon={<ArrowRight />}>
        Browse Products
      </LinkButton>
    </section>
  );
}
