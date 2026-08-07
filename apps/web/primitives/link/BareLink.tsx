import type { ComponentProps } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = ComponentProps<typeof IntlLink>;

// Every route is prerendered, so prefetches are cheap CDN hits — Next's default
// (viewport-based) beats hover-gating, which never fires on touch devices.
export function BareLink(props: Props) {
  return <IntlLink {...props} />;
}
