import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LinkButton } from "@/primitives/link/LinkButton";
import { Breadcrumbs } from "@/shell/breadcrumbs";
import { PageHeader } from "@/shell/page-header";

export const metadata: Metadata = {
  title: "Not Found",
};

export default async function NotFound() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  return (
    <Container as="section">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("Pages.NotFound.title") }]}
      />
      <PageHeader
        title={t("Pages.NotFound.title")}
        description={t("Pages.NotFound.description")}
      />
      <LinkButton href="/">{t("Pages.NotFound.backHome")}</LinkButton>
    </Container>
  );
}
