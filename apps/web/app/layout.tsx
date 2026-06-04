import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Kern",
  description: "A clean, simple monorepo with a UI library, Storybook, and web app.",
} satisfies Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
