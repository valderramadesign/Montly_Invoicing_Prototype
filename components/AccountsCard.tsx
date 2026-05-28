"use client";

import { useState } from "react";
import { SearchIcon, FilterIcon, InfoIcon } from "./icons";
import { AccountRow } from "./AccountRow";
import { adAccounts } from "./data";

type Tab = "ad" | "whatsapp";

export function AccountsCard() {
  const [tab, setTab] = useState<Tab>("ad");
  const [query, setQuery] = useState("");

  const accounts =
    tab === "ad"
      ? adAccounts.filter(
          (a) =>
            query.trim() === "" ||
            a.name.toLowerCase().includes(query.trim().toLowerCase()) ||
            a.id.includes(query.trim()),
        )
      : [];

  return (
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
          WhatsApp business accounts
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
            placeholder="Search by name..."
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
      <div className="hidden border-t border-[var(--border-soft)] px-4 py-2.5 text-[13px] font-semibold text-[var(--text-secondary)] lg:grid lg:grid-cols-[minmax(0,2.2fr)_1fr_1.4fr_1fr_auto] lg:items-center lg:gap-4">
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
        accounts.map((a) => <AccountRow key={a.id} account={a} />)
      ) : (
        <div className="border-t border-[var(--border-soft)] px-4 py-12 text-center text-[14px] text-[var(--text-secondary)]">
          {tab === "whatsapp"
            ? "No WhatsApp business accounts to show."
            : "No accounts match your search."}
        </div>
      )}
    </div>
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
