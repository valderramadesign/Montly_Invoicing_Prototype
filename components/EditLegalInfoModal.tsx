"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, BackIcon } from "./icons";
import type { LegalAddress } from "./OrganizationModal";
import {
  validateBusinessName,
  validateStreet1,
  validateStreet2,
  validateCity,
  validateState,
  validateZip,
  validateCountry,
} from "./validation";

function TextField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label
        className={`flex h-[62px] cursor-text flex-col justify-center gap-0.5 rounded-md border px-3 transition-colors ${
          error
            ? "border-[var(--red)] focus-within:border-[var(--red)]"
            : "border-[#c9ccd1] focus-within:border-[var(--blue)]"
        }`}
      >
        <span className="text-[13px] leading-4 text-[var(--text-muted)]">{label}</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          className="w-full bg-transparent text-[17px] leading-5 text-[var(--text-body)] outline-none"
        />
      </label>
      {error && (
        <p className="mt-1 text-[13px] leading-snug text-[var(--red)]">{error}</p>
      )}
    </div>
  );
}

const EMPTY_LEGAL: LegalAddress = {
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

type LegalErrors = {
  businessName?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

function computeLegalErrors(name: string, addr: LegalAddress): LegalErrors {
  return {
    businessName: validateBusinessName(name) ?? undefined,
    street1: validateStreet1(addr.street1) ?? undefined,
    street2: validateStreet2(addr.street2) ?? undefined,
    city: validateCity(addr.city) ?? undefined,
    state: validateState(addr.state, addr.country) ?? undefined,
    zip: validateZip(addr.zip, addr.country) ?? undefined,
    country: validateCountry(addr.country) ?? undefined,
  };
}

export function EditLegalInfoModal({
  open,
  onBack,
  onClose,
  onNext,
  businessName,
  legal,
}: {
  open: boolean;
  onBack: () => void;
  onClose: () => void;
  onNext?: (data: { businessName: string; legal: LegalAddress }) => void;
  businessName: string;
  legal?: LegalAddress;
}) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState(businessName);
  const [addr, setAddr] = useState<LegalAddress>(legal ?? EMPTY_LEGAL);
  const [errors, setErrors] = useState<LegalErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setName(businessName);
      setAddr(legal ?? EMPTY_LEGAL);
      setErrors({});
      setSubmitted(false);
    }
  }, [open, businessName, legal]);

  useEffect(() => {
    if (submitted) setErrors(computeLegalErrors(name, addr));
  }, [submitted, name, addr]);

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

  const setField = (key: keyof LegalAddress) => (value: string) =>
    setAddr((prev) => ({ ...prev, [key]: value }));

  const handleNext = () => {
    const next = computeLegalErrors(name, addr);
    setErrors(next);
    setSubmitted(true);
    if (Object.values(next).some(Boolean)) return;
    onNext?.({ businessName: name, legal: addr });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-legal-title"
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
            id="edit-legal-title"
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
            Edit legal information
          </h3>
          <p className="mt-2 text-[15px] leading-snug text-[var(--text-muted)]">
            Changes made to the legal entity information may require further
            review before approval.
          </p>

          <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-body)]">
            Legal business name
          </h3>
          <div className="mt-3">
            <TextField
              label="Business name"
              value={name}
              onChange={setName}
              error={errors.businessName}
            />
          </div>

          <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-body)]">
            Legal address
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            <TextField
              label="Street address 1"
              value={addr.street1}
              onChange={setField("street1")}
              error={errors.street1}
            />
            <TextField
              label="Street address 2"
              value={addr.street2}
              onChange={setField("street2")}
              error={errors.street2}
            />
            <div className="flex items-start gap-1.5">
              <div className="min-w-0 flex-1">
                <TextField
                  label="City"
                  value={addr.city}
                  onChange={setField("city")}
                  error={errors.city}
                />
              </div>
              <div className="min-w-0 flex-1">
                <TextField
                  label="State"
                  value={addr.state}
                  onChange={setField("state")}
                  error={errors.state}
                />
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <div className="min-w-0 flex-1">
                <TextField
                  label="ZIP code"
                  value={addr.zip}
                  onChange={setField("zip")}
                  error={errors.zip}
                />
              </div>
              <div className="min-w-0 flex-1">
                <TextField
                  label="Country"
                  value={addr.country}
                  onChange={setField("country")}
                  error={errors.country}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-end border-t border-[var(--border-soft)] px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={handleNext}
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
