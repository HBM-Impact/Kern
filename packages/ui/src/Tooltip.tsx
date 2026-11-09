"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import * as stylex from "@stylexjs/stylex";
import type { ReactElement } from "react";
import { colors, ease, font, radius, size } from "./tokens.stylex";

type Props = {
  content: string;
  position?: "top" | "bottom";
  children: ReactElement;
};

const styles = stylex.create({
  popup: {
    paddingBlock: size[1],
    paddingInline: size[2],
    fontSize: font.size0,
    color: colors.text,
    backgroundColor: colors.bgElevated,
    borderRadius: radius[2],
    whiteSpace: "nowrap",
    transition: `opacity 0.2s ${ease[3]}`,
  },
  hidden: {
    opacity: 0,
  },
});

export function Tooltip({ content, position = "top", children }: Props) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={position} sideOffset={4}>
          <BaseTooltip.Popup
            className={({ transitionStatus: t }) =>
              stylex.props(
                styles.popup,
                (t === "starting" || t === "ending") && styles.hidden,
              ).className
            }
          >
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
