"use client";

import { Button } from "@repo/ui/buttons";
import { Input } from "@repo/ui/form/input";
import { useForm } from "@tanstack/react-form";
import { parseAsString, useQueryState } from "nuqs";
import { useProductsByQuery } from "../../api/queries/use-products-by-query";
import { SORT_OPTIONS } from "../../sort-map";
import { ProductGrid } from "../product-grid";
import { SortControl } from "../sort-control";
import styles from "./SearchSection.module.css";

export function SearchSection() {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [sort] = useQueryState("sort", parseAsString);
  const sortEntry = sort ? SORT_OPTIONS[sort] : undefined;

  const form = useForm({
    defaultValues: { q },
    onSubmit({ value }) {
      setQ(value.q || null);
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useProductsByQuery({
      query: q,
      limit: 12,
      sortBy: sortEntry?.sortBy,
      order: sortEntry?.order,
    });

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="q">
          {(field) => (
            <Input
              label="Search products"
              placeholder="Search for phones, laptops, groceries…"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>
        <Button type="submit">Search</Button>
      </form>
      {q ? (
        <>
          <SortControl />
          <ProductGrid
            products={products}
            hasMore={hasNextPage ?? false}
            isLoading={isPending}
            isFetchingMore={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        </>
      ) : null}
    </>
  );
}
