import type { ComponentProps } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = ComponentProps<typeof IntlLink>;

// Under partialPrefetching a default Link only fetches the shared App Shell;
// params-dependent content would load after the click. Every route is
// prerendered, so a full prefetch is a cheap CDN hit and makes clicks instant.
export function BareLink(props: Props) {
  return <IntlLink prefetch {...props} />;
}
