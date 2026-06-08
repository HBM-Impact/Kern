"use client";

import { Link as UILink } from "@repo/ui/link";
import type { ComponentProps } from "react";
import { useState } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = Omit<ComponentProps<typeof IntlLink>, "className" | "as">;

export function Link({ href, onPointerEnter, ...props }: Props) {
  const [active, setActive] = useState(false);

  return (
    <UILink
      as={IntlLink}
      href={href}
      prefetch={active ? null : false}
      onPointerDown={(e) => {
        setActive(true);
        onPointerEnter?.(e);
      }}
      {...props}
    />
  );
}
