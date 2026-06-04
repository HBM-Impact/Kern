import type { Messages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { Footer } from "@/features/layout/footer";
import { Header } from "@/features/layout/header";
import { Providers } from "@/features/layout/providers";
import { SkipLink } from "@/features/layout/skip-link";
import styles from "./RootLayout.module.css";

type Props = {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
};

export function RootLayout({ locale, messages, children }: Props) {
  return (
    <html lang={locale}>
      <body className={styles.body}>
        <SkipLink />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main id="main-content" className={styles.main}>
              {children}
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
