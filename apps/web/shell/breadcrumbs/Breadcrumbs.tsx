import { ChevronRight, House } from "lucide-react";
import type { ComponentProps } from "react";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { BareLink } from "@/primitives/link";
import styles from "./Breadcrumbs.module.css";

type Href = ComponentProps<typeof BareLink>["href"];

type Props = {
  items: { href?: Href; label: string }[];
  locale?: string;
};

export function Breadcrumbs({ items, locale }: Props) {
  const baseUrl = getBaseUrl();

  return (
    <>
      {locale && (
        <JsonLdScript
          data={generateBreadcrumbJsonLd(
            [
              { name: "Home", url: `/${locale}` },
              ...items.map((item) => ({
                name: item.label,
                ...(item.href && { url: hrefToPath(item.href, locale) }),
              })),
            ],
            baseUrl,
          )}
        />
      )}
      <nav aria-label="Breadcrumb">
        <ol className={styles.list}>
          <li className={styles.item}>
            <BareLink href="/" aria-label="Home" className={styles.link}>
              <House />
            </BareLink>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className={styles.item}>
                <ChevronRight />
                {isLast || !item.href ? (
                  <span aria-current="page" className={styles.current}>
                    {item.label}
                  </span>
                ) : (
                  <BareLink href={item.href} className={styles.link}>
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

function hrefToPath(href: Href, locale: string): string {
  if (typeof href === "string") {
    return `/${locale}${href}`;
  }
  let path = href.pathname as string;
  if ("params" in href && href.params) {
    for (const [key, value] of Object.entries(href.params)) {
      path = path.replace(`[${key}]`, String(value));
    }
  }
  return `/${locale}${path}`;
}
