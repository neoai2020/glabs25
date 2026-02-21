"use client";

import Link from "next/link";
import { Play, TrendingUp, Users, Zap } from "lucide-react";

export function TopBanner() {
  return (
    <div className="glass-strong relative mb-6 overflow-hidden rounded-2xl p-6">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-emerald-500/5 to-amber-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.15),transparent_50%)]" />
      
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider">AI System Active Now</span>
          </div>
          
          <h2 className="mt-3 text-2xl font-bold text-white lg:text-3xl">
            People Are Earning <span className="text-amber-400">$1,000 - $5,000</span> Daily
          </h2>
          
          <p className="mt-2 text-base text-slate-300 lg:text-lg">
            Our AI creates stunning images, attaches your profit links, and publishes automatically. 
            <span className="text-white font-medium"> You collect the earnings.</span>
          </p>

          {/* Live stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp size={16} />
              <span><strong className="text-white">$847K</strong> earned this month</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <Users size={16} />
              <span><strong className="text-white">12,459</strong> active members</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Zap size={16} />
              <span><strong className="text-white">2.4M</strong> images created</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href="https://www.jvzoo.com/c/86517/415009"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-base font-bold text-black shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/40"
          >
            <Play size={18} className="fill-current" />
            Watch Free Training
          </a>
          <Link
            href="/image-forge"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            <Zap size={18} />
            Create Images Now
          </Link>
        </div>
      </div>
    </div>
  );
}
