import { Container } from "@repo/ui/container";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { stegaClean } from "next-sanity";
import { Modules } from "@/features/modules/components/Modules";
import { routingConfig } from "@/i18n/routing";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { HOME_SLUG, PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/lib/sanity/queries";
import { getBaseUrl } from "@/lib/seo/get-base-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { generateWebSiteJsonLd } from "@/lib/seo/web-site";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";
import { PortableTextBody } from "../_components/PortableTextBody";

type Params = PageProps<"/[locale]/[[...slug]]">["params"];

// The index and every CMS page are one route: no segment means the HOME_SLUG
// page. Nothing in Sanity is nested, so anything deeper 404s here — which also
// makes this the catch-all that keeps unknown paths inside the locale layout.
async function resolveSlug(params: Params) {
  const { slug: segments = [] } = await params;
  const [slug, ...rest] = segments;

  // The home page is served at the index, so /home is not a second URL for it.
  if (rest.length > 0 || slug === HOME_SLUG) notFound();

  return { slug: slug ?? HOME_SLUG, isHome: !slug };
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(PAGE_SLUGS_QUERY);

  return routingConfig.locales.flatMap((locale) => [
    { locale, slug: [] },
    ...slugs
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ locale, slug: [slug] })),
  ]);
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[[...slug]]">): Promise<Metadata> {
  const { slug } = await resolveSlug(params);
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    stega: false,
  });

  return {
    title: page?.title ?? undefined,
    description: page?.description ?? undefined,
  };
}

export default async function CmsPage({
  params,
}: PageProps<"/[locale]/[[...slug]]">) {
  const [{ slug, isHome }, locale] = await Promise.all([
    resolveSlug(params),
    getLocale(),
  ]);
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!page) notFound();

  const baseUrl = getBaseUrl();

  return (
    <>
      {isHome ? (
        <JsonLdScript
          data={generateWebSiteJsonLd({
            name: "Kern",
            url: baseUrl,
            searchUrl: `${baseUrl}/${locale}/products/search`,
            inLanguage: locale,
          })}
        />
      ) : null}
      <Container as="article">
        <Breadcrumbs
          items={isHome ? [] : [{ label: stegaClean(page.title) ?? "" }]}
        />
        <PageHeader
          title={page.title ?? ""}
          description={page.description ?? undefined}
        />
        {page.body ? <PortableTextBody value={page.body} /> : null}
        <Modules modules={page.modules ?? []} />
      </Container>
    </>
  );
}
