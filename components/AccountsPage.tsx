"use client";

import { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  InfoIcon,
  DotsIcon,
  AccountAvatarGlyph,
  CreditLineGlyph,
  WalletGlyph,
  MastercardLogo,
  VisaLogo,
} from "./icons";
import {
  portfolioAccounts,
  type AccountStatus,
  type PaymentMethod,
  type PortfolioAccount,
} from "./data";

type Tab = "ad" | "whatsapp" | "workplace";

const GRID =
  "lg:grid lg:grid-cols-[minmax(0,2.3fr)_0.9fr_1.5fr_1.2fr_auto] lg:items-center lg:gap-4";

export function AccountsPage() {
  const [tab, setTab] = useState<Tab>("ad");
  const [query, setQuery] = useState("");

  const accounts =
    tab === "ad"
      ? portfolioAccounts.filter(
          (a) =>
            query.trim() === "" ||
            a.name.toLowerCase().includes(query.trim().toLowerCase()) ||
            a.id.includes(query.trim()),
        )
      : [];

  return (
    <div className="mx-auto w-full max-w-[1040px] px-4 py-5 sm:px-6 sm:py-6">
      <h2 className="mb-4 text-[20px] font-bold tracking-[-0.01em] text-[var(--text)]">
        Accounts
      </h2>

      <div className="overflow-hidden rounded-xl bg-[var(--surface)] shadow-[var(--shadow-card)]">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-[var(--border)] p-3">
          <TabButton active={tab === "ad"} onClick={() => setTab("ad")}>
            Ad accounts
          </TabButton>
          <TabButton
            active={tab === "whatsapp"}
            onClick={() => setTab("whatsapp")}
          >
            WhatsApp Business accounts
          </TabButton>
          <TabButton
            active={tab === "workplace"}
            onClick={() => setTab("workplace")}
          >
            Workplace accounts
          </TabButton>
        </div>

        {/* Search + filter */}
        <div className="flex items-center gap-2.5 px-4 py-3.5">
          <div className="relative flex-1">
            <SearchIcon
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
              width={18}
              height={18}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by account name or ID..."
              className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-10 pr-3 text-[15px] text-[var(--text)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-soft)]"
            />
          </div>
          <button
            type="button"
            aria-label="Filter"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            <FilterIcon />
          </button>
        </div>

        {/* Table header (desktop) */}
        <div
          className={`hidden border-t border-[var(--border-soft)] px-4 py-2.5 text-[13px] font-semibold text-[var(--text-secondary)] ${GRID}`}
        >
          <span>Account</span>
          <span>Status</span>
          <span className="flex items-center gap-1.5">
            How you&rsquo;ll pay
            <InfoIcon className="text-[var(--text-tertiary)]" />
          </span>
          <span>Current balance</span>
          <span />
        </div>

        {/* Rows */}
        {accounts.length > 0 ? (
          accounts.map((a, i) => <PortfolioRow key={i} account={a} />)
        ) : (
          <div className="border-t border-[var(--border-soft)] px-4 py-12 text-center text-[14px] text-[var(--text-secondary)]">
            {tab === "whatsapp"
              ? "No WhatsApp Business accounts to show."
              : tab === "workplace"
                ? "No Workplace accounts to show."
                : "No accounts match your search."}
          </div>
        )}
      </div>
    </div>
  );
}

function PortfolioRow({ account }: { account: PortfolioAccount }) {
  return (
    <div className={`border-t border-[var(--border-soft)] px-4 py-3.5 ${GRID}`}>
      {/* Account */}
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
          style={{
            background: "var(--avatar-account-bg)",
            color: "var(--avatar-account-fg)",
          }}
        >
          <AccountAvatarGlyph />
        </span>
        <div className="min-w-0">
          <a
            href="#"
            className="block truncate text-[15px] font-semibold text-[var(--link)] hover:underline"
          >
            {account.name}
          </a>
          <div className="truncate text-[13px] text-[var(--text-secondary)]">
            ID: {account.id}
          </div>
          {account.ownedBy && (
            <div className="truncate text-[13px] text-[var(--text-secondary)]">
              Owned by: {account.ownedBy}
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-[13px] text-[var(--text-tertiary)] lg:hidden">
          Status
        </span>
        <StatusPill status={account.status} />
      </div>

      {/* How you'll pay */}
      <div className="mt-2 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-[13px] text-[var(--text-tertiary)] lg:hidden">
          How you&rsquo;ll pay
        </span>
        <PaymentCell payment={account.payment} />
      </div>

      {/* Current balance */}
      <div className="mt-2 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-[13px] text-[var(--text-tertiary)] lg:hidden">
          Current balance
        </span>
        <div className="text-right lg:text-left">
          <div className="text-[15px] font-semibold text-[var(--text)]">
            {account.balance}
          </div>
          {account.balanceNote && (
            <div className="text-[13px] text-[var(--status-negative)]">
              {account.balanceNote}
            </div>
          )}
        </div>
      </div>

      {/* Actions — Geo split button */}
      <div className="mt-3.5 flex items-center gap-0.5 lg:mt-0 lg:justify-end">
        <button
          type="button"
          className="h-9 rounded-l-[6px] rounded-r-[2px] bg-[var(--btn-secondary)] px-3.5 text-[14px] font-semibold text-[var(--text)] transition-colors hover:bg-[var(--btn-secondary-hover)]"
        >
          {account.action}
        </button>
        <button
          type="button"
          aria-label="More options"
          className="grid h-9 w-9 place-items-center rounded-l-[2px] rounded-r-[6px] bg-[var(--btn-secondary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--btn-secondary-hover)]"
        >
          <DotsIcon />
        </button>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: AccountStatus }) {
  const dot =
    status === "Active"
      ? "bg-[var(--status-active)]"
      : status === "Disabled"
        ? "bg-[var(--status-negative)]"
        : "border-2 border-[var(--status-closed)]";
  return (
    <span className="inline-flex items-center gap-1.5 text-[14px] text-[var(--text)]">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function PaymentChip({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="grid h-7 w-7 shrink-0 place-items-center rounded-[6px]"
      style={{ background: color }}
    >
      {children}
    </span>
  );
}

function PaymentCell({ payment }: { payment: PaymentMethod }) {
  if (payment.kind === "none") {
    return (
      <span className="block max-w-[150px] text-[14px] leading-snug text-[var(--text-tertiary)]">
        No payment method
      </span>
    );
  }

  if (payment.kind === "card") {
    return (
      <span className="flex items-center gap-2 text-[14px] text-[var(--text)]">
        {payment.brand === "mastercard" ? <MastercardLogo /> : <VisaLogo />}
        {payment.brand === "mastercard" ? "MasterCard" : "Visa"} ·{" "}
        {payment.last4}
      </span>
    );
  }

  if (payment.kind === "prepaid") {
    return (
      <span className="flex items-center gap-2.5">
        <PaymentChip color="var(--pay-prepaid)">
          <WalletGlyph />
        </PaymentChip>
        <span className="text-[14px] leading-snug text-[var(--text)]">
          Prepaid funds
        </span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2.5">
      <PaymentChip color="var(--pay-credit-line)">
        <CreditLineGlyph />
      </PaymentChip>
      <span className="min-w-0 leading-snug">
        <span className="block text-[14px] text-[var(--text)]">Credit line</span>
        <span className="block truncate text-[13px] text-[var(--text-secondary)]">
          {payment.entity}
        </span>
      </span>
    </span>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-lg px-3.5 py-2 text-[15px] font-semibold transition-colors",
        active
          ? "bg-[var(--blue-soft)] text-[var(--blue-active)]"
          : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
