"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  DollarSign,
  Rocket,
  GraduationCap,
  Map,
  HelpCircle,
  User,
  Zap,
  MessageCircle,
  Gem,
  Sparkles,
  BotMessageSquare,
  Crown,
  TrendingUp,
  ExternalLink,
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
  { label: "Training", href: "/training", icon: <GraduationCap size={20} /> },
  { label: "New Way To Scale To $1,000 To $5,000", href: "/scale-training", icon: <TrendingUp size={20} /> },
];

const premiumNav: NavItem[] = [
  { label: "DFY Images", href: "/premium/dfy", icon: <Gem size={20} /> },
  { label: "Instant Income", href: "/premium/instant-income", icon: <Sparkles size={20} /> },
  { label: "Autopilot", href: "/premium/autopilot", icon: <BotMessageSquare size={20} /> },
];

const secondaryNav: NavItem[] = [
  { label: "Start Tour", href: "/academy", icon: <Map size={20} /> },
  { label: "Help Center", href: "/docs-help", icon: <HelpCircle size={20} /> },
  { label: "My Account", href: "/account", icon: <User size={20} /> },
];

type ClaimCta = { title: string; href: string };
const claimCtas: ClaimCta[] = [
  { title: "Earn $400/Day With 1 Tap", href: "https://jvz8.com/c/86517/434727/" },
  { title: "Get Paid To Copy & Paste", href: "https://jvz3.com/c/86517/433243/" },
  { title: "Fast Cash Training", href: "https://www.jvzoo.com/c/86517/415009" },
];

const supportLink = "#support";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[280px] shrink-0 flex-col border-r border-white/5 bg-black/60 backdrop-blur-xl lg:flex overflow-y-auto">
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
      <nav className="mt-2 space-y-1 px-4">
        {mainNav.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm font-medium leading-snug transition-all",
                active
                  ? "bg-gradient-to-r from-amber-500/20 to-emerald-500/10 text-white shadow-lg shadow-amber-500/5"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className={clsx(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all",
                active 
                  ? "bg-gradient-to-br from-amber-500 to-emerald-500 text-black shadow-md" 
                  : "bg-white/5 text-slate-500"
              )}>
                {item.icon}
              </span>
              <span className="min-w-0 flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick claim CTAs (below main nav) */}
      <div className="mt-4 space-y-2 px-4">
        {claimCtas.map((cta) => (
          <a
            key={cta.href}
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-b from-zinc-900/95 to-black shadow-[0_0_0_1px_rgba(245,158,11,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-amber-500/40 hover:shadow-amber-500/10"
          >
            <span
              className="w-1 shrink-0 self-stretch rounded-l-xl bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.65)]"
              aria-hidden
            />
            <span className="flex min-w-0 flex-1 items-center justify-between gap-2 py-2.5 pl-2.5 pr-2">
              <span className="min-w-0 text-left">
                <span className="block font-mono text-xs font-bold leading-snug text-white sm:text-[13px]">
                  {cta.title}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-white/75">
                  Claim Now
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/35 bg-amber-500/10 text-amber-400 transition group-hover:border-amber-500/50 group-hover:bg-amber-500/20">
                <ExternalLink size={16} className="opacity-90" />
              </span>
            </span>
          </a>
        ))}
      </div>

      {/* Premium Upgrades */}
      <div className="mt-6 px-4">
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-600/10 border border-amber-500/25 px-4 py-2">
          <Crown size={14} className="text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Premium Upgrades</span>
        </div>
        <nav className="space-y-1">
          {premiumNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all border",
                  active
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-lg shadow-amber-500/10"
                    : "border-amber-500/10 text-amber-400/70 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
                )}
              >
                <span className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                  active
                    ? "bg-amber-500 text-black shadow-md"
                    : "bg-amber-500/10 text-amber-500/70"
                )}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Divider */}
      <div className="mx-4 mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
    </aside>
  );
}
