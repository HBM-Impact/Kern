import { minutesToSeconds } from "@repo/utils/time";

// Site chrome is rendered on every route, including the fully static catalog
// pages, so it reads published content with the plain client rather than the
// draft-aware live fetch. That trades click-to-edit on the nav for keeping
// those routes prerendered.
export const SITE_SETTINGS_REVALIDATE = minutesToSeconds(5);
