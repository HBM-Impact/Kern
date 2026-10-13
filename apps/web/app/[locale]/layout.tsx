import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import "@repo/ui/globals.css";
import { RootLayout } from "@/shell/RootLayout";

// Every route must come out of the build fully rendered. A fetch outside
// 'use cache' or a cookies()/headers() read now fails the build instead of
// quietly turning a page dynamic.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    template: "%s | Kern",
    default: "Kern",
  },
  // "./" resolves per-route, so every page inherits a self-referencing canonical.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "Kern",
  },
} satisfies Metadata;

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  return <RootLayout locale={await getLocale()}>{children}</RootLayout>;
}
