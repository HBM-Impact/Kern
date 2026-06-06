import type { ComponentProps } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = ComponentProps<typeof IntlLink>;

export function BareLink({ prefetch = true, ...props }: Props) {
  return <IntlLink prefetch={prefetch} {...props} />;
}
