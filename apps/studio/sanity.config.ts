import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { resolve } from "./presentation/resolve";
import { schemaTypes } from "./schema-types";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Kern",
  projectId: "47s55g10",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin:
          process.env.SANITY_STUDIO_PREVIEW_ORIGIN ?? "http://localhost:3000",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
