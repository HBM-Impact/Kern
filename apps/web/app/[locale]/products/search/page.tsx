import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SearchPage } from "@/features/products/pages/search-page";

export const metadata = {
  title: "Search Products",
  description: "Find products by name, brand, or description.",
} satisfies Metadata;

export default async function SearchRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const { q, sort } = await searchParams;
  setRequestLocale(locale as Locale);

  return (
    <SearchPage
      q={typeof q === "string" ? q : undefined}
      sort={typeof sort === "string" ? sort : undefined}
    />
  );
}
