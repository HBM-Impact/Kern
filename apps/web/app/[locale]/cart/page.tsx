import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CartView } from "@/features/cart/components/cart-view";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart.",
};

export default async function CartPage({
  params,
}: PageProps<"/[locale]/cart">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <Container as="section">
      <Breadcrumbs locale={locale} items={[{ label: "Cart" }]} />
      <PageHeader title="Cart" description="Your shopping cart." />
      <CartView />
    </Container>
  );
}
