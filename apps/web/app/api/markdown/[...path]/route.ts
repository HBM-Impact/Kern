export const runtime = "nodejs";

import { daysToSeconds, hoursToSeconds } from "@repo/utils/time";
import ky, { HTTPError } from "ky";
import { NodeHtmlMarkdown } from "node-html-markdown";

function extractPageData(html: string) {
  const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]?.trim() ?? "";
  const description =
    /<meta[^>]+name="description"[^>]+content="([^"]*)"/i.exec(html)?.[1] ?? "";
  const mainHtml =
    /<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i.exec(html)?.[1] ??
    html;
  const jsonLd =
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i
      .exec(html)?.[1]
      ?.trim() ?? "";
  return { title, description, mainHtml, jsonLd };
}

function buildMarkdown(
  title: string,
  description: string,
  body: string,
  jsonLd: string,
) {
  let out = "";
  if (title || description) {
    out += "---\n";
    if (title) out += `title: "${title}"\n`;
    if (description) out += `description: "${description}"\n`;
    out += "---\n\n";
  }
  out += body;
  if (jsonLd) out += `\n\n\`\`\`json\n${jsonLd}\n\`\`\`\n`;
  return out;
}

export async function GET(
  request: Request,
  { params }: RouteContext<"/api/markdown/[...path]">,
) {
  const url = new URL(request.url);
  const { path: segments } = await params;
  const path = `/${segments.join("/")}`;

  let html: string;
  try {
    html = await ky(`${url.origin}${path}`, {
      headers: { Accept: "text/html" },
      next: { revalidate: daysToSeconds(1) },
    }).text();
  } catch (err) {
    if (err instanceof HTTPError)
      return new Response(null, { status: err.response.status });
    throw err;
  }

  const { title, description, mainHtml, jsonLd } = extractPageData(html);
  const output = buildMarkdown(
    title,
    description,
    NodeHtmlMarkdown.translate(mainHtml),
    jsonLd,
  );

  return new Response(output, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": `public, s-maxage=${daysToSeconds(1)}, stale-while-revalidate=${hoursToSeconds(1)}`,
      "x-markdown-tokens": String(Math.ceil(output.length / 4)),
    },
  });
}
