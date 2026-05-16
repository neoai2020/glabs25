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
  ChevronRight,
  HelpCircle,
  Wand2,
  DollarSign,
  Rocket,
  Gem,
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
        a: "G-Labs 95 is an AI-powered income system that helps you earn money online by creating stunning AI-generated images, attaching your affiliate link, and publishing them on social media platforms like Pinterest, Instagram, TikTok, and Facebook. Over 12,400 members are actively earning with the platform.",
      },
      {
        q: "Do I need any technical skills or experience?",
        a: "Absolutely not. G-Labs 95 is designed to be beginner-friendly. The AI does the heavy lifting — you just pick a topic, click a button, and the system creates professional images for you. If you can browse the internet and click buttons, you can use G-Labs 95.",
      },
      {
        q: "How does the 3-step system work?",
        a: "Step 1: Go to \"AI Profit Machine\" and pick a money-making niche — the AI creates beautiful images for you. Step 2: Go to \"Money Links\" and save your affiliate link (from Amazon, Etsy, etc.). Step 3: Go to \"Cash Out\" and follow the step-by-step instructions to post your images on Pinterest or other platforms with your affiliate link. When people click your link and buy, you earn a commission.",
      },
      {
        q: "How quickly can I start making money?",
        a: "Most members see their first earnings within 3–7 days of consistent posting. Some see results even faster depending on the niche they choose and how many images they publish. The key is consistency — post 5–10 images per day for best results.",
      },
      {
        q: "Where do I start after signing up?",
        a: "Start by watching the training videos on this page — they cover every feature in under 5 minutes total. Then head to the Wealth Dashboard and click \"Start Your Income Journey\" to take the guided tour. It walks you through creating your first image, adding your money link, and publishing.",
      },
      {
        q: "Is G-Labs 95 free to use?",
        a: "G-Labs 95 is available to all members. The AI image generation, Money Links manager, Cash Out publishing guides, and all training videos are included. Premium upgrades (DFY Images, Instant Income, Autopilot Traffic) are also available inside the platform.",
      },
    ],
  },
  {
    id: "ai-profit-machine",
    title: "AI Profit Machine (Image Creation)",
    icon: <Wand2 size={20} />,
    tone: "success",
    faqs: [
      {
        q: "How do I create AI images?",
        a: "Go to \"AI Profit Machine\" from the sidebar. Pick one of 8 money-making niches (Home & Living, Beauty, Fashion, etc.), then select an AI-recommended image idea. Click \"Generate Money-Making Image\" and the AI creates a professional, click-worthy image in seconds.",
      },
      {
        q: "What niches are available?",
        a: "There are 8 proven niches: Home & Living ($89/day avg), Beauty & Skincare ($127/day avg), Kitchen & Cooking ($76/day avg), Fashion & Style ($94/day avg), Baby & Kids ($112/day avg), Health & Fitness ($98/day avg), Tech & Gadgets ($83/day avg), and Garden & Outdoor ($71/day avg).",
      },
      {
        q: "How many images can I generate?",
        a: "You can generate as many images as you want — there's no daily cap. We recommend creating multiple images across your chosen niches and posting them consistently for maximum earnings.",
      },
      {
        q: "Can I download my generated images?",
        a: "Yes! Once your image is generated, click the \"Download Image\" button below it. You can also view all your previously generated images in the \"Cash Out\" section under \"Your Images Ready to Post.\"",
      },
      {
        q: "What if the image generation fails or takes too long?",
        a: "If an error occurs you'll see a \"Try Again\" button — just click it to re-generate. Occasionally the AI takes longer than expected; a retry usually works on the second attempt. If the issue persists, check your internet connection or contact support via Live Chat.",
      },
      {
        q: "Do I need to write my own prompts?",
        a: "No. G-Labs 95 provides AI-recommended image ideas for every niche that are already optimized for clicks and engagement. Just pick one and click generate — the AI handles composition, lighting, and styling automatically.",
      },
    ],
  },
  {
    id: "money-links",
    title: "Money Links (Affiliate Links)",
    icon: <DollarSign size={20} />,
    tone: "gold",
    faqs: [
      {
        q: "What is an affiliate link?",
        a: "An affiliate link is a special URL that tracks when someone buys a product through your recommendation. When you share an image on Pinterest with your affiliate link and someone clicks it and makes a purchase, you earn a commission — usually 3–10% of the sale. The commission is paid by the company, not the buyer.",
      },
      {
        q: "Where do I get an affiliate link?",
        a: "Sign up for free with any of these programs: Amazon Associates (1–10% commission), Etsy Affiliates (4–8%), Walmart Affiliates (1–4%), or ShareASale (5–50% on thousands of brands). The Money Links page has direct sign-up links for each program.",
      },
      {
        q: "How do I add my affiliate link to G-Labs 95?",
        a: "Go to \"Money Links\" in the sidebar. Click the \"Add Link\" button, give it a name (e.g., \"My Amazon Link\"), paste your affiliate URL, and click Save. The link marked as \"Active\" (green badge) is the one that shows up automatically when you go to publish.",
      },
      {
        q: "Can I save multiple affiliate links?",
        a: "Yes! Add as many links as you want. Use the star icon to set which one is your default (active) link. You can copy, switch between, or delete links at any time from the Money Links page.",
      },
      {
        q: "Do I need an affiliate link to use G-Labs 95?",
        a: "You can create images without one, but to actually earn money you'll need an affiliate link. It's completely free to sign up for programs like Amazon Associates, and the Money Links page walks you through it step by step.",
      },
      {
        q: "Does the buyer pay more when using my affiliate link?",
        a: "No. The price is exactly the same for the buyer whether they use your link or not. The commission comes from the company's marketing budget, not the customer.",
      },
    ],
  },
  {
    id: "cash-out",
    title: "Cash Out (Publishing & Earning)",
    icon: <Rocket size={20} />,
    tone: "success",
    faqs: [
      {
        q: "How do I post my images and start earning?",
        a: "Go to \"Cash Out\" from the sidebar. Choose a platform (Pinterest is recommended for beginners), then follow the numbered step-by-step instructions. We provide ready-to-paste captions with hashtags and your affiliate link is ready to copy. Each post takes about 2 minutes.",
      },
      {
        q: "Which platform should I start with?",
        a: "Pinterest is the #1 recommended platform. You don't need any followers — your pins get discovered through search. Pins stay visible for months or even years, and the earning potential is $50–$200/day. After Pinterest, Instagram and TikTok are great additions.",
      },
      {
        q: "How many images should I post per day?",
        a: "For best results, post 5–10 images per day on Pinterest. Consistency is the key — members who post daily see significantly higher earnings than those who post on and off. Even 5 pins a day builds serious passive income over time.",
      },
      {
        q: "Do I need a large following to earn money?",
        a: "No! That's the beauty of Pinterest — your pins are discovered through search, not your follower count. Brand-new accounts with zero followers can get thousands of views and clicks. The images and keywords do the work for you.",
      },
      {
        q: "What about captions and hashtags?",
        a: "We provide ready-made captions with relevant hashtags for every platform (Pinterest, Instagram, TikTok, Facebook). Just select your platform in Cash Out, copy the pre-written caption, and paste it when you create your post. No writing or creativity required.",
      },
      {
        q: "Can I post on multiple platforms at once?",
        a: "Yes! The Cash Out page has step-by-step guides for Pinterest, Instagram, TikTok, and Facebook. Posting the same image across multiple platforms multiplies your earning potential without any extra image creation work.",
      },
      {
        q: "When is the best time to post?",
        a: "For Pinterest, the best times are 8–11pm EST. For Instagram, try 11am–1pm and 7–9pm. For TikTok, evenings tend to perform best. Consistency matters more than perfect timing — just pick a schedule and stick with it.",
      },
    ],
  },
  {
    id: "premium",
    title: "Premium Upgrades",
    icon: <Gem size={20} />,
    tone: "gold",
    faqs: [
      {
        q: "What Premium features are available?",
        a: "G-Labs 95 includes three Premium upgrades: DFY Images (100 pre-built prompts across 10 niches for one-click image generation), Instant Income (copy-paste Facebook posts proven to earn $50–$500/day), and Autopilot Traffic (60+ free traffic sources with step-by-step posting instructions for passive income).",
      },
      {
        q: "What is DFY Images?",
        a: "DFY (Done For You) Images gives you 100 professionally crafted prompts across 10 niches including Home & Living, Beauty, Kitchen, Fashion, Baby, Fitness, Tech, Garden, Pets, and Office. Each prompt is optimized for maximum clicks. Pick a niche, browse prompts, and click generate — even simpler than the main AI Profit Machine.",
      },
      {
        q: "What is Instant Income?",
        a: "Instant Income provides dozens of ready-to-post Facebook posts across niches like Weight Loss, Make Money Online, Beauty, Tech, Pets, Home & Garden, and more. Each post shows estimated earnings ($50–$500). Copy the post, replace [LINK] with your affiliate link, paste it into Facebook groups, and start earning — no images needed.",
      },
      {
        q: "What is Autopilot Traffic?",
        a: "Autopilot Traffic is a library of 60+ free traffic sources — forums, social platforms, Q&A sites, directories, and blogs — organized by niche. Each source includes step-by-step instructions, a ready-to-post description, estimated traffic potential, and time to complete. Post your link once and it can send you traffic for months or years.",
      },
      {
        q: "How do I access the Premium features?",
        a: "Look for the \"Premium Upgrades\" section in the sidebar. You'll find DFY Images, Instant Income, and Autopilot listed there. Each one has its own dedicated page with everything you need to get started.",
      },
    ],
  },
  {
    id: "earnings",
    title: "Earnings & Payments",
    icon: <DollarSign size={20} />,
    tone: "success",
    faqs: [
      {
        q: "How much can I realistically earn?",
        a: "The average G-Labs 95 member earns about $214/day. Top earners make $500–$1,000+ per day. Your earnings depend on how consistently you post, which niches you choose, and how many platforms you use. Members who complete all training and follow the system consistently earn 3x more on average.",
      },
      {
        q: "How and when do I get paid?",
        a: "Your affiliate programs pay you directly — G-Labs 95 does not process payments. Amazon Associates pays monthly via direct bank deposit or Amazon gift card. Most programs have a minimum payout threshold (e.g., $10 for Amazon). Each program has its own payment schedule.",
      },
      {
        q: "Is there a cost to join affiliate programs?",
        a: "No. All major affiliate programs — Amazon Associates, Etsy Affiliates, Walmart Affiliates, ShareASale — are completely free to join. You never pay to earn commissions.",
      },
      {
        q: "Why do some niches earn more than others?",
        a: "Earnings vary based on product prices, commission rates, and audience demand. Beauty & Skincare and Baby & Kids tend to earn more because the products have higher price points and strong buyer intent on platforms like Pinterest. Experiment with a couple niches to see what works best for you.",
      },
      {
        q: "How long before I see my first earnings?",
        a: "Most members see their first commissions within 3–7 days of consistent posting. Pinterest pins can take 1–3 days to get indexed by search. After that, your earnings grow as you post more content. Many members report that their income snowballs after the first 2–3 weeks.",
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
        a: "Click \"My Account\" in the sidebar to view your profile, email, membership status, and subscription details. You can also sign out from there.",
      },
      {
        q: "How do I contact support?",
        a: "Go to the Help Center from the sidebar, or click the \"Need Help?\" card at the bottom of the sidebar on any page. You can reach us via Live Chat (available now) or email at support@glabs95.com (replies within 2–4 hours).",
      },
      {
        q: "I forgot my password — what do I do?",
        a: "On the login page, click the \"Forgot password?\" link below the sign-in form. Enter your email and we'll send a reset link. Check your spam/junk folder if you don't see it within a few minutes.",
      },
      {
        q: "Can I use G-Labs 95 on my phone or tablet?",
        a: "Yes! G-Labs 95 is fully responsive and works on phones, tablets, and desktops. You can create images, manage links, and access all features from any device with a web browser.",
      },
      {
        q: "Where can I find the training videos?",
        a: "You're on the right page! All training videos are listed above — scroll up to the video grid. There are videos covering every core feature and premium upgrade. Watch them all for the best results.",
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
        q: "My image generation isn't working — what should I do?",
        a: "First, click \"Try Again.\" If it still fails, refresh the page and try a different prompt. Check your internet connection if the issue persists. You can also contact support via Live Chat for immediate help.",
      },
      {
        q: "I posted on Pinterest but I'm not getting clicks yet.",
        a: "Pinterest takes time to index new pins — it's normal for them to take 1–7 days to appear in search results. Keep posting consistently (5–10 pins/day), use the AI-provided hashtags, and pin at peak hours (8–11pm EST). Results compound over time, so don't give up after a day or two.",
      },
      {
        q: "My affiliate link isn't showing up in Cash Out.",
        a: "Make sure you've saved a link in the \"Money Links\" section and that it's marked as \"Active\" (green badge). Go to Money Links, check your saved links, and click the star icon on the one you want to use. Then go back to Cash Out — it should appear.",
      },
      {
        q: "I can't see my previously generated images.",
        a: "Your images are stored locally in your browser. If you cleared your browser data or switched browsers/devices, they may not appear. Always download your images right after generating them to keep a permanent copy. Going forward, download each image as soon as it's created.",
      },
      {
        q: "The page looks broken or isn't loading properly.",
        a: "Try these steps in order: 1) Refresh the page. 2) Clear your browser cache. 3) Try a different browser (Chrome is recommended). 4) Disable any browser extensions that might interfere. If the problem continues, contact support with a screenshot and we'll help immediately.",
      },
      {
        q: "I'm posting consistently but earnings are low — what can I improve?",
        a: "Try these tips: Switch to a higher-earning niche (Beauty, Baby & Kids). Make sure your affiliate link is actually attached to every post. Post at peak times. Use all the hashtags we provide. Try posting on multiple platforms, not just one. And check the \"Tips for Success\" in the Help Center for more strategies.",
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
      subtitle="Watch these tutorials to master every feature of G-Labs 95"
      showBanner={false}
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

      {/* ── FAQ SECTION ── */}
      <div id="faq-section" className="glass-gold rounded-3xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20">
            <HelpCircle className="text-amber-400" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-lg text-slate-300">
              Everything you need to know about G-Labs 95 — from getting started to maximizing your earnings.
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
          Our support team is available to help you succeed. Reach out anytime.
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
