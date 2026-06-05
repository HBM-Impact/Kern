import { Link } from "@repo/ui/link";
import { Prose } from "@repo/ui/typography/prose";
import styles from "./Footer.module.css";

const STACK = [
  { label: "Next.js", href: "https://nextjs.org" },
  { label: "React", href: "https://react.dev" },
  { label: "TypeScript", href: "https://www.typescriptlang.org" },
  { label: "Biome", href: "https://biomejs.dev" },
  { label: "Turborepo", href: "https://turbo.build" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Prose variant="label" muted>
          © {currentYear} Hannibal B. Moulvad
        </Prose>
        <div className={styles.stack}>
          <Prose variant="label" muted>
            Built with
          </Prose>
          <ul className={styles.pills} aria-label="Tech stack">
            {STACK.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.right}>
        <Prose variant="label" as="h2" muted>
          Reach out
        </Prose>
        <nav className={styles.links} aria-label="Contact">
          <Link href="mailto:hmoulvad@hotmail.com">hmoulvad@hotmail.com</Link>
          <Link
            href="https://github.com/hmoulvad"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            href="https://kern-storybook.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storybook
          </Link>
        </nav>
      </div>
    </footer>
  );
}
