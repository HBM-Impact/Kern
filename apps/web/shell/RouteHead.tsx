import type { Metadata } from "next";
import { getRouteMeta } from "@/lib/sanity/content";
import type { RouteMeta } from "@/sanity.types";
import { Breadcrumbs } from "@/shell/Breadcrumbs";
import { PageHeader } from "@/shell/PageHeader";

type Route = NonNullable<RouteMeta["route"]>;
type LinkableRoute = Exclude<Route, "/404">;

// routeMeta routes nested under another one, for the breadcrumb trail.
const PARENT: Partial<Record<Route, LinkableRoute>> = {
  "/products/search": "/products",
};

export async function routeMetadata(route: Route): Promise<Metadata> {
  const meta = await getRouteMeta(route);
  return { title: meta?.title, description: meta?.description };
}

// An ancestor crumb labelled from its own route meta, so no label is hardcoded.
export async function routeCrumb(route: LinkableRoute) {
  const meta = await getRouteMeta(route);
  return { href: route, label: meta?.title ?? "" };
}

// Breadcrumbs and h1 for a page whose copy lives in routeMeta.
export async function RouteHead({ route }: { route: Route }) {
  const parent = PARENT[route];
  const [meta, parentCrumb] = await Promise.all([
    getRouteMeta(route),
    parent ? routeCrumb(parent) : undefined,
  ]);
  const title = meta?.title ?? "";

  return (
    <>
      <Breadcrumbs
        items={[...(parentCrumb ? [parentCrumb] : []), { label: title }]}
      />
      <PageHeader title={title} description={meta?.description ?? undefined} />
    </>
  );
}
