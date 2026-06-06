"use client";

import { Button } from "@repo/ui/buttons";
import { Input } from "@repo/ui/form/input";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import styles from "./SearchForm.module.css";

type Props = { q?: string };

export function SearchForm({ q }: Props) {
  const router = useRouter();
  const locale = useLocale();

  const form = useForm({
    defaultValues: { q: q ?? "" },
    onSubmit({ value }) {
      const params = new URLSearchParams();
      if (value.q) params.set("q", value.q);
      const qs = params.toString();
      router.push(`/${locale}/products/search${qs ? `?${qs}` : ""}`);
    },
  });

  return (
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
            name={field.name}
            placeholder="Search for phones, laptops, groceries…"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>
      <Button type="submit">Search</Button>
    </form>
  );
}
