"use client";

import type { ComponentProps } from "react";
import { useState } from "react";
import { IntlLink } from "@/i18n/navigation";

type Props = ComponentProps<typeof IntlLink>;

export function BareLink({ href, onPointerEnter, ...props }: Props) {
  const [active, setActive] = useState(false);

  return (
    <IntlLink
      href={href}
      prefetch={active ? null : false}
      onPointerEnter={(e) => {
        setActive(true);
        onPointerEnter?.(e);
      }}
      {...props}
    />
  );
}
