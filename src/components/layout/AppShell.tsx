"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { PremiumBanner } from "./PremiumBanner";
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
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 overflow-auto px-6 py-8 lg:px-12">
        {/* Premium Banner - Shows on all pages */}
        <PremiumBanner />
        
        <header className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 text-slate-400">{subtitle}</p>}
          </div>
          {actions}
        </header>
        
        <div className={clsx("space-y-6", className)}>{children}</div>
      </main>
    </div>
  );
}
