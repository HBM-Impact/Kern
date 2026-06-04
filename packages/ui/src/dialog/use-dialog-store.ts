"use client";

import { useRef, useState } from "react";

type Params = {
  onClose?: () => void
}

export function useDialogStore({ onClose }: Params = {}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return {
    ref,
    open() {
      ref.current?.showModal();
      setIsOpen(true);
    },
    close() {
      ref.current?.close();
      setIsOpen(false);
      onClose?.();
    },
    state: { isOpen },
  };
}
