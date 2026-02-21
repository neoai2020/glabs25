"use client";

import { useState, useEffect } from "react";
import { X, Trophy, Flame, Star, Sparkles, Gift, ArrowRight } from "lucide-react";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const i = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(i);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg animate-[popIn_0.5s_cubic-bezier(.17,.67,.29,1.2)] overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#14140a] via-[#111108] to-[#0a0a0f] shadow-[0_0_120px_rgba(251,191,36,0.25),0_0_60px_rgba(16,185,129,0.15)]">
        {/* Animated glow ring */}
        <div className="pointer-events-none absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 opacity-30 blur-sm animate-[spin_4s_linear_infinite]" />
        <div className="relative rounded-3xl bg-gradient-to-b from-[#14140a] via-[#111108] to-[#0a0a0f]">

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
          >
            <X size={18} />
          </button>

          {/* Sparkle particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-amber-400 animate-[sparkle_2s_ease-in-out_infinite]"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${5 + Math.random() * 40}%`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Top badge */}
          <div className="flex justify-center pt-7">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-amber-400/20 animate-ping" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_40px_rgba(251,191,36,0.5)]">
                <Trophy size={38} className="text-black" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 pt-5 text-center">
            {/* Congratulations */}
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={20} className="text-amber-400 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
                You&apos;ve Been Selected
              </span>
              <Sparkles size={20} className="text-amber-400 animate-pulse" />
            </div>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              LIMITED FREE TRAINING
            </h2>

            <p className="mt-2 text-lg font-bold text-amber-400 sm:text-xl">
              Learn How To Make{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                $1,000 — $5,000
              </span>{" "}
              Per Day
            </p>
            <p className="text-base font-semibold text-amber-300/80">
              With No Extra Work
            </p>

            {/* Urgency bar */}
            <div className="mx-auto mt-5 max-w-xs">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1 text-red-400">
                  <Flame size={14} className="animate-pulse" />
                  SPOTS FILLING FAST
                </span>
                <span className="text-white">
                  8 / 10 Claimed
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-red-500 transition-all duration-1000"
                  style={{ width: "80%" }}
                />
              </div>
              <p className="mt-1.5 text-xs font-bold text-red-400 animate-pulse">
                Only 2 FREE spots remaining!
              </p>
            </div>

            {/* Perks */}
            <div className="mx-auto mt-5 flex max-w-xs flex-col gap-2 text-left text-sm">
              {[
                "Fully automated income system revealed",
                "No tech skills or experience needed",
                "Works in just 20 minutes per day",
              ].map((perk) => (
                <div key={perk} className="flex items-start gap-2">
                  <Star size={15} className="mt-0.5 flex-shrink-0 fill-amber-400 text-amber-400" />
                  <span className="text-slate-200">{perk}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="https://www.jvzoo.com/c/86517/415009"
              target="_blank"
              rel="noopener noreferrer"
              className={`group mt-6 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl px-8 py-4 text-lg font-extrabold text-black transition-all duration-300 ${
                pulse
                  ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.6)] scale-[1.03]"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_0_25px_rgba(251,191,36,0.35)] scale-100"
              } hover:scale-105 hover:shadow-[0_0_50px_rgba(251,191,36,0.7)]`}
            >
              <Gift size={22} />
              CLAIM MY FREE SPOT
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>

            <p className="mt-3 text-xs text-slate-500">
              100% Free — No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
