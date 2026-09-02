import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "47s55g10", dataset: "production" },
  typegen: {
    enabled: true,
    // Scoped to the two folders that hold queries — a bare `../web/**` glob
    // walks node_modules and .next.
    path: "../web/{app,lib}/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../web/sanity.types.ts",
    overloadClientMethods: true,
  },
});
