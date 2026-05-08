"use client";

import Link from "next/link";
import {
  Wand2,
  Link as LinkIcon,
  Image as ImageIcon,
  Send,
  CalendarClock,
  GraduationCap,
  ArrowRight,
  Play,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

const quickLinks = [
  {
    href: "/image-forge",
    icon: Wand2,
    title: "Image Forge",
    description: "Generate new AI images from a prompt or preset.",
  },
  {
    href: "/monetization/link-vault",
    icon: LinkIcon,
    title: "Affiliate Links",
    description: "Manage the destination links you attach to images.",
  },
  {
    href: "/monetization/library",
    icon: ImageIcon,
    title: "Library",
    description: "Browse, tag, and reuse images you've already created.",
  },
  {
    href: "/launchpad",
    icon: Send,
    title: "Launchpad",
    description: "Publish images to Pinterest, Instagram, and stock.",
  },
  {
    href: "/scheduler",
    icon: CalendarClock,
    title: "Scheduler",
    description: "Review your publish queue, retries, and history.",
  },
  {
    href: "/training",
    icon: GraduationCap,
    title: "Training",
    description: "Short walkthroughs of each feature.",
  },
];

export default function Home() {
  return (
    <AppShell title="Welcome to G-Labs 95" subtitle="AI image generation and publishing studio.">
      {/* Featured Video */}
      <div className="glass-card rounded-3xl p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
            <Play className="text-amber-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">See How It Works</h2>
          <p className="mt-2 text-slate-400">
            A short overview of the G-Labs 95 image and publishing tools.
          </p>
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

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-400">{item.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-300 transition group-hover:text-white">
                Open
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
