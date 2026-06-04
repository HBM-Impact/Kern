import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeaturedProducts } from "@/features/home/components/featured-products";
import { Hero } from "@/features/home/components/hero";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale });
  return {
    title: t("Pages.Home.title"),
    description: t("Pages.Home.description"),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { products } = await getProductByCategory({
    category: "smartphones",
    skip: 0,
    limit: 8,
  });

  return (
    <Container as="article">
      <Hero />
      <FeaturedProducts products={products} />
    </Container>
  );
}
