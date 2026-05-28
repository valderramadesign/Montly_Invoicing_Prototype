import Image from "next/image";
import {
  MetaLogo,
  HamburgerIcon,
  ChevronDownIcon,
  AccountsIcon,
  PaymentMethodsIcon,
  PaymentActivityIcon,
  CreditLinesIcon,
  InvoicesIcon,
  LegalEntitiesIcon,
  GearIcon,
  BellIcon,
  SearchIcon,
  HelpIcon,
  PanelIcon,
} from "./icons";
import { navItems, type NavKey } from "./data";
import avatarSrc from "./images/YaseminAvatar.jpg";

const navIcons: Record<NavKey, (p: { className?: string }) => React.ReactNode> =
  {
    accounts: AccountsIcon,
    "payment-methods": PaymentMethodsIcon,
    "payment-activity": PaymentActivityIcon,
    "credit-lines": CreditLinesIcon,
    invoices: InvoicesIcon,
    "legal-entities": LegalEntitiesIcon,
  };

/**
 * Left rail of the Billing & payments app.
 * `onToggle` is wired by the shell so the in-rail hamburger can close the
 * mobile drawer; on desktop the rail is always shown and the toggle is unused.
 */
export function Sidebar({
  active = "payment-methods",
  showCreditLines = false,
  onToggle,
}: {
  active?: NavKey;
  showCreditLines?: boolean;
  onToggle?: () => void;
}) {
  const items = showCreditLines
    ? navItems
    : navItems.filter((item) => item.key !== "credit-lines");

  return (
    <aside className="flex h-full w-full flex-col bg-[var(--surface)]">
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <MetaLogo />
        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle navigation"
          className="ml-auto grid h-9 w-9 place-items-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
        >
          <HamburgerIcon />
        </button>
      </div>

      <h1 className="px-4 pb-3 text-[22px] font-bold leading-tight tracking-[-0.01em] text-[var(--text)]">
        Billing &amp; payments
      </h1>

      <div className="px-3">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg border border-[var(--border)] px-2.5 py-2 text-left hover:bg-[var(--surface-hover)]"
        >
          <Image
            src={avatarSrc}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-[var(--text)]">
            Yasemin&rsquo;s Creamery
          </span>
          <ChevronDownIcon className="shrink-0 text-[var(--text-secondary)]" width={18} height={18} />
        </button>
      </div>

      <nav className="mt-2 flex flex-col gap-0.5 px-3">
        {items.map((item) => {
          const Icon = navIcons[item.key];
          const isActive = item.key === active;
          return (
            <a
              key={item.key}
              href="#"
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex items-center gap-3 rounded-lg px-2.5 py-2 text-[15px] transition-colors",
                isActive
                  ? "bg-[var(--blue-soft)] font-semibold text-[var(--blue-active)]"
                  : "font-medium text-[var(--text)] hover:bg-[var(--surface-hover)]",
              ].join(" ")}
            >
              <Icon className="shrink-0" />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-1 px-3 pb-4 pt-3 text-[var(--text-secondary)]">
        {[GearIcon, BellIcon, SearchIcon, HelpIcon].map((Icon, i) => (
          <button
            key={i}
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--surface-hover)]"
          >
            <Icon />
          </button>
        ))}
        <button
          type="button"
          className="ml-auto grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--surface-hover)]"
        >
          <PanelIcon />
        </button>
      </div>
    </aside>
  );
}
