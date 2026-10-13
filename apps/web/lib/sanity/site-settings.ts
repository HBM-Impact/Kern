import { minutesToSeconds } from "@repo/utils/time";
import { cacheLife } from "next/cache";
import { client } from "./client";
import { SITE_SETTINGS_QUERY } from "./queries";

// Site chrome is rendered on every route, including the catalog pages that
// don't mount <SanityLive />, so it reads published content with the plain
// client on a timer rather than the draft-aware live fetch. That trades
// click-to-edit on the nav for keeping those routes prerendered.
export async function getSiteSettings() {
  "use cache";
  cacheLife({ revalidate: minutesToSeconds(5) });
  return client.fetch(SITE_SETTINGS_QUERY);
}
