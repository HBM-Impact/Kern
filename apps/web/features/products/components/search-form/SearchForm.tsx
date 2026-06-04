"use client";

import { Button } from "@repo/ui/buttons";
import { Input } from "@repo/ui/form/input";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import styles from "./SearchForm.module.css";

type Props = { q?: string };

export function SearchForm({ q }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const [value, setValue] = useState(q ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    const qs = params.toString();
    router.push(`/${locale}/products/search${qs ? `?${qs}` : ""}`);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Search products"
        name="q"
        placeholder="Search for phones, laptops, groceries…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
