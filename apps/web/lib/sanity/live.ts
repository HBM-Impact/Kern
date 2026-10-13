import { cookies, draftMode } from "next/headers";
import {
  defineLive,
  type LivePerspective,
  resolvePerspectiveFromCookies,
  resolveVariantFromCookies,
  type StrictDefinedFetchType,
} from "next-sanity/live";
import { client } from "./client";
import { token } from "./token";

// Strict: draftMode() and cookies() can't be read inside 'use cache', so every
// call site passes perspective and stega explicitly.
const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
});

export { SanityLive };

// The one 'use cache' boundary for Sanity. sanityFetch tags the entry with
// the query's sync tags so <SanityLive /> can expire it on publish.
export const cachedSanity: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};

export type DynamicFetchOptions = {
  perspective: LivePerspective;
  variant?: string;
  stega: boolean;
};

// Resolve the request-bound values outside the cache boundary. Visitors never
// have draft mode on, so they never reach cookies() and the route prerenders.
export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return { perspective: "published", stega: false };

  const jar = await cookies();
  const [perspective, variant] = await Promise.all([
    resolvePerspectiveFromCookies({ cookies: jar }),
    resolveVariantFromCookies({ cookies: jar }),
  ]);
  // Stega needs a studioUrl to point edits at; without one the fetch throws.
  const stega = Boolean(client.config().stega.studioUrl);
  return { perspective: perspective ?? "drafts", variant, stega };
}
