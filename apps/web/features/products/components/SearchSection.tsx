"use client";

import { Button } from "@repo/ui/buttons";
import { Input } from "@repo/ui/form/input";
import { size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useForm } from "@tanstack/react-form";
import { parseAsString, useQueryState } from "nuqs";
import { productsByQueryQueryOptions } from "../api/options/products-by-query-query-options";
import { ProductListing } from "./ProductListing";

const styles = stylex.create({
  form: {
    display: "flex",
    alignItems: "flex-end",
    gap: size[3],
    flexWrap: "wrap",
  },
  // Was `.form > :first-child`, which reached into the Input. The field gets
  // its own wrapper so the growth rule lives on an element we render.
  field: {
    flex: 1,
    minWidth: 0,
  },
});

export function SearchSection() {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));

  const form = useForm({
    defaultValues: { q },
    onSubmit({ value }) {
      setQ(value.q || null);
    },
  });

  return (
    <>
      <form
        {...stylex.props(styles.form)}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="q">
          {(field) => (
            <div {...stylex.props(styles.field)}>
              <Input
                label="Search products"
                placeholder="Search for phones, laptops, groceries…"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>
        <Button type="submit">Search</Button>
      </form>
      {q ? (
        <ProductListing
          query={(args) => productsByQueryQueryOptions({ query: q, ...args })}
        />
      ) : null}
    </>
  );
}
