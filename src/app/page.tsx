"use client";

import Link from "next/link";
import { Sparkles, DollarSign, Rocket, ArrowRight, TrendingUp, Users, Image as ImageIcon, Link2, Play } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { LiveEarnings } from "@/components/ui/LiveEarnings";

export default function Home() {
  return (
    <AppShell
      title="Welcome to G-Labs 95"
      subtitle="Your AI-powered income system • Join 12,400+ members earning daily"
    >
      {/* Featured Video */}
      <div className="glass-card rounded-3xl p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
            <Play className="text-amber-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">See How It Works</h2>
          <p className="mt-2 text-slate-400">Watch this quick video to see how members are earning daily with G-Labs 95</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/1172159655?badge=0&autopause=0&player_id=0&app_id=58479"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              title="G-Labs 95 — How It Works"
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-money rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
              <DollarSign className="text-emerald-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white money-glow">$847,230</p>
              <p className="text-sm text-slate-400">Earned by members this month</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
              <Users className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">12,483</p>
              <p className="text-sm text-slate-400">Active members worldwide</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
              <TrendingUp className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">$214.36</p>
              <p className="text-sm text-slate-400">Average daily earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple 3-Step Process */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white text-center">Your 3-Step Money-Making System</h2>
        <p className="text-center text-slate-400 mt-2">Follow these steps in order to maximize your earnings</p>
        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Link href="/image-forge" className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-500/30 hover:bg-white/8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-xl font-bold text-black shadow-lg shadow-amber-500/30">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Create AI Images</h3>
                <p className="text-sm text-slate-400">Pick a niche, AI makes the images</p>
              </div>
              <ImageIcon className="text-amber-400" size={24} />
            </div>
            <p className="mt-4 text-slate-300">Choose from proven money-making topics. Our AI creates stunning, click-worthy images in seconds.</p>
            <div className="mt-4 flex items-center gap-2 text-amber-400 font-medium">
              Start here <ArrowRight size={16} />
            </div>
          </Link>

          <Link href="/monetization/link-vault" className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-500/30 hover:bg-white/8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-xl font-bold text-black shadow-lg shadow-emerald-500/30">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Add Your Money Link</h3>
                <p className="text-sm text-slate-400">Connect your affiliate link</p>
              </div>
              <Link2 className="text-emerald-400" size={24} />
            </div>
            <p className="mt-4 text-slate-300">Add your Amazon, Etsy, or other affiliate link. Every click = potential money in your pocket.</p>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 font-medium">
              Add link <ArrowRight size={16} />
            </div>
          </Link>

          <Link href="/launchpad" className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-500/30 hover:bg-white/8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 text-xl font-bold text-black shadow-lg shadow-amber-500/30">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Publish & Earn</h3>
                <p className="text-sm text-slate-400">Post to Pinterest & more</p>
              </div>
              <Rocket className="text-amber-400" size={24} />
            </div>
            <p className="mt-4 text-slate-300">Follow our step-by-step guides to post on Pinterest, Instagram, TikTok, and Facebook.</p>
            <div className="mt-4 flex items-center gap-2 text-amber-400 font-medium">
              See how <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </div>

      {/* Live Earnings */}
      <LiveEarnings />

      {/* Final CTA */}
      <div className="glass-gold rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to Start Earning?</h2>
        <p className="mt-2 text-lg text-slate-300">Create your first AI image and start your income journey today</p>
        <Link
          href="/image-forge"
          className="btn-premium mt-6 inline-flex items-center gap-3 rounded-xl px-10 py-5 text-xl font-bold text-black"
        >
          <Sparkles size={24} />
          Create Your First Image
          <ArrowRight size={24} />
        </Link>
        <p className="mt-4 text-slate-400">No credit card • No experience needed • Start earning in minutes</p>
      </div>
    </AppShell>
  );
}
