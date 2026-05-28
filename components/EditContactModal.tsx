"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, BackIcon, CautionCircleIcon } from "./icons";
import { validatePhone, validateEmail, validateTaxId } from "./validation";

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
        className={`flex h-[62px] cursor-text items-center gap-3 rounded-md border px-3 transition-colors ${
          error
            ? "border-[var(--red)] ring-2 ring-[var(--red-soft)] focus-within:border-[var(--red)]"
            : "border-[#c9ccd1] focus-within:border-[var(--blue)]"
        }`}
      >
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <span className="text-[13px] leading-4 text-[var(--text-muted)]">{label}</span>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={error ? true : undefined}
            className="w-full bg-transparent text-[17px] leading-5 text-[var(--text-body)] outline-none"
          />
        </span>
        {error && (
          <CautionCircleIcon className="shrink-0 text-[var(--red)]" />
        )}
      </label>
      {error && (
        <p className="mt-1 text-[13px] leading-snug text-[var(--red)]">{error}</p>
      )}
    </div>
  );
}

function SameAddressCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-[5px] transition-colors ${
          checked
            ? "bg-[var(--blue)]"
            : "border-[1.5px] border-[#bcc0c4] bg-transparent"
        }`}
      >
        {checked && (
          <svg
            width="13"
            height="13"
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
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="text-[15px] leading-5 text-[var(--text-secondary)]">
        Billing address is the same as business address
      </span>
    </label>
  );
}

type ContactErrors = {
  phone?: string;
  email?: string;
  taxId?: string;
};

function computeContactErrors(
  phone: string,
  email: string,
  taxId: string,
): ContactErrors {
  return {
    phone: validatePhone(phone) ?? undefined,
    email: validateEmail(email) ?? undefined,
    taxId: validateTaxId(taxId) ?? undefined,
  };
}

export function EditContactModal({
  open,
  onBack,
  onClose,
  onSave,
  phone,
  email,
  taxId,
}: {
  open: boolean;
  onBack: () => void;
  onClose: () => void;
  onSave?: (data: { phone: string; email: string; taxId: string }) => void;
  phone: string;
  email: string;
  taxId: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);
  const [phoneValue, setPhoneValue] = useState(phone);
  const [emailValue, setEmailValue] = useState(email);
  const [taxIdValue, setTaxIdValue] = useState(taxId);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setSameAddress(true);
      setPhoneValue(phone);
      setEmailValue(email);
      setTaxIdValue(taxId);
      setErrors({});
      setSubmitted(false);
    }
  }, [open, phone, email, taxId]);

  useEffect(() => {
    if (submitted) {
      setErrors(computeContactErrors(phoneValue, emailValue, taxIdValue));
    }
  }, [submitted, phoneValue, emailValue, taxIdValue]);

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

  const handleSave = () => {
    const next = computeContactErrors(phoneValue, emailValue, taxIdValue);
    setErrors(next);
    setSubmitted(true);
    if (Object.values(next).some(Boolean)) return;
    onSave?.({ phone: phoneValue, email: emailValue, taxId: taxIdValue });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-contact-title"
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
            id="edit-contact-title"
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
            Edit billing contact
          </h3>
          <p className="mt-2 text-[15px] leading-snug text-[var(--text-muted)]">
            We&rsquo;ll use this for billing communications and send invoices to
            this address.
          </p>

          <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-body)]">
            Billing contact information
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            <TextField
              label="Business phone number"
              value={phoneValue}
              onChange={setPhoneValue}
              error={errors.phone}
            />
            <TextField
              label="Business email"
              value={emailValue}
              onChange={setEmailValue}
              error={errors.email}
            />
          </div>

          <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-body)]">
            Billing address
          </h3>
          <div className="mt-3">
            <SameAddressCheckbox
              checked={sameAddress}
              onChange={setSameAddress}
            />
          </div>

          <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-body)]">
            Tax information
          </h3>
          <div className="mt-3">
            <TextField
              label="Tax ID number"
              value={taxIdValue}
              onChange={setTaxIdValue}
              error={errors.taxId}
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-end border-t border-[var(--border-soft)] px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-[var(--blue)] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--blue-strong)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
