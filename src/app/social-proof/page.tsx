import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { socialFeed, testimonials, earningsData, topNiches } from "@/lib/mockData";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock,
  Star,
  CheckCircle2,
  Flame,
  ArrowRight,
  Zap
} from "lucide-react";
import Link from "next/link";

const communityStats = [
  { label: "Active Members", value: "12,459", icon: Users, color: "amber" },
  { label: "Earned This Month", value: "$847K", icon: DollarSign, color: "emerald" },
  { label: "Images Created Today", value: "24,892", icon: Zap, color: "amber" },
  { label: "Average First Earnings", value: "3 Days", icon: Clock, color: "emerald" },
];

const topEarners = [
  { name: "James R.", niche: "Home Decor", earnings: "$47,280", period: "This Month", avatar: "JR" },
  { name: "Lisa K.", niche: "Beauty", earnings: "$38,450", period: "This Month", avatar: "LK" },
  { name: "Michael T.", niche: "Tech", earnings: "$31,200", period: "This Month", avatar: "MT" },
  { name: "Sarah M.", niche: "Kitchen", earnings: "$28,900", period: "This Month", avatar: "SM" },
  { name: "David P.", niche: "Fitness", earnings: "$24,100", period: "This Month", avatar: "DP" },
];

export default function SocialProofPage() {
  return (
    <AppShell
      title="Live Results"
      subtitle="Real earnings from real members - updated in real-time"
      showBanner={false}
      actions={<Badge tone="success" pulse>LIVE UPDATES</Badge>}
    >
      {/* Community Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {communityStats.map((stat) => (
          <div 
            key={stat.label} 
            className={`rounded-2xl p-6 ${
              stat.color === "emerald" ? "glass-money" : "glass-gold"
            }`}
          >
            <stat.icon className={stat.color === "emerald" ? "text-emerald-400" : "text-amber-400"} size={28} />
            <p className={`mt-4 text-3xl font-bold ${
              stat.color === "emerald" ? "text-emerald-400" : "text-amber-400"
            }`}>{stat.value}</p>
            <p className="mt-1 text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Live Earnings Feed */}
          <div className="glass-money rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
                </div>
                <h2 className="text-xl font-bold text-white">Live Earnings Feed</h2>
              </div>
              <Badge tone="success">REAL-TIME</Badge>
            </div>
            <p className="mt-1 text-slate-400">Watch money being made right now</p>

            <div className="mt-6 space-y-3">
              {socialFeed.map((item) => (
                <div 
                  key={item.id} 
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.headline}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
                    </div>
                    {item.pill && (
                      <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                        item.pill.startsWith('+$') || item.pill.startsWith('$')
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {item.pill}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} />
                    {item.ago}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Member Success Stories</h2>
              <Badge tone="gold">VERIFIED</Badge>
            </div>
            <p className="mt-1 text-slate-400">Real results from real people</p>

            <div className="mt-6 space-y-4">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.name} 
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 text-lg font-bold text-black">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{testimonial.name}</p>
                          <p className="text-sm text-slate-400">{testimonial.niche} Niche</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-400">{testimonial.earnings}</p>
                          <p className="text-xs text-slate-400">{testimonial.period}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-current" />
                        ))}
                      </div>
                      <p className="mt-3 text-slate-300 italic">"{testimonial.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Earners */}
          <div className="glass-gold rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="text-amber-400" size={24} />
                <h2 className="text-xl font-bold text-white">Top Earners</h2>
              </div>
              <Badge tone="gold">THIS MONTH</Badge>
            </div>

            <div className="mt-6 space-y-3">
              {topEarners.map((earner, idx) => (
                <div 
                  key={earner.name} 
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
                    idx === 0 ? "bg-amber-500 text-black" :
                    idx === 1 ? "bg-slate-300 text-black" :
                    idx === 2 ? "bg-amber-700 text-white" :
                    "bg-white/10 text-slate-400"
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 text-sm font-bold text-black">
                    {earner.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{earner.name}</p>
                    <p className="text-xs text-slate-400">{earner.niche}</p>
                  </div>
                  <p className="text-lg font-bold text-emerald-400">{earner.earnings}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Niches */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Trending Niches</h2>
              <Badge tone="success" pulse>HOT</Badge>
            </div>
            <p className="mt-1 text-slate-400">Highest earning potential right now</p>

            <div className="mt-6 space-y-3">
              {topNiches.map((niche, idx) => (
                <div 
                  key={niche.name} 
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-sm font-bold text-amber-400">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{niche.name}</p>
                      <p className="text-xs text-slate-400">{niche.avgEarnings} avg</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <TrendingUp size={14} />
                    {niche.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white">Community Earnings</h2>
            
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Today</span>
                <span className="text-xl font-bold text-emerald-400">${earningsData.today.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">This Week</span>
                <span className="text-xl font-bold text-white">${earningsData.thisWeek.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">This Month</span>
                <span className="text-xl font-bold text-white">${earningsData.thisMonth.toLocaleString()}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="text-slate-400">All Time</span>
                <span className="text-2xl font-bold text-amber-400">${earningsData.allTime.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-500">
              <strong className="text-slate-400">Results Disclaimer:</strong> Earnings shown are from real members but individual results vary. Success depends on effort, niche selection, and consistency. These are not guaranteed results.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-gold rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white lg:text-3xl">
          Ready to Join These Success Stories?
        </h2>
        <p className="mt-3 text-lg text-slate-300">
          Start creating AI images now and you could be in this feed within days.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/image-forge"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition hover:-translate-y-1"
          >
            <Zap size={20} />
            Start Creating Now
          </Link>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/15"
          >
            Watch Free Training
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
