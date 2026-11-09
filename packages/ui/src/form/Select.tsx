"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import * as stylex from "@stylexjs/stylex";
import { Check, ChevronDown } from "lucide-react";
import { border, colors, font, radius, size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type SelectOption = string | { value: string; label: string };

type Props = {
  options: SelectOption[];
} & InputProps &
  Pick<
    BaseSelect.Root.Props<string>,
    "name" | "value" | "defaultValue" | "onValueChange" | "disabled"
  >;

const styles = stylex.create({
  trigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: size[2],
    height: "2.5rem",
    paddingInline: size[3],
    cursor: { default: "pointer", ":disabled": "not-allowed" },
    color: colors.text,
    fontSize: font.size1,
    opacity: { ":disabled": 0.5 },
  },
  icon: {
    display: "flex",
  },
  popup: {
    minWidth: "var(--anchor-width)",
    maxHeight: "var(--available-height)",
    overflowY: "auto",
    padding: size[1],
    backgroundColor: colors.bgElevated,
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radius[2],
    transition: "opacity 0.15s ease-out",
  },
  hidden: {
    opacity: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: size[3],
    paddingBlock: size[2],
    paddingInline: size[3],
    borderRadius: radius[2],
    cursor: "pointer",
    fontFamily: font.sans,
    fontSize: font.size1,
    color: colors.text,
    outline: "none",
  },
  highlighted: {
    backgroundColor: colors.hoverBg,
  },
});

export function Select({ options, label, ...rest }: Props) {
  const items = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );

  return (
    <BaseSelect.Root items={items} {...rest}>
      <div {...stylex.props(formStyles.label)}>
        <BaseSelect.Label {...stylex.props(formStyles.labelText)}>
          {label}
        </BaseSelect.Label>
        <BaseSelect.Trigger
          {...stylex.props(formStyles.control, styles.trigger)}
        >
          <BaseSelect.Value />
          <BaseSelect.Icon {...stylex.props(styles.icon)}>
            <ChevronDown size={16} />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </div>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4}>
          <BaseSelect.Popup
            className={({ transitionStatus: t }) =>
              stylex.props(
                styles.popup,
                (t === "starting" || t === "ending") && styles.hidden,
              ).className
            }
          >
            <BaseSelect.List>
              {items.map((item) => (
                <BaseSelect.Item
                  key={item.value}
                  value={item.value}
                  className={({ highlighted }) =>
                    stylex.props(styles.item, highlighted && styles.highlighted)
                      .className
                  }
                >
                  <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator>
                    <Check size={14} />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
