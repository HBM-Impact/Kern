import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/app/[locale]/_components/hero";
import { FeaturedProducts } from "@/features/products/components/featured-products";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { generateWebSiteJsonLd } from "@/lib/seo/web-site";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

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

  const t = await getTranslations({ locale: locale as Locale });
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
        <Breadcrumbs locale={locale} items={[]} />
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
