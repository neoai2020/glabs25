"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, GraduationCap, X } from "lucide-react";

export function GreenBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 p-6 lg:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/10 to-transparent" />

      {/* Dismiss button */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-4 rounded-lg p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        aria-label="Dismiss"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white lg:text-2xl">
            Get the most out of G-Labs 95
          </h2>
          <p className="mt-3 leading-relaxed text-white/90">
            Watch the short feature walkthroughs to see how Image Forge, Affiliate Links, and Launchpad fit together — it&apos;s the fastest way to get familiar with everything.
          </p>

          <Link
            href="/training"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-amber-300"
          >
            Watch the training
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
