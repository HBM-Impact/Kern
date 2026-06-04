import { css } from "hono/css";
import { IconButton } from "@/ui/Button/IconButton.tsx";
import { X } from "@/ui/Icons/X.tsx";

export function ToastContainer() {
  return (
    <div
      class={containerStyle}
      x-data={`{
				toasts: [],
				add(e) {
					const d = e.detail.value || e.detail;
					const t = { id: Date.now(), message: d.message };
					this.toasts.push(t);
					setTimeout(() => this.remove(t.id), 3000);
				},
				remove(id) { this.toasts = this.toasts.filter(t => t.id !== id); }
			}`}
      x-init="window.addEventListener('show-toast', e => $data.add(e))"
    >
      <template x-for="toast in toasts" x-bind:key="toast.id">
        <div class={toastStyle} role="status" aria-live="polite">
          <span class={messageStyle} x-text="toast.message" />
          <IconButton
            icon={<X />}
            className={smallButtonStyle}
            x-on:click="remove(toast.id)"
            aria-label="Dismiss"
          />
        </div>
      </template>
    </div>
  );
}

const containerStyle = css`
	position: fixed;
	bottom: var(--size-5);
	right: var(--size-5);
	z-index: 50;
	display: flex;
	flex-direction: column;
	gap: var(--size-2);
	pointer-events: none;

	@media (max-width: 480px) {
		right: var(--size-3);
		left: var(--size-3);
	}
`;

const toastStyle = css`
	display: flex;
	align-items: center;
	gap: var(--size-3);
	background: var(--color-bg-elevated);
	color: var(--color-text);
	border: var(--border-size-1) solid var(--color-border);
	border-radius: var(--radius-2);
	padding: var(--size-2) var(--size-3);
	pointer-events: auto;
	animation: toast-in 0.2s var(--ease-3);

	@keyframes toast-in {
		from {
			opacity: 0;
			translate: 0 var(--size-3);
		}
	}
`;

const messageStyle = css`
	font-family: var(--font-sans);
	font-size: var(--font-size-0);
	line-height: var(--font-lineheight-1);
`;

const smallButtonStyle = css`
	height: var(--size-5);
	width: var(--size-5);
	margin-left: auto;

	& > svg {
		height: var(--size-2);
		width: var(--size-2);
	}
`;
