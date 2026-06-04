import type { Organization, WithContext } from "schema-dts";

type OrganizationParams = {
  name: string;
  url: string;
};

export function generateOrganizationJsonLd(
  params: OrganizationParams,
): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: params.name,
    url: params.url,
  };
}
