import { colors, size } from "@repo/ui/tokens.stylex";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { client } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";
import { SITE_SETTINGS_REVALIDATE } from "@/lib/sanity/site-settings";
import { ExternalLink } from "@/primitives/link/ExternalLink";

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

// mailto: links stay in the current tab; only web URLs open a new one.
function newTabProps(url: string) {
  return url.startsWith("http")
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

export async function Footer() {
  const settings = await client.fetch(
    SITE_SETTINGS_QUERY,
    {},
    { next: { revalidate: SITE_SETTINGS_REVALIDATE } },
  );
  const currentYear = new Date().getFullYear();

  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.copyright)}>
        <Prose variant="label" muted>
          © {currentYear} {settings?.copyrightHolder}
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
          {(settings?.footerStack ?? []).map(({ _key, label, url }) =>
            url ? (
              <li key={_key}>
                <ExternalLink href={url} {...newTabProps(url)}>
                  {label}
                </ExternalLink>
              </li>
            ) : null,
          )}
        </ul>
      </div>
      <nav {...stylex.props(styles.links)} aria-label="Contact">
        {(settings?.footerContact ?? []).map(({ _key, label, url }) =>
          url ? (
            <ExternalLink key={_key} href={url} {...newTabProps(url)}>
              {label}
            </ExternalLink>
          ) : null,
        )}
      </nav>
    </footer>
  );
}
