"use client";

import Link from "next/link";
import { X, Play, Sparkles } from "lucide-react";
import { useState } from "react";

export function TopBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative mb-6 flex items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-emerald-500/5 px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
          <Sparkles size={18} className="text-amber-400" />
        </div>
        <div>
          <p className="font-medium text-white">
            Start making money in 10 minutes
          </p>
          <p className="text-sm text-slate-400">Watch the training to learn how</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/academy"
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
        >
          <Play size={14} className="fill-current" />
          Watch Now
        </Link>
        <button 
          onClick={() => setDismissed(true)}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
