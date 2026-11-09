import { minutesToSeconds } from "@repo/utils/time";
import { cacheLife } from "next/cache";
import { type StegaBranded, stegaClean } from "next-sanity";
import type { PAGE_QUERY_RESULT, RouteMeta } from "@/sanity.types";
import { client } from "./client";
import { cachedSanity, getDynamicFetchOptions } from "./live";
import {
  PAGE_QUERY,
  PAGE_SLUGS_QUERY,
  ROUTE_META_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";

// The CMS content operations. Two fetch paths live behind them:
// - getPage is draft-aware and live: it reads through cachedSanity, and
//   <SanityLive /> in (cms)/layout expires it on publish.
// - The rest read published content with the plain client on a 5-minute
//   timer. They render on routes that don't mount <SanityLive />, and trading
//   click-to-edit there keeps those routes prerendered.

export async function getPage(slug: string) {
  // draftMode() and cookies() can't be read inside "use cache", so the
  // request-bound options resolve first, outside cachedSanity.
  const options = await getDynamicFetchOptions();
  const { data } = await cachedSanity({
    query: PAGE_QUERY,
    params: { slug },
    ...options,
  });
  if (!data) return null;

  // Stega stays on display text only. Metadata, JSON-LD, hrefs and API params
  // get clean values, so edit metadata never corrupts them.
  return {
    ...data,
    meta: {
      title: stegaClean(data.title) ?? undefined,
      description: stegaClean(data.description) ?? undefined,
    },
    modules: (data.modules ?? []).map(cleanModule),
  };
}

type RawModule = NonNullable<
  NonNullable<StegaBranded<PAGE_QUERY_RESULT>>["modules"]
>[number];

function cleanModule(module: RawModule) {
  switch (module._type) {
    case "heroModule":
      return {
        ...module,
        cta: module.cta && {
          ...module.cta,
          route: stegaClean(module.cta.route),
        },
      };
    case "productCarouselModule":
      return { ...module, category: stegaClean(module.category) };
    default: {
      // A module type added to the schema has to be handled here first.
      const unhandled: never = module;
      return unhandled;
    }
  }
}

export async function getPageSlugs() {
  "use cache";
  cacheLife({ revalidate: minutesToSeconds(5) });
  // PAGE_SLUGS_QUERY leaves out HOME_SLUG: the home page lives at the index.
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(PAGE_SLUGS_QUERY);
  return slugs.filter((slug): slug is string => Boolean(slug));
}

export async function getSiteSettings() {
  "use cache";
  cacheLife({ revalidate: minutesToSeconds(5) });
  return client.fetch(SITE_SETTINGS_QUERY);
}

export async function getRouteMeta(route: NonNullable<RouteMeta["route"]>) {
  "use cache";
  cacheLife({ revalidate: minutesToSeconds(5) });
  return client.fetch(ROUTE_META_QUERY, { route });
}
