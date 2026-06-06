import type { ButtonProps } from "@repo/ui/buttons";
import { LinkButton as UILinkButton } from "@repo/ui/buttons";
import type { ComponentProps } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = Omit<ComponentProps<typeof IntlLink>, "className" | "as"> &
  ButtonProps;

export function LinkButton({prefetch = true, ...props}: Props) {
  return <UILinkButton prefetch={prefetch} as={IntlLink} {...props} />;
}
