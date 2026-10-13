"use client";

import dynamic from "next/dynamic";

// The link's environment hook comes from @sanity/visual-editing, which drags
// in the whole editing stack (~180 KB gz). A static import puts that in the
// CMS layout's chunks for every visitor; behind import() it only loads when
// draft mode actually renders this.
export const DisableDraftMode = dynamic(() =>
  import("./DisableDraftModeLink").then((m) => m.DisableDraftModeLink),
);
