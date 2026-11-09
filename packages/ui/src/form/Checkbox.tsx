"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { border, colors, radius, size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = InputProps &
  Pick<
    BaseCheckbox.Root.Props,
    | "name"
    | "value"
    | "checked"
    | "defaultChecked"
    | "onCheckedChange"
    | "disabled"
  >;

const styles = stylex.create({
  label: {
    display: "flex",
    gap: size[2],
    cursor: "pointer",
    height: size[6],
    alignItems: "center",
  },
  box: {
    width: size[3],
    height: size[3],
    borderRadius: radius[2],
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    display: "grid",
    placeContent: "center",
    cursor: "pointer",
    outline: { ":focus-visible": `${border[3]} auto -webkit-focus-ring-color` },
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  // A rotated corner draws the checkmark, so no icon dependency is needed.
  check: {
    width: "0.3rem",
    height: "0.6rem",
    borderRightWidth: "2px",
    borderRightStyle: "solid",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderColor: colors.text,
    transform: "rotate(45deg) translate(-10%, -20%)",
  },
});

export function Checkbox({ label, ...rest }: Props) {
  const id = useId();

  return (
    <label htmlFor={id} {...stylex.props(styles.label)}>
      <BaseCheckbox.Root
        id={id}
        {...rest}
        className={({ disabled }) =>
          stylex.props(styles.box, disabled && styles.disabled).className
        }
      >
        <BaseCheckbox.Indicator {...stylex.props(styles.check)} />
      </BaseCheckbox.Root>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
    </label>
  );
}
