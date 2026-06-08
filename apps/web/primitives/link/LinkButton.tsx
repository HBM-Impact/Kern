"use client";

import type { ButtonProps } from "@repo/ui/buttons";
import { LinkButton as UILinkButton } from "@repo/ui/buttons";
import type { ComponentProps } from "react";
import { useState } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = Omit<ComponentProps<typeof IntlLink>, "className" | "as"> &
  ButtonProps;

export function LinkButton({ href, onPointerDown, ...props }: Props) {
  const [active, setActive] = useState(false);

  return (
    <UILinkButton
      as={IntlLink}
      href={href}
      prefetch={active ? null : false}
      onPointerDown={(e) => {
        setActive(true);
        onPointerDown?.(e);
      }}
      {...props}
    />
  );
}
