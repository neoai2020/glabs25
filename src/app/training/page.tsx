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
  ChevronRight,
  HelpCircle,
  Wand2,
  Link as LinkIcon,
  Rocket,
  User,
  AlertCircle,
  Shield,
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
    title: "Image Forge",
    description:
      "How to create AI images. Pick a niche, choose a prompt, and generate.",
    vimeoId: "1172180061",
    duration: "0:53",
    category: "Core Feature",
  },
  {
    id: "t2",
    title: "Launchpad",
    description:
      "Step-by-step guide to publishing your images on Pinterest, Instagram, TikTok, and Facebook.",
    vimeoId: "1172184880",
    duration: "0:36",
    category: "Core Feature",
  },
  {
    id: "t3",
    title: "Affiliate Links",
    description:
      "How to get an affiliate link from Amazon, Etsy, or other programs and save it for reuse.",
    vimeoId: "1172187408",
    duration: "0:42",
    category: "Core Feature",
  },
];

const CATEGORIES = ["All", "Core Feature"];

const CATEGORY_TONE: Record<string, "default" | "success" | "warning" | "info" | "gold"> = {
  Basics: "info",
  "Core Feature": "success",
  Advanced: "warning",
};

type FaqItem = { q: string; a: string };
type FaqCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  tone: "gold" | "success" | "info" | "warning" | "default";
  faqs: FaqItem[];
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <Sparkles size={20} />,
    tone: "gold",
    faqs: [
      {
        q: "What is G-Labs 95?",
        a: "G-Labs 95 is an AI image creation and publishing studio. You can generate images with AI, save the destination links you want to attach to them, and follow guided publishing instructions for Pinterest, Instagram, TikTok, and Facebook.",
      },
      {
        q: "Do I need any technical skills or experience?",
        a: "No. G-Labs 95 is designed to be beginner-friendly. The AI handles image creation and the publishing guides walk you through every step.",
      },
      {
        q: "Where do I start after signing up?",
        a: "Start with the training videos on this page — they cover every core feature in a few minutes. Then head to the Dashboard and follow the quick links to Image Forge, Affiliate Links, and Launchpad.",
      },
      {
        q: "Is G-Labs 95 free to use?",
        a: "G-Labs 95 is available to all members. AI image generation, the affiliate link manager, the Launchpad publishing guides, and all training videos are included.",
      },
    ],
  },
  {
    id: "image-forge",
    title: "Image Forge",
    icon: <Wand2 size={20} />,
    tone: "success",
    faqs: [
      {
        q: "How do I create AI images?",
        a: "Open Image Forge from the sidebar. Pick one of the niches, choose a suggested prompt, and click Generate. The AI returns a finished image in seconds.",
      },
      {
        q: "What niches are available?",
        a: "Eight niches: Home & Living, Beauty & Skincare, Kitchen & Cooking, Fashion & Style, Baby & Kids, Health & Fitness, Tech & Gadgets, and Garden & Outdoor.",
      },
      {
        q: "How many images can I generate?",
        a: "There is no daily cap — generate as many as you'd like.",
      },
      {
        q: "Can I download my generated images?",
        a: "Yes. Click the Download button under any generated image. You can also see all your previous images on the Launchpad page under \"Your Images Ready to Post.\"",
      },
      {
        q: "What if image generation fails or takes too long?",
        a: "Click \"Try Again\" — a retry usually works. If the problem continues, check your internet connection or contact support.",
      },
      {
        q: "Do I need to write my own prompts?",
        a: "No. Image Forge provides suggested prompts for every niche. Just pick one and generate.",
      },
    ],
  },
  {
    id: "affiliate-links",
    title: "Affiliate Links",
    icon: <LinkIcon size={20} />,
    tone: "info",
    faqs: [
      {
        q: "What is an affiliate link?",
        a: "An affiliate link is a destination URL provided by an affiliate program that identifies you as the referrer. You attach it to images you publish so readers can be sent to the right place.",
      },
      {
        q: "Where do I get an affiliate link?",
        a: "Apply to a program such as Amazon Associates, Etsy Affiliates, Walmart Affiliates, or ShareASale. The Affiliate Links page has links to each program's sign-up.",
      },
      {
        q: "How do I add my affiliate link to G-Labs 95?",
        a: "Go to Affiliate Links in the sidebar, click Add Link, give it a name, paste the URL, and save. Use the star icon to set which link is active.",
      },
      {
        q: "Can I save multiple affiliate links?",
        a: "Yes. Save as many as you want. Use the star icon to switch the active one. Copy or delete any link at any time.",
      },
    ],
  },
  {
    id: "launchpad",
    title: "Launchpad",
    icon: <Rocket size={20} />,
    tone: "success",
    faqs: [
      {
        q: "How do I post my images?",
        a: "Open Launchpad from the sidebar. Choose a platform (Pinterest is recommended for beginners), then follow the numbered step-by-step instructions. We provide ready-to-paste captions, and your active affiliate link is ready to copy.",
      },
      {
        q: "Which platform should I start with?",
        a: "Pinterest is recommended for beginners — pins are discovered through search and stay visible for a long time. After Pinterest, Instagram and TikTok are good additions.",
      },
      {
        q: "What about captions and hashtags?",
        a: "We provide ready-made captions with hashtags for every platform (Pinterest, Instagram, TikTok, Facebook). Pick a platform in Launchpad, copy the caption, and paste it when you publish.",
      },
      {
        q: "Can I post on multiple platforms?",
        a: "Yes. Launchpad has guides for Pinterest, Instagram, TikTok, and Facebook. The same image can be published across multiple platforms.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Support",
    icon: <User size={20} />,
    tone: "info",
    faqs: [
      {
        q: "How do I manage my account?",
        a: "Click \"My Account\" in the sidebar to view your profile, email, and sign out.",
      },
      {
        q: "How do I contact support?",
        a: "Open the Help Center from the sidebar, or click the \"Need Help?\" card at the bottom of the sidebar.",
      },
      {
        q: "I forgot my password — what do I do?",
        a: "On the login page, click \"Forgot password?\", enter your email, and we'll send a reset link.",
      },
      {
        q: "Can I use G-Labs 95 on my phone or tablet?",
        a: "Yes. G-Labs 95 is responsive and works on phones, tablets, and desktops.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: <AlertCircle size={20} />,
    tone: "warning",
    faqs: [
      {
        q: "My image generation isn't working.",
        a: "Click \"Try Again.\" If it still fails, refresh the page and try a different prompt. Contact support if the problem persists.",
      },
      {
        q: "My affiliate link isn't showing up in Launchpad.",
        a: "Make sure you've saved a link in Affiliate Links and that it's marked as Active (green badge). Click the star icon on the link you want to use.",
      },
      {
        q: "I can't see my previously generated images.",
        a: "Images are stored in your browser. If you cleared browser data or switched browsers/devices, they may not appear. Always download your images right after generating them.",
      },
      {
        q: "The page looks broken or isn't loading properly.",
        a: "Try refreshing the page, clearing your browser cache, or using a different browser (Chrome is recommended). If the problem continues, contact support.",
      },
    ],
  },
];

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
      subtitle="Short walkthroughs of every G-Labs 95 feature."
    >
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
              <CheckCircle2 className="text-emerald-400" size={24} />
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

      {/* ── FAQ SECTION ── */}
      <div id="faq-section" className="glass-card rounded-3xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20">
            <HelpCircle className="text-amber-400" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-300">
              Everything you need to know about G-Labs 95.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ quick-jump pills */}
      <div className="flex flex-wrap gap-2">
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              document.getElementById(`faq-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-amber-500/30 hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">{cat.icon}</span>
            {cat.title}
          </button>
        ))}
      </div>

      {/* FAQ accordion groups */}
      {FAQ_CATEGORIES.map((cat) => (
        <div key={cat.id} id={`faq-${cat.id}`} className="glass-card rounded-3xl p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              cat.tone === "gold"    ? "bg-amber-500/20 text-amber-400" :
              cat.tone === "success" ? "bg-emerald-500/20 text-emerald-400" :
              cat.tone === "info"    ? "bg-blue-500/20 text-blue-400" :
              cat.tone === "warning" ? "bg-orange-500/20 text-orange-400" :
              "bg-white/10 text-white"
            }`}>
              {cat.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{cat.title}</h3>
              <p className="text-sm text-slate-400">{cat.faqs.length} questions</p>
            </div>
          </div>

          <div className="space-y-3">
            {cat.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-white/10 bg-white/5">
                <summary className="flex cursor-pointer items-center justify-between p-5">
                  <span className="pr-4 font-medium text-white">{faq.q}</span>
                  <ChevronRight size={20} className="shrink-0 text-slate-500 transition group-open:rotate-90" />
                </summary>
                <div className="border-t border-white/5 px-5 py-4">
                  <p className="leading-relaxed text-slate-300">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}

      {/* Still have questions */}
      <div className="glass-card rounded-3xl p-8 text-center">
        <Shield size={32} className="mx-auto text-blue-400" />
        <h2 className="mt-4 text-xl font-bold text-white">Still Have Questions?</h2>
        <p className="mx-auto mt-2 max-w-md text-slate-300">
          Our support team is available to help. Reach out anytime.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="#support"
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            <HelpCircle size={18} />
            Live Chat Support
          </a>
          <a
            href="mailto:support@glabs95.com"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Email Support
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Bottom CTA */}
      {watchedIds.size < TUTORIALS.length && (
        <div className="glass-card rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Keep going</h2>
          <p className="mx-auto mt-2 max-w-lg text-slate-300">
            Watch the rest of the videos to get familiar with every feature.
          </p>
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
        </div>
      )}
    </AppShell>
  );
}
