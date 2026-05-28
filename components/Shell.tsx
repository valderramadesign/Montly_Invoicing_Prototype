"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MetaLogo, HamburgerIcon } from "./icons";
import type { NavKey } from "./data";

/**
 * App frame: persistent sidebar on desktop (>=lg), a slide-in drawer on
 * smaller screens fronted by a compact top app bar.
 */
export function Shell({
  children,
  active = "payment-methods",
  showCreditLines = false,
}: {
  children: React.ReactNode;
  active?: NavKey;
  showCreditLines?: boolean;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const close = () => setDrawerOpen(false);

  return (
    <div className="min-h-screen lg:flex">
      {/* Desktop rail */}
      <div className="hidden w-[248px] shrink-0 border-r border-[var(--border)] lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar active={active} showCreditLines={showCreditLines} />
        </div>
      </div>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center gap-2.5 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          className="grid h-9 w-9 place-items-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
        >
          <HamburgerIcon />
        </button>
        <MetaLogo />
      </header>

      {/* Mobile drawer + scrim */}
      <div
        className={[
          "fixed inset-0 z-40 lg:hidden",
          drawerOpen ? "" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={close}
          className={[
            "absolute inset-0 bg-black/40 transition-opacity duration-200",
            drawerOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-y-0 left-0 w-[280px] max-w-[85%] border-r border-[var(--border)] shadow-xl transition-transform duration-200 ease-out",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <Sidebar
            active={active}
            showCreditLines={showCreditLines}
            onToggle={close}
          />
        </div>
      </div>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
