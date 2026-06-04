import { LinkButton } from "@repo/ui/buttons";
import { Display } from "@repo/ui/display";
import { Typography } from "@repo/ui/typography";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Not Found",
};

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <section>
      <hgroup>
        <Display variant="display1" as="h1">
          {t("Pages.NotFound.title")}
        </Display>
        <Typography>{t("Pages.NotFound.description")}</Typography>
      </hgroup>
      <LinkButton href="/">{t("Pages.NotFound.backHome")}</LinkButton>
    </section>
  );
}
