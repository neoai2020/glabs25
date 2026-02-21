import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  DollarSign,
  Star,
  ArrowRight,
  Zap,
  Users
} from "lucide-react";
import Link from "next/link";

const lessons = [
  { 
    id: 1,
    title: "Make Your First $100 in 24 Hours", 
    duration: "10 min",
    description: "The exact step-by-step process to go from zero to earning",
    focus: "Create → Link → Publish → Earn",
    completed: false,
    featured: true
  },
  { 
    id: 2,
    title: "Finding Profitable Niches", 
    duration: "8 min",
    description: "Which topics make the most money (and which to avoid)",
    focus: "Home office, skincare, and tech are hot right now",
    completed: false
  },
  { 
    id: 3,
    title: "Creating Images That Sell", 
    duration: "12 min",
    description: "What makes people click and buy from your posts",
    focus: "Colors, composition, and the psychology of sales",
    completed: false
  },
  { 
    id: 4,
    title: "Pinterest Mastery", 
    duration: "15 min",
    description: "Get 10x more views and clicks on Pinterest",
    focus: "Timing, hashtags, and the algorithm secrets",
    completed: false
  },
  { 
    id: 5,
    title: "Scaling to $1,000+ Per Day", 
    duration: "18 min",
    description: "How top earners make serious money consistently",
    focus: "Volume, automation, and multiple income streams",
    completed: false
  },
];

const successMetrics = [
  { label: "Average First Earnings", value: "3 days", icon: Clock },
  { label: "Members Earning $1k+/mo", value: "4,280", icon: Users },
  { label: "Top Earner This Month", value: "$47,000", icon: DollarSign },
];

export default function AcademyPage() {
  return (
    <AppShell
      title="Success Training"
      subtitle="Free training to help you start earning as fast as possible"
      showBanner={false}
      actions={<Badge tone="money" pulse>100% FREE</Badge>}
    >
      {/* Hero Section */}
      <div className="glass-gold rounded-2xl p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Badge tone="gold">MOST POPULAR</Badge>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Make Your First <span className="text-amber-400">$100</span> in 24 Hours
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              This 10-minute video shows you exactly how to create AI images, 
              attach your profit links, and start earning money. No experience needed.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />
                <span>Step-by-step walkthrough</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />
                <span>Complete in 10 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />
                <span>Start earning today</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition hover:-translate-y-1 hover:shadow-xl">
                <Play size={24} className="fill-current" />
                Watch Free Training
              </button>
              <Link
                href="/image-forge"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/15"
              >
                Skip to Creating
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/20 to-emerald-500/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Play size={36} className="text-white fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <Badge tone="gold">10:24</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {successMetrics.map((metric) => (
          <div key={metric.label} className="glass-card rounded-2xl p-6">
            <metric.icon className="text-amber-400" size={28} />
            <p className="mt-4 text-3xl font-bold text-white">{metric.value}</p>
            <p className="mt-1 text-slate-400">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* All Lessons */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Complete Training Library</h2>
            <p className="mt-1 text-slate-400">Master each topic to maximize your earnings</p>
          </div>
          <Badge tone="gold">{lessons.length} LESSONS</Badge>
        </div>

        <div className="mt-6 space-y-4">
          {lessons.map((lesson, idx) => (
            <div 
              key={lesson.id}
              className={`rounded-xl border p-5 transition hover:-translate-y-0.5 hover:border-amber-500/30 ${
                lesson.featured 
                  ? "border-amber-500/30 bg-amber-500/5" 
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  lesson.completed 
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}>
                  {lesson.completed ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <span className="text-xl font-bold">{idx + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                    {lesson.featured && <Badge tone="gold">START HERE</Badge>}
                  </div>
                  <p className="mt-1 text-slate-400">{lesson.description}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    <Zap size={14} className="inline mr-1 text-amber-400" />
                    {lesson.focus}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="flex items-center gap-1 text-sm text-slate-400">
                      <Clock size={14} />
                      {lesson.duration}
                    </p>
                  </div>
                  <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 transition hover:bg-amber-500/30">
                    <Play size={20} className="fill-current ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips by Platform */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📌</span>
            <h3 className="text-lg font-bold text-white">Pinterest Tips</h3>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              "Use vertical images (3:4 ratio)",
              "Add 3-5 relevant hashtags",
              "Keep titles under 100 characters",
              "Post between 8-11 PM",
              "Be consistent - daily posts win"
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <h3 className="text-lg font-bold text-white">Instagram Tips</h3>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              "Square images work best (1:1)",
              "Write engaging captions",
              "Use a mix of hashtag sizes",
              "Post during lunch or evening",
              "Engage with comments quickly"
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <h3 className="text-lg font-bold text-white">Earning Tips</h3>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              "Start with home office niche",
              "Use Amazon affiliate links",
              "Post 5-10 images per day",
              "Track what gets clicks",
              "Reinvest in more content"
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-money rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white lg:text-3xl">
          Ready to Start Earning?
        </h2>
        <p className="mt-3 text-lg text-slate-300">
          Watch the training, then create your first images. Most people earn within 3 days.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/image-forge"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-1"
          >
            <Zap size={20} />
            Create Your First Images
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
