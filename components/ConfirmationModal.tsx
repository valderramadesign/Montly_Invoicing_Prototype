"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CloseIcon,
  BackIcon,
  BuildingIcon,
  PinIcon,
  EnvelopeIcon,
  PhoneIcon,
  LocationIcon,
  DocumentIcon,
} from "./icons";

type Field = {
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  label: string;
  value: string;
};

function InfoRow({ Icon, label, value }: Field) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4e6eb] text-[var(--text-body)]">
        <Icon />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] leading-4 text-[var(--text-muted)]">{label}</p>
        <p className="text-[17px] leading-5 text-[var(--text-body)]">{value}</p>
      </div>
    </div>
  );
}

export function ConfirmationModal({
  open,
  onBack,
  onClose,
  onEdit,
  onSubmit,
  businessName,
  businessAddress,
  billingEmail,
  billingPhone,
  taxId,
}: {
  open: boolean;
  onBack: () => void;
  onClose: () => void;
  onEdit?: () => void;
  onSubmit?: () => void;
  businessName: string;
  businessAddress: string;
  billingEmail: string;
  billingPhone: string;
  taxId: string;
}) {
  const [mounted, setMounted] = useState(false);

  const legalFields: Field[] = [
    { Icon: BuildingIcon, label: "Legal business name", value: businessName },
    {
      Icon: PinIcon,
      label: "Legal business address",
      value: businessAddress,
    },
  ];

  const billingFields: Field[] = [
    {
      Icon: EnvelopeIcon,
      label: "Billing contact email",
      value: billingEmail,
    },
    {
      Icon: PhoneIcon,
      label: "Billing contact phone number",
      value: billingPhone,
    },
    {
      Icon: LocationIcon,
      label: "Billing address",
      value: businessAddress,
    },
    { Icon: DocumentIcon, label: "Tax ID", value: taxId },
  ];

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
        aria-labelledby="confirmation-title"
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
            id="confirmation-title"
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
            Confirm information
          </h3>
          <p className="mt-2 text-[15px] leading-snug text-[var(--text-muted)]">
            If your application is approved, you&rsquo;ll be issued a credit
            line. You&rsquo;ll receive monthly invoices for ad accounts set up to
            use your credit line as a payment method.
          </p>

          <hr className="my-4 border-0 border-t border-[var(--divider)]" />

          <h3 className="text-[17px] font-semibold text-[var(--text-body)]">
            Legal information
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            {legalFields.map((f) => (
              <InfoRow key={f.label} {...f} />
            ))}
          </div>

          <h3 className="mt-4 text-[17px] font-semibold text-[var(--text-body)]">
            Billing information
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            {billingFields.map((f) => (
              <InfoRow key={f.label} {...f} />
            ))}
          </div>

          <hr className="my-4 border-0 border-t border-[var(--divider)]" />

          <div className="space-y-3 text-[13px] leading-4 text-[var(--text-muted)]">
            <p>
              Credit lines are a payment setting where you pay us based on
              monthly invoices. The amounts shown are not credit or financing.
            </p>
            <p>
              By clicking Submit, you agree to Meta&rsquo;s{" "}
              <a href="#" className="font-semibold text-[#0064d1] hover:underline">
                Terms and conditions
              </a>
              . If Meta approves your application, you&rsquo;ll be bound by the{" "}
              <a href="#" className="font-semibold text-[#0064d1] hover:underline">
                Online invoicing terms
              </a>{" "}
              and the{" "}
              <a href="#" className="font-semibold text-[#0064d1] hover:underline">
                Self-serve ad terms
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[var(--border-soft)] px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg px-3 py-2 text-[15px] font-semibold text-[var(--blue)] transition-colors hover:bg-[var(--blue-soft)]"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-lg bg-[var(--blue)] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--blue-strong)]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
