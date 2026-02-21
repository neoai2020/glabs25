import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Play, CheckCircle2, Clock, Star, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const lessons = [
  { 
    id: 1, 
    title: "Getting Started: Your First $100", 
    duration: "12 min", 
    description: "Learn the complete system from start to finish",
    free: true
  },
  { 
    id: 2, 
    title: "Choosing Profitable Niches", 
    duration: "8 min", 
    description: "Which topics make the most money on Pinterest",
    free: true
  },
  { 
    id: 3, 
    title: "Creating Click-Worthy Images", 
    duration: "10 min", 
    description: "How to use the AI to create images that sell",
    free: true
  },
  { 
    id: 4, 
    title: "Pinterest Mastery", 
    duration: "15 min", 
    description: "Advanced strategies for maximum earnings",
    free: true
  },
  { 
    id: 5, 
    title: "Scaling to $1,000/Month", 
    duration: "18 min", 
    description: "How to multiply your earnings",
    free: true
  },
];

export default function AcademyPage() {
  return (
    <AppShell
      title="Success Academy"
      subtitle="Free training to help you earn more"
    >
      {/* Featured Video */}
      <div className="glass-gold rounded-3xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Video Section */}
          <div className="relative aspect-video lg:aspect-auto lg:min-h-[350px] bg-gradient-to-br from-amber-900/40 to-emerald-900/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20">
                <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping" />
                <Play size={40} className="text-white fill-white ml-2" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 video-overlay p-6">
              <Badge tone="success" size="md">START HERE</Badge>
              <p className="mt-3 text-xl font-bold text-white">Complete Beginner Training</p>
              <div className="mt-2 flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1"><Clock size={14} /> 12 minutes</span>
                <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> 4.9 rating</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
              </div>
              <span className="text-slate-400">2,847 members watched this week</span>
            </div>
            
            <h2 className="mt-4 text-3xl font-bold text-white">
              How to Make <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">$100 This Week</span>
            </h2>
            
            <p className="mt-4 text-lg text-slate-300">
              This video shows you exactly how the G-Labs 95 system works. Watch this first before you create any images.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                <span className="text-white">How to pick profitable niches</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                <span className="text-white">Creating images that get clicks</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                <span className="text-white">Publishing for maximum earnings</span>
              </div>
            </div>

            <button className="btn-premium mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-black">
              <Play size={20} className="fill-current" />
              Watch Training Now
            </button>
          </div>
        </div>
      </div>

      {/* More Lessons */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">All Training Videos</h2>
        <p className="text-slate-400 mt-1">Watch these to maximize your earnings</p>
        
        <div className="mt-6 space-y-3">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/8 hover:border-amber-500/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
                  <Play size={18} className="text-amber-400 fill-amber-400 ml-0.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{lesson.title}</h3>
                    {lesson.free && <Badge tone="success" size="sm">FREE</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{lesson.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock size={14} /> {lesson.duration}
                </span>
                <ArrowRight className="text-slate-500" size={18} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-lg text-slate-300">Ready to start earning?</p>
        <Link
          href="/image-forge"
          className="btn-premium mt-4 inline-flex items-center gap-3 rounded-xl px-10 py-5 text-xl font-bold text-black"
        >
          <Sparkles size={24} />
          Create Your First Image
          <ArrowRight size={24} />
        </Link>
      </div>
    </AppShell>
  );
}
