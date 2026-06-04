"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "../Button/IconButton";
import styles from "./Toast.module.css";

type Toast = { id: number; message: string };

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    function handle(e: Event) {
      const detail = (e as CustomEvent<{ message: string } | string>).detail;
      const message =
        typeof detail === "string" ? detail : (detail?.message ?? "");
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    }
    window.addEventListener("show-toast", handle);
    return () => window.removeEventListener("show-toast", handle);
  }, []);

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={styles.toast}
          role="status"
          aria-live="polite"
        >
          <span className={styles.message}>{toast.message}</span>
          <IconButton
            icon={<X />}
            onClick={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
            aria-label="Dismiss"
          />
        </div>
      ))}
    </div>
  );
}
