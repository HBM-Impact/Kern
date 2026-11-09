import { colors, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight, House } from "lucide-react";
import { getLocale } from "next-intl/server";
import type { getPathname } from "@/i18n/navigation";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { BareLink } from "@/primitives/link/BareLink";

type Href = Parameters<typeof getPathname>[0]["href"];

type Props = {
  items?: { href?: Href; label: string }[];
};

const styles = stylex.create({
  list: {
    display: "flex",
    alignItems: "center",
    gap: size[2],
    listStyle: "none",
    minHeight: size[5],
    textTransform: "capitalize",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: size[2],
  },
  current: {
    color: colors.textMuted,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    paddingBlock: size[1],
  },
  // Was `.list & svg`. The icons are rendered here, so they carry the size
  // themselves rather than being matched by a descendant selector.
  icon: {
    width: size[4],
    height: size[4],
  },
});

export async function Breadcrumbs({ items = [] }: Props) {
  const locale = await getLocale();

  return (
    <>
      <JsonLdScript
        data={generateBreadcrumbJsonLd([
          { name: "Home", url: absoluteUrl({ href: "/", locale }) },
          ...items.map((item) => ({
            name: item.label,
            ...(item.href && { url: absoluteUrl({ href: item.href, locale }) }),
          })),
        ])}
      />
      <nav aria-label="Breadcrumb">
        <ol {...stylex.props(styles.list)}>
          <li {...stylex.props(styles.item)}>
            <BareLink href="/" aria-label="Home" {...stylex.props(styles.link)}>
              <House {...stylex.props(styles.icon)} />
            </BareLink>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} {...stylex.props(styles.item)}>
                <ChevronRight {...stylex.props(styles.icon)} />
                {isLast || !item.href ? (
                  <span aria-current="page" {...stylex.props(styles.current)}>
                    {item.label}
                  </span>
                ) : (
                  <BareLink href={item.href} {...stylex.props(styles.link)}>
                    {item.label}
                  </BareLink>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
