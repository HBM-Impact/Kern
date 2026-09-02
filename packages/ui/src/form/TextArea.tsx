import * as stylex from "@stylexjs/stylex";
import type { TextareaHTMLAttributes } from "react";
import { colors, font, size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

const styles = stylex.create({
  textarea: {
    height: size[11],
    padding: size[3],
    resize: "none",
    fontSize: font.size1,
    "::placeholder": {
      color: colors.textMuted,
      opacity: 0.7,
    },
  },
});

export function TextArea({ label, ...rest }: Props) {
  return (
    <label {...stylex.props(formStyles.label)}>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
      <textarea
        {...stylex.props(formStyles.control, styles.textarea)}
        {...rest}
      />
    </label>
  );
}
