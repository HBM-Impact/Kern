import { minutesToSeconds } from "@repo/utils/time";
import type { RouteMeta } from "@/sanity.types";
import { client } from "./client";
import { ROUTE_META_QUERY } from "./queries";

// Same trade as site-settings.ts: the routes that own their own URL are
// force-static, so their copy is read with the plain client rather than the
// draft-aware live fetch.
const REVALIDATE = minutesToSeconds(5);

export function getRouteMeta(route: NonNullable<RouteMeta["route"]>) {
  return client.fetch(
    ROUTE_META_QUERY,
    { route },
    { next: { revalidate: REVALIDATE } },
  );
}
