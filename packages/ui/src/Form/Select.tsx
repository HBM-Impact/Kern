import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "../Icons/Chevron/Down";
import styles from "./Form.module.css";
import type { InputProps } from "./types";

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
    <label className={clsx(styles.label, styles.selectWrapper)}>
      <span className={styles.labelText}>{label}</span>
      <select
        id={name}
        name={name}
        className={clsx(styles.control, styles.select, className)}
        {...rest}
      >
        {options.map((option) => {
          const value = getOptionValue(option);
          const optionLabel = getOptionLabel(option);
          return (
            <option
              key={value}
              value={value}
              selected={rest?.value === value || rest?.defaultValue === value}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
      <ChevronDown />
    </label>
  );
}
