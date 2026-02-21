import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { socialFeed, testimonials } from "@/lib/mockData";
import { Clock, Star, TrendingUp, DollarSign, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const topEarners = [
  { rank: 1, name: "Patricia M.", earnings: "$12,847", period: "This month", niche: "Home Decor" },
  { rank: 2, name: "Robert J.", earnings: "$9,234", period: "This month", niche: "Kitchen" },
  { rank: 3, name: "Linda S.", earnings: "$8,102", period: "This month", niche: "Skincare" },
  { rank: 4, name: "James W.", earnings: "$7,456", period: "This month", niche: "Baby Products" },
  { rank: 5, name: "Barbara K.", earnings: "$6,891", period: "This month", niche: "Fashion" },
];

export default function SocialProofPage() {
  return (
    <AppShell
      title="Live Results"
      subtitle="Real earnings from real members like you"
      showBanner={false}
    >
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="glass-money rounded-2xl p-6">
          <DollarSign className="text-emerald-400" size={28} />
          <p className="mt-3 text-3xl font-bold text-white money-glow">$847K</p>
          <p className="text-sm text-slate-400">Earned this month</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <Users className="text-amber-400" size={28} />
          <p className="mt-3 text-3xl font-bold text-white">12,483</p>
          <p className="text-sm text-slate-400">Active members</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <TrendingUp className="text-amber-400" size={28} />
          <p className="mt-3 text-3xl font-bold text-white">347</p>
          <p className="text-sm text-slate-400">Earned today</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <Star className="text-amber-400 fill-amber-400" size={28} />
          <p className="mt-3 text-3xl font-bold text-white">$214.36</p>
          <p className="text-sm text-slate-400">Avg daily earnings</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Earnings Feed */}
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Live Earnings</h2>
            <Badge tone="success" pulse>LIVE</Badge>
          </div>
          <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
            {socialFeed.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">{item.headline}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <Clock size={12} />
                    {item.ago}
                  </p>
                </div>
                {item.pill && (
                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                    item.pill.startsWith('+$') ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {item.pill}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Earners */}
        <div className="glass-gold rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white">Top Earners This Month</h2>
          <p className="text-slate-400">People just like you crushing it</p>
          <div className="mt-4 space-y-3">
            {topEarners.map((earner) => (
              <div key={earner.rank} className="flex items-center gap-4 rounded-xl bg-black/20 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-black ${
                  earner.rank === 1 ? "bg-amber-400" : 
                  earner.rank === 2 ? "bg-slate-300" : 
                  earner.rank === 3 ? "bg-amber-600" : "bg-white/20 text-white"
                }`}>
                  #{earner.rank}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{earner.name}</p>
                  <p className="text-sm text-slate-400">{earner.niche}</p>
                </div>
                <span className="text-xl font-bold text-emerald-400">{earner.earnings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white text-center">Member Success Stories</h2>
        <p className="text-center text-slate-400 mt-1">Hear from people who changed their lives</p>
        
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 text-lg font-bold text-black">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-slate-400">{t.niche}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
              </div>
              <p className="mt-3 text-slate-300 italic">&quot;{t.quote}&quot;</p>
              <div className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">{t.earnings}</p>
                <p className="text-xs text-slate-400">{t.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass-money rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white">Ready to Join Them?</h3>
        <p className="mt-2 text-lg text-slate-300">Start your success story today</p>
        <Link
          href="/image-forge"
          className="btn-premium mt-6 inline-flex items-center gap-3 rounded-xl px-10 py-5 text-xl font-bold text-black"
        >
          Create Your First Money-Making Image
          <ArrowRight size={24} />
        </Link>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-500 text-center max-w-2xl mx-auto">
        Results shown are from real members but individual results vary. Success depends on effort, consistency, and market conditions. These testimonials represent exceptional results and are not typical.
      </p>
    </AppShell>
  );
}
