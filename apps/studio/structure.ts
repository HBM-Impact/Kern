import { CogIcon } from "@sanity/icons/Cog";
import type { StructureResolver } from "sanity/structure";

// siteSettings is a singleton: it is reachable only through this fixed document
// ID, never as a creatable list. The home page is not — it is an ordinary page
// in the list below, the one whose slug is "home".
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("siteSettings")
        .title("Site settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("routeMeta").title("Route pages"),
    ]);
