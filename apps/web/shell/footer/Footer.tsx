import { Prose } from "@repo/ui/typography/prose";
import { ExternalLink } from "@/primitives/link/ExternalLink";
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
      <div className={styles.copyright}>
        <Prose variant="label" muted>
          © {currentYear} Hannibal B. Moulvad
        </Prose>
      </div>
      <div className={styles.reachOut}>
        <Prose variant="label" muted>
          Reach out
        </Prose>
      </div>
      <div className={styles.stack}>
        <Prose variant="label" muted>
          Built with
        </Prose>
        <ul className={styles.pills} aria-label="Tech stack">
          {STACK.map(({ label, href }) => (
            <li key={label}>
              <ExternalLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
      <nav className={styles.links} aria-label="Contact">
        <ExternalLink href="mailto:hmoulvad@hotmail.com">
          hmoulvad@hotmail.com
        </ExternalLink>
        <ExternalLink
          href="https://github.com/hmoulvad"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </ExternalLink>
        <ExternalLink
          href="https://kern-storybook.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Storybook
        </ExternalLink>
      </nav>
    </footer>
  );
}
