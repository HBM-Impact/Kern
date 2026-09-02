import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/app/[locale]/_components/Hero";
import { FeaturedProducts } from "@/features/products/components/FeaturedProducts";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { generateWebSiteJsonLd } from "@/lib/seo/web-site";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("Pages.Home.title"),
    description: t("Pages.Home.description"),
  };
}

export default async function HomePage() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const baseUrl = getBaseUrl();

  const { products } = await getProductByCategory({
    category: "smartphones",
    skip: 0,
    limit: 8,
  });

  return (
    <>
      <JsonLdScript
        data={generateWebSiteJsonLd({
          name: "Kern",
          url: baseUrl,
          searchUrl: `${baseUrl}/${locale}/products/search`,
          inLanguage: locale,
        })}
      />
      <Container as="article">
        <Breadcrumbs />
        <PageHeader
          title={t("Pages.Home.title")}
          description={t("Pages.Home.description")}
        />
        <Hero />
        <FeaturedProducts products={products} />
      </Container>
    </>
  );
}
