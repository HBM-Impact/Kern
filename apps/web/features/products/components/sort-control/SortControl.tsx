"use client";

import { Select } from "@repo/ui/form/select";
import { parseAsString, useQueryState } from "nuqs";
import type { ChangeEvent } from "react";
import { SORT_OPTIONS } from "../../sort-map";
import styles from "./SortControl.module.css";

export function SortControl() {
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""));

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value || null);
  }

  return (
    <div className={styles.wrapper}>
      <Select
        label="Sort by"
        name="sort"
        options={[
          { value: "", label: "Default" },
          ...Object.entries(SORT_OPTIONS).map(([value, { label }]) => ({
            value,
            label,
          })),
        ]}
        value={sort}
        onChange={handleChange}
      />
    </div>
  );
}
