"use client";

import { useState } from "react";
import { DollarSign, X } from "lucide-react";

export function PremiumBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/10 to-transparent" />
      
      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-4 rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
        aria-label="Dismiss"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10">
          <DollarSign className="h-8 w-8 text-white" />
          <div className="absolute ml-8 mt-8 h-3 w-3 rounded-full bg-amber-400" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white lg:text-2xl">
            Want To Multiply Your Earnings To $1,000 - $5,000 A Day?
          </h2>
          <p className="mt-3 text-white/90 leading-relaxed">
            The G-Labs 95 Account Is Great, but if you want to scale to truly life-changing income, you need to watch this training which shows how to make the serious big boy big girl money. And guess what?
          </p>
          <p className="mt-2 text-white/90 leading-relaxed">
            This training is free if you&apos;re a G-Labs 95 account member. So, if you want to watch the training, just tap the yellow button below.
          </p>
          
          <a
            href="https://www.jvzoo.com/c/86517/415009"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-black/20 transition hover:bg-amber-300 hover:scale-105"
          >
            Click Here To Watch FREE Training
          </a>
        </div>
      </div>
    </div>
  );
}
