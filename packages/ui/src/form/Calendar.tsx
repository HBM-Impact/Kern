import * as stylex from "@stylexjs/stylex";
import type { InputHTMLAttributes } from "react";
import { size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type Props = InputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

const styles = stylex.create({
  calendar: {
    height: "2.5rem",
    paddingInline: size[3],
    cursor: "pointer",
    "::-webkit-calendar-picker-indicator": {
      position: "absolute",
      width: size[3],
      height: size[3],
      bottom: size[3],
      right: size[2],
      cursor: "pointer",
    },
  },
});

export function Calendar({ label, ...rest }: Props) {
  return (
    <label {...stylex.props(formStyles.label)}>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
      <input
        type="date"
        id={rest.name}
        {...stylex.props(formStyles.control, styles.calendar)}
        defaultValue={new Date().toISOString().split("T")[0]}
        {...rest}
      />
    </label>
  );
}
