import { Display } from "@repo/ui/typography/display";
import { Link } from "@/primitives/link/Link";
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
          <Link href="/favorites">Favorites</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
