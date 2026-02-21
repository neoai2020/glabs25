import Link from "next/link";
import { 
  Play, 
  Sparkles, 
  DollarSign, 
  Rocket, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  Zap,
  Clock,
  Users
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { stats, checklist, socialFeed, testimonials, topNiches, earningsData } from "@/lib/mockData";

export default function Home() {
  return (
    <AppShell
      title="Profit Dashboard"
      subtitle="Your AI assistant is working around the clock to help you earn"
      actions={
        <div className="flex gap-3">
          <Link
            href="/image-forge"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Zap size={18} />
            Create AI Images
          </Link>
          <Link
            href="/launchpad"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Rocket size={18} />
            Publish Now
          </Link>
        </div>
      }
    >
      {/* Earnings Overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard 
          label="Estimated Today" 
          value={earningsData.today.toLocaleString()} 
          prefix="$"
          helper="Based on clicks & conversions" 
          tone="money"
          icon="earnings"
          trend="+12% from yesterday"
        />
        <StatCard 
          label="AI Images Created" 
          value={stats.imagesGenerated.toString()} 
          helper="Ready to publish" 
          icon="images"
        />
        <StatCard 
          label="Revenue Links Active" 
          value={stats.linksAttached.toString()} 
          helper="Connected & earning" 
          tone="gold"
          icon="links"
        />
        <StatCard 
          label="Posting Streak" 
          value={`${stats.streakDays}`} 
          helper="Days in a row • Keep going!" 
          tone="success"
          icon="streak"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Quick Start Checklist */}
          <div className="glass-gold rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge tone="gold" pulse>3 SIMPLE STEPS</Badge>
                <h2 className="mt-3 text-xl font-bold text-white">Start Earning in Minutes</h2>
                <p className="mt-1 text-slate-400">Follow these steps and our AI handles everything else</p>
              </div>
              <Link 
                href="/academy" 
                className="hidden items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 sm:inline-flex"
              >
                <Play size={16} />
                Watch Tutorial
              </Link>
            </div>
            
            <div className="mt-5 space-y-3">
              {checklist.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 rounded-xl border p-4 transition hover:-translate-y-0.5 ${
                    item.done 
                      ? "border-emerald-500/30 bg-emerald-500/10" 
                      : "border-white/10 bg-white/5 hover:border-amber-500/30 hover:bg-amber-500/5"
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
                    item.done 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {item.done ? <CheckCircle2 size={20} /> : idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className={`font-semibold ${item.done ? "text-emerald-400" : "text-white"}`}>
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-400">
                      {item.done ? "Completed! Great job." : "Click to start →"}
                    </p>
                  </div>
                  {!item.done && <ArrowRight className="text-amber-400" size={20} />}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              <Badge tone="gold">AI-POWERED</Badge>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { 
                  label: "Create Images", 
                  href: "/image-forge", 
                  icon: <Sparkles size={24} />, 
                  desc: "AI generates stunning visuals in seconds",
                  color: "amber"
                },
                { 
                  label: "Add Profit Links", 
                  href: "/monetization/link-vault", 
                  icon: <DollarSign size={24} />, 
                  desc: "Connect your affiliate and product links",
                  color: "emerald"
                },
                { 
                  label: "Publish & Earn", 
                  href: "/launchpad", 
                  icon: <Rocket size={24} />, 
                  desc: "Post to Pinterest, Instagram & more",
                  color: "amber"
                },
              ].map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-amber-500/30 hover:bg-white/8 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    cta.color === "amber" ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {cta.icon}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{cta.label}</p>
                    <p className="mt-1 text-sm text-slate-400">{cta.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Niches */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Top Earning Niches</h2>
              <Badge tone="success" pulse>TRENDING</Badge>
            </div>
            <p className="mt-1 text-slate-400">Based on community performance this week</p>
            <div className="mt-5 space-y-3">
              {topNiches.map((niche, idx) => (
                <div 
                  key={niche.name} 
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-lg font-bold text-amber-400">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{niche.name}</p>
                    <p className="text-sm text-slate-400">Avg. {niche.avgEarnings}</p>
                  </div>
                  <span className="text-emerald-400 font-semibold">{niche.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Live Earnings Feed */}
          <div className="glass-money rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Live Earnings</h2>
              <Badge tone="success" pulse>LIVE</Badge>
            </div>
            <p className="mt-1 text-slate-400">Real results from our community</p>
            <div className="mt-5 space-y-3">
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
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-bold text-emerald-400">
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
              <h2 className="text-xl font-bold text-white">Success Stories</h2>
              <Badge tone="gold">VERIFIED</Badge>
            </div>
            <div className="mt-5 space-y-4">
              {testimonials.slice(0, 2).map((testimonial) => (
                <div 
                  key={testimonial.name} 
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 text-sm font-bold text-black">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.niche}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-emerald-400">{testimonial.earnings}</p>
                      <p className="text-xs text-slate-400">{testimonial.period}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
            <Link 
              href="/social-proof" 
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View All Success Stories
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick Tips */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-amber-400">
              <Zap size={18} />
              <h2 className="text-lg font-bold">Pro Tip</h2>
            </div>
            <p className="mt-3 text-slate-300">
              <strong className="text-white">Consistency wins.</strong> Members who post daily earn 
              <span className="text-emerald-400 font-semibold"> 3x more </span> 
              than those who post weekly. The AI makes it easy—just click publish.
            </p>
            <Link 
              href="/academy" 
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              Learn More Strategies
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
