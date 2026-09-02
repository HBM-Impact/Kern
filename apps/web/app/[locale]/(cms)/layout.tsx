import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/sanity/live";
import { DisableDraftMode } from "@/shell/DisableDraftMode";

// The parent layout forces static rendering for the catalog routes. Everything
// under this group reads draft-aware content, so it opts back into Next's
// default: prerendered for visitors, per-request while Draft Mode is on.
export const dynamic = "auto";

export default async function CmsLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { isEnabled } = await draftMode();

  return (
    <>
      {children}
      <SanityLive />
      {isEnabled ? (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      ) : null}
    </>
  );
}
