import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import formStyles from "../Form.module.css";
import type { InputProps } from "../types";
import styles from "./Select.module.css";

type SelectOption = string | { value: string; label: string };

type Props = {
  options: SelectOption[];
} & InputProps &
  SelectHTMLAttributes<HTMLSelectElement>;

function getOptionValue(option: SelectOption) {
  return typeof option === "string" ? option : option.value;
}

function getOptionLabel(option: SelectOption) {
  return typeof option === "string" ? option : option.label;
}

export function Select({ options, label, name, className, ...rest }: Props) {
  return (
    <label className={clsx(formStyles.label, styles.selectWrapper)}>
      <span className={formStyles.labelText}>{label}</span>
      <select
        id={name}
        name={name}
        className={clsx(formStyles.control, styles.select, className)}
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
      <ChevronDown />
    </label>
  );
}
