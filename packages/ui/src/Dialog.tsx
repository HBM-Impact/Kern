"use client";

import * as stylex from "@stylexjs/stylex";
import { X } from "lucide-react";
import type { DialogHTMLAttributes } from "react";
import { IconButton } from "./buttons/IconButton";
import { border, colors, radius, size } from "./tokens.stylex";
import { Display } from "./typography/Display";
import type { useDialogStore } from "./use-dialog-store";

export { useDialogStore } from "./use-dialog-store";

type Props = {
  store: ReturnType<typeof useDialogStore>;
  variant?: "center" | "aside";
  title: string;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, "ref">;

const backdropFade = stylex.keyframes({
  from: { backgroundColor: "transparent" },
  to: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
});

const styles = stylex.create({
  dialog: {
    display: "grid",
    position: "fixed",
    inset: 0,
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    maxHeight: "100vh",
    backgroundColor: colors.bg,
    padding: size[4],
    gridTemplateRows: "auto 1fr",
    gap: size[4],
    borderRadius: radius[2],
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    // `[open]` was an attribute selector; `:open` is the pseudo-class form.
    "::backdrop": {
      animationName: { ":open": backdropFade },
      animationDuration: { ":open": "0.3s" },
      animationTimingFunction: { ":open": "ease" },
      animationFillMode: { ":open": "forwards" },
    },
  },
  center: {
    width: size[15],
    height: "fit-content",
    maxWidth: "90vw",
    maxHeight: "85vh",
    inset: "unset",
    top: "50%",
    left: "50%",
    gridTemplateRows: "auto auto",
    transition: "all 0.5s ease",
    transform: {
      default: "translate(-50%, -50%) scale(0.95)",
      ":open": "translate(-50%, -50%) scale(1)",
    },
    opacity: { default: 0, ":open": 1 },
    visibility: { default: "hidden", ":open": "visible" },
  },
  aside: {
    marginLeft: "auto",
    height: { default: "100vh", "@media (width <= 480px)": "80vh" },
    width: { default: size[15], "@media (width <= 480px)": "100vw" },
    maxWidth: { default: null, "@media (width <= 480px)": "100vw" },
    marginInline: { default: null, "@media (width <= 480px)": 0 },
    marginTop: { default: null, "@media (width <= 480px)": "auto" },
    transition: "all 0.5s ease",
    transform: {
      default: "translateX(100%)",
      ":open": "translateX(0)",
      "@media (width <= 480px)": "translateY(100%)",
    },
    opacity: { default: 0, ":open": 1 },
    visibility: { default: "hidden", ":open": "visible" },
  },
  asideOpenNarrow: {
    transform: { "@media (width <= 480px)": "translateY(0)" },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: size[4],
  },
  section: {
    display: "grid",
  },
});

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
      {...stylex.props(
        styles.dialog,
        variant === "center" ? styles.center : styles.aside,
      )}
      aria-modal="true"
      aria-label={title}
      {...rest}
    >
      <header {...stylex.props(styles.header)}>
        <Display variant="display3" as="h3">
          {title}
        </Display>
        <IconButton onClick={close} icon={<X size={16} />} aria-label="Close" />
      </header>
      <section {...stylex.props(styles.section)}>{children}</section>
    </dialog>
  );
}
