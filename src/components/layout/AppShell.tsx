"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBanner } from "./TopBanner";
import { WelcomePopup } from "../ui/WelcomePopup";
import clsx from "clsx";

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  showBanner?: boolean;
};

export function AppShell({ title, subtitle, actions, children, className, showBanner = true }: Props) {
  return (
    <div className="flex min-h-screen">
      <WelcomePopup />
      <Sidebar />
      <main className="relative flex-1 overflow-x-hidden px-4 pb-12 pt-8 sm:px-8 lg:px-12">
        {/* Background grid effect */}
        <div className="fixed inset-0 grid-bg pointer-events-none" />
        
        {showBanner && <TopBanner />}
        
        <header className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80">
              AI-Powered
            </p>
            <h1 className="mt-1 text-3xl font-bold text-white lg:text-4xl">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-base text-slate-400 lg:text-lg">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </header>
        
        <div className={clsx("relative grid gap-6", className)}>{children}</div>
      </main>
    </div>
  );
}
