import { css, cx, keyframes } from "hono/css";
import type { JSX } from "hono/jsx";
import { IconButton } from "@/ui/Button/IconButton.tsx";
import { Display } from "@/ui/Display.tsx";
import { X } from "@/ui/Icons/X.tsx";

type Props = {
  ref: string;
  type?: "center" | "aside";
  title: string;
} & JSX.IntrinsicElements["dialog"];

export function Dialog({ children, ref, type = "center", title }: Props) {
  const titleId = `${ref}-title`;
  return (
    <dialog
      x-ref={ref}
      x-on:click="$event.target === $el && $el.close()"
      class={getDialogStyle(type)}
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <header class={headerStyle}>
        <Display variant="display3" as="h3" id={titleId}>
          {title}
        </Display>
        <IconButton x-on:click="$el.closest('dialog')?.close()" icon={<X />} aria-label="Close" />
      </header>
      <section class={sectionStyle}>{children}</section>
    </dialog>
  );
}

function getDialogStyle(type: Props["type"]) {
  const styles = [dialogStyle];
  styles.push(type === "center" ? centerStyle : asideStyle);
  return cx(...styles);
}

const backdropFade = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const dialogStyle = css`
  display: grid;
  position: fixed;
  inset: 0;
  border: var(--border-size-1) solid var(--color-border);
  max-height: 100vh;
  background-color: var(--color-bg);
  padding: var(--size-4);
  grid-template-rows: auto 1fr;
  gap: var(--size-4);
  border-radius: var(--radius-2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  &[open] {
    &::backdrop {
      animation: ${backdropFade} 0.3s ease forwards;
    }
  }
`;

const centerStyle = css`
  width: var(--size-15);
  height: fit-content;
  max-width: 90vw;
  max-height: 85vh;
  inset: unset;
  top: 50%;
  left: 50%;
  grid-template-rows: auto auto;
  transform: translate(-50%, -50%) scale(0.95);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;

  &[open] {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const asideStyle = css`
  margin-left: auto;
  height: 100vh;
  width: var(--size-13);
  transform: translateX(100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;

  &[open] {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  @media only screen and (max-width: 480px) {
    width: 100vw;
    height: 80vh;
    margin-inline: 0;
    margin-top: auto;
    transform: translateY(100%);
    max-width: 100vw;

    &[open] {
      transform: translateY(0);
    }
  }
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const sectionStyle = css`
  display: grid;
`;
