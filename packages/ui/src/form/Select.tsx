import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { font, size } from "../tokens.stylex";
import { formStyles } from "./styles";
import type { InputProps } from "./types";

type SelectOption = string | { value: string; label: string };

type Props = {
  options: SelectOption[];
} & InputProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className">;

function getOptionValue(option: SelectOption) {
  return typeof option === "string" ? option : option.value;
}

function getOptionLabel(option: SelectOption) {
  return typeof option === "string" ? option : option.label;
}

const styles = stylex.create({
  select: {
    height: "2.5rem",
    appearance: "none",
    paddingLeft: size[3],
    paddingRight: `calc(${size[3]} * 2)`,
    cursor: "pointer",
    fontSize: font.size1,
  },
  wrapper: {
    position: "relative",
  },
  // Was `.selectWrapper > svg`. Select renders this icon itself, so it takes
  // the styles directly instead of being reached through a combinator.
  chevron: {
    width: size[3],
    height: size[3],
    position: "absolute",
    bottom: `calc(2.5rem / 2 - ${size[2]})`,
    right: size[3],
    cursor: "pointer",
    pointerEvents: "none",
  },
});

export function Select({ options, label, name, ...rest }: Props) {
  return (
    <label {...stylex.props(formStyles.label, styles.wrapper)}>
      <span {...stylex.props(formStyles.labelText)}>{label}</span>
      <select
        id={name}
        name={name}
        {...stylex.props(formStyles.control, styles.select)}
        {...rest}
      >
        {options.map((option) => {
          const value = getOptionValue(option);
          const optionLabel = getOptionLabel(option);
          return (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      <ChevronDown {...stylex.props(styles.chevron)} />
    </label>
  );
}
