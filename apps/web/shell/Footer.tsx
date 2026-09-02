import { colors, size } from "@repo/ui/tokens.stylex";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { ExternalLink } from "@/primitives/link/ExternalLink";

const STACK = [
  { label: "Next.js", href: "https://nextjs.org" },
  { label: "React", href: "https://react.dev" },
  { label: "TypeScript", href: "https://www.typescriptlang.org" },
  { label: "Biome", href: "https://biomejs.dev" },
  { label: "Turborepo", href: "https://turbo.build" },
] as const;

const styles = stylex.create({
  footer: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr auto",
      "@media (width < 640px)": "1fr",
    },
    gridTemplateAreas: {
      default: '"copyright reach-out" "stack links"',
      "@media (width < 640px)": '"copyright" "stack" "reach-out" "links"',
    },
    columnGap: size[5],
    rowGap: size[1],
    padding: size[5],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.borderMuted,
  },
  copyright: {
    gridArea: "copyright",
  },
  reachOut: {
    gridArea: "reach-out",
  },
  stack: {
    gridArea: "stack",
    display: "flex",
    alignItems: "center",
    gap: size[2],
    flexWrap: "wrap",
  },
  pills: {
    listStyle: "none",
    display: "flex",
    gap: size[2],
  },
  links: {
    gridArea: "links",
    display: "flex",
    alignItems: "center",
    gap: size[2],
  },
});

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.copyright)}>
        <Prose variant="label" muted>
          © {currentYear} Hannibal B. Moulvad
        </Prose>
      </div>
      <div {...stylex.props(styles.reachOut)}>
        <Prose variant="label" muted>
          Reach out
        </Prose>
      </div>
      <div {...stylex.props(styles.stack)}>
        <Prose variant="label" muted>
          Built with
        </Prose>
        <ul {...stylex.props(styles.pills)} aria-label="Tech stack">
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
      <nav {...stylex.props(styles.links)} aria-label="Contact">
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
