import { minutesToSeconds } from "@repo/utils/time";
import { cacheLife } from "next/cache";
import type { RouteMeta } from "@/sanity.types";
import { client } from "./client";
import { ROUTE_META_QUERY } from "./queries";

// Same trade as site-settings.ts: the routes that own their own URL don't
// mount <SanityLive />, so their copy is read with the plain client on a timer.
export async function getRouteMeta(route: NonNullable<RouteMeta["route"]>) {
  "use cache";
  cacheLife({ revalidate: minutesToSeconds(5) });
  return client.fetch(ROUTE_META_QUERY, { route });
}
