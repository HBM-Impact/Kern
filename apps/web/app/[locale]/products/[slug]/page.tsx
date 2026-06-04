import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ProductListPage } from "@/features/products/pages/product-list-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formatted = slug
    .replaceAll("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: formatted,
    description: `Browse all products in the ${formatted} category.`,
  };
}

export default async function CategoryRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  const { sort } = await searchParams;
  setRequestLocale(locale as Locale);

  return (
    <ProductListPage
      slug={slug}
      sort={typeof sort === "string" ? sort : undefined}
    />
  );
}
