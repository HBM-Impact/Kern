import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    copyrightHolder,
    headerNav[]{ _key, label, route },
    footerContact[]{ _key, label, url },
    footerStack[]{ _key, label, url }
  }
`);

// The index route renders the page with this slug. PAGE_SLUGS_QUERY leaves it
// out and the [slug] route rejects it, so the home page has exactly one URL.
export const HOME_SLUG = "home";

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    description,
    body,
    modules[]{
      _key,
      _type,
      _type == "heroModule" => {
        heading,
        subheading,
        cta{ label, route }
      },
      _type == "productCarouselModule" => {
        title,
        description,
        category,
        limit
      }
    }
  }
`);

export const ROUTE_META_QUERY = defineQuery(`
  *[_type == "routeMeta" && route == $route][0]{
    title,
    description
  }
`);

export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && slug.current != "${HOME_SLUG}"].slug.current
`);
