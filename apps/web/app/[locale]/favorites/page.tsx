import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { FavoritesView } from "@/features/favorites/components/favorites-view";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved products.",
};

export default async function FavoritesPage({
  params,
}: PageProps<"/[locale]/favorites">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <Container as="section">
      <Breadcrumbs locale={locale} items={[{ label: "Favorites" }]} />
      <PageHeader title="Favorites" description="Your saved products." />
      <FavoritesView />
    </Container>
  );
}
