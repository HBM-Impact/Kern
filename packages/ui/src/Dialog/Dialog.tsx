"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import type { DialogHTMLAttributes, ReactNode, Ref } from "react";
import { useId } from "react";
import { IconButton } from "../Button/IconButton";
import { Display } from "../Display/Display";
import styles from "./Dialog.module.css";

type Props = {
  ref?: Ref<HTMLDialogElement>;
  type?: "center" | "aside";
  title: string;
  children?: ReactNode;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, "ref">;

export function Dialog({
  children,
  ref,
  type = "center",
  title,
  ...rest
}: Props) {
  const id = useId();
  const titleId = `${id}-title`;

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && e.key === "Enter")
          e.currentTarget.close();
      }}
      className={clsx(
        styles.dialog,
        type === "center" ? styles.center : styles.aside,
      )}
      aria-modal="true"
      aria-labelledby={titleId}
      {...rest}
    >
      <header className={styles.header}>
        <Display variant="display3" as="h3" id={titleId}>
          {title}
        </Display>
        <IconButton
          onClick={(e) =>
            (
              e.currentTarget.closest("dialog") as HTMLDialogElement | null
            )?.close()
          }
          icon={<X />}
          aria-label="Close"
        />
      </header>
      <section className={styles.section}>{children}</section>
    </dialog>
  );
}
