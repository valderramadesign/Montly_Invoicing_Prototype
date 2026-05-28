"use client";

import { useState } from "react";
import { Shell } from "./Shell";
import { PromoBanner } from "./PromoBanner";
import { AccountsCard } from "./AccountsCard";
import { AccountsPage } from "./AccountsPage";

type View = "home" | "accounts";

export function App() {
  const [view, setView] = useState<View>("home");

  if (view === "accounts") {
    return (
      <Shell active="accounts" showCreditLines>
        <AccountsPage />
      </Shell>
    );
  }

  return (
    <Shell active="payment-methods">
      <div className="mx-auto w-full max-w-[1040px] px-4 py-5 sm:px-6 sm:py-6">
        <PromoBanner onComplete={() => setView("accounts")} />

        <h2 className="mb-3 mt-7 text-[20px] font-bold tracking-[-0.01em] text-[var(--text)]">
          Accounts
        </h2>

        <AccountsCard />
      </div>
    </Shell>
  );
}
