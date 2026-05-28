export type CardBrand = "mastercard" | "visa";

export type Account = {
  id: string;
  name: string;
  status: "Active";
  brand: CardBrand;
  cardLast4: string;
  balance: string;
};

export const adAccounts: Account[] = [
  {
    id: "1348390582350309",
    name: "Los Angeles",
    status: "Active",
    brand: "mastercard",
    cardLast4: "1847",
    balance: "$309.45",
  },
  {
    id: "9942885093338712",
    name: "Oakland",
    status: "Active",
    brand: "visa",
    cardLast4: "3275",
    balance: "$149.71",
  },
  {
    id: "2220955821015387",
    name: "San Diego",
    status: "Active",
    brand: "visa",
    cardLast4: "3275",
    balance: "$436.84",
  },
];

export type NavKey =
  | "accounts"
  | "payment-methods"
  | "payment-activity"
  | "credit-lines"
  | "invoices"
  | "legal-entities";

export const navItems: { key: NavKey; label: string }[] = [
  { key: "accounts", label: "Accounts" },
  { key: "payment-methods", label: "Payment methods" },
  { key: "payment-activity", label: "Payment activity" },
  { key: "credit-lines", label: "Credit lines" },
  { key: "invoices", label: "Invoices" },
  { key: "legal-entities", label: "Legal entities" },
];

export type AccountStatus = "Active" | "Disabled" | "Closed";

export type PaymentMethod =
  | { kind: "credit-line"; entity: string }
  | { kind: "card"; brand: CardBrand; last4: string }
  | { kind: "none" }
  | { kind: "prepaid" };

export type AccountAction = "View details" | "Pay now" | "Add funds";

export type PortfolioAccount = {
  id: string;
  name: string;
  ownedBy?: string;
  status: AccountStatus;
  payment: PaymentMethod;
  balance: string;
  balanceNote?: string;
  action: AccountAction;
};

/** Ad accounts shown on the Accounts page after monthly invoicing is approved. */
export const portfolioAccounts: PortfolioAccount[] = [
  {
    id: "4199790425834549",
    name: "Yasemin's Creamery - Canada",
    status: "Active",
    payment: { kind: "credit-line", entity: "Apparel World" },
    balance: "$0.00 USD",
    action: "View details",
  },
  {
    id: "2283929136130132",
    name: "Yasemin's Creamery - Japan",
    status: "Active",
    payment: { kind: "credit-line", entity: "Apparel World" },
    balance: "$0.00 USD",
    action: "View details",
  },
  {
    id: "8737484995168486",
    name: "Yasemin's Creamery - Colombia",
    ownedBy: "Deepti's Media Group",
    status: "Disabled",
    payment: { kind: "card", brand: "visa", last4: "5567" },
    balance: "$99,811.50 USD",
    balanceNote: "Payment failed",
    action: "Pay now",
  },
  {
    id: "4143775487546713",
    name: "Yasemin's Creamery (Opening)",
    status: "Disabled",
    payment: { kind: "none" },
    balance: "$434,566.04 USD",
    action: "View details",
  },
  {
    id: "9999974509243859",
    name: "Yasemin's Creamery (November 2022)",
    status: "Closed",
    payment: { kind: "prepaid" },
    balance: "$0.00 USD",
    action: "Add funds",
  },
  {
    id: "7038824729307481",
    name: "Yasemin's Creamery (Holiday season)",
    status: "Active",
    payment: { kind: "credit-line", entity: "Apparel World" },
    balance: "$0.00 USD",
    action: "View details",
  },
  {
    id: "7038824729307481",
    name: "Yasemin's Creamery (Holiday season)",
    status: "Active",
    payment: { kind: "credit-line", entity: "Apparel World" },
    balance: "$0.00 USD",
    action: "View details",
  },
];
