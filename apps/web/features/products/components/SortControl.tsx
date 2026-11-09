"use client";

import { Select } from "@repo/ui/form/select";
import * as stylex from "@stylexjs/stylex";
import { parseAsString, useQueryState } from "nuqs";
import { SORT_OPTIONS } from "../sort-map";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export function SortControl() {
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""));

  return (
    <div {...stylex.props(styles.wrapper)}>
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
        onValueChange={(value) => setSort(value || null)}
      />
    </div>
  );
}
