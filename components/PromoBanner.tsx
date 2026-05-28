"use client";

import { useState } from "react";
import Image from "next/image";
import bannerImage from "./images/BannerImage.png";
import { OverviewModal } from "./OverviewModal";
import {
  OrganizationModal,
  type Entity,
  type LegalAddress,
} from "./OrganizationModal";
import { ConfirmationModal } from "./ConfirmationModal";
import { EditLegalInfoModal } from "./EditLegalInfoModal";
import { EditContactModal } from "./EditContactModal";
import { SuccessModal } from "./SuccessModal";

type Step =
  | "none"
  | "overview"
  | "organization"
  | "confirmation"
  | "editLegal"
  | "editContact"
  | "success";

type InvoicingForm = {
  businessName: string;
  legal: LegalAddress;
  billingEmail: string;
  billingPhone: string;
  taxId: string;
};

const BILLING = {
  email: "timvalderrama@meta.com",
  phone: "+598 (858) 447-1386",
  taxId: "12-3456789",
};

const EMPTY_FORM: InvoicingForm = {
  businessName: "",
  legal: {
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  billingEmail: "",
  billingPhone: "",
  taxId: "",
};

function formatLegalAddress(a: LegalAddress): string {
  const cityLine = [a.city, [a.state, a.zip].filter(Boolean).join(" ").trim()]
    .filter(Boolean)
    .join(", ");
  return [a.street1, a.street2, cityLine, a.country].filter(Boolean).join(", ");
}

const bullets = [
  "Reduce the number of charges each month",
  "Avoid payment issues that may stop ads from running",
  "Access a higher spending limit that can be shared across ad accounts",
];

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[14px] leading-snug text-[var(--text-secondary)]">
      <svg
        className="mt-0.5 shrink-0 text-[var(--green)]"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="5 12.5 10 17.5 19 7" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function PromoBanner({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState<Step>("none");
  const [form, setForm] = useState<InvoicingForm | null>(null);
  const [draft, setDraft] = useState<InvoicingForm | null>(null);
  const [editReturnStep, setEditReturnStep] = useState<Step>("confirmation");
  const close = () => setStep("none");
  // Once the request is approved, dismissing the success dialog advances the
  // advertiser to their Accounts list rather than back to this promo.
  const finish = () => {
    setStep("none");
    setForm(null);
    setDraft(null);
    onComplete?.();
  };

  const startEdit = () => {
    setEditReturnStep("confirmation");
    setDraft(form);
    setStep("editLegal");
  };

  const startCreate = () => {
    setEditReturnStep("organization");
    setDraft(EMPTY_FORM);
    setStep("editLegal");
  };

  return (
    <section className="overflow-hidden rounded-xl bg-[var(--surface)] shadow-[var(--shadow-card)]">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-[248px]">
          <Image
            src={bannerImage}
            alt=""
            fill
            sizes="(min-width: 640px) 248px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 p-5 sm:p-6">
          <h2 className="text-[18px] font-bold leading-snug tracking-[-0.01em] text-[var(--text)]">
            Get easier billing with one invoice per month
          </h2>
          <p className="mt-1.5 max-w-xl text-[14px] leading-snug text-[var(--text-secondary)]">
            As one of our most trusted advertisers, you may be eligible for
            monthly invoicing.
          </p>

          <ul className="mt-4 flex flex-col gap-2.5">
            {bullets.map((b) => (
              <CheckBullet key={b}>{b}</CheckBullet>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setStep("overview")}
            className="mt-5 rounded-lg bg-[var(--blue)] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--blue-strong)]"
          >
            See how it works
          </button>
        </div>
      </div>

      <OverviewModal
        open={step === "overview"}
        onClose={close}
        onGetStarted={() => setStep("organization")}
      />
      <OrganizationModal
        open={step === "organization"}
        onBack={() => setStep("overview")}
        onClose={close}
        onCreateNew={startCreate}
        onNext={(e: Entity) => {
          setForm({
            businessName: e.name,
            legal: e.legal,
            billingEmail: BILLING.email,
            billingPhone: BILLING.phone,
            taxId: BILLING.taxId,
          });
          setStep("confirmation");
        }}
      />
      <ConfirmationModal
        open={step === "confirmation"}
        onBack={() => setStep("organization")}
        onClose={close}
        onEdit={startEdit}
        onSubmit={() => setStep("success")}
        businessName={form?.businessName ?? ""}
        businessAddress={form ? formatLegalAddress(form.legal) : ""}
        billingEmail={form?.billingEmail ?? ""}
        billingPhone={form?.billingPhone ?? ""}
        taxId={form?.taxId ?? ""}
      />
      <EditLegalInfoModal
        open={step === "editLegal"}
        onBack={() => setStep(editReturnStep)}
        onClose={close}
        onNext={(legalData) => {
          setDraft((d) =>
            d
              ? {
                  ...d,
                  businessName: legalData.businessName,
                  legal: legalData.legal,
                }
              : d,
          );
          setStep("editContact");
        }}
        businessName={draft?.businessName ?? ""}
        legal={draft?.legal}
      />
      <EditContactModal
        open={step === "editContact"}
        onBack={() => setStep("editLegal")}
        onClose={close}
        onSave={(contact) => {
          if (draft) {
            setForm({
              ...draft,
              billingPhone: contact.phone,
              billingEmail: contact.email,
              taxId: contact.taxId,
            });
          }
          setStep("confirmation");
        }}
        phone={draft?.billingPhone ?? ""}
        email={draft?.billingEmail ?? ""}
        taxId={draft?.taxId ?? ""}
      />
      <SuccessModal
        open={step === "success"}
        onClose={finish}
        onDone={finish}
      />
    </section>
  );
}
