import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/sanity/live";
import { DisableDraftMode } from "@/shell/DisableDraftMode";

export default async function CmsLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { isEnabled } = await draftMode();

  return (
    <>
      {children}
      <SanityLive includeDrafts={isEnabled} />
      {isEnabled ? (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      ) : null}
    </>
  );
}
