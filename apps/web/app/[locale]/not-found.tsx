import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getRouteMeta } from "@/lib/sanity/route-meta";
import { LinkButton } from "@/primitives/link/LinkButton";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

// Next ignores generateMetadata in not-found.tsx, and also discards the
// metadata of the page that threw notFound(), so the <title> has to be a
// literal here. Everything visible comes from the "/404" route page.
export const metadata: Metadata = {
  title: "Not Found",
};

export default async function NotFound() {
  const [t, meta] = await Promise.all([
    getTranslations(),
    getRouteMeta("/404"),
  ]);

  return (
    <Container as="section">
      <Breadcrumbs items={[{ label: meta?.title ?? "" }]} />
      <PageHeader
        title={meta?.title ?? ""}
        description={meta?.description ?? undefined}
      />
      <LinkButton href="/">{t("Pages.NotFound.backHome")}</LinkButton>
    </Container>
  );
}
