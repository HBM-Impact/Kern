import { Link as UILink } from "@repo/ui/link";
import type { ComponentProps } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = Omit<ComponentProps<typeof IntlLink>, "className" | "as">;

export function Link({ prefetch = true, ...props }: Props) {
  return <UILink prefetch={prefetch} as={IntlLink} {...props} />;
}
