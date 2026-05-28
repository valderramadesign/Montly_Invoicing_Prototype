"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import overviewImage from "./images/OverviewImage.png";
import {
  CloseIcon,
  BackIcon,
  CalculatorIcon,
  CalendarIcon,
  CoinStackIcon,
} from "./icons";

type Step = {
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    Icon: CalculatorIcon,
    title: "Confirm business information",
    body: "You'll need the business legal name, address and Tax ID. You may also be asked to upload a recent business license, registration or tax document.",
  },
  {
    Icon: CalendarIcon,
    title: "Receive a credit line",
    body: "Get greater control over your budget and avoid payment issues and daily spending limits that can stop ads from running.",
  },
  {
    Icon: CoinStackIcon,
    title: "Get billed once a month",
    body: "Just 1 invoice and 30 days to pay by check or bank transfer.",
  },
];

export function OverviewModal({
  open,
  onClose,
  onGetStarted,
}: {
  open: boolean;
  onClose: () => void;
  onGetStarted?: () => void;
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
        aria-labelledby="overview-title"
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-[600px] overflow-hidden rounded-xl bg-[var(--surface)] shadow-[var(--shadow-overlay)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-3 py-2.5">
          <button
            type="button"
            aria-label="Back"
            className="invisible grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--text-secondary)]"
          >
            <BackIcon className="pointer-events-none" />
          </button>
          <h2
            id="overview-title"
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

        {/* Hero illustration */}
        <div className="relative aspect-[600/212] w-full bg-[var(--wash)]">
          <Image
            src={overviewImage}
            alt=""
            fill
            sizes="(min-width: 600px) 600px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Body */}
        <div className="px-5 py-5 sm:px-6">
          <h3 className="text-[17px] font-bold text-[var(--text-body)]">
            How it works
          </h3>

          <ul className="mt-4 flex flex-col gap-5">
            {steps.map(({ Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--wash)] text-[var(--text-body)]">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-[var(--text-body)]">
                    {title}
                  </p>
                  <p className="mt-0.5 text-[14px] leading-snug text-[var(--text-muted)]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <hr className="my-5 border-0 border-t border-[var(--divider)]" />

          <p className="text-[13px] leading-snug text-[var(--text-muted)]">
            Credit card payments aren&rsquo;t accepted for monthly invoicing at
            this time. Credit lines are a payment setting where you pay us based
            on monthly invoices. The amounts shown are not credit or financing.{" "}
            <a
              href="https://www.facebook.com/business/help/2086865811541431?id=2356205651275420"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--blue)] hover:underline"
            >
              More details about monthly invoicing
            </a>
          </p>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-end border-t border-[var(--border-soft)] px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-lg bg-[var(--blue)] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--blue-strong)]"
          >
            Get started
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
