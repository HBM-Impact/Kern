import { Link as UILink } from "@repo/ui/link";
import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "className">;

export function ExternalLink(props: Props) {
  return <UILink {...props} />;
}
