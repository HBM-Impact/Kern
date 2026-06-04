import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/features/layout/breadcrumbs";
import { PageHeader } from "@/features/layout/page-header";
import { routingConfig } from "@/i18n/routing";
import { ProductCatalog } from "./[id]/_components/ProductCatalog";

export async function generateStaticParams() {
  const categories = await getCategories();
  return routingConfig.locales.flatMap((locale) =>
    categories.map((c) => ({ locale, category: c.slug })),
  );
}

async function getCategoryName(id: string) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === id)?.name ?? id;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const name = await getCategoryName(category);
  return {
    title: name,
    description: `Browse all products in the ${name} category.`,
  };
}

export default async function CategoryRoute({
  params,
  searchParams,
}: PageProps<"/[locale]/products/[category]">) {
  const { locale, category } = await params;
  const { sort } = await searchParams;
  setRequestLocale(locale as Locale);

  const name = await getCategoryName(category);

  return (
    <Container as="section">
      <Breadcrumbs
        items={[{ href: "/products", label: "Products" }, { label: name }]}
      />
      <PageHeader
        title={name}
        description={`Browse all products in the ${name} category.`}
      />
      <ProductCatalog
        category={category}
        sort={typeof sort === "string" ? sort : undefined}
      />
    </Container>
  );
}
