import type { SearchAction, WebSite, WithContext } from "schema-dts";

type WebSiteParams = {
  name: string;
  url: string;
  searchUrl?: string;
  inLanguage?: string;
};

type SearchActionWithQueryInput = SearchAction & {
  "query-input": string;
};

export function generateWebSiteJsonLd(
  params: WebSiteParams,
): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: params.name,
    url: params.url,
    ...(params.inLanguage && { inLanguage: params.inLanguage }),
    ...(params.searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${params.searchUrl}?query={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      } as SearchActionWithQueryInput,
    }),
  };
}
