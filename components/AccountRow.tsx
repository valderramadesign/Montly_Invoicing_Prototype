import {
  AccountAvatarGlyph,
  MastercardLogo,
  VisaLogo,
  DotsIcon,
} from "./icons";
import type { Account } from "./data";

function CardMark({ brand }: { brand: Account["brand"] }) {
  return brand === "mastercard" ? <MastercardLogo /> : <VisaLogo />;
}

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[14px] text-[var(--text)]">
      <span className="h-2 w-2 rounded-full bg-[var(--green)]" />
      Active
    </span>
  );
}

/**
 * One account. Desktop renders as a grid row aligned to the table header;
 * below `lg` it collapses into a stacked card with inline field labels.
 */
export function AccountRow({ account }: { account: Account }) {
  const cardText = `${account.brand === "mastercard" ? "MasterCard" : "Visa"} · ${account.cardLast4}`;

  return (
    <div className="border-t border-[var(--border-soft)] px-4 py-3.5 lg:grid lg:grid-cols-[minmax(0,2.2fr)_1fr_1.4fr_1fr_auto] lg:items-center lg:gap-4">
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
        </div>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-[13px] text-[var(--text-tertiary)] lg:hidden">
          Status
        </span>
        <StatusPill />
      </div>

      {/* How you'll pay */}
      <div className="mt-2 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-[13px] text-[var(--text-tertiary)] lg:hidden">
          How you&rsquo;ll pay
        </span>
        <span className="flex items-center gap-2 text-[14px] text-[var(--text)]">
          <CardMark brand={account.brand} />
          {cardText}
        </span>
      </div>

      {/* Current balance */}
      <div className="mt-2 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-[13px] text-[var(--text-tertiary)] lg:hidden">
          Current balance
        </span>
        <span className="text-[15px] font-semibold text-[var(--text)]">
          {account.balance}
        </span>
      </div>

      {/* Actions — Geo split button */}
      <div className="mt-3.5 flex items-center gap-0.5 lg:mt-0 lg:justify-end">
        <button
          type="button"
          className="h-9 rounded-l-[6px] rounded-r-[2px] bg-[var(--btn-secondary)] px-3.5 text-[14px] font-semibold text-[var(--text)] transition-colors hover:bg-[var(--btn-secondary-hover)]"
        >
          View details
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
