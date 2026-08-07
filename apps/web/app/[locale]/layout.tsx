import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "@repo/ui/globals.css";
import { RootLayout } from "@/shell/root-layout";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: {
    template: "%s | Kern",
    default: "Kern",
  },
} satisfies Metadata;

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  return <RootLayout locale={await getLocale()}>{children}</RootLayout>;
}
