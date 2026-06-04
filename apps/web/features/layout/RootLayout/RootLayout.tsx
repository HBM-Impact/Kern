import type { ReactNode } from "react";
import { Breadcrumbs } from "../Breadcrumbs";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./RootLayout.module.css";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  path: string;
};

export function RootLayout({
  children,
  path,
}: Props) {
  return (
    <html lang="en">
      <body className={styles.body} hx-boost="true">
        <a href="#main-content" className={styles.skipLink}>
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className={styles.main}>
          <Breadcrumbs path={path} />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
