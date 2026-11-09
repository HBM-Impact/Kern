"use client";

import { Select } from "@repo/ui/form/select";
import * as stylex from "@stylexjs/stylex";
import { SORT_OPTIONS, sortParser, useSort } from "../sort-map";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export function SortControl() {
  const [sort, setSort] = useSort();

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
        value={sort ?? ""}
        onValueChange={(value) => setSort(sortParser.parse(value ?? ""))}
      />
    </div>
  );
}
