"use client";

import { Button } from "@repo/ui/buttons";
import { Input } from "@repo/ui/form/input";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import styles from "./SearchForm.module.css";

type Props = { q?: string };

export function SearchForm({ q }: Props) {
  const router = useRouter();
  const locale = useLocale();

  function handleAction(formData: FormData) {
    const value = formData.get("q") as string;
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    const qs = params.toString();
    router.push(`/${locale}/products/search${qs ? `?${qs}` : ""}`);
  }

  return (
    <form className={styles.form} action={handleAction}>
      <Input
        label="Search products"
        name="q"
        placeholder="Search for phones, laptops, groceries…"
        defaultValue={q ?? ""}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
