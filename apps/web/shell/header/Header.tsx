import { Display } from "@repo/ui/display";
import { Heart, ShoppingCart } from "lucide-react";
import { IntlLink } from "@/i18n/navigation";
import { Link } from "@/primitives/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link href="/" title="Kern">
            <Display uppercase as="span" variant="display4">
              Kern
            </Display>
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Main">
          <Link href="/products">Products</Link>
          <IntlLink
            href="/favorites"
            aria-label="Favorites"
            className={styles.iconLink}
          >
            <Heart />
          </IntlLink>
          <IntlLink href="/cart" aria-label="Cart" className={styles.iconLink}>
            <ShoppingCart />
          </IntlLink>
        </nav>
      </div>
    </header>
  );
}
