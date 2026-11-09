import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  // next-intl imports `next/navigation` without an extension, which only
  // resolves once Vite bundles it instead of Node loading it raw.
  test: { server: { deps: { inline: ["next-intl"] } } },
});
