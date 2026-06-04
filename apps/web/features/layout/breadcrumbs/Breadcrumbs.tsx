"use client";

import { ChevronRight, House } from "lucide-react";
import { IntlLink, usePathname } from "@/i18n/navigation";
import styles from "./Breadcrumbs.module.css";

function buildHref(segments: string[], upToIndex: number) {
  const s = segments.slice(0, upToIndex + 1);
  const [, category, id] = s;
  if (id)
    return {
      pathname: "/products/[category]/[id]" as const,
      params: { category: category!, id },
    };
  if (category)
    return {
      pathname: "/products/[category]" as const,
      params: { category },
    };
  return "/products" as const;
}

export function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean);
  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <IntlLink href="/" aria-label="Home" className={styles.link}>
            <House />
          </IntlLink>
        </li>
        {segments.map((segment, index) => {
          const stringHref = `/${segments.slice(0, index + 1).join("/")}`;
          const href = buildHref(segments, index);
          const isLast = index === segments.length - 1;
          const label = decodeURIComponent(segment).replaceAll("-", " ");
          return (
            <li key={stringHref} className={styles.item}>
              <ChevronRight />
              {isLast ? (
                <span aria-current="page" className={styles.current}>
                  {label}
                </span>
              ) : (
                <IntlLink href={href} className={styles.link}>
                  {label}
                </IntlLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
