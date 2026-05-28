import type { SVGProps } from "react";
import Image from "next/image";
import metaLogoSrc from "./images/MetaLogo.png";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function MetaLogo({ className }: { className?: string }) {
  return (
    <Image
      src={metaLogoSrc}
      alt="Meta"
      priority
      className={["h-[22px] w-auto", className].filter(Boolean).join(" ")}
    />
  );
}

export const HamburgerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const AccountsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 9.5h4.5M16 13h4.5M16 16h3" />
    <path d="M6.5 9.5h6M6.5 12.5h6M6.5 15h3.5" strokeWidth="1.4" />
  </svg>
);

export const PaymentMethodsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <line x1="2.5" y1="9.5" x2="21.5" y2="9.5" strokeWidth="2.4" />
    <line x1="6" y1="14.5" x2="11" y2="14.5" />
  </svg>
);

export const PaymentActivityIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 12h3.5l2-6 4 13 2.5-9 1.5 2h5.5" />
  </svg>
);

export const CreditLinesIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="14.5" cy="7.5" r="3.6" />
    <path d="M14.5 5.9v3.2M13.3 6.6h1.6a.85.85 0 0 1 0 1.7h-1.2a.85.85 0 0 0 0 1.7h1.7" strokeWidth="1.3" />
    <path d="M3 14.4c1.7-.9 3.6-.9 5.3-.1l2 1c.6.3 1.3.4 2 .2l4.2-1.1a1.3 1.3 0 0 1 .9 2.4l-5 2.3c-1 .45-2.1.5-3.1.15L3 17.5" />
    <path d="M3 13.6v6.4" />
  </svg>
);

export const InvoicesIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3.5h12v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2z" />
    <path d="M9 8h6M9 11.5h6M9 15h3.5" strokeWidth="1.5" />
  </svg>
);

export const LegalEntitiesIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20.5V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V20.5" />
    <path d="M14 9.5h4.5A1.5 1.5 0 0 1 20 11v9.5" />
    <line x1="2.5" y1="20.5" x2="21.5" y2="20.5" />
    <path d="M7 8h4M7 11.5h4M7 15h4M17 13h0M17 16h0" strokeWidth="1.5" />
  </svg>
);

export const GearIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const HelpIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 1.8" />
    <line x1="12" y1="17" x2="12" y2="17" strokeWidth="2.2" />
  </svg>
);

export const PanelIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="14" y1="4" x2="14" y2="20" />
    <polyline points="10.5 9.5 8 12 10.5 14.5" strokeWidth="1.5" />
  </svg>
);

export const FilterIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <line x1="5" y1="8" x2="19" y2="8" />
    <circle cx="9" cy="8" r="2.2" fill="var(--surface)" />
    <line x1="5" y1="16" x2="19" y2="16" />
    <circle cx="15" cy="16" r="2.2" fill="var(--surface)" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

export const BackIcon = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <polyline points="14 6 8 12 14 18" />
  </svg>
);

export const CalculatorIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <rect x="8" y="6" width="8" height="3" rx="0.5" />
    <path d="M8.5 13h0M12 13h0M15.5 13h0M8.5 16.5h0M12 16.5h0M15.5 16.5h0" strokeWidth="2.2" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
    <line x1="8" y1="3" x2="8" y2="6.5" />
    <line x1="16" y1="3" x2="16" y2="6.5" />
  </svg>
);

export const BadgeCheckIcon = (p: IconProps) => (
  <svg
    {...base({ strokeWidth: 0, width: 12, height: 12, viewBox: "0 0 12 12", ...p })}
  >
    <path
      d="M6 1l1.4 1L9 1.6l.4 1.6 1.6.4-.6 1.6L12 6l-1 1.4.4 1.6-1.6.4-.4 1.6L7.4 11 6 12l-1.4-1L3 10.4l-.4-1.6L1 8.4 1.6 7 0 6l1-1.4L.6 3l1.6-.4L2.6 1l1.6.6L6 1z"
      fill="currentColor"
    />
    <polyline
      points="3.4 6.2 5 7.8 8.6 4.2"
      fill="none"
      stroke="#ebf5ff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CoinStackIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <ellipse cx="12" cy="6" rx="7" ry="2.6" />
    <path d="M5 6v4c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6V6" />
    <path d="M5 10v4c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6v-4" />
    <path d="M5 14v4c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6v-4" />
  </svg>
);

export const BuildingIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16" />
    <path d="M13 9.5h5a1 1 0 0 1 1 1V21" />
    <line x1="3" y1="21" x2="21" y2="21" />
    <path d="M7 8h3M7 11.5h3M7 15h3M16 13h0M16 16.5h0" strokeWidth="1.5" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s6.5-5.4 6.5-11a6.5 6.5 0 1 0-13 0c0 5.6 6.5 11 6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const EnvelopeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.2 3.5l3 .7 1 4-2.1 1.4a11 11 0 0 0 5.3 5.3l1.4-2.1 4 1v3.3a1.8 1.8 0 0 1-2 1.8A15.6 15.6 0 0 1 3.4 5.5a1.8 1.8 0 0 1 1.8-2z" />
  </svg>
);

export const LocationIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.5 3.5L3.8 10.4l6.7 2.6 2.6 6.7L20.5 3.5z" />
    <line x1="10.5" y1="13" x2="14" y2="9.5" />
  </svg>
);

export const DocumentIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3h7l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M13 3v5h5" />
    <line x1="8.5" y1="13" x2="15" y2="13" strokeWidth="1.5" />
    <line x1="8.5" y1="16.5" x2="13" y2="16.5" strokeWidth="1.5" />
  </svg>
);

export const DotsIcon = (p: IconProps) => (
  <svg {...base({ strokeWidth: 0, ...p })}>
    <circle cx="5" cy="12" r="1.8" fill="currentColor" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <circle cx="19" cy="12" r="1.8" fill="currentColor" />
  </svg>
);

export function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4.4a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7zM13.4 17h-2.8v-.9c.5-.06.7-.2.7-.62v-3.2c0-.42-.2-.55-.7-.62v-.9h2.1v4.74c0 .42.2.56.7.62z" />
    </svg>
  );
}

export function AccountAvatarGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="6.5" width="10.5" height="11" rx="1.6" />
      <path d="M14.5 9.5h5M14.5 12.5h5M14.5 15.5h3.5" strokeWidth="1.5" />
      <path d="M6.6 9.5h5.3M6.6 12.5h5.3M6.6 15h3.2" strokeWidth="1.3" />
    </svg>
  );
}

export function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="30"
      height="20"
      viewBox="0 0 30 20"
      aria-hidden
    >
      <rect width="30" height="20" rx="3" fill="#003276" />
      <circle cx="12" cy="10" r="5.4" fill="#eb001b" />
      <circle cx="18" cy="10" r="5.4" fill="#f79e1b" />
      <path
        d="M15 5.9a5.4 5.4 0 0 1 0 8.2 5.4 5.4 0 0 1 0-8.2z"
        fill="#ff5f00"
      />
    </svg>
  );
}

/** White glyphs sized to sit inside a 28px colored payment chip. */
export const CreditLineGlyph = (p: IconProps) => (
  <svg
    {...base({
      width: 16,
      height: 16,
      strokeWidth: 1.7,
      stroke: "#fff",
      ...p,
    })}
  >
    <path d="M6 4.5h12v14l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2z" />
    <path d="M9 8.5h6M9 11.5h6" />
  </svg>
);

export const WalletGlyph = (p: IconProps) => (
  <svg
    {...base({
      width: 16,
      height: 16,
      strokeWidth: 1.7,
      stroke: "#fff",
      ...p,
    })}
  >
    <path d="M4 8.5a2 2 0 0 1 2-2h9.5a1.5 1.5 0 0 1 1.5 1.5V9" />
    <rect x="4" y="8.5" width="16" height="10" rx="2.2" />
    <circle cx="16" cy="13.5" r="1.2" fill="#fff" stroke="none" />
  </svg>
);

export function VisaLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="30"
      height="20"
      viewBox="0 0 30 20"
      aria-hidden
    >
      <rect width="30" height="20" rx="3" fill="#15216b" />
      <text
        x="15"
        y="14"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9.5"
        fontStyle="italic"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="0.5"
      >
        VISA
      </text>
    </svg>
  );
}
