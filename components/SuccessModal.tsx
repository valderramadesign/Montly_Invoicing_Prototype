"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./icons";

function SuccessIcon() {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--green)]">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="5 12.5 10 17.5 19 7" />
      </svg>
    </span>
  );
}

export function SuccessModal({
  open,
  onClose,
  onDone,
  creditLine = "$250,000 USD",
}: {
  open: boolean;
  onClose: () => void;
  onDone?: () => void;
  creditLine?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-[600px] overflow-hidden rounded-xl bg-[var(--surface)] shadow-[var(--shadow-overlay)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-3 py-2.5">
          <span className="h-9 w-9 shrink-0" aria-hidden />
          <h2
            id="success-title"
            className="truncate px-2 text-[17px] font-bold text-[var(--text-body)]"
          >
            Request monthly invoicing
          </h2>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            <CloseIcon className="pointer-events-none" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center px-5 pb-2 pt-6 text-center sm:px-6">
          <SuccessIcon />
          <p className="mt-5 max-w-[460px] text-[17px] font-medium leading-snug text-[var(--text-body)]">
            Monthly invoicing approved with initial credit line of {creditLine}.
          </p>
          <p className="mt-4 max-w-[440px] text-[15px] leading-5 text-[var(--text-secondary)]">
            All your active ad accounts now have access to your credit line. You
            can turn it off at anytime.
          </p>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-end px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onDone ?? onClose}
            className="rounded-lg bg-[var(--blue)] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--blue-strong)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
