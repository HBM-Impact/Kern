import { Link } from "@repo/ui/link";
import { Typography } from "@repo/ui/typography";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.builtWith}>
        <Typography variant="label">
          © {currentYear} Hannibal B. Moulvad - Built with Next.js, React &
          TypeScript
        </Typography>
      </div>
      <nav className={styles.links} aria-label="Footer">
        <Link href="mailto:hmoulvad@hotmail.com">hmoulvad@hotmail.com</Link>
      </nav>
    </footer>
  );
}
