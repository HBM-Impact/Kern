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
    height: size[6],
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  // The input *is* the box. Styling it directly means the checked state is a
  // pseudo-class on this element rather than an `input:checked ~ span` sibling
  // combinator, which StyleX has no way to express.
  box: {
    appearance: "none",
    margin: 0,
    width: size[3],
    height: size[3],
    borderRadius: radius[2],
    backgroundColor: "transparent",
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    display: "grid",
    placeContent: "center",
    cursor: "pointer",
    transition: `background-color 0.3s ${ease.inOut3}`,
    outline: { ":focus": `${border[3]} auto -webkit-focus-ring-color` },
    // A rotated corner draws the checkmark, so no icon dependency is needed.
    "::after": {
      content: '""',
      width: "0.3rem",
      height: "0.6rem",
      borderRightWidth: "2px",
      borderRightStyle: "solid",
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
      borderColor: colors.text,
      transform: "rotate(45deg) translate(-10%, -20%)",
      transition: `opacity 0.3s ${ease.inOut3}`,
      opacity: { default: 0, ":checked": 1 },
    },
  },
});

export function Checkbox({ name, label, value, defaultChecked }: Props) {
  return (
    <label {...stylex.props(styles.label)}>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
      <input
        {...stylex.props(styles.box)}
        defaultChecked={defaultChecked}
        value={value}
        type="checkbox"
        name={name}
      />
    </label>
  );
}
