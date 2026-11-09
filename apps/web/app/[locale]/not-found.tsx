import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/primitives/link/LinkButton";
import { RouteHead } from "@/shell/RouteHead";

// Next ignores generateMetadata in not-found.tsx, and also discards the
// metadata of the page that threw notFound(), so the <title> has to be a
// literal here. Everything visible comes from the "/404" route page.
export const metadata: Metadata = {
  title: "Not Found",
};

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <Container as="section">
      <RouteHead route="/404" />
      <LinkButton href="/">{t("Pages.NotFound.backHome")}</LinkButton>
    </Container>
  );
}
