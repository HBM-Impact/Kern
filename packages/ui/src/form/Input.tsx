import * as stylex from "@stylexjs/stylex";
import type { InputHTMLAttributes } from "react";
import { colors, font, size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

const styles = stylex.create({
  input: {
    height: "2.5rem",
    paddingInline: size[3],
    fontSize: font.size1,
    "::placeholder": {
      color: colors.textMuted,
      opacity: 0.7,
    },
  },
});

export function Input({ label, ...rest }: Props) {
  return (
    <label {...stylex.props(formStyles.label)}>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
      <input {...stylex.props(formStyles.control, styles.input)} {...rest} />
    </label>
  );
}
