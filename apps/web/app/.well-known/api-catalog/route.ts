export const dynamic = "force-static";

import { daysToSeconds } from "@repo/utils/time";

const catalog = {
  linkset: [
    {
      anchor: "/",
      "service-doc": [
        {
          href: "https://dummyjson.com/docs",
          type: "text/html",
          title: "Commerce API Documentation",
        },
      ],
    },
  ],
};

export function GET() {
  return Response.json(catalog, {
    headers: {
      "Content-Type":
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      "Cache-Control": `public, max-age=${daysToSeconds(365)}, immutable`,
    },
  });
}
