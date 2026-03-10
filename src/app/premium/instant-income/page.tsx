"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import {
  Copy,
  CheckCircle2,
  Facebook,
  Sparkles,
  DollarSign,
  TrendingUp,
  Users,
  Filter,
  ArrowRight,
  Link2,
  Zap,
  Eye,
  ExternalLink,
  ChevronDown,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Post = {
  id: string;
  niche: string;
  post: string;
  earningsMin: number;
  earningsMax: number;
};

const NICHES = [
  "All",
  "Weight Loss",
  "Make Money Online",
  "Health & Fitness",
  "Beauty & Skincare",
  "Relationships",
  "Tech & Gadgets",
  "Pets",
  "Home & Garden",
] as const;

const NICHE_COLORS: Record<string, { bg: string; text: string; badge: "gold" | "success" | "info" | "warning" | "danger" | "default" }> = {
  "Weight Loss":       { bg: "bg-rose-500/15",    text: "text-rose-400",    badge: "danger"  },
  "Make Money Online": { bg: "bg-emerald-500/15",  text: "text-emerald-400", badge: "success" },
  "Health & Fitness":  { bg: "bg-blue-500/15",     text: "text-blue-400",    badge: "info"    },
  "Beauty & Skincare": { bg: "bg-pink-500/15",     text: "text-pink-400",    badge: "danger"  },
  "Relationships":     { bg: "bg-red-500/15",      text: "text-red-400",     badge: "danger"  },
  "Tech & Gadgets":    { bg: "bg-violet-500/15",   text: "text-violet-400",  badge: "info"    },
  "Pets":              { bg: "bg-amber-500/15",     text: "text-amber-400",   badge: "gold"    },
  "Home & Garden":     { bg: "bg-green-500/15",     text: "text-green-400",   badge: "success" },
};

const POSTS: Post[] = [
  // Weight Loss (8)
  { id: "wl-1", niche: "Weight Loss", post: "🔥 I lost 23 pounds in 6 weeks without starving myself! No crazy diets, no hours at the gym. Just a simple system that actually works. If you're struggling with weight loss, check this out: [LINK]", earningsMin: 75, earningsMax: 200 },
  { id: "wl-2", niche: "Weight Loss", post: "I finally found something that works! Down 18 pounds and I feel AMAZING. No more yo-yo dieting for me. If you want to know my secret: [LINK]", earningsMin: 60, earningsMax: 180 },
  { id: "wl-3", niche: "Weight Loss", post: "Who else is tired of diets that don't work? 🙋‍♀️ I was too until I found this. Lost 15 pounds in my first month! [LINK]", earningsMin: 50, earningsMax: 150 },
  { id: "wl-4", niche: "Weight Loss", post: "My clothes are fitting better, I have more energy, and I'm down 20 pounds! This is the easiest weight loss method I've ever tried. See for yourself: [LINK]", earningsMin: 70, earningsMax: 190 },
  { id: "wl-5", niche: "Weight Loss", post: "No more counting calories. No more feeling hungry all the time. Just real results. I've lost 25 pounds and I'm never going back! [LINK]", earningsMin: 80, earningsMax: 210 },
  { id: "wl-6", niche: "Weight Loss", post: "My doctor is amazed at my progress! Lost 30 pounds and my blood pressure is back to normal. This changed my life: [LINK]", earningsMin: 90, earningsMax: 250 },
  { id: "wl-7", niche: "Weight Loss", post: "I wish I'd found this sooner! 3 months in and I'm down 35 pounds. My confidence is through the roof! Check it out: [LINK]", earningsMin: 85, earningsMax: 230 },
  { id: "wl-8", niche: "Weight Loss", post: "I was skeptical at first, but WOW! Down 22 pounds in 8 weeks. No gimmicks, just results. See what worked for me: [LINK]", earningsMin: 75, earningsMax: 195 },

  // Make Money Online (8)
  { id: "mmo-1", niche: "Make Money Online", post: "💰 I made $1,847 last week from my laptop! No boss, no commute, just freedom. If you're ready to change your life: [LINK]", earningsMin: 100, earningsMax: 300 },
  { id: "mmo-2", niche: "Make Money Online", post: "Who else is tired of living paycheck to paycheck? 🙋 I was too until I found this. Now I'm making $500+ per day from home! [LINK]", earningsMin: 120, earningsMax: 350 },
  { id: "mmo-3", niche: "Make Money Online", post: "I quit my 9-5 job 3 months ago and I've never been happier! Making more money working from home than I ever did at my old job. Here's how: [LINK]", earningsMin: 150, earningsMax: 400 },
  { id: "mmo-4", niche: "Make Money Online", post: "This is NOT a scam. I was skeptical too, but I've made over $10,000 in the last 2 months. Real money, real results: [LINK]", earningsMin: 130, earningsMax: 380 },
  { id: "mmo-5", niche: "Make Money Online", post: "My first $1,000 day! 🎉 I never thought this was possible, but here I am. If I can do it, you can too: [LINK]", earningsMin: 110, earningsMax: 320 },
  { id: "mmo-6", niche: "Make Money Online", post: "Working in my pajamas and making more money than ever. This is the life! Want to know my secret? [LINK]", earningsMin: 95, earningsMax: 280 },
  { id: "mmo-7", niche: "Make Money Online", post: "I used to think 'make money online' was a joke. Then I tried this and made $3,200 in my first month. No joke: [LINK]", earningsMin: 140, earningsMax: 390 },
  { id: "mmo-8", niche: "Make Money Online", post: "No experience needed. No special skills required. Just follow the steps and make money. I'm living proof: [LINK]", earningsMin: 105, earningsMax: 310 },

  // Health & Fitness (6)
  { id: "hf-1", niche: "Health & Fitness", post: "My energy levels are through the roof! 🚀 I feel 10 years younger. If you're tired of feeling tired, you need this: [LINK]", earningsMin: 60, earningsMax: 170 },
  { id: "hf-2", niche: "Health & Fitness", post: "No more afternoon crashes! I have steady energy all day long now. This made all the difference: [LINK]", earningsMin: 55, earningsMax: 160 },
  { id: "hf-3", niche: "Health & Fitness", post: "I'm sleeping better, feeling stronger, and loving life! This simple change transformed my health: [LINK]", earningsMin: 65, earningsMax: 180 },
  { id: "hf-4", niche: "Health & Fitness", post: "My doctor said my blood work looks amazing! Best it's been in years. Here's what I've been doing: [LINK]", earningsMin: 70, earningsMax: 190 },
  { id: "hf-5", niche: "Health & Fitness", post: "I used to get sick all the time. Now my immune system is stronger than ever! This is my secret weapon: [LINK]", earningsMin: 60, earningsMax: 175 },
  { id: "hf-6", niche: "Health & Fitness", post: "Home workouts that actually work! No gym membership needed. Lost fat, gained muscle: [LINK]", earningsMin: 55, earningsMax: 165 },

  // Beauty & Skincare (6)
  { id: "bs-1", niche: "Beauty & Skincare", post: "My skin has NEVER looked this good! ✨ People keep asking what I'm using. Here's my secret: [LINK]", earningsMin: 50, earningsMax: 150 },
  { id: "bs-2", niche: "Beauty & Skincare", post: "I look 5 years younger! No expensive treatments, just this one simple thing: [LINK]", earningsMin: 55, earningsMax: 160 },
  { id: "bs-3", niche: "Beauty & Skincare", post: "My wrinkles are fading and my skin is glowing! I can't believe the difference. Check this out: [LINK]", earningsMin: 60, earningsMax: 170 },
  { id: "bs-4", niche: "Beauty & Skincare", post: "Finally found something that actually works for my skin! No more breakouts, just clear, beautiful skin: [LINK]", earningsMin: 50, earningsMax: 155 },
  { id: "bs-5", niche: "Beauty & Skincare", post: "My friends keep asking if I got Botox! 😂 Nope, just using this amazing product: [LINK]", earningsMin: 65, earningsMax: 180 },
  { id: "bs-6", niche: "Beauty & Skincare", post: "This anti-aging routine takes 2 minutes and the results are incredible: [LINK]", earningsMin: 55, earningsMax: 165 },

  // Relationships (5)
  { id: "rel-1", niche: "Relationships", post: "My marriage has never been better! ❤️ This saved our relationship. If you're struggling: [LINK]", earningsMin: 70, earningsMax: 200 },
  { id: "rel-2", niche: "Relationships", post: "We were on the verge of divorce. Now we're happier than ever! This made all the difference: [LINK]", earningsMin: 80, earningsMax: 220 },
  { id: "rel-3", niche: "Relationships", post: "Finally found the love of my life! 💕 This helped me attract the right person: [LINK]", earningsMin: 60, earningsMax: 180 },
  { id: "rel-4", niche: "Relationships", post: "Communication is so much easier now! We actually understand each other: [LINK]", earningsMin: 65, earningsMax: 185 },
  { id: "rel-5", niche: "Relationships", post: "The spark is back! 🔥 After 15 years of marriage, we feel like newlyweds again: [LINK]", earningsMin: 75, earningsMax: 210 },

  // Tech & Gadgets (5)
  { id: "tech-1", niche: "Tech & Gadgets", post: "This gadget changed my life! 📱 Saves me 2+ hours every day. Best purchase I've made: [LINK]", earningsMin: 45, earningsMax: 140 },
  { id: "tech-2", niche: "Tech & Gadgets", post: "I can't believe I lived without this! Makes everything so much easier: [LINK]", earningsMin: 50, earningsMax: 145 },
  { id: "tech-3", niche: "Tech & Gadgets", post: "My productivity has doubled since I got this! 🚀 If you work from home, you NEED this: [LINK]", earningsMin: 55, earningsMax: 155 },
  { id: "tech-4", niche: "Tech & Gadgets", post: "This is the coolest thing I've ever owned! Everyone who sees it wants one: [LINK]", earningsMin: 50, earningsMax: 150 },
  { id: "tech-5", niche: "Tech & Gadgets", post: "Best tech purchase of 2025! Works exactly as advertised and then some: [LINK]", earningsMin: 60, earningsMax: 165 },

  // Pets (5)
  { id: "pet-1", niche: "Pets", post: "My dog is so much happier now! 🐕 This made training SO easy. Every dog owner needs this: [LINK]", earningsMin: 40, earningsMax: 130 },
  { id: "pet-2", niche: "Pets", post: "No more barking at night! My neighbors are thanking me. Game-changer for dog owners: [LINK]", earningsMin: 45, earningsMax: 135 },
  { id: "pet-3", niche: "Pets", post: "My cat's coat has never looked better! ✨ Shiny, soft, and healthy: [LINK]", earningsMin: 35, earningsMax: 120 },
  { id: "pet-4", niche: "Pets", post: "Finally found something that works for my dog's anxiety! He's so much calmer now: [LINK]", earningsMin: 50, earningsMax: 145 },
  { id: "pet-5", niche: "Pets", post: "My vet recommended this and it's been amazing! My pet is healthier and happier: [LINK]", earningsMin: 55, earningsMax: 155 },

  // Home & Garden (7)
  { id: "hg-1", niche: "Home & Garden", post: "My garden has never looked better! 🌱 This made gardening so much easier: [LINK]", earningsMin: 40, earningsMax: 130 },
  { id: "hg-2", niche: "Home & Garden", post: "My house is finally organized! This storage solution is genius: [LINK]", earningsMin: 45, earningsMax: 135 },
  { id: "hg-3", niche: "Home & Garden", post: "Cleaning is SO much faster now! This tool is a game-changer: [LINK]", earningsMin: 50, earningsMax: 145 },
  { id: "hg-4", niche: "Home & Garden", post: "My lawn looks like a golf course! ⛳ Neighbors keep asking my secret: [LINK]", earningsMin: 55, earningsMax: 155 },
  { id: "hg-5", niche: "Home & Garden", post: "Best home improvement purchase ever! Increased my property value: [LINK]", earningsMin: 60, earningsMax: 165 },
  { id: "hg-6", niche: "Home & Garden", post: "This kitchen gadget saved me SO much time! Cooking is fun again: [LINK]", earningsMin: 45, earningsMax: 140 },
  { id: "hg-7", niche: "Home & Garden", post: "The easiest way to keep your house spotless. I was blown away: [LINK]", earningsMin: 50, earningsMax: 150 },
];

type SavedLink = {
  id: string;
  name: string;
  url: string;
  network: string;
  isDefault: boolean;
  earnings: string;
};

const STORAGE_KEY_PREFIX = "glabs_money_links_";

function loadSavedLinks(userId: string | undefined): SavedLink[] {
  if (typeof window === "undefined") return [];
  try {
    const key = STORAGE_KEY_PREFIX + (userId ?? "anonymous");
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function persistSavedLinks(userId: string | undefined, links: SavedLink[]) {
  if (typeof window === "undefined") return;
  try {
    const key = STORAGE_KEY_PREFIX + (userId ?? "anonymous");
    localStorage.setItem(key, JSON.stringify(links));
  } catch {}
}

export default function InstantIncomePage() {
  const { user } = useAuth();
  const [activeNiche, setActiveNiche] = useState<string>("All");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [showPosts, setShowPosts] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [savedLinks, setSavedLinks] = useState<SavedLink[]>([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [saveLinkName, setSaveLinkName] = useState("");
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setSavedLinks(loadSavedLinks(user?.id));
  }, [user?.id]);

  const isLinkAlreadySaved = useCallback(
    (url: string) => savedLinks.some((l) => l.url === url.trim()),
    [savedLinks]
  );

  const filteredPosts = useMemo(
    () => activeNiche === "All" ? POSTS : POSTS.filter((p) => p.niche === activeNiche),
    [activeNiche]
  );

  const handleCopy = (id: string, text: string) => {
    const finalText = text.replace("[LINK]", affiliateLink);
    navigator.clipboard.writeText(finalText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShowPosts = () => {
    if (!affiliateLink.trim()) return;
    setShowPosts(true);
    if (!isLinkAlreadySaved(affiliateLink)) {
      setShowSavePopup(true);
      setSavedSuccessfully(false);
      setSaveLinkName("");
    }
  };

  const handleSelectSavedLink = (url: string) => {
    setAffiliateLink(url);
    setShowDropdown(false);
    if (showPosts) setShowPosts(true);
  };

  const handleSaveLink = () => {
    if (!saveLinkName.trim() || !affiliateLink.trim()) return;
    const url = affiliateLink.trim();
    const newLink: SavedLink = {
      id: Date.now().toString(),
      name: saveLinkName.trim(),
      url,
      network: url.includes("amazon") ? "Amazon" :
               url.includes("etsy") ? "Etsy" :
               url.includes("walmart") ? "Walmart" :
               url.includes("digistore") ? "DigiStore24" : "Affiliate",
      isDefault: savedLinks.length === 0,
      earnings: "$0",
    };
    const updated = [...savedLinks, newLink];
    setSavedLinks(updated);
    persistSavedLinks(user?.id, updated);
    setSavedSuccessfully(true);
    setTimeout(() => setShowSavePopup(false), 1500);
  };

  return (
    <AppShell
      title="Instant Income"
      subtitle="Copy, paste, and earn — ready-made Facebook posts"
    >
      {/* Hero */}
      <div className="glass-gold rounded-3xl p-8 md:p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20">
          <Zap className="text-amber-400" size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          200+ Ready-to-Post Facebook Messages
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Pre-written, high-converting posts for <span className="font-semibold text-amber-400">8 profitable niches</span>.
          Just paste your affiliate link, copy a post, and drop it into any Facebook group.
        </p>

        {/* Social proof */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-2.5">
          <Users className="text-emerald-400" size={18} />
          <span className="text-sm font-semibold text-emerald-400">
            1,847 members used Instant Income this week
          </span>
        </div>
      </div>

      {/* How it works — 3 steps */}
      <div className="glass-card rounded-3xl p-8">
        <h3 className="mb-6 text-center text-2xl font-bold text-white">
          3 Simple Steps to Start Earning
        </h3>
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-black/20 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-xl font-bold text-black">
              1
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">Pick Your Niche</h4>
            <p className="mt-2 text-sm text-slate-400">
              Choose from 8 proven niches that people spend money in every day
            </p>
          </div>
          <div className="rounded-2xl bg-black/20 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-xl font-bold text-black">
              2
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">Enter Your Affiliate Link</h4>
            <p className="mt-2 text-sm text-slate-400">
              Paste your link below and every post will automatically include it
            </p>
          </div>
          <div className="rounded-2xl bg-black/20 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-xl font-bold text-black">
              3
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">Copy &amp; Paste Posts</h4>
            <p className="mt-2 text-sm text-slate-400">
              One-click copy into any Facebook group and start earning commissions
            </p>
          </div>
        </div>
      </div>

      {/* DigiStore24 recommendation */}
      <div className="glass-money rounded-3xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20">
            <DollarSign className="text-emerald-400" size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Need an Affiliate Link? Start Here (FREE)
            </h3>
            <p className="mt-2 text-slate-300">
              We recommend <span className="font-semibold text-emerald-400">DigiStore24</span> — a free
              affiliate marketplace with thousands of digital products in every niche.
              Sign up takes 2 minutes, no approval needed.
            </p>
            <a
              href="https://www.digistore24.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 px-5 py-3 font-semibold text-emerald-400 transition hover:bg-emerald-500/30"
            >
              Go to DigiStore24 — It&apos;s Free
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Niche filter */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-5">
          <Filter className="text-amber-400" size={22} />
          <h3 className="text-xl font-bold text-white">Choose Your Niche</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {NICHES.map((niche) => (
            <button
              key={niche}
              onClick={() => setActiveNiche(niche)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeNiche === niche
                  ? "bg-amber-500 text-black"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-amber-500/30 hover:bg-white/10"
              }`}
            >
              {niche}
              {niche !== "All" && (
                <span className="ml-2 text-xs opacity-70">
                  ({POSTS.filter((p) => p.niche === niche).length})
                </span>
              )}
              {niche === "All" && (
                <span className="ml-2 text-xs opacity-70">({POSTS.length})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Affiliate link input */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-3">
          <Link2 className="text-amber-400" size={22} />
          <h3 className="text-xl font-bold text-white">Your Affiliate Link</h3>
        </div>
        <p className="mb-5 text-slate-400">
          Paste your affiliate link below or choose from your saved Money Links. Every <code className="rounded bg-white/10 px-1.5 py-0.5 text-amber-400">[LINK]</code> in the posts will be replaced with your link.
        </p>

        {/* Saved links selector */}
        {savedLinks.length > 0 && (
          <div className="relative mb-4">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-left text-slate-300 transition hover:border-amber-500/30 hover:bg-white/8"
            >
              <span className="flex items-center gap-2">
                <Save size={16} className="text-amber-400" />
                Choose from your saved Money Links
              </span>
              <ChevronDown size={18} className={`text-slate-400 transition ${showDropdown ? "rotate-180" : ""}`} />
            </button>
            {showDropdown && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                {savedLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleSelectSavedLink(link.url)}
                    className={`flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-white/10 ${
                      affiliateLink === link.url ? "bg-amber-500/10" : ""
                    }`}
                  >
                    <DollarSign size={16} className={link.isDefault ? "text-emerald-400" : "text-amber-400"} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white">{link.name}</p>
                      <p className="truncate text-xs text-slate-500">{link.url}</p>
                    </div>
                    {link.isDefault && (
                      <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="url"
            value={affiliateLink}
            onChange={(e) => {
              setAffiliateLink(e.target.value);
              if (showPosts && !e.target.value.trim()) setShowPosts(false);
            }}
            placeholder="https://www.digistore24.com/redir/12345/your-id/"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-lg text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
          <button
            onClick={handleShowPosts}
            disabled={!affiliateLink.trim()}
            className="btn-premium flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-lg font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Eye size={22} />
            Show My Posts
          </button>
        </div>
      </div>

      {/* Save-to-Money-Links popup */}
      {showSavePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <button
              onClick={() => setShowSavePopup(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            {savedSuccessfully ? (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                  <CheckCircle2 size={36} className="text-emerald-400" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Link Saved!</h3>
                <p className="mt-2 text-slate-400">Your link has been saved to Money Links.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
                    <Save size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Save This Link?</h3>
                    <p className="text-sm text-slate-400">Save to Money Links for easy reuse</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300">Link Name</label>
                    <input
                      type="text"
                      value={saveLinkName}
                      onChange={(e) => setSaveLinkName(e.target.value)}
                      placeholder="e.g., My DigiStore Link"
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300">Link URL</label>
                    <p className="mt-1 truncate rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm text-slate-400">
                      {affiliateLink}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveLink}
                      disabled={!saveLinkName.trim()}
                      className="flex-1 rounded-xl bg-amber-500 py-3.5 font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                    >
                      Save to Money Links
                    </button>
                    <button
                      onClick={() => setShowSavePopup(false)}
                      className="rounded-xl border border-white/10 px-6 py-3.5 text-white hover:bg-white/5"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Posts */}
      {showPosts && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">
              <Sparkles className="mr-2 inline text-amber-400" size={24} />
              Your Posts — Ready to Copy
            </h3>
            <span className="text-sm text-slate-400">
              {filteredPosts.length} post{filteredPosts.length !== 1 && "s"}
            </span>
          </div>

          {filteredPosts.map((p, idx) => {
            const colors = NICHE_COLORS[p.niche] ?? { bg: "bg-white/10", text: "text-white", badge: "default" as const };
            const isCopied = copiedId === p.id;
            const postWithLink = p.post.replace("[LINK]", affiliateLink);

            return (
              <div key={p.id} className="glass-card rounded-2xl p-6">
                {/* Top row */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <Badge tone={colors.badge} size="md">{p.niche}</Badge>
                  <div className="ml-auto flex items-center gap-2">
                    <TrendingUp className="text-emerald-400" size={16} />
                    <span className="text-sm font-semibold text-emerald-400">
                      ${p.earningsMin}–${p.earningsMax}
                    </span>
                    <span className="text-xs text-slate-500">est. / month</span>
                  </div>
                </div>

                {/* Post body */}
                <div className="rounded-xl bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                    <Facebook size={14} />
                    Facebook Post Preview
                  </div>
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-200">
                    {postWithLink}
                  </p>
                </div>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(p.id, p.post)}
                  className={`mt-4 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg font-bold transition ${
                    isCopied
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "btn-premium text-black hover:brightness-110"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 size={22} />
                      Copied! Now Paste in Facebook
                    </>
                  ) : (
                    <>
                      <Copy size={22} />
                      Copy This Post
                    </>
                  )}
                </button>
              </div>
            );
          })}

          {/* Bottom CTA */}
          <div className="glass-gold rounded-3xl p-8 text-center">
            <Sparkles className="mx-auto text-amber-400" size={32} />
            <h3 className="mt-4 text-2xl font-bold text-white">
              Keep Going — Consistency Wins!
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-slate-300">
              Post 3–5 times per day across different Facebook groups for best results.
              The more you post, the more you earn.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn-premium mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-black"
            >
              Back to Top
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
