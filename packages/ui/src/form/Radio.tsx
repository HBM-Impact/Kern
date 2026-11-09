"use client";

import { Radio as BaseRadio } from "@base-ui/react/radio";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { border, colors, radius, size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

/** Must render inside a `RadioGroup`, which owns `name` and the value. */
type Props = InputProps & { value: string; disabled?: boolean };

const styles = stylex.create({
  label: {
    display: "flex",
    gap: size[2],
    cursor: "pointer",
    height: size[5],
    alignItems: "center",
  },
  dot: {
    width: size[3],
    height: size[3],
    borderRadius: radius.round,
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
  indicator: {
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: radius.round,
    backgroundColor: colors.text,
  },
});

export function Radio({ label, ...rest }: Props) {
  const id = useId();

  return (
    <label htmlFor={id} {...stylex.props(styles.label)}>
      <BaseRadio.Root
        id={id}
        {...rest}
        className={({ disabled }) =>
          stylex.props(styles.dot, disabled && styles.disabled).className
        }
      >
        <BaseRadio.Indicator {...stylex.props(styles.indicator)} />
      </BaseRadio.Root>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
    </label>
  );
}
