"use client";

import { useState, useEffect } from "react";
import { X, DollarSign, ArrowRight, CheckCircle2 } from "lucide-react";

export function WithdrawPopup() {
  const [open, setOpen] = useState(false);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("glabs_withdraw_seen")) return;
    const t = setTimeout(() => setOpen(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const i = setInterval(() => setGlow((g) => !g), 1500);
    return () => clearInterval(i);
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem("glabs_withdraw_seen", "1");
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9998] animate-[slideUp_0.5s_cubic-bezier(.17,.67,.29,1.2)]">
      <div
        className={`relative w-[340px] overflow-hidden rounded-2xl border transition-all duration-700 ${
          glow
            ? "border-emerald-400/60 shadow-[0_0_40px_rgba(16,185,129,0.35),0_0_80px_rgba(16,185,129,0.15)]"
            : "border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        } bg-gradient-to-br from-[#0d1a0f] via-[#0a0f0a] to-[#0a0a0f]`}
      >
        {/* Glow edge */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 via-transparent to-emerald-400/10" />

        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/50 transition hover:bg-white/20 hover:text-white"
        >
          <X size={14} />
        </button>

        <div className="relative p-5">
          {/* Status badge */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Account Verified
            </span>
          </div>

          {/* Headline */}
          <p className="text-sm font-semibold text-slate-300">
            Congratulations! You&apos;re Eligible To Withdraw
          </p>

          {/* Amount */}
          <div className="mt-2 flex items-baseline gap-1">
            <DollarSign size={24} className="text-emerald-400" />
            <span className="text-4xl font-black tracking-tight text-white">
              416
            </span>
            <span className="text-2xl font-black text-white/70">.34</span>
          </div>

          {/* Subtle label */}
          <p className="mt-1 text-xs text-emerald-400/70">
            Available balance from your activity
          </p>

          {/* CTA */}
          <a
            href="https://jvz7.com/c/86517/434727/?tid=glabs"
            target="_blank"
            rel="noopener noreferrer"
            className={`group mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 ${
              glow
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-[0_4px_20px_rgba(16,185,129,0.4)] scale-[1.02]"
                : "bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.25)] scale-100"
            } hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(16,185,129,0.5)]`}
          >
            Withdraw Now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
