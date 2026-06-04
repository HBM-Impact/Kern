import { Display } from "@repo/ui/display";
import { Link } from "@/components/link";
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
        </nav>
      </div>
    </header>
  );
}
