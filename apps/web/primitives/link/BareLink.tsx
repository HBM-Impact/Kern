"use client";

import type { ComponentProps } from "react";
import { useState } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = ComponentProps<typeof IntlLink>;

export function BareLink({ href, onPointerDown, ...props }: Props) {
  const [active, setActive] = useState(false);

  return (
    <IntlLink
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
