import clsx from "clsx";
import type { DialogHTMLAttributes, ReactNode } from "react";
import { IconButton } from "../Button/IconButton";
import { Display } from "../Display/Display";
import { X } from "../Icons/X";
import styles from "./Dialog.module.css";

type Props = {
  ref: string;
  type?: "center" | "aside";
  title: string;
  children?: ReactNode;
} & DialogHTMLAttributes<HTMLDialogElement>;

export function Dialog({
  children,
  ref,
  type = "center",
  title,
  ...rest
}: Props) {
  const titleId = `${ref}-title`;
  return (
    <dialog
      x-ref={ref}
      {...{ "x-on:click": "$event.target === $el && $el.close()" }}
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
          {...{ "x-on:click": "$el.closest('dialog')?.close()" }}
          icon={<X />}
          aria-label="Close"
        />
      </header>
      <section className={styles.section}>{children}</section>
    </dialog>
  );
}
