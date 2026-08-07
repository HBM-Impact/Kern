import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import "@repo/ui/globals.css";
import { RootLayout } from "@/shell/root-layout";

export const dynamic = "force-static";

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
