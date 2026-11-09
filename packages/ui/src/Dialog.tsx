"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import * as stylex from "@stylexjs/stylex";
import { X } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { IconButton } from "./buttons/IconButton";
import { border, colors, radius, size } from "./tokens.stylex";
import { Display } from "./typography/Display";

type Props = {
  title: string;
  variant?: "center" | "aside";
  trigger?: ReactElement;
  children: ReactNode;
} & Pick<BaseDialog.Root.Props, "open" | "defaultOpen" | "onOpenChange">;

const narrow = "@media (width <= 480px)";

const styles = stylex.create({
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: "opacity 0.3s ease",
  },
  backdropHidden: {
    opacity: 0,
  },
  popup: {
    display: "grid",
    position: "fixed",
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    backgroundColor: colors.bg,
    padding: size[4],
    gap: size[4],
    borderRadius: radius[2],
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.5s ease, opacity 0.5s ease",
  },
  center: {
    width: size[15],
    maxWidth: "90vw",
    maxHeight: "85vh",
    top: "50%",
    left: "50%",
    gridTemplateRows: "auto auto",
    transform: "translate(-50%, -50%)",
  },
  centerHidden: {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0.95)",
  },
  aside: {
    top: { default: 0, [narrow]: "auto" },
    right: 0,
    bottom: 0,
    height: { default: "100vh", [narrow]: "80vh" },
    width: { default: size[15], [narrow]: "100vw" },
    gridTemplateRows: "auto 1fr",
  },
  asideHidden: {
    opacity: 0,
    transform: { default: "translateX(100%)", [narrow]: "translateY(100%)" },
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
  title,
  variant = "center",
  trigger,
  children,
  ...rest
}: Props) {
  return (
    <BaseDialog.Root {...rest}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={({ transitionStatus: t }) =>
            stylex.props(
              styles.backdrop,
              (t === "starting" || t === "ending") && styles.backdropHidden,
            ).className
          }
        />
        <BaseDialog.Popup
          className={({ transitionStatus: t }) =>
            stylex.props(
              styles.popup,
              styles[variant],
              (t === "starting" || t === "ending") &&
                styles[`${variant}Hidden`],
            ).className
          }
        >
          <header {...stylex.props(styles.header)}>
            <BaseDialog.Title render={<Display variant="display3" as="h3" />}>
              {title}
            </BaseDialog.Title>
            <BaseDialog.Close
              render={<IconButton icon={<X size={16} />} aria-label="Close" />}
            />
          </header>
          <section {...stylex.props(styles.section)}>{children}</section>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
