"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  DollarSign,
  Rocket,
  Calendar,
  GraduationCap,
  TrendingUp,
  HelpCircle,
  User,
  Sparkles,
  Zap,
} from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string;
  badgeType?: "gold" | "money" | "new";
};

const navItems: NavItem[] = [
  { 
    label: "Profit Dashboard", 
    href: "/", 
    icon: <LayoutDashboard size={20} />,
    badge: "LIVE",
    badgeType: "money"
  },
  { 
    label: "AI Image Creator", 
    href: "/image-forge", 
    icon: <Wand2 size={20} />,
    badge: "AI",
    badgeType: "gold"
  },
  { 
    label: "My Assets", 
    href: "/monetization/library", 
    icon: <Sparkles size={20} />,
  },
  { 
    label: "Revenue Links", 
    href: "/monetization/link-vault", 
    icon: <DollarSign size={20} />,
    badge: "$$",
    badgeType: "money"
  },
  { 
    label: "Publish & Earn", 
    href: "/launchpad", 
    icon: <Rocket size={20} />,
    badge: "HOT",
    badgeType: "gold"
  },
  { 
    label: "Auto Scheduler", 
    href: "/scheduler", 
    icon: <Calendar size={20} />,
  },
  { 
    label: "Success Training", 
    href: "/academy", 
    icon: <GraduationCap size={20} />,
    badge: "FREE",
    badgeType: "money"
  },
  { 
    label: "Live Results", 
    href: "/social-proof", 
    icon: <TrendingUp size={20} />,
    badge: "24/7",
    badgeType: "gold"
  },
  { 
    label: "Help Center", 
    href: "/docs-help", 
    icon: <HelpCircle size={20} />,
  },
  { 
    label: "My Account", 
    href: "/account", 
    icon: <User size={20} />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 border-r border-white/5 bg-black/60 px-5 py-6 backdrop-blur-2xl lg:block">
      {/* Logo / Brand */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-emerald-500 shadow-lg shadow-amber-500/20">
            <Zap className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ProfitFlow</h1>
            <p className="text-sm text-amber-400/80">AI Wealth System</p>
          </div>
        </div>
      </div>

      {/* Live earnings indicator */}
      <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider">System Active</span>
        </div>
        <p className="mt-2 text-2xl font-bold text-white">$2,847<span className="text-sm text-emerald-400">/today</span></p>
        <p className="text-xs text-slate-400 mt-1">Community earnings • Updates live</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const active =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-white border border-amber-500/30 shadow-lg shadow-amber-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <span className={clsx(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                active ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-slate-400"
              )}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={clsx(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  item.badgeType === "gold" && "bg-amber-500/20 text-amber-400 border border-amber-500/30",
                  item.badgeType === "money" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
                  item.badgeType === "new" && "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA card */}
      <div className="mt-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 to-emerald-500/10 p-5">
        <div className="flex items-center gap-2 text-amber-400">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Quick Start</span>
        </div>
        <p className="mt-3 text-lg font-bold text-white">
          Make Your First $100
        </p>
        <p className="mt-1 text-sm text-slate-300">
          Watch the 10-minute training. Our AI handles the hard work.
        </p>
        <Link
          href="/academy"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-bold text-black transition hover:from-amber-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/30"
        >
          Start Free Training
          <Rocket size={16} />
        </Link>
      </div>
    </aside>
  );
}
