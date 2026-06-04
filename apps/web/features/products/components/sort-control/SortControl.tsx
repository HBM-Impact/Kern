"use client";

import { Select } from "@repo/ui/form/select";
import { usePathname, useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import styles from "./SortControl.module.css";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "title-asc", label: "Name: A to Z" },
];

type Props = {
  sort?: string;
  preserveParams?: Record<string, string>;
};

export function SortControl({ sort, preserveParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(preserveParams);
    if (e.target.value) params.set("sort", e.target.value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className={styles.wrapper}>
      <Select
        label="Sort by"
        name="sort"
        options={SORT_OPTIONS}
        defaultValue={sort ?? ""}
        onChange={handleChange}
      />
    </div>
  );
}
