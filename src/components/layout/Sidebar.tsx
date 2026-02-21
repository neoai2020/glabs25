"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  DollarSign,
  Rocket,
  GraduationCap,
  HelpCircle,
  User,
  Zap,
  Play,
  MessageCircle,
} from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const mainNav: NavItem[] = [
  { label: "Wealth Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
  { label: "AI Profit Machine", href: "/image-forge", icon: <Wand2 size={20} /> },
  { label: "Money Links", href: "/monetization/link-vault", icon: <DollarSign size={20} /> },
  { label: "Cash Out", href: "/launchpad", icon: <Rocket size={20} /> },
];

const secondaryNav: NavItem[] = [
  { label: "Success Academy", href: "/academy", icon: <GraduationCap size={20} /> },
  { label: "Help Center", href: "/docs-help", icon: <HelpCircle size={20} /> },
  { label: "My Account", href: "/account", icon: <User size={20} /> },
];

// Support desk link - to be updated
const supportLink = "#support";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[280px] shrink-0 flex-col border-r border-white/5 bg-black/60 backdrop-blur-xl lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 shadow-lg shadow-amber-500/20">
          <Zap className="h-6 w-6 text-black" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">G-Labs 95</h1>
          <p className="text-xs text-emerald-400 font-medium">AI Income System</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mt-4 flex-1 space-y-1 px-4">
        {mainNav.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-amber-500/20 to-emerald-500/10 text-white shadow-lg shadow-amber-500/5"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className={clsx(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                active 
                  ? "bg-gradient-to-br from-amber-500 to-emerald-500 text-black shadow-md" 
                  : "bg-white/5 text-slate-500"
              )}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Secondary Navigation */}
      <nav className="mt-4 space-y-1 px-4">
        {secondaryNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              )}
            >
              <span className="flex h-8 w-8 items-center justify-center">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Need Help Card */}
      <div className="m-4 mt-4">
        <a 
          href={supportLink}
          className="block rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-4 transition hover:border-blue-500/30"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
              <MessageCircle size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Need Help?</p>
              <p className="text-xs text-slate-400">Contact Support</p>
            </div>
          </div>
        </a>
      </div>

      {/* Watch Training Card */}
      <div className="m-4 mt-0">
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-emerald-500/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
              <Play size={16} className="text-amber-400 fill-amber-400 ml-0.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Watch Training</p>
              <p className="text-xs text-slate-400">10 min to first $100</p>
            </div>
          </div>
          <Link
            href="/academy"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-sm font-semibold text-black transition hover:from-amber-400 hover:to-amber-500"
          >
            Start Now
          </Link>
        </div>
      </div>
    </aside>
  );
}
