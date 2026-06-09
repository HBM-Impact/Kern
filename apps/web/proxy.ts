import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function handleMarkdown(request: NextRequest) {
  if (!request.headers.get("Accept")?.includes("text/markdown")) return;
  const { pathname } = new URL(request.url);
  return NextResponse.rewrite(
    new URL(`/api/markdown?path=${encodeURIComponent(pathname)}`, request.url),
  );
}

export default function middleware(request: NextRequest) {
  return handleMarkdown(request) ?? intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
