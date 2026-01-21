"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { 
  CheckCircle2, Copy, ExternalLink, DollarSign, TrendingUp, 
  Image as ImageIcon, ArrowRight, Sparkles, AlertCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample generated images (in real app, these would come from state/API)
const sampleImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", title: "Home Decor" },
  { id: "2", url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800", title: "Living Room" },
];

// Publishing platforms with instructions
const platforms = [
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "📌",
    earnings: "$50 - $200/day",
    difficulty: "Easy",
    recommended: true,
    steps: [
      "Go to Pinterest.com and log in (or create a free account)",
      "Click the '+' button and select 'Create Pin'",
      "Upload your AI-generated image",
      "Copy the caption below and paste it in the description",
      "Paste your affiliate link in the 'Destination link' field",
      "Choose a relevant board (create one if needed)",
      "Click 'Publish' and you're done!"
    ],
    caption: "✨ Transform your space with this stunning decor! 🏡 Click the link to shop this look and create your dream home. Perfect for anyone who loves modern, cozy aesthetics! #HomeDecor #InteriorDesign #HomeStyling #CozyHome #ModernLiving #HomeInspo",
    tips: [
      "Post 5-10 pins per day for best results",
      "Use relevant hashtags (we included them for you)",
      "Pin at peak times: 8-11pm EST",
      "Create boards for different niches"
    ]
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    earnings: "$30 - $150/day",
    difficulty: "Medium",
    recommended: false,
    steps: [
      "Open Instagram app on your phone",
      "Tap '+' to create a new post",
      "Select your AI-generated image from your photos",
      "Apply a filter if desired (or keep original)",
      "Copy the caption below and paste it",
      "Add your link in bio (Instagram doesn't allow links in posts)",
      "Post and add to your Stories for more reach!"
    ],
    caption: "✨ Obsessed with this aesthetic! 🏡\n\n💫 Link in bio to shop this exact look!\n\n#HomeDecor #InteriorDesign #HomeStyling #AestheticHome #CozyVibes #HomeInspo #DecorGoals #ModernHome #InteriorInspo #HomeStyle",
    tips: [
      "Use Linktree in bio to share multiple links",
      "Post Reels for 10x more reach",
      "Use all 30 hashtags allowed",
      "Engage with similar accounts"
    ]
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    earnings: "$20 - $100/day",
    difficulty: "Medium",
    recommended: false,
    steps: [
      "Open TikTok app",
      "Create a slideshow or video with your images",
      "Add trending audio for more reach",
      "Copy the caption below",
      "Add your link to bio",
      "Post and use relevant hashtags"
    ],
    caption: "POV: You finally get that dream home aesthetic ✨🏡 Link in bio! #HomeDecor #InteriorDesign #AestheticHome #RoomTour #HomeInspo #fyp #viral",
    tips: [
      "Use trending sounds",
      "Post 3-5 times per day",
      "Engage in comments",
      "Jump on trends quickly"
    ]
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    earnings: "$10 - $50/day",
    difficulty: "Easy",
    recommended: false,
    steps: [
      "Go to Facebook and find relevant groups in your niche",
      "Join groups like 'Home Decor Ideas' or 'DIY Home'",
      "Create a post with your image",
      "Copy the caption and include your link",
      "Post in multiple groups (follow their rules)"
    ],
    caption: "Just found this amazing home decor inspiration! 😍 If you're looking to transform your space, check this out 👉 [YOUR LINK]\n\nWhat do you think? Would you try this style?",
    tips: [
      "Join 20-30 active groups",
      "Post in groups, not your profile",
      "Be helpful and engage with others",
      "Don't spam - provide value"
    ]
  }
];

export default function LaunchpadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Mock affiliate link - in real app would come from user's saved links
  const affiliateLink = "https://amazon.com/shop/yourlink?tag=yourtag-20";

  return (
    <AppShell
      title="Cash Out"
      subtitle="Follow these step-by-step instructions to publish your images and start earning"
    >
      {/* Earnings Overview */}
      <div className="glass-gold rounded-3xl p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Badge tone="gold">POTENTIAL EARNINGS</Badge>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Turn Your Images Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">$50 - $500/day</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Your earnings depend on which platforms you use and how consistently you post. 
              Pinterest is the easiest to start with and has the highest earning potential.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />
                <span>No followers needed</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />
                <span>Works while you sleep</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl font-bold text-white">$214</p>
              <p className="text-slate-400">Average daily earnings</p>
              <p className="mt-2 text-emerald-400 font-medium">from Pinterest alone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Choose Where to Publish</h2>
        <p className="text-slate-400">Select a platform to see step-by-step instructions</p>
        
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform)}
              className={`relative rounded-2xl border p-5 text-left transition-all ${
                selectedPlatform.id === platform.id
                  ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30"
                  : "border-white/10 bg-white/5 hover:border-amber-500/30"
              }`}
            >
              {platform.recommended && (
                <Badge tone="success" size="sm">⭐ BEST</Badge>
              )}
              <div className="mt-2 text-4xl">{platform.icon}</div>
              <h3 className="mt-3 font-semibold text-white">{platform.name}</h3>
              <p className="mt-1 text-emerald-400 font-medium">{platform.earnings}</p>
              <p className="mt-1 text-sm text-slate-400">Difficulty: {platform.difficulty}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Platform Instructions */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{selectedPlatform.icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-white">How to Post on {selectedPlatform.name}</h2>
            <p className="text-emerald-400 font-medium">Potential: {selectedPlatform.earnings}</p>
          </div>
        </div>

        {/* Step by step instructions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Step-by-Step Instructions:</h3>
          <div className="space-y-3">
            {selectedPlatform.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 rounded-xl bg-white/5 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 font-bold text-black">
                  {idx + 1}
                </div>
                <p className="text-white pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copy-paste caption */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Caption (Copy & Paste):</h3>
          <div className="rounded-xl border border-white/10 bg-black/30 p-5">
            <p className="text-slate-300 whitespace-pre-wrap">{selectedPlatform.caption}</p>
            <button
              onClick={() => copyToClipboard(selectedPlatform.caption, "caption")}
              className="mt-4 flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
            >
              {copiedField === "caption" ? (
                <>
                  <CheckCircle2 size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Caption
                </>
              )}
            </button>
          </div>
        </div>

        {/* Your affiliate link */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Your Money Link (Copy & Paste):</h3>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <p className="text-emerald-400 font-mono text-sm break-all">{affiliateLink}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => copyToClipboard(affiliateLink, "link")}
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                {copiedField === "link" ? (
                  <>
                    <CheckCircle2 size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Link
                  </>
                )}
              </button>
              <Link
                href="/monetization/link-vault"
                className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"
              >
                Change Link
              </Link>
            </div>
          </div>
        </div>

        {/* Pro tips */}
        <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">💡 Pro Tips for {selectedPlatform.name}:</h3>
          <ul className="space-y-2">
            {selectedPlatform.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={16} className="mt-1 text-amber-400 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Your Images */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Your Images Ready to Post</h2>
            <p className="text-slate-400">Download these and follow the instructions above</p>
          </div>
          <Link href="/image-forge" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <Sparkles size={18} />
            Create More
          </Link>
        </div>

        {sampleImages.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-white/10 p-8 text-center">
            <ImageIcon className="mx-auto text-slate-500" size={48} />
            <h3 className="mt-4 text-lg font-semibold text-white">No images yet</h3>
            <p className="mt-2 text-slate-400">Create your first money-making images</p>
            <Link href="/image-forge" className="btn-premium mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-black">
              <Sparkles size={18} />
              Create Images
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleImages.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-2xl border border-white/10">
                <div className="relative aspect-square">
                  <Image src={img.url} alt={img.title} fill className="object-cover" />
                </div>
                <div className="bg-black/40 p-4">
                  <p className="font-medium text-white">{img.title}</p>
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm text-white hover:bg-white/20"
                  >
                    Download
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Earnings Estimates by Platform */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Earnings Estimates by Platform</h2>
        <p className="text-slate-400">Based on posting 5-10 images per day</p>
        
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 text-left text-slate-400 font-medium">Platform</th>
                <th className="py-3 text-left text-slate-400 font-medium">Daily Potential</th>
                <th className="py-3 text-left text-slate-400 font-medium">Monthly Potential</th>
                <th className="py-3 text-left text-slate-400 font-medium">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr key={p.id} className="border-b border-white/5">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <span className="font-medium text-white">{p.name}</span>
                      {p.recommended && <Badge tone="success" size="sm">Best</Badge>}
                    </div>
                  </td>
                  <td className="py-4 text-emerald-400 font-semibold">{p.earnings}</td>
                  <td className="py-4 text-white">
                    ${parseInt(p.earnings.split(' - ')[0].replace('$', '')) * 30} - ${parseInt(p.earnings.split(' - ')[1].replace('/day', '').replace('$', '')) * 30}
                  </td>
                  <td className="py-4 text-slate-400">{p.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final CTA */}
      <div className="glass-money rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to Start Earning?</h2>
        <p className="mt-2 text-lg text-slate-300">Follow the steps above and post your first image today!</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-black"
          >
            📌 Open Pinterest
            <ExternalLink size={20} />
          </a>
          <Link
            href="/image-forge"
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
          >
            <Sparkles size={20} />
            Create More Images
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
