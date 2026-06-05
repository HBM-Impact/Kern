"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import type { DialogHTMLAttributes, ReactNode } from "react";
import { IconButton } from "../buttons/icon-button";
import { Display } from "../typography/display/Display";
import styles from "./Dialog.module.css";
import type { useDialogStore } from "./use-dialog-store";

type Props = {
  store: ReturnType<typeof useDialogStore>;
  variant?: "center" | "aside";
  title: string;
  children?: ReactNode;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, "ref">;

export function Dialog({
  children,
  store,
  variant = "center",
  title,
  ...rest
}: Props) {
  const { ref, close } = store;

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && e.key === "Escape") close();
      }}
      className={clsx(
        styles.dialog,
        variant === "center" ? styles.center : styles.aside,
      )}
      aria-modal="true"
      aria-label={title}
      {...rest}
    >
      <header className={styles.header}>
        <Display variant="display3" as="h3">
          {title}
        </Display>
        <IconButton onClick={close} icon={<X />} aria-label="Close" />
      </header>
      <section className={styles.section}>{children}</section>
    </dialog>
  );
}
