"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import {
  Play,
  MonitorPlay,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Star,
} from "lucide-react";

type Tutorial = {
  id: string;
  title: string;
  description: string;
  vimeoId: string;
  duration: string;
  category: string;
};

const TUTORIALS: Tutorial[] = [
  {
    id: "t1",
    title: "AI Profit Machine",
    description:
      "How to create stunning AI images that get clicks and earn commissions. Pick a niche, generate, and publish.",
    vimeoId: "1172180061",
    duration: "0:53",
    category: "Core Feature",
  },
  {
    id: "t2",
    title: "Cash Out",
    description:
      "Step-by-step guide to publishing your images on Pinterest, Instagram, TikTok, and Facebook for maximum earnings.",
    vimeoId: "1172184880",
    duration: "0:36",
    category: "Core Feature",
  },
  {
    id: "t3",
    title: "Money Links",
    description:
      "How to get your affiliate link from Amazon, Etsy, or DigiStore24 and save it to your account for easy reuse.",
    vimeoId: "1172187408",
    duration: "0:42",
    category: "Core Feature",
  },
  {
    id: "t4",
    title: "Instant Income",
    description:
      "Copy-paste Facebook posts that earn. Learn how to pick a niche, add your link, and start posting today.",
    vimeoId: "1172195557",
    duration: "1:05",
    category: "Premium",
  },
  {
    id: "t5",
    title: "Autopilot Traffic",
    description:
      "How to post your link to 60+ free traffic sources and build passive traffic that flows forever.",
    vimeoId: "1172198089",
    duration: "1:12",
    category: "Premium",
  },
  {
    id: "t6",
    title: "DFY Image Vault",
    description:
      "How to use 100 pre-built prompts across 10 niches to generate money-making images with one click.",
    vimeoId: "1172202709",
    duration: "0:48",
    category: "Premium",
  },
];

const CATEGORIES = ["All", "Core Feature", "Premium"];

const CATEGORY_TONE: Record<string, "default" | "success" | "warning" | "info" | "gold"> = {
  Basics: "info",
  "Core Feature": "success",
  Premium: "gold",
  Advanced: "warning",
};

export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set());

  const filtered =
    activeCategory === "All"
      ? TUTORIALS
      : TUTORIALS.filter((t) => t.category === activeCategory);

  const toggleWatched = (id: string) => {
    setWatchedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AppShell
      title="Training"
      subtitle="Watch these tutorials to master every feature of G-Labs 95"
    >
      {/* Promo banner */}
      <div className="glass-gold rounded-3xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20">
            <Sparkles className="text-amber-400" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Want To Multiply Your Earnings To{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
                $1,000 - $5,000 A Day?
              </span>
            </h2>
            <p className="mt-3 text-lg text-slate-300">
              G-Labs 95 is powerful, but if you want to scale to truly life-changing income, you need
              to watch this training which shows how to automate your entire workflow. And guess what?
            </p>
            <p className="mt-2 text-emerald-400 font-semibold">
              This training is free for all G-Labs members. Unlock your full potential below.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("training-videos");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-premium mt-5 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-black"
            >
              Start Watching Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
              <MonitorPlay className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">{TUTORIALS.length}</p>
              <p className="text-sm text-slate-400">TOTAL VIDEOS</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
              <Star className="text-emerald-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">All Features</p>
              <p className="text-sm text-slate-400">COVERED</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="glass-card rounded-xl p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Progress: <span className="font-bold text-white">{watchedIds.size}</span> of{" "}
            <span className="font-bold text-white">{TUTORIALS.length}</span> watched
          </span>
          <span className="font-bold text-amber-400">
            {Math.round((watchedIds.size / TUTORIALS.length) * 100)}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/5">
          <div
            className="btn-premium h-full rounded-full transition-all duration-500"
            style={{ width: `${(watchedIds.size / TUTORIALS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeCategory === cat
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                : "border border-white/10 bg-white/5 text-slate-300 hover:border-amber-500/30 hover:bg-white/10"
            }`}
          >
            {cat}
            <span className="ml-2 text-xs opacity-70">
              ({cat === "All" ? TUTORIALS.length : TUTORIALS.filter((t) => t.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div id="training-videos" className="grid gap-6 sm:grid-cols-2">
        {filtered.map((tutorial) => {
          const isWatched = watchedIds.has(tutorial.id);
          const tone = CATEGORY_TONE[tutorial.category] ?? "default";

          return (
            <div
              key={tutorial.id}
              className={`glass-card overflow-hidden rounded-2xl transition-all ${
                isWatched ? "border-emerald-500/30" : ""
              }`}
            >
              {/* Video embed */}
              <div className="relative" style={{ padding: "56.25% 0 0 0" }}>
                <iframe
                  src={`https://player.vimeo.com/video/${tutorial.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  title={tutorial.title}
                />
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{tutorial.title}</h3>
                  <Badge tone={tone} size="sm">
                    {tutorial.category}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {tutorial.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Play size={12} />
                    {tutorial.duration}
                  </div>
                  <button
                    onClick={() => toggleWatched(tutorial.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isWatched
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {isWatched ? "Watched" : "Mark as Watched"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="glass-money rounded-3xl p-8 text-center">
        <BookOpen size={32} className="mx-auto text-emerald-400" />
        <h2 className="mt-4 text-2xl font-bold text-white">
          Knowledge = Earnings
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-slate-300">
          Members who complete all training videos earn 3x more on average.
          Watch every video to maximize your income potential.
        </p>
        {watchedIds.size < TUTORIALS.length && (
          <button
            onClick={() => {
              const el = document.getElementById("training-videos");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-premium mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-black"
          >
            Continue Watching
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </AppShell>
  );
}
