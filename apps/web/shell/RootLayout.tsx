import { colors, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { generateOrganizationJsonLd } from "@/lib/seo/organization";
import { ErrorBoundary } from "@/shell/ErrorBoundary";
import { Footer } from "@/shell/Footer";
import { Header } from "@/shell/Header";
import { Providers } from "@/shell/Providers";
import { SkipLink } from "@/shell/SkipLink";

type Props = {
  locale: string;
  children: React.ReactNode;
};

const styles = stylex.create({
  body: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gridTemplateColumns: "100dvw",
    gap: size[3],
    minHeight: "100dvh",
    backgroundColor: colors.bg,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
    paddingInline: { default: size[5], "@media (width <= 480px)": size[3] },
    maxWidth: "72rem",
    width: "100%",
    marginInline: "auto",
  },
});

export function RootLayout({ locale, children }: Props) {
  const baseUrl = getBaseUrl();

  return (
    <html lang={locale}>
      <body {...stylex.props(styles.body)}>
        {/* Catalog data is fetched client-side straight from the commerce API.
            React hoists this into <head>. */}
        <link rel="preconnect" href="https://dummyjson.com" />
        <JsonLdScript
          data={generateOrganizationJsonLd({ name: "Kern", url: baseUrl })}
        />
        <SkipLink />
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <main id="main-content" {...stylex.props(styles.main)}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
