import * as stylex from "@stylexjs/stylex";
import type { InputHTMLAttributes } from "react";
import { border, colors, ease, radius, size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

const styles = stylex.create({
  label: {
    position: "relative",
    display: "flex",
    gap: size[2],
    cursor: "pointer",
    height: size[5],
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  // Same reasoning as Checkbox: the input carries the visual so `:checked` is
  // a pseudo-class on this element instead of a sibling combinator.
  dot: {
    appearance: "none",
    margin: 0,
    width: size[3],
    height: size[3],
    borderRadius: radius.round,
    backgroundColor: "transparent",
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    display: "grid",
    placeContent: "center",
    cursor: "pointer",
    transition: `background-color 0.3s ${ease.inOut3}`,
    outline: { ":focus": `${border[3]} auto -webkit-focus-ring-color` },
    "::after": {
      content: '""',
      width: "0.5rem",
      height: "0.5rem",
      borderRadius: radius.round,
      backgroundColor: colors.text,
      transition: `opacity 0.3s ${ease.inOut3}`,
      opacity: { default: 0, ":checked": 1 },
    },
  },
});

export function Radio({ label, ...rest }: Props) {
  return (
    <label {...stylex.props(styles.label)}>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
      <input {...stylex.props(styles.dot)} type="radio" {...rest} />
    </label>
  );
}
