import Link from "next/link";
import { Play, Sparkles, DollarSign, Rocket, ArrowRight, CheckCircle2, TrendingUp, Users, Zap, Image as ImageIcon, Link2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { LiveEarnings } from "@/components/ui/LiveEarnings";

export default function Home() {
  return (
    <AppShell
      title="Welcome to G-Labs 95"
      subtitle="Your AI-powered income system • Join 12,400+ members earning daily"
    >
      {/* Hero Video Card - Above the fold */}
      <div className="glass-gold rounded-3xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Video Section */}
          <div className="relative aspect-video lg:aspect-auto bg-gradient-to-br from-amber-900/30 to-emerald-900/20 min-h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
                <Play size={32} className="text-white fill-white ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 video-overlay p-6">
              <Badge tone="success" pulse>WATCH NOW</Badge>
              <p className="mt-2 text-lg font-semibold text-white">How I Made $2,847 Last Week</p>
              <p className="text-sm text-slate-300">10 minute training • No experience needed</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              347 people earned money today
            </div>
            
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Your AI Creates <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">Money-Making</span> Images
            </h2>
            
            <p className="mt-4 text-lg text-slate-300">
              Just pick a topic. Our AI does everything else — creates stunning images, writes captions, and shows you exactly how to post for maximum earnings.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                <span className="text-white">AI creates images that get clicks (no design skills needed)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                <span className="text-white">Your affiliate link earns you money on every sale</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                <span className="text-white">Works while you sleep — 24/7 passive income</span>
              </div>
            </div>

            <Link
              href="/image-forge"
              className="btn-premium mt-8 flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-black transition-all hover:scale-[1.02]"
            >
              <Zap size={20} />
              Start Making Money Now
              <ArrowRight size={20} />
            </Link>
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
              <p className="text-3xl font-bold text-white">$68</p>
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
          {/* Step 1 */}
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

          {/* Step 2 */}
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

          {/* Step 3 */}
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
