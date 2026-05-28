"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, BackIcon, BadgeCheckIcon } from "./icons";

export type LegalAddress = {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Entity = {
  name: string;
  address: string;
  supplier: string;
  preApproved?: boolean;
  legal: LegalAddress;
};

const entities: Entity[] = [
  {
    name: "Apparel World",
    address: "12345 Tech Way, Suite 500, Encinitas, CA 92024",
    supplier: "Meta Platforms Inc.",
    preApproved: true,
    legal: {
      street1: "12345 Tech Way",
      street2: "Suite 500",
      city: "Encinitas",
      state: "CA",
      zip: "92024",
      country: "USA",
    },
  },
  {
    name: "Apparel World Holdings",
    address: "Corporate Lane, IFSC, Dublin 1, Ireland, D01 X4C9",
    supplier: "Meta Platforms Ireland Limited",
    legal: {
      street1: "Corporate Lane",
      street2: "IFSC",
      city: "Dublin 1",
      state: "",
      zip: "D01 X4C9",
      country: "Ireland",
    },
  },
  {
    name: "Apparel World",
    address: "Technology Court 1, 1050 Copenhagen K Denmark",
    supplier: "Facebook Denmark ApS",
    legal: {
      street1: "Technology Court 1",
      street2: "",
      city: "Copenhagen K",
      state: "",
      zip: "1050",
      country: "Denmark",
    },
  },
];

function PreApprovedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#ebf5ff] px-1.5 py-0.5 text-[12px] leading-4 text-[#0064d1]">
      <BadgeCheckIcon className="text-[#0064d1]" />
      Pre-approved
    </span>
  );
}

function RadioGlyph({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--blue)]">
        <span className="h-[7px] w-[7px] rounded-full bg-white" />
      </span>
    );
  }
  return (
    <span className="block h-5 w-5 shrink-0 rounded-full border-[1.5px] border-[#bcc0c4]" />
  );
}

export function OrganizationModal({
  open,
  onBack,
  onClose,
  onNext,
  onCreateNew,
}: {
  open: boolean;
  onBack: () => void;
  onClose: () => void;
  onNext?: (entity: Entity) => void;
  onCreateNew?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(0);

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
        aria-labelledby="organization-title"
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-[600px] overflow-hidden rounded-xl bg-[var(--surface)] shadow-[var(--shadow-overlay)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-3 py-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            aria-label="Back"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--text-body)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            <BackIcon className="pointer-events-none" />
          </button>
          <h2
            id="organization-title"
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
        <div className="px-5 py-5 sm:px-6">
          <h3 className="text-[17px] font-semibold text-[var(--text-body)]">
            Select legal entity
          </h3>
          <div className="mt-2 space-y-3 text-[15px] leading-snug text-[var(--text-muted)]">
            <p>
              Your monthly invoices will be assigned to a legal entity. Legal
              entities represent a part of your organization and can be used to
              manage billing and payments.
            </p>
            <p>
              Some legal entities are marked as pre-approved for monthly
              invoicing, which can speed up the request.
            </p>
          </div>

          <ul className="mt-4 flex flex-col" role="radiogroup" aria-label="Select legal entity">
            {entities.map((e, i) => (
              <li key={`${e.name}-${e.supplier}`}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected === i}
                  tabIndex={selected === i ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(evt) => {
                    if (evt.key === "ArrowDown" || evt.key === "ArrowRight") {
                      evt.preventDefault();
                      const next = (i + 1) % entities.length;
                      setSelected(next);
                      evt.currentTarget.parentElement?.parentElement?.children[next]?.querySelector("button")?.focus();
                    } else if (evt.key === "ArrowUp" || evt.key === "ArrowLeft") {
                      evt.preventDefault();
                      const prev = (i - 1 + entities.length) % entities.length;
                      setSelected(prev);
                      evt.currentTarget.parentElement?.parentElement?.children[prev]?.querySelector("button")?.focus();
                    }
                  }}
                  className="flex w-full items-center gap-3 py-3 text-left focus:outline-none"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-medium text-[var(--text-body)]">
                        {e.name}
                      </span>
                      {e.preApproved && <PreApprovedBadge />}
                    </div>
                    <p className="mt-0.5 text-[13px] leading-4 text-[var(--text-body)]">
                      {e.address}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-4 text-[var(--text-muted)]">
                      Supplier: {e.supplier}
                    </p>
                  </div>
                  <RadioGlyph selected={selected === i} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[var(--border-soft)] px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={onCreateNew}
            className="rounded-lg px-3 py-2 text-[15px] font-semibold text-[var(--blue)] transition-colors hover:bg-[var(--blue-soft)]"
          >
            Create new legal entity
          </button>
          <button
            type="button"
            onClick={() => onNext?.(entities[selected])}
            className="rounded-lg bg-[var(--blue)] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--blue-strong)]"
          >
            Next
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
